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
//# Revision     : $Rev:: 736                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpNeoPixel.js 736 2025-04-30 13:48:40Z                   $ #
//#                                                                                 #
//###################################################################################
?> wpNeoPixel */

var wpNeoPixel = {
	canvas: null,
	ctx: null,
	image: null,
	ip: null,
	target:null,
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
			wpNeoPixel.getSavedColor();
			$('.NeoPixelSliderR').slider('option', 'value', $('.NeoPixelR').val());
			$('.NeoPixelSliderG').slider('option', 'value', $('.NeoPixelG').val());
			$('.NeoPixelSliderB').slider('option', 'value', $('.NeoPixelB').val());
			$('.NeoPixelSliderBr').slider('option', 'value', $('.NeoPixelBr').text());
			$('.NeoPixelSliderWW').slider('option', 'value', $('.NeoPixelWW').text());
			$('.NeoPixelSliderCW').slider('option', 'value', $('.NeoPixelCW').text());
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
		$('.setNeoPixelOff').on('click', function() {
			wpNeoPixel.setOff();
		});
		$('.setNeoPixelOffRunner').on('click', function() {
			const off = {
				ip: wpNeoPixel.ip,
				steps: 2
			};
			$.post(wpNeoPixel.target + '.setNeoPixelOffRunner.req', off, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.setNeoPixelBorder').on('click', function() {
			const border = {
				ip: wpNeoPixel.ip
			};
			$.post(wpNeoPixel.target + '.setNeoPixelBorder.req', border, function(data) {
			}, 'json');
		});
		$('.MakeFavColor').click(function() {
			const led = {
				ip: wpNeoPixel.ip,
				r: $('.NeoPixelR').val(),
				g: $('.NeoPixelG').val(),
				b: $('.NeoPixelB').val(),
				fav: 'true'
			};
			$.post(wpNeoPixel.target + '.NeoPixelColor.req', led, function(data) {
			}, 'json');
			wpNeoPixel.getSavedColor();
		});
		$('.DeleteFavColor').click(function() {
			$.get(wpNeoPixel.target + '.NeoPixelDeleteFavColor.req', function(data) {
			}, 'json');
			wpNeoPixel.getSavedColor();
		});
		$('.setNeoPixelSleep').on('click', function() {
			var sec = ($('.NeoPixelSleepHour').text() * 60 * 60) + ($('.NeoPixelSleepMinute').text() * 60);
			wpNeoPixel.setSleep(sec);
		});
		$('.changeWW').on('click', function() {
			const change = { ip: wpNeoPixel.ip };
			$.post(wpNeoPixel.target + '.NeoPixelChangeWW.req', change, function(data) {
				if(data.erg == 'S_OK') {
					if(data.useWW) $('.changeWW').addClass('ps-green').removeClass('ps-grey');
					else $('.changeWW').addClass('ps-grey').removeClass('ps-green');
				}
			}, 'json');
		});
		$('.changeCW').on('click', function() {
			const change = { ip: wpNeoPixel.ip };
			$.post(wpNeoPixel.target + '.NeoPixelChangeCW.req', change, function(data) {
				if(data.erg == 'S_OK') {
					if(data.useCW) $('.changeCW').addClass('ps-green').removeClass('ps-grey');
					else $('.changeCW').addClass('ps-grey').removeClass('ps-green');
				}
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
			$('.NeoPixelR').val(led.r);
			$('.NeoPixelG').val(led.g);
			$('.NeoPixelB').val(led.b);
			$.post(wpNeoPixel.target + '.NeoPixel.req', led, function(data) {
			}, 'json');
		});
		$('.NeoPixelSavedColor').on('click', '.colorBorderFav', function() {
			const led = {
				ip: wpNeoPixel.ip,
				r: $(this).attr('data-r'),
				g: $(this).attr('data-g'),
				b: $(this).attr('data-b'),
				fav: $(this).hasClass('myFav') ? 'true' : 'false'
			};
			//wpNeoPixel.changeColorSlider(led.r, led.g, led.b);
			wpNeoPixel.changeColorPreview(led.r, led.g, led.b);
			$('.NeoPixelR').val(led.r);
			$('.NeoPixelG').val(led.g);
			$('.NeoPixelB').val(led.b);
			$.post(wpNeoPixel.target + '.NeoPixelColor.req', led, function(data) {
			}, 'json');
			wpNeoPixel.getSavedColor();
		});
		$('.NeoPixelColorManagement').on('click', function() {
			if($('.wpNeoPixel .colorManagement').hasClass('open')) {
				$('.wpNeoPixel .colorManagement').css({'height':'0px'}).removeClass('open');
			} else {
				$('.wpNeoPixel .colorManagement').css({'height':'auto'}).addClass('open');
			}
		});
		$('#picker').mousemove(function(e) {
			var canvasOffset = $(wpNeoPixel.canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			var imageData = wpNeoPixel.ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				var r = pixel[0];
				var g = pixel[1];
				var b = pixel[2];
				//wpNeoPixel.changeColorSlider(r, g, b);
				wpNeoPixel.changeColorPreview(r, g, b);
			}
		}).click(function(e) {
			var canvasOffset = $(wpNeoPixel.canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			var imageData = wpNeoPixel.ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				var r = pixel[0];
				var g = pixel[1];
				var b = pixel[2];
				//wpNeoPixel.changeColorSlider(r, g, b);
				wpNeoPixel.changeColorPreview(r, g, b);
				wpNeoPixel.getSavedColor();
				$('.NeoPixelR').val(r);
				$('.NeoPixelG').val(g);
				$('.NeoPixelB').val(b);
				const color = {
					ip: wpNeoPixel.ip,
					r: r,
					g: g,
					b: b
				};
				$.post(wpNeoPixel.target + '.NeoPixelColor.req', color, function(data) {
				}, 'json');
				wpNeoPixel.getSavedColor();
			}
		});
		$('.NeoPixelSlider').slider({
			min: 0,
			max: 255,
			range: 'min',
			start: function() {
				$(this).addClass('WriteOnly');
				$(this).find('a').append('<span class="toleft"></span>');
			},
			slide: function(event, ui) {
				var TheValue = ui.value;
				if($(this).hasClass('NeoPixelSliderBr')) {
					TheValue = Math.round(ui.value / 2.55);
				}
				var TheSpan = $(this).find('span.toleft');
				$(TheSpan).text(TheValue);
				if($(this).hasClass('NeoPixelSliderR') || $(this).hasClass('NeoPixelSliderG') || $(this).hasClass('NeoPixelSliderB')) {
					if($(this).hasClass('NeoPixelSliderR')) $('.NeoPixelR').val(ui.value);
					if($(this).hasClass('NeoPixelSliderG')) $('.NeoPixelG').val(ui.value);
					if($(this).hasClass('NeoPixelSliderB')) $('.NeoPixelB').val(ui.value);
					var r = $('.NeoPixelR').val();
					var g = $('.NeoPixelG').val();
					var b = $('.NeoPixelB').val();
					wpNeoPixel.changeColorPreview(r, g, b);
				}
			},
			stop: function(event, ui) {
				if(($(this).hasClass('NeoPixelSliderR') || $(this).hasClass('NeoPixelSliderG') || $(this).hasClass('NeoPixelSliderB')) && $(this).hasClass('WriteOnly')) {
					if($(this).hasClass('NeoPixelSliderR')) $('.NeoPixelR').val(ui.value);
					if($(this).hasClass('NeoPixelSliderG')) $('.NeoPixelG').val(ui.value);
					if($(this).hasClass('NeoPixelSliderB')) $('.NeoPixelB').val(ui.value);
					const slider = {
						ip: wpNeoPixel.ip,
						r: $('.NeoPixelR').val(),
						g: $('.NeoPixelG').val(),
						b: $('.NeoPixelB').val()
					};
					wpNeoPixel.changeColorPreview(slider.r, slider.g, slider.b);
					$.post(wpNeoPixel.target + '.NeoPixelColor.req', slider, function(data) {
					}, 'json');
					wpNeoPixel.getSavedColor();
				}
				wpNeoPixel.changeColorPreview();
				$(this).removeClass('WriteOnly').find('a').text('');
			}
		});
		$('.NeoPixelSliderW').slider({
			min: 0,
			max: 100,
			range: 'min',
			start: function() {
				$(this).addClass('WriteOnly').find('a').append('<span class="toleft"></span>');
			},
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $(this).find('span.toleft');
				$(TheSpan).text(TheValue);
			},
			stop: function(event, ui) {
				if($(this).hasClass('NeoPixelSliderWW')) {
					$('.NeoPixelWW').text(ui.value);
					const ww = {
						ip: wpNeoPixel.ip,
						ww: ui.value
					};
					$.post(wpNeoPixel.target + '.NeoPixelWW.req', ww, function(data) {
					}, 'json');
				}
				if($(this).hasClass('NeoPixelSliderCW')) {
					$('.NeoPixelCW').text(ui.value);
					const cw = {
						ip: wpNeoPixel.ip,
						cw: ui.value
					};
					$.post(wpNeoPixel.target + '.NeoPixelCW.req', cw, function(data) {
					}, 'json');
				}
				if($(this).hasClass('NeoPixelSliderBr')) {
					$('.NeoPixelBr').text(ui.value);
					const br = {
						ip: wpNeoPixel.ip,
						brightness: ui.value * 2.55
					};
					$.post(wpNeoPixel.target + '.NeoPixelBrightness.req', br, function(data) {
					}, 'json');
				}
				$(this).removeClass('WriteOnly').find('a').html('');
			}
		});
		$('.NeoPixelSliderEffectSpeed').slider({
			min: 1,
			max: 20,
			range: 'min',
			start: function() {
				$(this).addClass('WriteOnly').find('a').append('<span class="toleft"></span>');
			},
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $(this).find('span.toleft');
				$(TheSpan).text(TheValue);
			},
			stop: function(event, ui) {
				const effectSpeed = {
					ip: wpNeoPixel.ip,
					effectSpeed: ui.value
				};
				$.post(wpNeoPixel.target + '.NeoPixelEffectSpeed.req', effectSpeed, function(data) {
				}, 'json');
				$(this).removeClass('WriteOnly');
				$(this).find('a').html('');
			}
		});
		$('.NeoPixelSleepHourSlider').slider({
			min: 0,
			max: 2,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.NeoPixelSleepHour');
				$(TheSpan).text(TheValue);
			}
		});
		$('.NeoPixelSleepMinuteSlider').slider({
			min: 0,
			max: 59,
			step: 5,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.NeoPixelSleepMinute');
				$(TheSpan).text(TheValue);
			}
		});
	},
	changeColorPreview: function(r, g, b) {
		$('.NeoPixelColorPreview').css('backgroundColor', 'rgb(' + r + ', ' + g + ', ' + b + ')');
	},
	changeColorSlider: function(r, g, b) {
		$('.NeoPixelSliderR').slider('option', 'value', r);
		$('.NeoPixelSliderG').slider('option', 'value', g);
		$('.NeoPixelSliderB').slider('option', 'value', b);
	},
	getSavedColor: function() {
		$.get(wpNeoPixel.target + '.getNeoPixelSavedColor.req', function(data) {
			$('.NeoPixelSavedColor').html(data);
		});
	},
	setColor: function(r, g, b) {
		const color = {
			ip: wpNeoPixel.ip,
			r: r, g: g, b: b
		};
		$.post(wpNeoPixel.target + '.NeoPixelColor.req', color, function(data) {
			console.log(data);
		}, 'json');
	},
	setOff: function() {
		const off = {
			ip: wpNeoPixel.ip,
			steps: 2
		};
		$.post(wpNeoPixel.target + '.setNeoPixelOff.req', off, function(data) {
			console.log(data);
		}, 'json');
	},
	setSleep: function(sec) {
		const sleep = {
			ip: wpNeoPixel.ip,
			sleep: sec
		};
		$.post(wpNeoPixel.target + '.NeoPixelSleep.req', sleep, function(data) {
		}, 'json');
	}
};
