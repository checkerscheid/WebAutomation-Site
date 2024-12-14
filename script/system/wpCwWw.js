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
//# Revision     : $Rev:: 706                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpCwWw.js 706 2024-11-04 15:08:34Z                   $ #
//#                                                                                 #
//###################################################################################
?> wpCwWw */

var wpCwWw = {
	ip: null,
	target:null,
	Init: function(target) {
		wpCwWw.ip = $('.wpCwWw').attr('data-ip');
		wpCwWw.target = target;
		wpCwWw.Register();
		$('.CwWwSliderWW').slider('option', 'value', $('.CwWwWW').text());
		$('.CwWwSliderCW').slider('option', 'value', $('.CwWwCW').text());
	},
	Register: function() {
		$('.setCwWwEffect').on('click', function() {
			const effect = {
				ip: wpCwWw.ip,
				id: $(this).attr('data-id')
			};
			$.post(wpCwWw.target + '.CwWwEffect.req', effect, function(data) {
			}, 'json');
		});
		$('.setCwWwOn').on('click', function() {
			const on = {
				ip: wpCwWw.ip
			};
			$.post(wpCwWw.target + '.CwWwOn.req', on, function(data) {
				console.log(data);
			}, 'json');
		});
		$('.setCwWwOff').on('click', function() {
			wpCwWw.setOff();
		});
		$('.setCwWwSleep').on('click', function() {
			var sec = ($('.CwWwSleepHour').text() * 60 * 60) + ($('.CwWwSleepMinute').text() * 60);
			wpCwWw.setSleep(sec);
		});
		$('.CwWwSliderW').slider({
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
				if($(this).hasClass('CwWwSliderWW')) {
					$('.CwWwWW').text(ui.value);
					const ww = {
						ip: wpCwWw.ip,
						ww: ui.value
					};
					$.post(wpCwWw.target + '.CwWwWW.req', ww, function(data) {
					}, 'json');
				}
				if($(this).hasClass('CwWwSliderCW')) {
					$('.CwWwCW').text(ui.value);
					const cw = {
						ip: wpCwWw.ip,
						cw: ui.value
					};
					$.post(wpCwWw.target + '.CwWwCW.req', cw, function(data) {
					}, 'json');
				}
				$(this).removeClass('WriteOnly').find('a').text('');
			}
		});
		$('.CwWwSliderEffectSpeed').slider({
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
					ip: wpCwWw.ip,
					effectSpeed: ui.value
				};
				$.post(wpCwWw.target + '.CwWwEffectSpeed.req', effectSpeed, function(data) {
				}, 'json');
				$(this).removeClass('WriteOnly');
				$(this).find('a').html('');
			}
		});
		$('.CwWwSleepHourSlider').slider({
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
		$('.CwWwSleepMinuteSlider').slider({
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
	},
	setOff: function() {
		const off = {
			ip: wpCwWw.ip
		};
		$.post(wpCwWw.target + '.CwWwOff.req', off, function(data) {
			console.log(data);
		}, 'json');
	},
	setBrightness: function(cw, ww) {
		const cwww = {
			ip: wpCwWw.ip,
			cw: cw, ww: ww
		};
		$.post(wpCwWw.target + '.CwWwCWWW.req', cwww, function(data) {
			console.log(data);
		}, 'json');
	},
	setSleep: function(sec) {
		const sleep = {
			ip: wpCwWw.ip,
			sleep: sec
		};
		$.post(wpCwWw.target + '.CwWwSleep.req', sleep, function(data) {
		}, 'json');
	}
};
