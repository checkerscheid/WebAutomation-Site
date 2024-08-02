/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 01.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 691                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpNeoPixel.js 691 2024-08-02 00:27:24Z                   $ #
//#                                                                                 #
//###################################################################################
?> wpNeoPixel */

var wpNeoPixel = {
	canvas: null,
	ctx: null,
	image: null,
	ip: null,
	target:null,
	canvasClicked: false,
	Init: function(target) {
		let returns = false;
		wpNeoPixel.ip = $('.wpNeoPixel').attr('data-ip');
		wpNeoPixel.target = target;
		wpNeoPixel.canvas = document.getElementById('picker');
		if(typeof(wpNeoPixel.canvas) != 'undefined' && wpNeoPixel.canvas != null) {
			wpNeoPixel.ctx = wpNeoPixel.canvas.getContext('2d');
			wpNeoPixel.image = new Image();
			wpNeoPixel.image.onload = function () {
				wpNeoPixel.ctx.drawImage(wpNeoPixel.image, 0, 0, wpNeoPixel.image.width, wpNeoPixel.image.height);
			};
			wpNeoPixel.image.src = 'images/layout/ColorWheel.png';
			wpNeoPixel.Register();
			$('#rVal').slider('option', 'value', $('#NeoPixelR').val());
			$('#gVal').slider('option', 'value', $('#NeoPixelG').val());
			$('#bVal').slider('option', 'value', $('#NeoPixelB').val());
			$('#brVal').slider('option', 'value', $('#showBrVal').text());
			$('#wwVal').slider('option', 'value', $('#showWWVal').text());
			$('#cwVal').slider('option', 'value', $('#showCWVal').text());
			returns = true;
		}
		return returns;
	},
	Register: function() {
		$('.setNeoPixelDemo').on('click', function() {
			const demo = {
				ip: wpNeoPixel.ip
			};
			$.post(wpNeoPixel.target + '.NeoPixelDemo.req', demo, function(data) {
			}, 'json');
		});
		$('.setNeoPixelEffect').on('click', function() {
			const effect = {
				ip: wpNeoPixel.ip,
				id: $(this).attr('data-id')
			};
			$.post(wpNeoPixel.target + '.NeoPixelEffect.req', effect, function(data) {
			}, 'json');
		});
		$('.setNeoPixelSimple').on('click', function() {
			const simple = {
				ip: wpNeoPixel.ip,
				r: $('.NeoPixelR').val(),
				g: $('.NeoPixelG').val(),
				b: $('.NeoPixelB').val()
			};
			$.post(wpNeoPixel.target + '.NeoPixelSimple.req', simple, function(data) {
			}, 'json');
		});
		$('.setNeoPixelPia').on('click', function() {
			const pia = {
				ip: wpNeoPixel.ip
			};
			$.post(wpNeoPixel.target + '.NeoPixelPia.req', pia, function(data) {
			}, 'json');
		});
		$('.setNeoPixelAus').on('click', function() {
			const simple = {
				ip: wpNeoPixel.ip,
				r: 0,
				g: 0,
				b: 0
			};
			$.post(wpNeoPixel.target + '.NeoPixelSimple.req', simple, function(data) {
			}, 'json');
		});
		$('.setSleepTimer').on('click', function() {
			var sec = ($('.sleepHour').text() * 60 * 60) + ($('.sleepMinute').text() * 60);
			const sleep = {
				ip: wpNeoPixel.ip,
				sleep: sec
			};
			$.post(wpNeoPixel.target + '.NeoPixelSleep.req', sleep, function(data) {
			}, 'json');
		});
		$('.colorBorder').on('click', function() {
			const led = {
				ip: wpNeoPixel.ip,
				pixel: $(this).attr('data-led'),
				r: $('.NeoPixelR').val(),
				g: $('.NeoPixelG').val(),
				b: $('.NeoPixelB').val()
			};
			$(this).css('backgroundColor', 'rgb(' + led.r + ', ' + led.g + ', ' + led.b + ')');
			$.post(wpNeoPixel.target + '.NeoPixel.req', led, function(data) {
			}, 'json');
		});
		$('.NeoPixelColor').on('change', function() {
			wpNeoPixel.changeColorPreview();
		});
		$('#picker').mousemove(function(e) {
			if(!wpNeoPixel.canvasClicked) {
				var canvasOffset = $(wpNeoPixel.canvas).offset();
				var canvasX = Math.floor(e.pageX - canvasOffset.left);
				var canvasY = Math.floor(e.pageY - canvasOffset.top);
				
				var imageData = wpNeoPixel.ctx.getImageData(canvasX, canvasY, 1, 1);
				var pixel = imageData.data;
				if((pixel[0] + pixel[1] + pixel[2]) > 0) {
					$('.rVal').slider('option', 'value', Math.floor(pixel[0] / 2.55));
					$('.gVal').slider('option', 'value', Math.floor(pixel[1] / 2.55));
					$('.bVal').slider('option', 'value', Math.floor(pixel[2] / 2.55));
					$('.NeoPixelR').val(pixel[0]);
					$('.NeoPixelG').val(pixel[1]);
					$('.NeoPixelB').val(pixel[2]);
					wpNeoPixel.changeColorPreview();
				}
			}
		}).mouseout(function() {
			wpNeoPixel.canvasClicked = false;
		}).click(function(e) {
			wpNeoPixel.canvasClicked = true;
			var canvasOffset = $(wpNeoPixel.canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			
			var imageData = wpNeoPixel.ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				var cr = Math.floor(pixel[0] / 2.55);
				var cg = Math.floor(pixel[1] / 2.55);
				var cb = Math.floor(pixel[2] / 2.55);
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
				if($(this).hasClass('rVal')) $('.NeoPixelR').val(Math.floor(ui.value * 2.55));
				if($(this).hasClass('gVal')) $('.NeoPixelG').val(Math.floor(ui.value * 2.55));
				if($(this).hasClass('bVal')) $('.NeoPixelB').val(Math.floor(ui.value * 2.55));
				if($(this).hasClass('brVal')) {
					$('.showBrVal').text(ui.value);
					const br = {
						ip: wpNeoPixel.ip,
						brightness: ui.value
					};
					$.post(wpNeoPixel.target + '.NeoPixelBrightness.req', br, function(data) {
					}, 'json');
				}
				if($(this).hasClass('wwVal')) {
					$('.showWWVal').text(ui.value);
					const ww = {
						ip: wpNeoPixel.ip,
						ww: ui.value
					};
					$.post(wpNeoPixel.target + '.NeoPixelWW.req', ww, function(data) {
					}, 'json');
				}
				if($(this).hasClass('cwVal')) {
					$('.showCWVal').text(ui.value);
					const cw = {
						ip: wpNeoPixel.ip,
						cw: ui.value
					};
					$.post(wpNeoPixel.target + '.NeoPixelCW.req', cw, function(data) {
					}, 'json');
				}
				wpNeoPixel.changeColorPreview();
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
	},
	changeColorPreview: function() {
		const led = {
			r: $('.NeoPixelR').val(),
			g: $('.NeoPixelG').val(),
			b: $('.NeoPixelB').val()
		};
		$('.colorpreview').css('backgroundColor', 'rgb(' + led.r + ', ' + led.g + ', ' + led.b + ')');
	}
};
