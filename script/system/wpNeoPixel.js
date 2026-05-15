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
//# Revision     : $Rev:: 752                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpNeoPixel.js 752 2026-01-15 08:48:48Z                   $ #
//#                                                                                 #
//###################################################################################
?> wpNeoPixel */

class wpNeoPixel {
	name = null;
	canvas = null;
	ctx = null;
	image = null;
	ip = null;
	target =null;
	constructor(target, name) {
		this.name = name;
		this.ip = $('.' + this.name + '.wpNeoPixel').attr('data-ip');
		this.target = target;
		this.canvas = document.getElementById(this.name);
		if(typeof(this.canvas) != 'undefined' && this.canvas != null) {
			this.ctx = this.canvas.getContext('2d');
			this.image = new Image();
			this.image.onload = () => {
				this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
			};
			this.image.src = 'images/layout/ColorWheel.png';
			this.Register();
			this.getSavedColor();
			$('.' + this.name + ' .NeoPixelSliderR').slider('option', 'value', $('.' + this.name + ' .NeoPixelR').val());
			$('.' + this.name + ' .NeoPixelSliderG').slider('option', 'value', $('.' + this.name + ' .NeoPixelG').val());
			$('.' + this.name + ' .NeoPixelSliderB').slider('option', 'value', $('.' + this.name + ' .NeoPixelB').val());
			$('.' + this.name + ' .NeoPixelSliderWW').slider('option', 'value', $('.' + this.name + ' .NeoPixelWW').text());
			$('.' + this.name + ' .NeoPixelSliderCW').slider('option', 'value', $('.' + this.name + ' .NeoPixelCW').text());
		}
	}
	Register() {
		$('.' + this.name + ' .setNeoPixelDemo').on('click', () => {
			const demo = {
				ip: this.ip
			};
			$.post(this.target + '.NeoPixelDemo.req', demo, function(data) {
			}, 'json');
		});
		$('.' + this.name + '_scene .setNeoPixelEffect').on('click', (ev) => {
			const effect = {
				ip: this.ip,
				id: $(ev.target).attr('data-id')
			};
			$.post(this.target + '.NeoPixelEffect.req', effect, function(data) {
			}, 'json');
		});
		$('.' + this.name + ' .setNeoPixelOff').on('click', () => {
			this.setOff();
		});
		$('.' + this.name + ' .setNeoPixelOffRunner').on('click', () => {
			const off = {
				ip: this.ip,
				steps: 2
			};
			$.post(this.target + '.setNeoPixelOffRunner.req', off, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.' + this.name + ' .setNeoPixelBorder').on('click', () => {
			const border = {
				ip: this.ip
			};
			$.post(this.target + '.setNeoPixelBorder.req', border, function(data) {
			}, 'json');
		});
		$('.' + this.name + ' .MakeFavColor').on('click', () => {
			const led = {
				ip: this.ip,
				r: $('.' + this.name + ' .NeoPixelR').val(),
				g: $('.' + this.name + ' .NeoPixelG').val(),
				b: $('.' + this.name + ' .NeoPixelB').val(),
				fav: 'true'
			};
			$.post(this.target + '.NeoPixelColor.req', led, function(data) {
			}, 'json');
			this.getSavedColor();
		});
		$('.' + this.name + ' .DeleteFavColor').on('click', () => {
			$.get(this.target + '.NeoPixelDeleteFavColor.req', function(data) {
			}, 'json');
			this.getSavedColor();
		});
		$('.' + this.name + '_scene .setNeoPixelSleep').on('click', () => {
			var sec = ($('.' + this.name + '_scene .NeoPixelSleepHour').text() * 60 * 60) + ($('.' + this.name + '_scene .NeoPixelSleepMinute').text() * 60);
			this.setSleep(sec);
		});
		$('.' + this.name + ' .changeWW').on('click', () => {
			const change = { ip: this.ip };
			$.post(this.target + '.NeoPixelChangeWW.req', change, function(data) {
				if(data.erg == 'S_OK') {
					if(data.useWW) $('.' + this.name + ' .changeWW').addClass('ps-green').removeClass('ps-grey');
					else $('.' + this.name + ' .changeWW').addClass('ps-grey').removeClass('ps-green');
				}
			}, 'json');
		});
		$('.' + this.name + ' .changeCW').on('click', () => {
			const change = { ip: this.ip };
			$.post(this.target + '.NeoPixelChangeCW.req', change, function(data) {
				if(data.erg == 'S_OK') {
					if(data.useCW) $('.' + this.name + ' .changeCW').addClass('ps-green').removeClass('ps-grey');
					else $('.' + this.name + ' .changeCW').addClass('ps-grey').removeClass('ps-green');
				}
			}, 'json');
		});
		$('.' + this.name + ' .colorBorder').on('click', (ev) => {
			const led = {
				ip: this.ip,
				pixel: $(ev.target).attr('data-led'),
				r: $('.' + this.name + ' .NeoPixelR').val(),
				g: $('.' + this.name + ' .NeoPixelG').val(),
				b: $('.' + this.name + ' .NeoPixelB').val()
			};
			$(ev.target).css('backgroundColor', 'rgb(' + led.r + ', ' + led.g + ', ' + led.b + ')');
			$('.' + this.name + ' .NeoPixelR').val(led.r);
			$('.' + this.name + ' .NeoPixelG').val(led.g);
			$('.' + this.name + ' .NeoPixelB').val(led.b);
			$.post(this.target + '.NeoPixel.req', led, function(data) {
			}, 'json');
		});
		$('.' + this.name + ' .NeoPixelSavedColor').on('click', '.colorBorderFav', (ev) => {
			const led = {
				ip: this.ip,
				r: $(ev.target).attr('data-r'),
				g: $(ev.target).attr('data-g'),
				b: $(ev.target).attr('data-b'),
				fav: $(ev.target).hasClass('myFav') ? 'true' : 'false'
			};
			//this.changeColorSlider(led.r, led.g, led.b);
			this.changeColorPreview(led.r, led.g, led.b);
			$('.' + this.name + ' .NeoPixelR').val(led.r);
			$('.' + this.name + ' .NeoPixelG').val(led.g);
			$('.' + this.name + ' .NeoPixelB').val(led.b);
			$.post(this.target + '.NeoPixelColor.req', led, function(data) {
			}, 'json');
			this.getSavedColor();
		});
		$('.' + this.name + ' .NeoPixelColorManagement').on('click', () => {
			if($('.' + this.name + ' .colorManagement').hasClass('open')) {
				$('.' + this.name + ' .colorManagement').css({'height':'0px'}).removeClass('open');
			} else {
				$('.' + this.name + ' .colorManagement').css({'height':'auto'}).addClass('open');
			}
		});
		$('#' + this.name).mousemove(function(e) {
			var canvasOffset = $(this.canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			var imageData = this.ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				var r = pixel[0];
				var g = pixel[1];
				var b = pixel[2];
				//this.changeColorSlider(r, g, b);
				this.changeColorPreview(r, g, b);
			}
		}.bind(this)).click(function(e) {
			var canvasOffset = $(this.canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			var imageData = this.ctx.getImageData(canvasX, canvasY, 1, 1);
			var pixel = imageData.data;
			if((pixel[0] + pixel[1] + pixel[2]) > 0) {
				var r = pixel[0];
				var g = pixel[1];
				var b = pixel[2];
				//this.changeColorSlider(r, g, b);
				this.changeColorPreview(r, g, b);
				this.getSavedColor();
				$('.NeoPixelR').val(r);
				$('.NeoPixelG').val(g);
				$('.NeoPixelB').val(b);
				const color = {
					ip: this.ip,
					r: r,
					g: g,
					b: b
				};
				$.post(this.target + '.NeoPixelColor.req', color, function(data) {
				}, 'json');
				this.getSavedColor();
			}
		}.bind(this));
		$('.' + this.name + ' .NeoPixelSlider').slider({
			min: 0,
			max: 255,
			range: 'min',
			start: function() {
				$(this).addClass('WriteOnly');
				$(this).find('a').append('<span class="toleft"></span>');
			},
			slide: function(event, ui) {
				var TheValue = ui.value;
				if($(ui.handle.parentNode).hasClass('NeoPixelSliderBr')) {
					TheValue = Math.round(ui.value / 2.55);
				}
				var TheSpan = $(this).find('span.toleft');
				$(TheSpan).text(TheValue);
				if($(ui.handle.parentNode).hasClass('NeoPixelSliderR') ||
					$(ui.handle.parentNode).hasClass('NeoPixelSliderG') ||
					$(ui.handle.parentNode).hasClass('NeoPixelSliderB')) {
					if($(ui.handle.parentNode).hasClass('NeoPixelSliderR')) $('.' + this.name + ' .NeoPixelR').val(ui.value);
					if($(ui.handle.parentNode).hasClass('NeoPixelSliderG')) $('.' + this.name + ' .NeoPixelG').val(ui.value);
					if($(ui.handle.parentNode).hasClass('NeoPixelSliderB')) $('.' + this.name + ' .NeoPixelB').val(ui.value);
					var r = $('.' + this.name + ' .NeoPixelR').val();
					var g = $('.' + this.name + ' .NeoPixelG').val();
					var b = $('.' + this.name + ' .NeoPixelB').val();
					this.changeColorPreview(r, g, b);
				}
			}.bind(this),
			stop: function(event, ui) {
				if($(ui.handle.parentNode).hasClass('NeoPixelSliderR') ||
					$(ui.handle.parentNode).hasClass('NeoPixelSliderG') ||
					$(ui.handle.parentNode).hasClass('NeoPixelSliderB')) {
					if($(ui.handle.parentNode).hasClass('NeoPixelSliderR')) $('.' + this.name + ' .NeoPixelR').val(ui.value);
					if($(ui.handle.parentNode).hasClass('NeoPixelSliderG')) $('.' + this.name + ' .NeoPixelG').val(ui.value);
					if($(ui.handle.parentNode).hasClass('NeoPixelSliderB')) $('.' + this.name + ' .NeoPixelB').val(ui.value);
					const slider = {
						ip: this.ip,
						r: $('.' + this.name + ' .NeoPixelR').val(),
						g: $('.' + this.name + ' .NeoPixelG').val(),
						b: $('.' + this.name + ' .NeoPixelB').val()
					};
					this.changeColorPreview(slider.r, slider.g, slider.b);
					$.post(this.target + '.NeoPixelColor.req', slider, function(data) {
					}, 'json');
					this.getSavedColor();
				}
				this.changeColorPreview();
				$(ui.handle.parentNode).removeClass('WriteOnly').find('a').text('');
			}.bind(this)
		});
		$('.' + this.name + ' .NeoPixelSliderW').slider({
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
				if($('.' + this.name + ' .NeoPixelSliderW').hasClass('NeoPixelSliderWW')) {
					$('.NeoPixelWW').text(ui.value);
					const ww = {
						ip: this.ip,
						ww: ui.value
					};
					$.post(this.target + '.NeoPixelWW.req', ww, function(data) {
					}, 'json');
				}
				if($('.' + this.name + ' .NeoPixelSliderW').hasClass('NeoPixelSliderCW')) {
					$('.NeoPixelCW').text(ui.value);
					const cw = {
						ip: this.ip,
						cw: ui.value
					};
					$.post(this.target + '.NeoPixelCW.req', cw, function(data) {
					}, 'json');
				}
				$('.' + this.name + ' .NeoPixelSliderW').removeClass('WriteOnly').find('a').html('');
			}.bind(this)
		});
		$('.' + this.name + '_scene .NeoPixelSliderEffectSpeed').slider({
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
					ip: this.ip,
					effectSpeed: ui.value
				};
				$.post(this.target + '.NeoPixelEffectSpeed.req', effectSpeed, function(data) {
				}, 'json');
				$('.' + this.name + '_scene .NeoPixelSliderEffectSpeed').removeClass('WriteOnly');
				$('.' + this.name + '_scene .NeoPixelSliderEffectSpeed').find('a').html('');
			}.bind(this)
		});
		$('.' + this.name + '_scene .NeoPixelSleepHourSlider').slider({
			min: 0,
			max: 2,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.' + this.name + '_scene .NeoPixelSleepHour');
				$(TheSpan).text(TheValue);
			}.bind(this)
		});
		$('.' + this.name + '_scene .NeoPixelSleepMinuteSlider').slider({
			min: 0,
			max: 59,
			step: 5,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.' + this.name + '_scene .NeoPixelSleepMinute');
				$(TheSpan).text(TheValue);
			}.bind(this)
		});
	}
	changeColorPreview(r, g, b) {
		$('.' + this.name + ' .NeoPixelColorPreview').css('backgroundColor', 'rgb(' + r + ', ' + g + ', ' + b + ')');
	}
	changeColorSlider(r, g, b) {
		$('.' + this.name + ' .NeoPixelSliderR').slider('option', 'value', r);
		$('.' + this.name + ' .NeoPixelSliderG').slider('option', 'value', g);
		$('.' + this.name + ' .NeoPixelSliderB').slider('option', 'value', b);
	}
	getSavedColor() {
		$.get(this.target + '.getNeoPixelSavedColor.req', (data) => {
			$('.' + this.name + ' .NeoPixelSavedColor').html(data);
		});
	}
	setColor(r, g, b) {
		const color = {
			ip: this.ip,
			r: r, g: g, b: b
		};
		$.post(this.target + '.NeoPixelColor.req', color, function(data) {
			console.log(data);
		}, 'json');
	}
	setOff() {
		const off = {
			ip: this.ip,
			steps: 2
		};
		$.post(this.target + '.setNeoPixelOff.req', off, function(data) {
			console.log(data);
		}, 'json');
	}
	setSleep(sec) {
		const sleep = {
			ip: this.ip,
			sleep: sec
		};
		$.post(this.target + '.NeoPixelSleep.req', sleep, function(data) {
		}, 'json');
	}
};
