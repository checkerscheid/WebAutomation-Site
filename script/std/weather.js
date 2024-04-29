/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.12.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: weather.js 552 2024-01-06 13:56:24Z                      $ #
//#                                                                                 #
//###################################################################################
?> wetter */

p.page.load = function() {
	$.get('std.weather.weather.req', function(data) {
		$('.condition').html(data);
	});
	$.get('std.weather.forecast.req', function(data) {
		$('.forecast').html(data);
	});
	p.getValues();
};
