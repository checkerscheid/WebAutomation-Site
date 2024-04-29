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
//# Revision     : $Rev:: 568                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendartemplate.js 568 2024-01-24 07:36:18Z             $ #
//#                                                                                 #
//###################################################################################
use system\std;
?> schedulecfg */

// p.log.level = p.log.type.info;

p.page.load = function() {
//###################################################################################
// Allgemein
//###################################################################################
	$.get('std.request.activedpextended.req', function(data) {
		$('#calendartemplatecontainer').attr('data-type', wpResult['DP']['Type']);
	}, 'script');
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.calendartemplate.menu' + $(this).attr('data-target') + '.req', {id:"<?=std::gets('param1')?>"}, function() {
			$('#newtemplate').fullCalendar({
				firstDay: 1,
				theme: true,
				allDaySlot: false,
				slotDuration: '00:30:00',
				defaultView: 'agendaDay',
				defaultDate: '1990-01-01',
				scrollTime: '08:00:00',
				height: $(window).height() - 500,
				header: false,
				monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
				monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
				dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
				dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
				defaultEventMinutes: 30,
				editable: true,
				selectable: true,
				selectHelper: true,
				allDayDefault: false,
				disableResizing: false,
				timeFormat: 'HH:mm',
				slotLabelFormat: 'HH(:mm)',
				listDayFormat: 'DD. MMMM YYYY',
				columnHeader: false,
				select: function(start, end) { newSchedule('#newtemplate', start, end); },
				eventClick: function(event) { editSchedule('#newtemplate', event); },
				eventResize: function(event) { editSchedulenoPopup(event); },
				eventDrop: function(event) { editSchedulenoPopup(event); }
			});
		});
	});
	$('#calendartemplate').on('click', '#savetemplate', function() {
		var events = $('#newtemplate').fullCalendar('clientEvents');
		var ev = [];
		for(var i = 0; i < events.length; i++) {
			ev[i] = {
				name: events[i].title,
				start: events[i].start.format('HH:mm'),
				end: events[i].end.format('HH:mm'),
				vstart: events[i].vstart,
				vend: events[i].vend,
			}
		}
		var name = $('#templatename').val();
		$.post('std.calendartemplate.savetemplate.req', {ev:ev, idCalendar:'<?=std::gets("param1")?>', name:name}, function(data) {
			if(data == 'S_OK') {
				$('#newtemplate').fullCalendar('removeEvents');
				$('#templatename').val('');
				p.page.alert('<span class="pos">gespeichert</span>', 2000);
			}
			else p.page.alert(data, 5000);
		});
	});
	$('#calendartemplate').on('click', '.p-trefresh', function() {
		var template = $(this).parents('li[data-template]');
		var templateid = $(template).attr('data-template');
		var defaultValue = $(template).find('span.p-ttext').text();
		$.post('std.osk.pop', {type:'min', defaultValue:defaultValue}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Kalendervorlage Umbenennen', modal: true, width: p.popup.width.osk,
				buttons: [{
					text: 'speichern',
					click: function() {
						var newname = $.trim($('#oskinput').val()).replace(/[^a-zA-Z0-9_ ]/, '_');
						$.post('std.calendartemplate.renametemplate.req', {templateid:templateid,newname:newname}, function(data) {
							if(data == 'S_OK') {
								$(template).find('span.p-ttext').text(newname);
								$('#dialog').dialog('close');
							} else {
								p.page.alert(data, 5000);
							}
						});
					}
				}]
			});
		});
	});
	$('#calendartemplate').on('click', '.p-tedit', function() {
		var templateid = $(this).parents('li[data-template]').attr('data-template');
		console.log($(window).height() - 500);
		$('#edittemplatecalendar').fullCalendar('destroy').fullCalendar({
			firstDay: 1,
			theme: true,
			allDaySlot: false,
			slotDuration: '00:30:00',
			defaultView: 'agendaDay',
			defaultDate: '1990-01-01',
			scrollTime: '08:00:00',
			height: $(window).height() - 500,
			header: false,
			monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
			monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
			dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
			dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			defaultEventMinutes: 30,
			editable: true,
			selectable: true,
			selectHelper: true,
			allDayDefault: false,
			disableResizing: false,
			timeFormat: 'HH:mm',
			slotLabelFormat: 'HH(:mm)',
			listDayFormat: 'DD. MMMM YYYY',
			columnHeader: false,
			eventSources:[{
				url: 'std.event.gettemplateevents.req',
				type: 'POST',
				data: {
					id_calendartemplate: templateid
				},
				error: function() {
					alert('there was an error while fetching events!');
				}
			}],
			select: function(start, end) { newSchedule('#edittemplatecalendar', start, end, true, templateid); },
			eventClick: function(event) { editSchedule('#edittemplatecalendar', event, true, templateid); },
			eventResize: function(event) { editSchedulenoPopup(event, true); },
			eventDrop: function(event) { editSchedulenoPopup(event, true); }
		});
	});
	$('#calendartemplate').on('click', '.p-tdelete', function() {
		var templateid = $(this).parents('li[data-template]').attr('data-template');
		$.post('std.calendartemplate.deletetemplate.req', {templateid:templateid}, function(data) {
			if(data == 'S_OK') {
				$('li[data-template=' + templateid + ']').hide(400);
			} else {
				p.page.alert(data, 5000);
			}
		});
	});
};

