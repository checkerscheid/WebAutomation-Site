/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 22.07.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 704                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendarcfg.js 704 2024-10-20 17:29:04Z                  $ #
//#                                                                                 #
//###################################################################################
?> scenecfg */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>
//<? require_once 'script/system/dps.js'; ?>

groups.tablename = 'calendargroup';
groups.member = 'calendar';
groups.target = 'calendarcfg';

dps.tablename = 'calendar';
dps.target = 'calendarcfg';
dps.writable = true;

p.page.load = function() {
	groups.init();
	dps.init();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.calendarcfg.menu' + $(this).attr('data-target') + '.req', {table:groups.tablename});
	});
//###################################################################################
// Calendar bearbeiten (menucalendar)
//###################################################################################
	$('#erg').on('click', '.calendargroupfolder', function() {
		if($(this).hasClass('open')) {
			$('[data-calendars]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('[data-calendars]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var calendargroup = $(this).attr('data-calendargroup');
			$.post('std.calendarcfg.getcalendar.req', {calendargroup:calendargroup}, function(data) {
				$('[data-calendars=' + calendargroup + ']').html(data);
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.allgroup', function() {
		var tr = $(this).parents('ul.calendaringroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idcalendar]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-idcalendar'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.calendarcfg.popallgroup.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Zeitprogrammgruppe wechseln', modal: true, width: p.popup.width.middel,
					buttons: [{
						text:'OK',
						click: function() {
							var newgroup = $('#c-group').val();
							$.post('std.calendarcfg.saveallgroup.req', {ids:ids, newgroup:newgroup}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('#erg', 'std.calendarcfg.menucalendar.req');
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
			p.page.alert('Keine Zeitprogramme Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allaktiv', function() {
		var tr = $(this).parents('ul.calendaringroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idcalendar]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.get('std.calendarcfg.popallactive.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Aktivieren / Deaktivieren', modal: true, width: p.popup.width.middel,
					buttons: [{
						text:'Aktivieren',
						click: function() {
							$.post('std.calendarcfg.saveallaktiv.req', {ids:ids, newaktiv:'True'}, function(data) {
								if(data == 'S_OK') {
									p.page.change('li[data-calendar=' + $(tr).attr('data-group') + ']', 'std.calendarcfg.getcalendar.req', {calendargroup:$(tr).attr('data-group')});
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
							$.post('std.calendarcfg.saveallactive.req', {ids:ids, newaktiv:'False'}, function(data) {
								if(data == 'S_OK') {
									p.page.change('li[data-calendar=' + $(tr).attr('data-group') + ']', 'std.calendarcfg.getcalendar.req', {calendargroup:$(tr).attr('data-group')});
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
			p.page.alert('Keine Zeitprogramme Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.multiclean', function() {
		var tr = $(this).parents('ul.calendaringroup:first');
		var ids = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.post('std.calendarcfg.cleanmulticalendar.req', {ids:ids}, function(data) {
				if(data != 'S_OK') p.page.alert('<span class="neg">' + data + '</span>');
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.alldelete', function() {
		var tr = $(this).parents('ul.calendaringroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-idccalendar]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
				names.push($(this).find('.ps-checkbox').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.calendarcfg.popalldelete.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Kalender löschen', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'löschen',
						click: function() {
							$.post('std.calendarcfg.savealldelete.req', {ids:ids}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.alert('<span class="pos">gelöscht</span>');
									$(tr).find('[data-idcalendar]').each(function() {
										if(p.valueexist($(this).attr('data-idcalendar'), ids)) {
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
			p.page.alert('Keine Zeitprogramm ausgewählt');
		}
	});
//###################################################################################
// Funtionen fuer einzelne Zeitprogramme
//###################################################################################
	$('#erg').on('click', '.calendaredit', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-idcalendar');
		var group = $(this).parents('ul.calendaringroup').attr('data-group');
		$.post('std.calendarcfg.poponecalendar.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Zeitprogramm bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
					click: function() {
						var TheObj = {
							id: id,
							description: $('#c-description').val(),
							active: $('#c-active').hasClass('checked') ? 'True' : 'False',
							group: $('#c-group').val()
						};
						//p.log.write('Gruppe: ' + newgroup);
						$.post('std.calendarcfg.updateonecalendar.req', TheObj, function(data) {
							if(data.erg == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$('#dialog').dialog('close');
								$(tr).find('span.tr-calendartext').text(TheObj.description);
							} else {
								p.page.alert('<span class="neg">' + data.message + '</span>', 5000);
							}
						});
						$.post('std.calendarcfg.getcalendar.req', {group:TheObj.group}, function(data) {
							$('[data-calendar=' + TheObj.group + ']').html(data);
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
	$('#erg').on('click', '.calendardelete', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		$.post('std.calendarcfg.deleteonecalendar.req', {id:id}, function(data) {
			if(data.erg == 'S_OK') $(tr).hide();
			else p.page.alert('<span class="neg">' + data.message + '</span>');
		});
	});
//###################################################################################
	$('#erg').on('click', '.calendarclean', function() {
		var id = $(this).parents('div.tr:first').attr('data-id');
		$.post('std.calendarcfg.cleancalendar.req', {id:id}, function(data) {
			if(data != 'S_OK') p.page.alert('<span class="neg">' + data + '</span>');
		});
	});
//###################################################################################
	$('#erg').on('click', '.allclean', function() {
		$.get('std.calendarcfg.cleanallcalendar.req', function(data) {
			if(data != 'S_OK') p.page.alert('<span class="neg">' + data + '</span>');
		});
	});
//###################################################################################
};
