/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 15.05.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 731                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: trendcfg.js 731 2025-04-03 16:37:32Z                     $ #
//#                                                                                 #
//###################################################################################
?> trendcfg */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>
//<? require_once 'script/system/dps.js'; ?>

groups.tablename = 'trendgroup';
groups.member = 'trend';
groups.target = 'trendcfg';

dps.tablename = 'trend';
dps.target = 'trendcfg';

p.page.load = function() {
	groups.init();
	dps.init();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.trendcfg.menu' + $(this).attr('data-target') + '.req', {table:groups.tablename});
	});
	$('#trendinfotable').DataTable({
		columnDefs: [{
			type: 'de_datetime', targets:[1,2]
		}],
		bPaginate: false,
		bLengthChange: false,
		bFilter: false,
		bInfo: false,
		bAutoWidth: false,
		aaSorting: [[0,'desc']]
	});
//###################################################################################
// Trends bearbeiten (menutrends)
//###################################################################################
	$('#erg').on('click', '.trendgroupfolder', function() {
		if($(this).hasClass('open')) {
			$('[data-trends]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('[data-trends]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var trendgroup = $(this).attr('data-trendgroup');
			$.post('std.trendcfg.gettrend.req', {trendgroup:trendgroup}, function(data) {
				$('[data-trends=' + trendgroup + ']').html(data);
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.allgroup', function() {
		var tr = $(this).parents('ul.trendingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtrend]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtrend'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.trendcfg.popallgroup.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Trendgruppe wechseln', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newgroup = $('#c-group').val();
							$.post('std.trendcfg.saveallgroup.req', {ids:ids, newgroup:newgroup}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('#erg', 'std.trendcfg.menutrends.req');
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
			p.page.alert('Keine Trends Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allintervall', function() {
		var tr = $(this).parents('ul.trendingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtrend]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtrend'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.trendcfg.popallintervall.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Intervall ändern', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newintervall = $('#c-intervall').val();
							$.post('std.trendcfg.saveallintervall.req', {ids:ids, newintervall:newintervall}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('li[data-trend=' + $(tr).attr('data-group') + ']', 'std.trendcfg.gettrend.req', {trendgroup:$(tr).attr('data-group')});
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
			p.page.alert('Keine Trends Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allaktiv', function() {
		var tr = $(this).parents('ul.trendingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtrend]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtrend'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.trendcfg.popallactive.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Aktivieren / Deaktivieren', modal: true, width: p.popup.width.middle,
					buttons: [{
						text: 'Aktivieren',
						click: function() {
							$.post('std.trendcfg.saveallactive.req', {ids:ids, newaktiv:'True'}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('li[data-trend=' + $(tr).attr('data-group') + ']', 'std.trendcfg.gettrend.req', {trendgroup:$(tr).attr('data-group')});
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
							$.post('std.trendcfg.saveallactive.req', {ids:ids, newaktiv:'False'}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('li[data-trend=' + $(tr).attr('data-group') + ']', 'std.trendcfg.gettrend.req', {trendgroup:$(tr).attr('data-group')});
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
			p.page.alert('Keine Trends Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allmaximal', function() {
		var tr = $(this).parents('ul.trendingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtrend]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtrend'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.trendcfg.popallmaximal.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'maximale Anzahl an Einträgen', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newmaximal = $('#c-max').val();
							$.post('std.trendcfg.saveallmaximal.req', {ids:ids, newmaximal:newmaximal}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('li[data-trend=' + $(tr).attr('data-group') + ']', 'std.trendcfg.gettrend.req', {trendgroup:$(tr).attr('data-group')});
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
			p.page.alert('Keine Trends Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allalter', function() {
		var tr = $(this).parents('ul.trendingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtrend]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtrend'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.trendcfg.popallalter.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'maximales Alter der Einträge', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newalter = $('#c-maxage').val();
							$.post('std.trendcfg.saveallalter.req', {ids:ids, newalter:newalter}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('li[data-trend=' + $(tr).attr('data-group') + ']', 'std.trendcfg.gettrend.req', {trendgroup:$(tr).attr('data-group')});
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
			p.page.alert('Keine Trends Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.alldelete', function() {
		var tr = $(this).parents('ul.trendingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idtrend]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idtrend'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.trendcfg.popalldelete.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Trends löschen', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'löschen',
						click: function() {
							$.post('std.trendcfg.savealldelete.req', {ids:ids}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.alert('<span class="pos">gelöscht</span>');
									$(tr).find('[data-idtrend]').each(function() {
										if(p.valueexist($(this).attr('data-idtrend'), ids)) {
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
			p.page.alert('Keine Trends ausgewählt');
		}
	});
//###################################################################################
// Funtionen fuer einzelne Trends
//###################################################################################
	$('#erg').on('click', '.trendedit', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-idtrend');
		var group = $(this).parents('ul.trendingroup').attr('data-group');
		$.post('std.trendcfg.poponetrend.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Trend bearbeiten', modal: true, width: p.popup.width.middle,
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
						$.post('std.trendcfg.updateonetrend.req', TheObj, function(data) {
							if(data.erg == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$('#dialog').dialog('close');
								$(tr).find('span.tr-trendtext').text(TheObj.description);
							} else {
								p.page.alert('<span class="neg">' + data.message + '</span>', 5000);
							}
						});
						$.post('std.trendcfg.gettrend.req', {group:group}, function(data) {
							$('[data-trend=' + group + ']').html(data);
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
	$('#erg').on('click', '.trenddelete', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-idtrend');
		$.post('std.trendcfg.deleteonetrend.req', {id:id}, function(data) {
			if(data.erg == 'S_OK') $(tr).hide();
			else p.page.alert('<span class="neg">' + data.message + '</span>');
		}, 'json');
	});
};
