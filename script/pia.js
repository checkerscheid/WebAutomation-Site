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
//# Revision     : $Rev:: 689                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia.js 689 2024-08-01 01:58:39Z                          $ #
//#                                                                                 #
//###################################################################################
use system\std
?> pia */
//<? require_once('script/system/websockets.js') ?>
ws.logEnabled = true;
var canvas;
p.page.load = function() {
	canvas = document.getElementById('picker');
	getColorPicker();
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
	$('.setNeoPixelDemo').on('click', function() {
		var that = $(this);
		const demo = {
			ip: $('#storedIP').attr('data-ip')
		};
		$.post('std.d1mini.NeoPixelDemo.req', demo, function(data) {
		}, 'json');
	});
	$('.setNeoPixelEffect').on('click', function() {
		var that = $(this);
		const effect = {
			ip: $('#storedIP').attr('data-ip'),
			id: $(that).attr('data-id')
		};
		$.post('std.d1mini.NeoPixelEffect.req', effect, function(data) {
		}, 'json');
	});
	$('.setNeoPixelSimple').on('click', function() {
		var that = $(this);
		const simple = {
			ip: $('#storedIP').attr('data-ip'),
			r: $('#NeoPixelR').val(),
			g: $('#NeoPixelG').val(),
			b: $('#NeoPixelB').val()
		};
		$.post('std.d1mini.NeoPixelSimple.req', simple, function(data) {
		}, 'json');
	});
	$('.setNeoPixelPia').on('click', function() {
		const pia = {
			ip: $('#storedIP').attr('data-ip')
		};
		$.post('std.d1mini.NeoPixelPia.req', pia, function(data) {
		}, 'json');
	});
	$('.setNeoPixelAus').on('click', function() {
		var that = $(this);
		const simple = {
			ip: $('#storedIP').attr('data-ip'),
			r: 0,
			g: 0,
			b: 0
		};
		$.post('std.d1mini.NeoPixelSimple.req', simple, function(data) {
		}, 'json');
	});
	$('.setSleepTimer').on('click', function() {
		var sec = ($('.sleepHour').text() * 60 * 60) + ($('.sleepMinute').text() * 60);
		const sleep = {
			ip: $('#storedIP').attr('data-ip'),
			sleep: sec
		};
		$.post('std.d1mini.NeoPixelSleep.req', sleep, function(data) {
		}, 'json');
	});
	$('.colorBorder').on('click', function() {
		var that = $(this);
		const led = {
			ip: $('#storedIP').attr('data-ip'),
			pixel: $(this).attr('data-led'),
			r: $('#NeoPixelR').val(),
			g: $('#NeoPixelG').val(),
			b: $('#NeoPixelB').val()
		};
		$(that).css('backgroundColor', 'rgb(' + led.r + ', ' + led.g + ', ' + led.b + ')');
		$.post('std.d1mini.NeoPixel.req', led, function(data) {
		}, 'json');
	});
	$('.NeoPixelColor').on('change', function() {
		changeColorPreview();
	});
	ws.connect();
	p.getValues();
};
function changeColorPreview() {
	const led = {
		r: $('#NeoPixelR').val(),
		g: $('#NeoPixelG').val(),
		b: $('#NeoPixelB').val()
	};
	$('.colorpreview').css('backgroundColor', 'rgb(' + led.r + ', ' + led.g + ', ' + led.b + ')');
}
function getColorPicker() {
	var ctx = canvas.getContext('2d');

	var image = new Image();
	image.onload = function () {
		ctx.drawImage(image, 0, 0, image.width, image.height);
	};
	image.src = 'images/layout/ColorWheel.png';
	var canvasClicked = false;
	$('#picker').mousemove(function(e) {
		$('#rVal').addClass('WriteOnly');
		$('#gVal').addClass('WriteOnly');
		$('#bVal').addClass('WriteOnly');
		
		if(!canvasClicked) {
			var canvasOffset = $(canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			
			var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				$('#rVal').slider('option', 'value', Math.floor(pixel[0] / 2.55));
				$('#gVal').slider('option', 'value', Math.floor(pixel[1] / 2.55));
				$('#bVal').slider('option', 'value', Math.floor(pixel[2] / 2.55));
				$('#NeoPixelR').val(pixel[0]);
				$('#NeoPixelG').val(pixel[1]);
				$('#NeoPixelB').val(pixel[2]);
				changeColorPreview();
			}
		}
	}).mouseout(function() {
		canvasClicked = false;
		$('#rVal').removeClass('WriteOnly');
		$('#gVal').removeClass('WriteOnly');
		$('#bVal').removeClass('WriteOnly');
	}).click(function(e) {
		canvasClicked = true;
		var canvasOffset = $(canvas).offset();
		var canvasX = Math.floor(e.pageX - canvasOffset.left);
		var canvasY = Math.floor(e.pageY - canvasOffset.top);
		
		var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
		var pixel = imageData.data;
		
		if((pixel[0] + pixel[1] + pixel[2]) > 0) {
			var cr = Math.floor(pixel[0] / 2.55);
			p.log.write('rot: ' + cr);
			var cg = Math.floor(pixel[1] / 2.55);
			p.log.write('gruen: ' + cg);
			var cb = Math.floor(pixel[2] / 2.55);
			p.log.write('blau: ' + cb);
			//p.automation.writeMulti([rot + '_SW', gruen + '_SW', blau + '_SW'], [cr, cg, cb]);
			$('#rVal').removeClass('WriteOnly');
			$('#gVal').removeClass('WriteOnly');
			$('#bVal').removeClass('WriteOnly');
		}
	});
	$('.rgb-slider').slider({
		min: 0,
		max: 100,
		range: 'min',
		start: function() {
			$(this).addClass('WriteOnly');
			$(this).find('a').append('<span class="toleft"></span>');
		},
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $(this).find('span.toleft');
			$(TheSpan).text(TheValue);
		},
		stop: function(event, ui) {
			if($(this).attr('id') == 'rVal') $('#NeoPixelR').val(Math.floor(ui.value * 2.55));
			if($(this).attr('id') == 'gVal') $('#NeoPixelG').val(Math.floor(ui.value * 2.55));
			if($(this).attr('id') == 'bVal') $('#NeoPixelB').val(Math.floor(ui.value * 2.55));
			if($(this).attr('id') == 'brVal') {
				$('#showBrVal').text(ui.value);
				const br = {
					ip: $('#storedIP').attr('data-ip'),
					brightness: ui.value
				};
				$.post('std.d1mini.NeoPixelBrightness.req', br, function(data) {
				}, 'json');
			}
			if($(this).attr('id') == 'wwVal') {
				$('#showWWVal').text(ui.value);
				const ww = {
					ip: $('#storedIP').attr('data-ip'),
					ww: ui.value
				};
				$.post('std.d1mini.NeoPixelWW.req', ww, function(data) {
				}, 'json');
			}
			if($(this).attr('id') == 'cwVal') {
				$('#showCWVal').text(ui.value);
				const cw = {
					ip: $('#storedIP').attr('data-ip'),
					cw: ui.value
				};
				$.post('std.d1mini.NeoPixelCW.req', cw, function(data) {
				}, 'json');
			}
			changeColorPreview();
			
			//p.automation.write($(this).attr('data-value'), ui.value);
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
	$('.sleepHourSlider').slider({
		min: 0,
		max: 2,
		orientation: 'vertical',
		range: 'min',
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $('.sleepHour');
			$(TheSpan).text(TheValue);
		}
	});
	$('.sleepMinuteSlider').slider({
		min: 0,
		max: 59,
		step: 5,
		orientation: 'vertical',
		range: 'min',
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $('.sleepMinute');
			$(TheSpan).text(TheValue);
		}
	});
	$('#rVal').slider('option', 'value', $('#NeoPixelR').val());
	$('#gVal').slider('option', 'value', $('#NeoPixelG').val());
	$('#bVal').slider('option', 'value', $('#NeoPixelB').val());
	$('#brVal').slider('option', 'value', $('#showBrVal').text());
	$('#wwVal').slider('option', 'value', $('#showWWVal').text());
	$('#cwVal').slider('option', 'value', $('#showCWVal').text());
}
