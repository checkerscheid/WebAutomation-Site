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
//# Revision     : $Rev:: 751                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpRGB.js 751 2025-10-13 06:14:37Z                        $ #
//#                                                                                 #
//###################################################################################
?> wpRGB */

class wpRGB {
	name = null;
	canvas = null;
	ctx = null;
	image = null;
	ip = null;
	target = null;
	constructor(target, name) {
		let returns = false;
		this.name = name;
		this.ip = $('.' + this.name + '.wpRGB').attr('data-ip');
		this.target = target;
		this.canvas = document.getElementById(this.name);
		if(typeof(this.canvas) != 'undefined' && this.canvas != null) {
			this.ctx = this.canvas.getContext('2d');
			console.log(this.ctx);
			this.image = new Image();
			this.image.onload = () => {
				this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
			};
			this.image.src = 'images/layout/ColorWheel.png';
			this.Register();
			this.getSavedColor();
			$('.' + this.name + ' .RGBSliderR').slider('option', 'value', $('.' + this.name + ' .RGBColorR').val());
			$('.' + this.name + ' .RGBSliderG').slider('option', 'value', $('.' + this.name + ' .RGBColorG').val());
			$('.' + this.name + ' .RGBSliderB').slider('option', 'value', $('.' + this.name + ' .RGBColorB').val());
			$('.' + this.name + ' .RGBSliderBr').slider('option', 'value', $('.' + this.name + ' .RGBColorBr').text());
			returns = true;
		}
		return returns;
	}
	Register() {
		$('.' + this.name + ' .setRGBOn').on('click', () => {
			const on = {
				ip: this.ip,
				turn: 'true'
			};
			$.post(this.target + '.RGBTurn.req', on, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.' + this.name + ' .setRGBColor').on('click', () => {
			const on = {
				ip: this.ip,
				turn: 'true',
				r: $('.' + this.name + ' .RGBColorR').val(),
				g: $('.' + this.name + ' .RGBColorG').val(),
				b: $('.' + this.name + ' .RGBColorB').val()
			};
			$.post(this.target + '.RGBColor.req', on, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.' + this.name + ' .setRGBOff').on('click', () => {
			this.setOff();
		});
		$('.' + this.name + ' .RGBSavedColor').on('click', '.colorBorderFav', () => {
			const led = {
				ip: this.ip,
				turn: 'true',
				r: $(this).attr('data-r'),
				g: $(this).attr('data-g'),
				b: $(this).attr('data-b')
			};
			this.changeColorSlider(led.r, led.g, led.b);
			this.changeColorPreview(led.r, led.g, led.b);
			$.post(wpRGB.target + '.RGBColor.req', led, function(data) {
			}, 'json');
			this.getSavedColor();
		});
		$('.' + this.name + ' .RGBColorManagement').on('click', () => {
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
				this.changeColorSlider(r, g, b);
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
				this.changeColorSlider(r, g, b);
				this.changeColorPreview(r, g, b);
				this.getSavedColor();
				$('.' + this.name + ' .RGBColorR').val(r);
				$('.' + this.name + ' .RGBColorG').val(g);
				$('.' + this.name + ' .RGBColorB').val(b);
				const color = {
					ip: this.ip,
					turn: 'true',
					r: r,
					g: g,
					b: b
				};
				$.post(this.target + '.RGBColor.req', color, function(data) {
				}, 'json');
				this.getSavedColor();
			};
		}.bind(this));
		$('.' + this.name + ' .RGBSliderR, .' + this.name + ' .RGBSliderG, .' + this.name + ' .RGBSliderB').slider({
			min: 0,
			max: 255,
			range: 'min',
			start: function() {
				$(this).addClass('WriteOnly');
				$(this).find('a').append('<span class="toleft"></span>');
			},
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $(ui.handle.parentNode).find('span.toleft');
				$(TheSpan).text(TheValue);
				if($(ui.handle.parentNode).hasClass('RGBSliderR') ||
					$(ui.handle.parentNode).hasClass('RGBSliderG') ||
					$(ui.handle.parentNode).hasClass('RGBSliderB')) {
					if($(ui.handle.parentNode).hasClass('RGBSliderR')) $('.' + this.name + ' .RGBColorR').val(ui.value);
					if($(ui.handle.parentNode).hasClass('RGBSliderG')) $('.' + this.name + ' .RGBColorG').val(ui.value);
					if($(ui.handle.parentNode).hasClass('RGBSliderB')) $('.' + this.name + ' .RGBColorB').val(ui.value);
					var r = $('.' + this.name + ' .RGBColorR').val();
					var g = $('.' + this.name + ' .RGBColorG').val();
					var b = $('.' + this.name + ' .RGBColorB').val();
					this.changeColorPreview(r, g, b);
				}
			}.bind(this),
			stop: function(event, ui) {
				if($(ui.handle.parentNode).hasClass('RGBSliderR') ||
					$(ui.handle.parentNode).hasClass('RGBSliderG') ||
					$(ui.handle.parentNode).hasClass('RGBSliderB')) {
					if($(ui.handle.parentNode).hasClass('RGBSliderR')) $('.' + this.name + ' .RGBColorR').val(ui.value);
					if($(ui.handle.parentNode).hasClass('RGBSliderG')) $('.' + this.name + ' .RGBColorG').val(ui.value);
					if($(ui.handle.parentNode).hasClass('RGBSliderB')) $('.' + this.name + ' .RGBColorB').val(ui.value);
					const slider = {
						ip: this.ip,
						turn: 'true',
						r: $('.' + this.name + ' .RGBColorR').val(),
						g: $('.' + this.name + ' .RGBColorG').val(),
						b: $('.' + this.name + ' .RGBColorB').val()
					};
					this.changeColorPreview(slider.r, slider.g, slider.b);
					$.post(this.target + '.RGBColor.req', slider, function(data) {
					}, 'json');
					this.getSavedColor();
				}
				this.changeColorPreview();
				$(ui.handle.parentNode).removeClass('WriteOnly').find('a').text('');
			}.bind(this)
		});
		$('.' + this.name + ' .RGBSliderBr').slider({
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
				$('.' + this.name + ' .RGBColorBr').text(ui.value);
				const br = {
					ip: this.ip,
					turn: 'true',
					brightness: ui.value
				};
				$.post(this.target + '.RGBBrightness.req', br, function(data) {
				}, 'json');
				$('.' + this.name + ' .RGBSliderBr').removeClass('WriteOnly').find('a').text('');
			}.bind(this)
		});
		$('.' + this.name + ' .setRGBSleep').click(() => {
			var sec = ($('.' + this.name + ' .RGBSleepHour').text() * 60 * 60) + ($('.' + this.name + ' .RGBSleepMinute').text() * 60);
			this.setSleep(sec);
		});
		$('.' + this.name + ' .RGBSleepHourSlider').slider({
			min: 0,
			max: 2,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.' + this.name + ' .RGBSleepHour');
				$(TheSpan).text(TheValue);
			}.bind(this)
		});
		$('.' + this.name + ' .RGBSleepMinuteSlider').slider({
			min: 0,
			max: 59,
			step: 5,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.' + this.name + ' .RGBSleepMinute');
				$(TheSpan).text(TheValue);
			}.bind(this)
		});
	}
	changeColorPreview(r, g, b) {
		$('.' + this.name + ' .RGBColorPreview').css('backgroundColor', 'rgb(' + r + ', ' + g + ', ' + b + ')');
	}
	changeColorSlider(r, g, b) {
		$('.' + this.name + ' .RGBSliderR').slider('option', 'value', r);
		$('.' + this.name + ' .RGBSliderG').slider('option', 'value', g);
		$('.' + this.name + ' .RGBSliderB').slider('option', 'value', b);
	}
	getSavedColor() {
		$.get(this.target + '.getRGBSavedColor.req', (data) => {
			$('.' + this.name + ' .RGBSavedColor').html(data);
		});
	}
	setOff() {
		const off = {
			ip: this.ip,
			turn: 'false'
		};
		$.post(this.target + '.RGBTurn.req', off, function(data) {
			console.log(data);
		}, 'json');
	}
	setSleep(sec) {
		const sleep = {
			ip: this.ip,
			sleep: sec
		};
		$.post(this.target + '.RGBSleep.req', sleep, function(data) {
		}, 'json');
	}
};
