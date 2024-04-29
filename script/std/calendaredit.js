/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 09.05.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendaredit.js 550 2023-12-25 03:02:54Z                 $ #
//#                                                                                 #
//###################################################################################
use system\std;
?> calendaredit */

// p.log.level = p.log.type.info;

var choosenInput;
p.page.load = function() {
	$('#header .Logo').css({marginTop:-60, opacity:0}).show();
	$('#header .Logo').delay(500).animate({marginTop:0, opacity:1}, 1500);
	$('#fullcalendar').fullCalendar({
		firstDay: 1,
		theme: true,
		allDaySlot: true,
		allDayText: "Feiertage",
		slotDuration: '00:30:00',
		defaultView: 'agendaWeek',
		height: $('.pagecontent ').height() - 10,
		header: {
			left: 'month,agendaWeek,agendaDay listMonth',
			center: 'title',
			right: 'prev,today,next'
		},
		buttonText: {
			today: 'heute',
			month: 'Monat',
			week: 'Woche',
			day: 'Tag',
			list: 'Liste'
		},
		monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
		monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
		dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
		dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
		defaultEventMinutes: 30,
		nowIndicator: true,
		editable: true,
		selectable: true,
		selectHelper: true,
		allDayDefault: false,
		disableResizing: false,
		droppable: true,
		dropAccept: '.draggable',
		timeFormat: 'HH:mm',
		slotLabelFormat: 'HH(:mm)',
		listDayFormat: 'DD. MMMM YYYY',
		views: {
			month: {
				titleFormat: 'MMMM YYYY'
			},
			agendaWeek: {
				titleFormat: 'D. MMM YYYY',
				columnFormat: 'ddd, D. MMM'
			},
			agendaDay: {
				titleFormat: 'D. MMM YYYY'
			},
			listMonth: {
				titleFormat: 'MMMM YYYY'
			}
		},
		eventSources:[{
			url: 'std.event.getevents.req',
			type: 'POST',
			data: {
				id_calendar: '<?=std::gets("param1")?>'
			},
			error: function() {
				alert('there was an error while fetching events!');
			}
		}],

//		businessHours: {
//			start: '00:00:00',
//			end: '23:59:59',
//			dow: [0, 1, 2, 3, 4, 5, 6]
//		},
//		eventConstraint: 'businessHours',
//		selectConstraint: 'businessHours',

		select: function(start, end) {
			if($.fullCalendar.moment(start).hasTime() == true) {
				newSchedule(start, end);
			}
		},
		eventClick: function(event) {
			if(event.allDay != true){
				editSchedule(event);
			}
		},

		eventResize: function(event) { editSchedulenoPopup(event); },
		eventDrop: function(event) { editSchedulenoPopup(event); },

		drop: function(date, jsEvent, ui, resourceId) {
			var id = $(ui.helper).attr('data-id');
			$.post('std.event.savetemplateevent.req', {date:date.toISOString(), id:id, idGSync:$('#calendar').attr('data-gsync')}, function(data) {
				if(data == 'S_OK') $('#fullcalendar').fullCalendar('refetchEvents');
				else p.page.alert(data, 5000);
			});
		},
		eventRender: function(event, element) {
			element.find('.fc-title').html(element.find('.fc-title').text());
			element.find('.fc-list-item-title a').html(element.find('.fc-list-item-title a').text());
		}
	});
	$('.draggable').draggable({
		opacity: 0.7,
		helper: 'clone'
	});
	$('#dialog').on('change', '.freq', function() {
		switch($(this).val()) {
			case 'daily':
				$('.textintervall').text('Tage');
				$('.weeklyspecial').addClass('ps-hidden');
				break;
			case 'weekly':
				$('.textintervall').text('Wochen');
				$('.weeklyspecial').removeClass('ps-hidden');
				break;
			case 'monthly':
				$('.textintervall').text('Monate');
				$('.weeklyspecial').addClass('ps-hidden');
				break;
			case 'yearly':
				$('.textintervall').text('Jahre');
				$('.weeklyspecial').addClass('ps-hidden');
				break;
		}
	});

	$('#dialog').on('change', '.update', function() {
		switch($(this).val()) {
			case 'day':
				$('.updatespecial').addClass('ps-hidden');
				$('.repeatbox').addClass('checked');
				break;
			case 'from':
				$('.updatespecial').removeClass('ps-hidden');
				$('.repeatbox').removeClass('checked');
				break;
			case 'weekday':
				$('.updatespecial').addClass('ps-hidden');
				$('.repeatbox').addClass('checked');
				break;
			case 'all':
				$('.updatespecial').removeClass('ps-hidden');
				$('.repeatbox').removeClass('checked');
				break;
		}
	});
	$('#dialog').on('click', '.repeatbox', function() {
		if ($(this).hasClass('checked')) {
			$('.updatespecial').removeClass('ps-hidden');
			$('.update').val('all');
		} else {
			$('.updatespecial').addClass('ps-hidden');
			$('.update').val('day');
		}
	});
	$('#dialog').on('click', '.ps-button[data-ex]', function() {
		var exid = $(this).attr('data-ex');
		$.post('std.event.deleteex.req', {exid:exid, idc: '<?=std::gets("param1")?>'}, function(data) {
			if(data == 'S_OK') {
				$('.exdate' + exid).hide(500);
				$('#fullcalendar').fullCalendar('refetchEvents');
			} else p.page.alert(data);
		});
	});
	$('#dialog').on('focus', 'input.forosk', function() {
		choosenInput = $(this);
		p.log.write($(this), p.log.type.warn);
	});
	$('#dialog').on('click', '#calendarnumpad span.ps-button', function() {
		switch($(this).text()) {
			case '<-':
				$(choosenInput).val($(choosenInput).val().substr(0, $(choosenInput).val().length - 1));
				break;
			default:
				var zahl = parseInt($(choosenInput).val() + $(this).text());
				if(typeof($(choosenInput).attr('data-min')) != 'undefined') {
					var min = parseInt($(choosenInput).attr('data-min'));
					if(zahl < min) zahl = min;
				}
				if(typeof($(choosenInput).attr('data-max')) != 'undefined') {
					var max = parseInt($(choosenInput).attr('data-max'));
					if(zahl > max) zahl = max;
				}
				$(choosenInput).val(zahl);
				break;
		}
	});
	//###################################################################################
	$('#aktvalue').on('click', '.ps-input.ps-operable', function() {
		var dpType = $(this).attr('data-type');
		var point = $(this).attr('data-value');
		var unit = $(this).attr('data-unit');

		$.post('std.calendaredit.popupwriteitem.req', {headline:point,type:dpType,unit:unit}, function(data) {
			firstclick = true;
			$('#dialog').html(data).dialog({
				title: 'Sollwert', modal: true, width: p.popup.width.std,
				buttons: [{
					text: 'speichern',
					click: function() {
						var value = $.trim($('#calendarwriteitem').val());
						p.automation.write(point, value);
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	//###################################################################################
	$('#aktvalue').on('click', '.ps-navi-button', function() {
		var idScene = $(this).attr('data-scene');

		$.post('std.calendaredit.popupwriteitem.req', {headline:'Scene schalten',type:'scene', idScene:idScene}, function(data) {
			firstclick = true;
			$('#dialog').html(data).dialog({
				title: 'Sollwert', modal: true, width: p.popup.width.std,
				buttons: [{
					text: 'speichern',
					click: function() {
						var value = $.trim($('#calendarwriteitem').val());
						$.post('std.writescene.setid.req', {id:value}, function(data) {
							if(data != 'S_OK') p.page.alert(data);
							$('#dialog').dialog('close');
						});
					}
				}]
			});
		});
	});
	//###################################################################################
	$.get('std.request.activedpextended.req', function(data) {
		for(var elem in wpResult) {
			$('[data-value=' + elem + ']').each(function() {
				$(this).attr('data-type', wpResult[elem].Type);
				$(this).attr('data-unit', wpResult[elem].Unit);
			});
		}
	}, 'script');
	$('#dialog').on('click', '.reminder-add', function() {
		$.post('std.event.neueerrinerung.req', {idCalendar:'<?=std::gets("param1")?>'}, function(data) {
			$('.tr-errinerung').append(data);
		});
	});
	$('#dialog').on('click', '#delete-errinerung', function() {
		$(this).closest('.errinerung').remove();
	});
	$('#calendartemplates').on('click', '#calendarimport', function() {
		$.post('std.event.selectcalendar.req', null, function(data){
			$('#dialog').html(data).dialog({
				title : 'Calendar Auswahl', modal: true, width: '600px',
				buttons:[{
					text : 'senden',
					click: function() {
						if($('#file').prop('files').length < 1) {
							p.page.alert('Wählen sie eine Datei aus', 5000);
							return
						}
						var formdata = new FormData();
						var file = $('#file').prop('files')[0];
						formdata.append("datei", file);
						formdata.append('calendarid', $('#calendarimport').attr('data-calendarid'));
						formdata.append('filename', $('#file').val().split('\\').pop());
						$.ajax({
							url: 'std.event.importevents.req',
							type: 'POST',
							data: formdata,
							contentType: false,
							processData: false,
							success: function(data) {
								p.page.alert('events wurden importiert');
								$('#dialog').dialog('close');
							}
						});
					}
				},
				{
					text : 'schließen',
					click : function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	p.getValues();
	syncRequired($('#calendar').attr('data-lastsync'));
};
function syncRequired(dt) {
	$.post('std.event.syncrequired.req', {dt:dt,idGSync:$('#calendar').attr('data-gsync')}, function(data) {
		if(data != 'False') {
			$('#calendar').attr('data-lastsync', data);
			$('#fullcalendar').fullCalendar('refetchEvents');
		}
	}).always(function() {
		window.setTimeout(function() { syncRequired($('#calendar').attr('data-lastsync')); }, 15000);
	});
}
function newSchedule(start, end) {
	var obj = {
			'freq': 'weekly',
			'intervall': '',
			'until':'',
			'count':'',
			'byday': ['MO', 'TU', 'WE', 'TH', 'FR']
		};

	if(end.format('HH:mm') == '00:00' || end.format('HH:mm') == '24:00') end.set({'hour' : 23, 'minute': 59, 'second': 59});
	var schedule = {
		start:start.toISOString(),

		startd: start.isoWeekday(),
		starth: start.hour(),
		startm: start.minutes(),
		endd: end.isoWeekday(),
		endh: end.hour(),
		endm: end.minutes()
	};

	$.post('std.calendar_rrule.pop', {rrule:obj, schedule:schedule, idCalendar:'<?=std::gets("param1")?>'}, function(data) {
		$('#dialog').html(data).dialog({
			title:'Ereignis erstellen', modal: true, width:'600px',
			buttons:{
//				cancel:{
//					text:'abbrechen',
//					click:function() {
//						$('#dialog').dialog('close');
//					}
//				},
				ok:{
					text:'speichern',
					click:function() {
						var EventData = {
							startval: $('#dialog').find('.startvalue').val(),
							starth: $('#dialog').find('.starth').val(),
							startm: $('#dialog').find('.startm').val(),
							summary: $('#dialog').find('.summary').val()
						};
						if($('.nostopevent').hasClass('checked')) {
							EventData['nostopevent'] = 'true';
						} else {
							EventData['endval'] = $('#dialog').find('.endvalue').val();
							EventData['endh'] = $('#dialog').find('.endh').val();
							EventData['endm'] = $('#dialog').find('.endm').val();
						}
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
						var obj = {
							'freq': $('.freq').val()
						};
						if ($('.repeatbox').hasClass('checked')) {
							obj['norepeat'] = 'true';
						} else {
							obj['norepeat'] = 'false';
						}
						if($('.intervall').val() > 1) obj['intervall'] = $('.intervall').val();
						if($('.freq').val() == 'weekly') {
							obj['byday'] = [];
							$('.byday span').each(function() {
								if($(this).hasClass('checked')) obj['byday'].push($(this).attr('data-day'));
							});
						}
						if($('.until').hasClass('checked')) obj['until'] = $('.until input').val();
						if($('.count').hasClass('checked')) obj['count'] = $('.count input').val();

						$.post('std.event.saverrule.req', {rrule:obj, EventData:EventData, day:start.toISOString(), idCalendar:'<?=std::gets("param1")?>', idGSync:$('#calendar').attr('data-gsync'), errinerungen:getErrinerungen()}, function(data) {
							if(data == 'S_OK') $('#fullcalendar').fullCalendar('refetchEvents');
							else p.page.alert(data, 5000);
						});
						$('#dialog').dialog('close');
					}
				}
			}
		}).find('.datepicker').datepicker({
			monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
			dayNamesMin: ['So','Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			firstDay: 1,
			dateFormat: 'dd.mm.yy'
		});;
	});
}
function editSchedule(event) {
	var start = event.start;
	var end = event.end;
	var id = event.id;

	if(end.format('HH:mm:ss') == '00:00:00' || end.format('HH:mm:ss') == '24:00:00') end.set({'hour' : 23, 'minute': 59, 'second': 59});
//	alert(id);

	var obj = {
		'freq': 'weekly',
		'intervall': '',
		'until':'',
		'count':'',
		'byday': ['MO', 'TU', 'WE', 'TH', 'FR']
	};

	var schedule = {
		id:id,
		start:start.toISOString(),

		starth: start.hour(),
		startm: start.minutes(),
		endh: end.hour(),
		endm: end.minutes()
	};

	$.post('std.calendar_rrule.pop', {rrule:obj, update:'true', schedule:schedule, idCalendar:'<?=std::gets("param1")?>'}, function(data) {
		$('#dialog').html(data).dialog({
			title: 'Ereignis bearbeiten', modal: true, width:'600px',
			buttons:{
				day:{
					text:'diesen Tag löschen',
					click:function() {
						$.post('std.event.delete.req', {id:id, day:start.toISOString(), delete:'day', idCalendar:'<?=std::gets("param1")?>'}, function(data) {
							if(data == 'S_OK') $('#fullcalendar').fullCalendar('refetchEvents');
							else p.page.alert(data, 5000);
						});
						$('#dialog').dialog('close');
					}
				},
//				weekday:{
//					text:'Wochentag löschen',
//					click:function() {
//						$.post('std.event.delete.req', {id:id, day:start.toISOString(), delete:'weekday', idCalendar:'<?=std::gets("param1")?>'}, function(data) {
//							if(data == 'S_OK') $('#fullcalendar').fullCalendar('refetchEvents');
//							else p.page.alert(data, 5000);
//						});
//						$('#dialog').dialog('close');
//					}
//				},
				all:{
					text:'ganzes Ereignis löschen',
					click:function() {
						$.post('std.event.delete.req', {id:id, day:start.toISOString(), delete:'all', idCalendar:'<?=std::gets("param1")?>', idGSync:$('#calendar').attr('data-gsync')}, function(data) {
							if(data == 'S_OK') $('#fullcalendar').fullCalendar('refetchEvents');
							else p.page.alert(data, 5000);
						});
						$('#dialog').dialog('close');
					}
				},
//				from:{
//					text:'Alle löschen',
//					click:function() {
//						$.post('std.event.delete.req', {id:id, day:start.toISOString(), delete:'from'}, function(data) {
//							if(data == 'S_OK') $('#fullcalendar').fullCalendar('refetchEvents');
//							else p.page.alert(data, 5000);
//						});
//						$('#dialog').dialog('close');
//					}
//				},
				ok:{
					text:'speichern',
					click:function() {
						var update = $('.update').val();
						var EventData = {
							startval: $('#dialog').find('.startvalue').val(),
							starth: $('#dialog').find('.starth').val(),
							startm: $('#dialog').find('.startm').val(),
							summary: $('#dialog').find('.summary').val()
						};
						if($('.nostopevent').hasClass('checked')) {
							EventData['nostopevent'] = 'true';
						} else {
							EventData['endval'] = $('#dialog').find('.endvalue').val();
							EventData['endh'] = $('#dialog').find('.endh').val();
							EventData['endm'] = $('#dialog').find('.endm').val();
						}
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
						var obj = {
							'freq': $('.freq').val()
						};
						if ($('.repeatbox').hasClass('checked')) {
							obj['norepeat'] = 'true';
						} else {
							obj['norepeat'] = 'false';
						}
						if($('.intervall').val() > 1) obj['intervall'] = $('.intervall').val();
						if($('.freq').val() == 'weekly') {
							obj['byday'] = [];
							$('.byday span').each(function() {
								if($(this).hasClass('checked')) obj['byday'].push($(this).attr('data-day'));
							});
						}
						if($('.until').hasClass('checked')) obj['until'] = $('.until input').val();
						if($('.count').hasClass('checked')) obj['count'] = $('.count input').val();

						$.post('std.event.updaterrule.req', {rrule:obj, id:id, day:start.toISOString(), update:update, EventData:EventData, idCalendar:'<?=std::gets("param1")?>', idGSync:$('#calendar').attr('data-gsync'), errinerungen:getErrinerungen()}, function(data) {
							if(data == 'S_OK') $('#fullcalendar').fullCalendar('refetchEvents');
							else p.page.alert(data, 5000);
						});
						$('#dialog').dialog('close');
					}
				}
			}
		}).find('.datepicker').datepicker({
			monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
			dayNamesMin: ['So','Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			firstDay: 1,
			dateFormat: 'dd.mm.yy'
		});
		$.post('std.event.geterrinerungen.req', {eventid:id, idCalendar:'<?=std::gets("param1")?>'}, function(data) {
			$(data).insertBefore('.tr-add-errinerung');
		});
	});
}
function editSchedulenoPopup(event) {
	var start = event.start.format('HH:mm:ss');
	var end = event.end.format('HH:mm:ss');
	if(end == '00:00:00') end = '23:59:59';
	$.post('std.event.updatebydrop.req', {start:start, end:end, idevent:event.id, idCalendar:'<?=std::gets("param1")?>', idGSync:$('#calendar').attr('data-gsync')}, function(data) {
		if(data != 'S_OK') p.page.alert(data, 5000);
	});
}
function getErrinerungen(){
	var errinerungen = {
		length : $('#dialog').find('.errinerung').length
	};
	var index = 0;
	$('#dialog').find('.errinerung').each(function(){
		errinerungen["szene"+index] = $(this).find('#szenen').first().val();
		errinerungen["minuten"+index] = $(this).find('#minuten').first().val();
		index++;
	});
	return errinerungen;
}