//###################################################################################
// Helper Funtionen
//###################################################################################
function newSchedule(calendar, start, end, save, idTemplate) {
	save = typeof(save) == 'undefined' ? false : true;
	var idCalendarTemplate = typeof(idTemplate) == 'undefined' ? 0 : idTemplate;

	if(end.format('HH:mm') == '00:00' || end.format('HH:mm:ss') == '24:00') end.set({'hour' : 23, 'minute': 59, 'second': 59});
	var schedule = {
		starth: start.hour(),
		startm: start.minutes(),
		endh: end.hour(),
		endm: end.minutes()
	};

	$.post('std.calendartemplate.pop', {schedule:schedule, idCalendar:'<?=std::gets("param1")?>'}, function(data) {
		$('#dialog').html(data).dialog({
			title:'Ereignis erstellen', width:'600px',
			buttons:{
				ok:{
					text:'Ok',
					click:function() {
						var EventData = {
							startval: $('#dialog').find('.startvalue').val(),
							starth: $('#dialog').find('.starth').val(),
							startm: $('#dialog').find('.startm').val(),
							endval: $('#dialog').find('.endvalue').val(),
							endh: $('#dialog').find('.endh').val(),
							endm: $('#dialog').find('.endm').val()
						};
						if(EventData['starth'].length == 1) EventData['starth'] = '0' + EventData['starth'];
						if(EventData['startm'].length == 1) EventData['startm'] = '0' + EventData['startm'];
						if(EventData['endh'].length == 1) EventData['endh'] = '0' + EventData['endh'];
						if(EventData['endm'].length == 1) EventData['endm'] = '0' + EventData['endm'];
						if(EventData['endh'] == '00' && EventData['endm'] == '00') {
							EventData['endh'] = '23';
							EventData['endm'] = '59';
						}
						if(EventData['endh'] == '24' && EventData['endm'] == '00') {
							EventData['endh'] = '23';
							EventData['endm'] = '59';
						}
						var ev = [{
							title: 'Einschaltwert: ' + $('#dialog').find('.startvalue option:selected').text() + ', Ausschaltwert: ' + $('#dialog').find('.endvalue option:selected').text(),
							start: '1990-01-01 ' + EventData['starth'] + ':' + EventData['startm'],
							end: '1990-01-01 ' + EventData['endh'] + ':' + EventData['endm'],
							vstart: EventData['startval'],
							vend: EventData['endval'],
						}];
						if(save) {
							$.post('std.calendartemplate.updatetemplate.req', {ev:ev, idCalendarTemplate:idCalendarTemplate}, function(data) {
								if(data == 'S_OK') $(calendar).fullCalendar('refetchEvents');
								else p.page.alert(data, 5000);
							});
						} else {
							$(calendar).fullCalendar('addEventSource', ev);
						}
						$('#dialog').dialog('close');
					}
				}
			}
		});
	});
}
function editSchedule(calendar, event, save, idTemplate) {
	save = typeof(save) == 'undefined' ? false : true;
	var idCalendarTemplate = typeof(idTemplate) == 'undefined' ? 0 : idTemplate;

	if(event.end.format('HH:mm') == '00:00' || event.end.format('HH:mm') == '24:00') event.end.set({'hour' : 23, 'minute': 59, 'second': 59});
	var schedule = {
		starth: event.start.hour(),
		startm: event.start.minutes(),
		vstart: event.vstart,
		endh: event.end.hour(),
		endm: event.end.minutes(),
		vend: event.vend
	};

	$.post('std.calendartemplate.pop', {schedule:schedule, idCalendar:'<?=std::gets("param1")?>'}, function(data) {
		$('#dialog').html(data).dialog({
			title:'Ereignis bearbeiten', width:'600px',
			buttons:{
				ok:{
					text:'Ok',
					click:function() {
						var EventData = {
							startval: $('#dialog').find('.startvalue').val(),
							starth: $('#dialog').find('.starth').val(),
							startm: $('#dialog').find('.startm').val(),
							endval: $('#dialog').find('.endvalue').val(),
							endh: $('#dialog').find('.endh').val(),
							endm: $('#dialog').find('.endm').val()
						};
						if(EventData['starth'].length == 1) EventData['starth'] = '0' + EventData['starth'];
						if(EventData['startm'].length == 1) EventData['startm'] = '0' + EventData['startm'];
						if(EventData['endh'].length == 1) EventData['endh'] = '0' + EventData['endh'];
						if(EventData['endm'].length == 1) EventData['endm'] = '0' + EventData['endm'];
						if(EventData['endh'] == '00' && EventData['endm'] == '00') {
							EventData['endh'] = '23';
							EventData['endm'] = '59';
						}
						if(EventData['endh'] == '24' && EventData['endm'] == '00') {
							EventData['endh'] = '23';
							EventData['endm'] = '59';
						}
						var ev = {
							title: 'Einschaltwert: ' + $('#dialog').find('.startvalue option:selected').text() + ', Ausschaltwert: ' + $('#dialog').find('.endvalue option:selected').text(),
							start: '1990-01-01 ' + EventData['starth'] + ':' + EventData['startm'],
							end: '1990-01-01 ' + EventData['endh'] + ':' + EventData['endm'],
							vstart: EventData['startval'],
							vend: EventData['endval'],
						};
						if(save) {
							$.post('std.calendartemplate.updateevent.req', {ev:ev, idevent:event.id}, function(data) {
								if(data == 'S_OK') $(calendar).fullCalendar('refetchEvents');
								else p.page.alert(data, 5000);
							});
						} else {
							event.title = ev.title;
							event.start.set('hour', EventData['starth']);
							event.start.set('minute', EventData['startm']);
							event.end.set('hour', EventData['endh']);
							event.end.set('minute', EventData['endm']);
							event.vstart = EventData['startval'];
							event.vend = EventData['endval'];
							$(calendar).fullCalendar('updateEvent', event);
						}
						$('#dialog').dialog('close');
					}
				},
				loeschen:{
					text:'Löschen',
					click:function() {
						$.post('std.calendartemplate.deleteevent.req', {idevent:event.id}, function(data) {
							if(data == 'S_OK') $(calendar).fullCalendar('refetchEvents');
							else p.page.alert(data, 5000);
						});
						$('#dialog').dialog('close');
					}
				}
			}
		});
	});
}
function editSchedulenoPopup(event, save) {
	save = typeof(save) == 'undefined' ? false : true;
	var start = event.start.format('HH:mm:ss');
	var end = event.end.format('HH:mm:ss');
	if(end == '00:00:00') end = '23:59:59';
	var ev = {
		start: '1990-01-01 ' + start,
		end: '1990-01-01 ' + end,
		vstart: event.vstart,
		vend: event.vend,
	};
	if(save) {
		$.post('std.calendartemplate.updateevent.req', {ev:ev, idevent:event.id}, function(data) {
			if(data != 'S_OK') p.page.alert(data, 5000);
		});
	}
}

