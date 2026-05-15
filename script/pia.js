/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 27.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 751                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia.js 751 2025-10-13 06:14:37Z                          $ #
//#                                                                                 #
//###################################################################################
use system\std
?> pia */
//<? require_once('script/system/websockets.js') ?>
//<? require_once('script/system/wpNeoPixel.js') ?>
//<? require_once('script/system/wpCwWw.js') ?>
//<? require_once('script/system/wpRGB.js') ?>
ws.logEnabled = true;
p.page.load = function() {
	var NeoPixel = new wpNeoPixel('pia', 'KZ_NP');
	var bild = new wpRGB('pia', 'KZ_Bild');
	var kette = new wpCwWw('pia', 'KZ_KE');
	var hasi = new wpCwWw('pia', 'KZ_Hasi');
	$('#pia').on('click', '.ps-input.ps-operable.zp', function() {
		var dpType = 'VT_BOOL';
		if($(this).attr('data-bm') == 'KZ_ZP_RM') dpType = 'SW';
		var point = $(this).attr('data-zp');
		var unit = 'True:Normalbetrieb;False:Absenkbetrieb;';
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
	$('#pia').on('click', '.pa-Analog.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		p.popup.title = 'Ventilbedienung';
		p.popup.AnalogSchieberegler(headline, id);
	});
	$('.AllesAus').click(function() {
		wpNeoPixel.setOff();
		hasi.setOff();
		kette.setOff();
		bild.setOff();
		$.post('std.shellycom.set-relay.req', {ShellyIP: '172.17.80.160', turn: 'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP: '172.17.80.161', turn: 'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP: '172.17.80.162', turn: 'false'});
		const params = {
			name: 'kinderzimmer',
			button: 'aus'
		}
		$.post('tvremote.button.req', params, function(data) {
			console.log(data.message);
		}, 'json');
	});
	$('.AllesSchlafen').click(function() {
		//NeoPixel.setColor(75, 5, 0);
		NeoPixel.setOff();
		hasi.setBrightness(0, 1);
		kette.setBrightness(10, 0);
		const h = 0;
		const m = 30;
		var sec = (h * 60 * 60) + (m * 60);
		//NeoPixel.setSleep(sec);
		hasi.setSleep(sec);
		kette.setSleep(sec);
		bild.setOff();
		$.post('std.shellycom.set-relay.req', {ShellyIP: '172.17.80.160', turn: 'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP: '172.17.80.161', turn: 'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP: '172.17.80.162', turn: 'false'});
	});
	$('.setAllSleep').click(function() {
		var sec = ($('.AllSleepHour').text() * 60 * 60) + ($('.AllSleepMinute').text() * 60);
		NeoPixel.setSleep(sec);
		hasi.setSleep(sec);
		kette.setSleep(sec);
		bild.setSleep(sec);
		$.post('std.shellycom.set-relay-timer.req', {ShellyIP: '172.17.80.160', sleep: sec});
		$.post('std.shellycom.set-relay-timer.req', {ShellyIP: '172.17.80.161', sleep: sec});
		$.post('std.shellycom.set-relay-timer.req', {ShellyIP: '172.17.80.162', sleep: sec});
	});
	$('.AllSleepHourSlider').slider({
		min: 0,
		max: 2,
		orientation: 'vertical',
		range: 'min',
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $('.AllSleepHour');
			$(TheSpan).text(TheValue);
		}
	});
	$('.AllSleepMinuteSlider').slider({
		min: 0,
		max: 59,
		step: 5,
		orientation: 'vertical',
		range: 'min',
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $('.AllSleepMinute');
			$(TheSpan).text(TheValue);
		}
	});
	ws.connect();
	p.getValues();
};
