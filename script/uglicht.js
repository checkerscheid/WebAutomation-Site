/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 31.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 701                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uglicht.js 701 2024-10-14 00:14:32Z                      $ #
//#                                                                                 #
//###################################################################################
?> uglicht */
//<? require_once('system/websockets.js') ?>

ws.logEnabled = true;
var getdimmervalue = true;
var configwithtimeout = [];

p.page.load = function() {
	$('#uglicht').on('click', '.clicklicht', function() {
		var write = $(this).attr('data-taster');
		p.automation.write(write, 'True');
	});
	$('#uglicht').on('click', '.setNeoPixelOff', function() {
		var ip = $(this).attr('data-ip');
		if($(this).hasClass('ps-yellow')) {
			$.post('uebersicht.setNeoPixelOff.req', {ip:ip});
		} else {
			$.post('uebersicht.setNeoPixelOn.req', {ip:ip});
		}
	});
	$('#uglicht').on('click', '.RU_Auto', function() {
		const setAuto = {
			ip: $(this).attr('data-ip'),
			licht: $(this).attr('data-lichtip')
		};
		$.post('uebersicht.setAuto.req', setAuto, null, 'json');
	});
	$('#uglicht').on('click', '.RU_Manual', function() {
		const setManual = {
			ip: $(this).attr('data-ip'),
			licht: $(this).attr('data-lichtip')
		};
		$.post('uebersicht.setManual.req', setManual, null, 'json');
	});
	$('.shelly-dimmer').slider({
		min: 0,
		max: 100,
		step: 5,
		start: function() {
			$(this).addClass('WriteOnly');
			$(this).find('a').append('<span class="toleft">--</span>');
		},
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $(this).find('span.toleft');
			$(TheSpan).text(TheValue);
		},
		stop: function(event, ui) {
			var ip = $(this).attr('data-ip');
			$.post('std.shellycom.set-dimmer.req', {ShellyIP:ip, brightness:ui.value});
			$(this).find('.ui-slider-handle').attr('title', ui.value + ' %');
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
	$('.setNeoPixelOff').on('click', function() {
		var ip = $(this).attr('data-ip');
		if($(this).hasClass('ps-yellow')) {
			$.post('uebersicht.setNeoPixelOff.req', {ip:ip});
		} else {
			$.post('uebersicht.setNeoPixelOn.req', {ip:ip});
		}
	});
	$('.setCwWwOff').on('click', function() {
		var ip = $(this).attr('data-ip');
		if($(this).hasClass('ps-yellow')) {
			$.post('uebersicht.CwWwOff.req', {ip:ip});
		} else {
			$.post('uebersicht.CwWwOn.req', {ip:ip});
		}
	});
	$('.brightness-slider').slider({
		min: 0,
		max: 255,
		step: 12.75,
		start: function() {
			$(this).addClass('WriteOnly');
			$(this).find('a').append('<span class="toleft">--</span>');
		},
		slide: function(event, ui) {
			var TheValue = Math.round(ui.value / 2.55);
			var TheSpan = $(this).find('span.toleft');
			$(TheSpan).text(TheValue);
		},
		stop: function(event, ui) {
			var ip = $(this).attr('data-ip');
			$.post('uebersicht.NeoPixelBrightness.req', {ip:ip, brightness:ui.value});
			$(this).find('.ui-slider-handle').attr('title', ui.value + ' %');
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
	p.getValues();
	ws.connect();
	hastimeout();
	shellydimmer();
};
function hastimeout() {
	$('.ShellyDirect').each(function() {
		if($(this).parents('tr').hasClass('ps-hastimer'))
			configwithtimeout.push($(this));
	});
	remaintimeout();
}
function checkautooff() {
	$('.ShellyDirect').each(function() {
		var that = $(this);
		var ip = $(that).attr('data-ip');
		$.post('std.shellycom.get-timerisset.req', {ShellyIP:ip}, function(data) {
			if(data.auto_off > 0) {
				$(that).parents('tr').addClass('ps-hastimer');
				$(that).attr('data-autooff', data.autooff);
			}
		});
	});
}
function remaintimeout() {
	window.setInterval(function() {
		$(configwithtimeout).each(function() {
			if($(this).hasClass('bm') || $(this).hasClass('ps-yellow')) {
				var remaintime = $(this).parents('tr').find('span.time_remain').attr('data-remaintime');
				if(remaintime > 0 && remaintime%60 != 0) {
					remaintime--;
					var remaintext = Math.floor(remaintime/60) + ':' + (Math.floor(remaintime%60).toString().padStart(2, '0'));
					$(this).parents('tr').find('span.time_remain').text(remaintext).attr('data-remaintime', remaintime);
				} else {
					console.log('renew remaintime: ' + remaintime);
					shellytimeout($(this));
				}
			} else {
				$(this).parents('tr').find('span.time_remain').text('').attr('data-remaintime', 0);
			}
		});
	}, 1000);
}
function shellytimeout(that) {
	var remainspan = $(that).parents('tr').find('span.time_remain');
	var remaintime = 0;
	$.post('std.shellycom.get-out.req', {ShellyIP:$(that).attr('data-ip')}, function(data) {
		remaintime = data.timer_remaining;
		if(remaintime > 0) {
			var remaintext = Math.floor(remaintime/60) + ':' + (Math.floor(remaintime%60).toString().padStart(2, '0'));
			$(remainspan).text(remaintext).attr('data-remaintime', remaintime);
		}
	}, 'json');
}
function shellydimmer() {
	$('.shelly-dimmer').each(function() {
		var slider = $(this);
		var ip = $(this).attr('data-ip');
		$.post('std.shellycom.get-light-0.req', {ShellyIP:ip}, function(data) {
			if(!$(slider).hasClass('WriteOnly')) {
				$(slider).slider('value', data.brightness);
				$(slider).find('.ui-slider-handle').attr('title', data.brightness + ' %');
			}
		}, 'json');
	});
	window.setTimeout(function() { shellydimmer(); }, 30000);
}
