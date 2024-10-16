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
p.page.load = function() {
	$('.setNeoPixelOff').on('click', function() {
		var ip = $(this).attr('data-ip');
		if($(this).hasClass('ps-yellow')) {
			$.post('uebersicht.setNeoPixelOff.req', {ip:ip});
		} else {
			$.post('uebersicht.setNeoPixelOn.req', {ip:ip});
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
	// p.getValues();
	ws.connect();
};
