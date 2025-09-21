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
//# Revision     : $Rev:: 750                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpCwWw.js 750 2025-09-21 14:18:43Z                   $ #
//#                                                                                 #
//###################################################################################
?> wpCwWw */

class wpCwWw {
	constructor(target, name) {
		this.name = name;
		this.ip = $('.' + this.name).attr('data-ip');
		console.log(this.ip);
		this.target = target;
		this.Register();
		$('.' + this.name + ' .CwWwSliderWW').slider('option', 'value', $('.' + this.name + ' .CwWwWW').text());
		$('.' + this.name + ' .CwWwSliderCW').slider('option', 'value', $('.' + this.name + ' .CwWwCW').text());
	}
	Register() {
		$('.' + this.name + ' .setCwWwEffect').on('click', () => {
			const effect = {
				ip: this.ip,
				id: $(this).attr('data-id')
			};
			$.post(this.target + '.CwWwEffect.req', effect, function(data) {
			}, 'json');
		});
		$('.' + this.name + ' .setCwWwOn').on('click', () => {
			const on = {
				ip: this.ip
			};
			$.post(this.target + '.CwWwOn.req', on, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.' + this.name + ' .setCwWwOff').on('click', () => {
			this.setOff();
		});
		$('.' + this.name + ' .setCwWwSleep').on('click', () => {
			var sec = ($('.CwWwSleepHour').text() * 60 * 60) + ($('.CwWwSleepMinute').text() * 60);
			this.setSleep(sec);
		});
		$('.' + this.name + ' .CwWwSliderW').slider({
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
				if($(ui.handle.parentNode).hasClass('CwWwSliderWW')) {
					console.log('CwWwSliderWW');
					$('.CwWwWW').text(ui.value);
					const ww = {
						ip: this.ip,
						ww: ui.value
					};
					$.post(this.target + '.CwWwWW.req', ww, function(data) {
					}, 'json');
				}
				if($(ui.handle.parentNode).hasClass('CwWwSliderCW')) {
					console.log('CwWwSliderCW');
					$('.CwWwCW').text(ui.value);
					const cw = {
						ip: this.ip,
						cw: ui.value
					};
					$.post(this.target + '.CwWwCW.req', cw, function(data) {
					}, 'json');
				}
				$('.' + this.name + ' .CwWwSliderW').removeClass('WriteOnly').find('a').html('');
			}.bind(this)
		});
		$('.' + this.name + ' .CwWwSliderEffectSpeed').slider({
			min: 1,
			max: 9,
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
				$.post(this.target + '.CwWwEffectSpeed.req', effectSpeed, function(data) {
				}, 'json');
				$('.' + this.name + ' .CwWwSliderEffectSpeed').removeClass('WriteOnly').find('a').html('');
			}.bind(this)
		});
		$('.' + this.name + ' .CwWwSleepHourSlider').slider({
			min: 0,
			max: 2,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.CwWwSleepHour');
				$(TheSpan).text(TheValue);
			}
		});
		$('.' + this.name + ' .CwWwSleepMinuteSlider').slider({
			min: 0,
			max: 59,
			step: 5,
			orientation: 'vertical',
			range: 'min',
			slide: function(event, ui) {
				var TheValue = ui.value;
				var TheSpan = $('.CwWwSleepMinute');
				$(TheSpan).text(TheValue);
			}
		});
	}
	setOff() {
		const off = {
			ip: this.ip
		};
		$.post(this.target + '.CwWwOff.req', off, function(data) {
			console.log(data);
		}, 'json');
	}
	setBrightness(cw, ww) {
		const cwww = {
			ip: this.ip,
			cw: cw, ww: ww
		};
		$.post(this.target + '.CwWwCWWW.req', cwww, function(data) {
			console.log(data);
		}, 'json');
	}
	setSleep(sec) {
		const sleep = {
			ip: this.ip,
			sleep: sec
		};
		$.post(this.target + '.CwWwSleep.req', sleep, function(data) {
		}, 'json');
	}
};
