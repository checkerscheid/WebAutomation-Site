/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.12.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 539                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: calendar.js 539 2023-10-19 22:23:43Z checker           $ #
//#                                                                                 #
//###################################################################################
?> calendar */

var wpCalendar = {};
var lastclicked;
var lastid;

p.page.load = function() {
	$('#calendar').on('click', '.ps-checkbox', function() {
		var calendarid = $(this).parents('li').attr('data-calendar');
		switch($(this).text()) {
			case 'permanent':
				if($(this).hasClass('checked')) {
					$.post('std.calendaredit.unsetpermanent.req', {id:calendarid}, function(data) {
						if(data != 'S_OK') p.page.alert(data);
					});
				} else {
					$.post('std.calendaredit.setpermanent.req', {id:calendarid}, function(data) {
						if(data != 'S_OK') p.page.alert(data);
					});
				}
				break;
			case 'Aktiv':
				var opcid = $(this).parents('li').attr('data-opcitem');
				if($(this).hasClass('checked')) {
					$.post('std.calendarcfg.unsetactive.req', {id:calendarid,opcid:opcid}, function(data) {
						if(data != 'S_OK') {
							p.page.alert(data);
						} else {
							$('[data-calendars]').html('');
							$('[data-group]').removeClass('open');
							$(parent).addClass('loading');
							$.post('std.calendar.req', {id:lastid}, function(data) {
								$(lastclicked).removeClass('loading').addClass('open');
								$('[data-calendars=' + lastid + ']').html(data);
								getcalendarDetails();
							});
						}
					});
				} else {
					$.post('std.calendarcfg.setactive.req', {id:calendarid,opcid:opcid}, function(data) {
						if(data != 'S_OK') {
							p.page.alert(data);
						} else {
							$('[data-calendars]').html('');
							$('[data-group]').removeClass('open');
							$(parent).addClass('loading');
							$.post('std.calendar.req', {id:lastid}, function(data) {
								$(lastclicked).removeClass('loading').addClass('open');
								$('[data-calendars=' + lastid + ']').html(data);
								getcalendarDetails();
							});
						}
					});
				}
				break;
		}
	});
	$('#calendar').on('click', '.ps-tree-parent', function() {
		lastclicked = $(this);
		lastid = $(this).attr('data-group');
		if($(lastclicked).hasClass('open')) {
			$('[data-calendars]').html('');
			$('[data-group]').removeClass('open');
		} else {
			$('[data-calendars]').html('');
			$('[data-group]').removeClass('open');
			$(lastclicked).addClass('loading');
			$.post('std.calendar.req', {id:lastid}, function(data) {
				$(lastclicked).removeClass('loading').addClass('open');
				$('[data-calendars=' + lastid + ']').html(data);
				//getcalendarDetails();
			});
		}
	});
	p.getValues();
};

function getcalendarDetails() {
	wpCalendar = {};
	$.get('std.request.calendardetails.req', function(data) {
		for(var zp in wpCalendar) {
			var unit = (wpCalendar[zp].unit == '') ? '' : ' ' + wpCalendar[zp].unit;
			$('li[data-opcitem=' + zp + ']').find('.thistime').text('aktuelle Zeit: ' + wpCalendar[zp].thisTime + ',');
			$('li[data-opcitem=' + zp + ']').find('.thisvalue').text('aktuelle Zeitprogramm Vorgabe: ' + wpCalendar[zp].thisValue + unit);
			$('li[data-opcitem=' + zp + ']').find('.nexttime').text('nächste Zeit: ' + wpCalendar[zp].nextTime + ',');
			$('li[data-opcitem=' + zp + ']').find('.nextvalue').text('nächste Zeitprogramm Vorgabe: ' + wpCalendar[zp].nextValue + unit);
		}
	}, 'script');
}
