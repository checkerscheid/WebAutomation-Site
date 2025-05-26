/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 25.05.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 741                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpClock.js 741 2025-05-25 18:12:07Z                   $ #
//#                                                                                 #
//###################################################################################
?> wpClock */

var wpClock = {
	ip: null,
	target:null,
	Init: function(target) {
		wpClock.ip = $('.wpClock').attr('data-ip');
		wpClock.target = target;
		wpClock.Register();
		$('.ClockSliderHR').slider('option', 'value', $('.ColorHR').val());
		$('.ClockSliderHG').slider('option', 'value', $('.ColorHG').val());
		$('.ClockSliderHB').slider('option', 'value', $('.ColorHB').val());
		$('.ClockSliderMR').slider('option', 'value', $('.ColorMR').val());
		$('.ClockSliderMG').slider('option', 'value', $('.ColorMG').val());
		$('.ClockSliderMB').slider('option', 'value', $('.ColorMB').val());
		$('.ClockSliderSR').slider('option', 'value', $('.ColorSR').val());
		$('.ClockSliderSG').slider('option', 'value', $('.ColorSG').val());
		$('.ClockSliderSB').slider('option', 'value', $('.ColorSB').val());
		$('.ClockSliderQR').slider('option', 'value', $('.ColorQR').val());
		$('.ClockSliderQG').slider('option', 'value', $('.ColorQG').val());
		$('.ClockSliderQB').slider('option', 'value', $('.ColorQB').val());
		$('.ClockSlider5R').slider('option', 'value', $('.Color5R').val());
		$('.ClockSlider5G').slider('option', 'value', $('.Color5G').val());
		$('.ClockSlider5B').slider('option', 'value', $('.Color5B').val());
	},
	Register: function() {
		$('.saveClockColor').on('click', function() {
			var section = $(this).attr('data-section');
			var colorObject = wpClock.getColorObject(section);
			$.post(wpClock.target + '.setColor.req', colorObject, function(data) {
			}, 'json');
		});
		$('.ClockSlider').slider({
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
				if($(this).hasClass('ClockSliderHR') || $(this).hasClass('ClockSliderHG') || $(this).hasClass('ClockSliderHB')) {
					wpClock.setColorValue($(this), 'H', ui.value);
					wpClock.changeColorPreview('H');
				}
				if($(this).hasClass('ClockSliderMR') || $(this).hasClass('ClockSliderMG') || $(this).hasClass('ClockSliderMB')) {
					wpClock.setColorValue($(this), 'M', ui.value);
					wpClock.changeColorPreview('M');
				}
				if($(this).hasClass('ClockSliderSR') || $(this).hasClass('ClockSliderSG') || $(this).hasClass('ClockSliderSB')) {
					wpClock.setColorValue($(this), 'S', ui.value);
					wpClock.changeColorPreview('S');
				}
				if($(this).hasClass('ClockSliderQR') || $(this).hasClass('ClockSliderQG') || $(this).hasClass('ClockSliderQB')) {
					wpClock.setColorValue($(this), 'Q', ui.value);
					wpClock.changeColorPreview('Q');
				}
				if($(this).hasClass('ClockSlider5R') || $(this).hasClass('ClockSlider5G') || $(this).hasClass('ClockSlider5B')) {
					wpClock.setColorValue($(this), '5', ui.value);
					wpClock.changeColorPreview('5');
				}
			},
			stop: function(event, ui) {
				if(($(this).hasClass('ClockSliderHR') || $(this).hasClass('ClockSliderHG') || $(this).hasClass('ClockSliderHB')) && $(this).hasClass('WriteOnly')) {
					wpClock.setColorValue($(this), 'H', ui.value);
					wpClock.changeColorPreview('H');
				}
				if(($(this).hasClass('ClockSliderMR') || $(this).hasClass('ClockSliderMG') || $(this).hasClass('ClockSliderMB')) && $(this).hasClass('WriteOnly')) {
					wpClock.setColorValue($(this), 'M', ui.value);
					wpClock.changeColorPreview('M');
				}
				if(($(this).hasClass('ClockSliderSR') || $(this).hasClass('ClockSliderSG') || $(this).hasClass('ClockSliderSB')) && $(this).hasClass('WriteOnly')) {
					wpClock.setColorValue($(this), 'S', ui.value);
					wpClock.changeColorPreview('S');
				}
				if(($(this).hasClass('ClockSliderQR') || $(this).hasClass('ClockSliderQG') || $(this).hasClass('ClockSliderQB')) && $(this).hasClass('WriteOnly')) {
					wpClock.setColorValue($(this), 'Q', ui.value);
					wpClock.changeColorPreview('Q');
				}
				if(($(this).hasClass('ClockSlider5R') || $(this).hasClass('ClockSlider5G') || $(this).hasClass('ClockSlider5B')) && $(this).hasClass('WriteOnly')) {
					wpClock.setColorValue($(this), '5', ui.value);
					wpClock.changeColorPreview('5');
				}
				$(this).removeClass('WriteOnly').find('a').text('');
			}
		});
	},
	changeColorPreview: function(section) {
		var r = $('.Color' + section + 'R').val();
		var g = $('.Color' + section + 'G').val();
		var b = $('.Color' + section + 'B').val();
		$('.ColorPreview' + section).css('backgroundColor', 'rgb(' + r + ', ' + g + ', ' + b + ')');
	},
	setColorValue: function(elem, section, value) {
		if($(elem).hasClass('ClockSlider' + section + 'R')) $('.Color' + section + 'R').val(value);
		if($(elem).hasClass('ClockSlider' + section + 'G')) $('.Color' + section + 'G').val(value);
		if($(elem).hasClass('ClockSlider' + section + 'B')) $('.Color' + section + 'B').val(value);
	},
	getColorObject: function(section) {
		return {
			ip: wpClock.ip,
			section: section,
			r: $('.Color' + section + 'R').val(),
			g: $('.Color' + section + 'G').val(),
			b: $('.Color' + section + 'B').val()
		};
	},
};
