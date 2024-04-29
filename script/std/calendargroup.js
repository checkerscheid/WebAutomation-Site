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
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: calendargroup.js 505 2021-05-07 21:55:45Z checker        $ #
//#                                                                                 #
//###################################################################################
?> schedulegroup */
var color = [
	'#5882FA',
	'#58FA82',
	'#FA5858',
	'#F4FA58',
	'#F8D3F7',
	'#F79F81',
	'#FF00AE'
];
var scheduleid = [];
var schedulename = {};
var data = [];
p.page.load = function() {
	$('div.ps-hidden input').each(function() {
		scheduleid.push($(this).val());
		schedulename[$(this).val()] = $(this).attr('data-name');
	});
	$('#header .Logo').css({marginTop:-60, opacity:0}).show();
	$('#header .Logo').delay(500).animate({marginTop:0, opacity:1}, 1500);

	var data = {
		firstDay: 1,
		theme: true,
		allDaySlot: false,
		slotDuration: '00:30:00',
		defaultView: 'agendaWeek',
		height: $('.pagecontent ').height() - 45,
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
		editable: false,
		allDayDefault: false,
		selectOverlap: false,
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
		eventClick: function(event) {
			var calid = event.source.ajaxSettings.data.id_calendar;
			location.href = 'std.calendaredit.' + calid + '.htm';
		},
		eventRender: function(event, element) {
			element.find('.fc-title').html(element.find('.fc-title').text());
			element.find('.fc-list-item-title a').html(element.find('.fc-list-item-title a').text());
		}
	};
	var eventSources = [];
	for(var i = 0; i < scheduleid.length; i++) {
		eventSources.push({
			url: 'std.event.getevents.req',
			type: 'POST',
			data: {
				id_calendar: scheduleid[i]
			},
			error: function() {
				alert('there was an error while fetching events!');
			},
			color: color[i%color.length],
			className: 'calendar' + scheduleid[i]
		});
		$('#legende').append('<a style="background-color:' + color[i%color.length] + '" href="std.calendaredit.' + scheduleid[i] + '.htm" class="hoverCalendar" data-calendar="' + scheduleid[i] + '">' + schedulename[scheduleid[i]] + '</a>');
	}
	data['eventSources'] = eventSources;
	$('#fullcalendar').fullCalendar(data);
	$('#calendargroup')
		.on('mouseover', '.hoverCalendar', function() {
			var caldata = $(this).attr('data-calendar');
			$('.calendar' + caldata).addClass('CalendarEventBold');
		})
		.on('mouseout', '.hoverCalendar', function() {
			$('.CalendarEventBold').removeClass('CalendarEventBold');
		});
	p.getValues();
};