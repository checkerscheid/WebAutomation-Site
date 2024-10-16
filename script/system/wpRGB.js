/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 11.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 700                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpRGB.js 700 2024-10-14 00:13:37Z                        $ #
//#                                                                                 #
//###################################################################################
?> wpRGB */

var wpRGB = {
	canvas: null,
	ctx: null,
	image: null,
	ip: null,
	target:null,
	Init: function(target) {
		let returns = false;
		wpRGB.ip = $('.wpRGB').attr('data-ip');
		wpRGB.target = target;
		wpRGB.canvas = document.getElementById('RGBpicker');
		if(typeof(wpRGB.canvas) != 'undefined' && wpRGB.canvas != null) {
			wpRGB.ctx = wpRGB.canvas.getContext('2d');
			wpRGB.image = new Image();
			wpRGB.image.onload = function () {
				wpRGB.ctx.drawImage(wpRGB.image, 0, 0, wpRGB.image.width, wpRGB.image.height);
			};
			wpRGB.image.src = 'images/layout/ColorWheel.png';
			wpRGB.Register();
			wpRGB.getSavedColor();
			$('.RGBSliderR').slider('option', 'value', $('.RGBColorR').val());
			$('.RGBSliderG').slider('option', 'value', $('.RGBColorG').val());
			$('.RGBSliderB').slider('option', 'value', $('.RGBColorB').val());
			$('.RGBSliderBr').slider('option', 'value', $('.RGBColorBr').text());
			returns = true;
		}
		return returns;
	},
	Register: function() {
		$('.setRGBOn').on('click', function() {
			const on = {
				ip: wpRGB.ip,
				turn: 'true'
			};
			$.post(wpRGB.target + '.RGBTurn.req', on, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.setRGBColor').on('click', function() {
			const on = {
				ip: wpRGB.ip,
				r: $('.RGBColorR').val(),
				g: $('.RGBColorG').val(),
				b: $('.RGBColorB').val()
			};
			$.post(wpRGB.target + '.RGBColor.req', on, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.setRGBOff').on('click', function() {
			wpRGB.setOff();
		});
		$('.RGBSavedColor').on('click', '.colorBorderFav', function() {
			const led = {
				ip: wpRGB.ip,
				r: $(this).attr('data-r'),
				g: $(this).attr('data-g'),
				b: $(this).attr('data-b')
			};
			wpRGB.changeColorSlider(led.r, led.g, led.b);
			wpRGB.changeColorPreview(led.r, led.g, led.b);
			$.post(wpRGB.target + '.RGBColor.req', led, function(data) {
			}, 'json');
			wpRGB.getSavedColor();
		});
		$('#RGBpicker').mousemove(function(e) {
			var canvasOffset = $(wpRGB.canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			var imageData = wpRGB.ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				var r = pixel[0];
				var g = pixel[1];
				var b = pixel[2];
				wpRGB.changeColorSlider(r, g, b);
				wpRGB.changeColorPreview(r, g, b);
			}
		}).click(function(e) {
			var canvasOffset = $(wpRGB.canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			var imageData = wpRGB.ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				var r = pixel[0];
				var g = pixel[1];
				var b = pixel[2];
				wpRGB.changeColorSlider(r, g, b);
				wpRGB.changeColorPreview(r, g, b);
				wpRGB.getSavedColor();
				$('.RGBColorR').val(r);
				$('.RGBColorG').val(g);
				$('.RGBColorB').val(b);
				const color = {
					ip: wpRGB.ip,
					r: r,
					g: g,
					b: b
				};
				$.post(wpRGB.target + '.RGBColor.req', color, function(data) {
				}, 'json');
				wpRGB.getSavedColor();
			}
		});
		$('.RGBSliderR, .RGBSliderG, .RGBSliderB').slider({
			min: 0,
			max: 255,
			range: 'min',
			start: function() {
				$(this).addClass('WriteOnly');
				$(this).find('a').append('<span class="toleft"></span>');
			},
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $(this).find('span.toleft');
				$(TheSpan).text(TheValue);
				if($(this).hasClass('RGBSliderR') || $(this).hasClass('RGBSliderG') || $(this).hasClass('RGBSliderB')) {
					if($(this).hasClass('RGBSliderR')) $('.RGBColorR').val(ui.value);
					if($(this).hasClass('RGBSliderG')) $('.RGBColorG').val(ui.value);
					if($(this).hasClass('RGBSliderB')) $('.RGBColorB').val(ui.value);
					var r = $('.RGBColorR').val();
					var g = $('.RGBColorG').val();
					var b = $('.RGBColorB').val();
					wpRGB.changeColorPreview(r, g, b);
				}
			},
			stop: function(event, ui) {
				if(($(this).hasClass('RGBSliderR') || $(this).hasClass('RGBSliderG') || $(this).hasClass('RGBSliderB')) && $(this).hasClass('WriteOnly')) {
					if($(this).hasClass('RGBSliderR')) $('.RGBColorR').val(ui.value);
					if($(this).hasClass('RGBSliderG')) $('.RGBColorG').val(ui.value);
					if($(this).hasClass('RGBSliderB')) $('.RGBColorB').val(ui.value);
					const slider = {
						ip: wpRGB.ip,
						r: $('.RGBColorR').val(),
						g: $('.RGBColorG').val(),
						b: $('.RGBColorB').val()
					};
					wpRGB.changeColorPreview(slider.r, slider.g, slider.b);
					$.post(wpRGB.target + '.RGBColor.req', slider, function(data) {
					}, 'json');
					wpRGB.getSavedColor();
				}
				if($(this).hasClass('RGBSliderBr')) {
					$('.RGBColorBr').text(ui.value);
					const br = {
						ip: wpRGB.ip,
						brightness: ui.value
					};
					$.post(wpRGB.target + '.RGBBrightness.req', br, function(data) {
					}, 'json');
				}
				wpRGB.changeColorPreview();
				$(this).removeClass('WriteOnly').find('a').text('');
			}
		});
		$('.RGBSliderBr').slider({
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
				$('.RGBColorBr').text(ui.value);
				const br = {
					ip: wpRGB.ip,
					brightness: ui.value
				};
				$.post(wpRGB.target + '.RGBBrightness.req', br, function(data) {
				}, 'json');
				wpRGB.changeColorPreview();
				$(this).removeClass('WriteOnly').find('a').text('');
			}
		});
		$('.setRGBSleep').click(function() {
			var sec = ($('.RGBSleepHour').text() * 60 * 60) + ($('.RGBSleepMinute').text() * 60);
			wpRGB.setSleep(sec);
		});
		$('.RGBSleepHourSlider').slider({
			min: 0,
			max: 2,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.RGBSleepHour');
				$(TheSpan).text(TheValue);
			}
		});
		$('.RGBSleepMinuteSlider').slider({
			min: 0,
			max: 59,
			step: 5,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.RGBSleepMinute');
				$(TheSpan).text(TheValue);
			}
		});
	},
	changeColorPreview: function(r, g, b) {
		$('.RGBColorPreview').css('backgroundColor', 'rgb(' + r + ', ' + g + ', ' + b + ')');
	},
	changeColorSlider: function(r, g, b) {
		$('.RGBSliderR').slider('option', 'value', r);
		$('.RGBSliderG').slider('option', 'value', g);
		$('.RGBSliderB').slider('option', 'value', b);
	},
	getSavedColor: function() {
		$.get(wpRGB.target + '.getRGBSavedColor.req', function(data) {
			$('.RGBSavedColor').html(data);
		});
	},
	setOff: function() {
		const off = {
			ip: wpRGB.ip,
			turn: 'false'
		};
		$.post(wpRGB.target + '.RGBTurn.req', off, function(data) {
			console.log(data);
		}, 'json');
	},
	setSleep: function(sec) {
		const sleep = {
			ip: wpRGB.ip,
			sleep: sec
		};
		$.post(wpRGB.target + '.RGBSleep.req', sleep, function(data) {
		}, 'json');
	}
};
