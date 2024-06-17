/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 15.06.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 625                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mqttactive.js 625 2024-06-16 09:23:25Z                   $ #
//#                                                                                 #
//###################################################################################
?> mqttactive */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>

groups.tablename = 'mqttgroup';
groups.member = 'mqtttopic';
groups.target = 'mqttactive';

p.page.load = function() {
	groups.init();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.mqttactive.menu' + $(this).attr('data-target') + '.req', {table:groups.tablename});
	});
//###################################################################################
// Browse Topics
//###################################################################################
	$('#erg').on('click', '.setBrowseMqtt', function() {
		$.get('std.request.setBrowseMqtt.req', function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('#erg').on('click', '.unsetBrowseMqtt', function() {
		$.get('std.request.unsetBrowseMqtt.req', function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('#erg').on('click', '.getBrowseMqtt', function() {
		$('.browsedTopics').html('').addClass('ps-loading');
		$.get('std.mqttactive.showbrowseresult.req', function(data) {
			//if(data != 'S_OK') p.page.alert(data);
			$('.browsedTopics').removeClass('ps-loading').html(data);
		});
	});
	$('#erg').on('click', '.ps-tree-parent', function() {
		let id = $(this).attr('data-key');
		if($('li.' + id).hasClass('open')) {
			$('li.' + id).removeClass('open');
			$('ul.' + id).addClass('ps-hidden');
		} else {
			$('li.' + id).addClass('open');
			$('ul.' + id).removeClass('ps-hidden');
		}
	});
//###################################################################################
// Topics bearbeiten
//###################################################################################
	$('#erg').on('click', '.mqttgroupfolder', function() {
		if($(this).hasClass('open')) {
			$('[data-topics]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('[data-topics]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var mqttgroup = $(this).attr('data-mqttgroup');
			$.post('std.mqttactive.gettopics.req', {mqttgroup:mqttgroup}, function(data) {
				$('[data-topics=' + mqttgroup + ']').html(data);
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.allgroup', function() {
		var tr = $(this).parents('ul.topicingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtopic]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtopic'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.mqttactive.popallgroup.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'MQTT Gruppe wechseln', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newgroup = $('#c-group').val();
							$.post('std.mqttactive.saveallgroup.req', {ids:ids, newgroup:newgroup}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('#erg', 'std.mqttactive.menutopics.req');
									p.page.alert('<span class="pos">gespeichert</span>');
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">Konnte nicht gespeichert werden.</span>', 3000);
								}
							}, 'json');
						}
					},{
						text: 'Abbruch',
						click: function() { $('#dialog').dialog('close'); }
					}]
				});
			});
		} else {
			p.page.alert('Keine Topics Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allaktiv', function() {
		var tr = $(this).parents('ul.topicingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtopic]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtopic'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.mqttactive.popallactive.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Aktivieren / Deaktivieren', modal: true, width: p.popup.width.middle,
					buttons: [{
						text: 'Aktivieren',
						click: function() {
							$.post('std.mqttactive.saveallactive.req', {ids:ids, newaktiv:'True'}, function(data) {
								if(data == 'S_OK') {
									p.page.change('li[data-topic=' + $(tr).attr('data-group') + ']', 'std.mqttactive.gettopic.req', {topicgroup:$(tr).attr('data-group')});
									p.page.alert('<span class="pos">gespeichert</span>');
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
								}
							});
						}
					},{
						text: 'Deaktivieren',
						click: function() {
							$.post('std.mqttactive.saveallactive.req', {ids:ids, newaktiv:'False'}, function(data) {
								if(data == 'S_OK') {
									p.page.change('li[data-topic=' + $(tr).attr('data-group') + ']', 'std.mqttactive.gettopic.req', {topicgroup:$(tr).attr('data-group')});
									p.page.alert('<span class="pos">gespeichert</span>');
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
								}
							});
						}
					},{
						text: 'Abbruch',
						click: function() { $('#dialog').dialog('close'); }
					}]
				});
			});
		} else {
			p.page.alert('Keine topics Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.alldelete', function() {
		var tr = $(this).parents('ul.topicingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtopic]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtopic'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.mqttactive.popalldelete.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'topics löschen', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'löschen',
						click: function() {
							$.post('std.mqttactive.savealldelete.req', {ids:ids}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.alert('<span class="pos">gelöscht</span>');
									$(tr).find('[data-idtopic]').each(function() {
										if(p.valueexist($(this).attr('data-idtopic'), ids)) {
											$(this).remove();
										}
									});
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
								}
							});
						}
					},{
						text: 'Abbruch',
						click: function() { $('#dialog').dialog('close'); }
					}]
				});
			});
		} else {
			p.page.alert('Keine topics ausgewählt');
		}
	});
//###################################################################################
// Funtionen fuer einzelne topics
//###################################################################################
	$('#erg').on('click', '.topicedit', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-idtopic');
		var group = $(this).parents('ul.topicingroup').attr('data-group');
		$.post('std.mqttactive.poponetopic.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'topic bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
					click: function() {
						var TheObj = {
							id: id,
							group: $('#c-group').val(),
							description: $('#c-description').val(),
							intervall: $('#c-intervall').val(),
							max: $('#c-max').val(),
							maxage: $('#c-maxage').val(),
							active: $('#c-active').hasClass('checked') ? 'True' : 'False'
						};
						//p.log.write('Gruppe: ' + newgroup);
						$.post('std.mqttactive.updateonetopic.req', TheObj, function(data) {
							if(data.erg == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$('#dialog').dialog('close');
								$(tr).find('span.tr-topictext').text(TheObj.description);
							} else {
								p.page.alert('<span class="neg">' + data.message + '</span>', 5000);
							}
						});
						$.post('std.mqttactive.gettopic.req', {group:group}, function(data) {
							$('[data-topic=' + group + ']').html(data);
						});
					}
				},{
					text: 'Abbruch',
					click: function() { $('#dialog').dialog('close'); }
				}]
			});
		});
	});
//###################################################################################
	$('#erg').on('click', '.topicdelete', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		$.post('std.mqttactive.deleteonetopic.req', {id:id}, function(data) {
			if(data.erg == 'S_OK') $(tr).hide();
			else p.page.alert('<span class="neg">' + data.message + '</span>');
		});
	});
};
