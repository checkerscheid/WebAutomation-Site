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
//# Revision     : $Rev:: 621                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: weather.js 621 2024-06-15 00:47:41Z                      $ #
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
	
	$.get('std.weather.forecastLines.req', function(data) {
		var dataset = [
			{ data: data.TempMin, lines: { show: true, lineWidth: 0.1, fill: 0.4 }, color: "rgb(50,50,255)", fillBetween: "Temp" },
			{ data: data.TempMax, lines: { show: true, lineWidth: 0.1, fill: 0.4 }, color: "rgb(255,50,50)", fillBetween: "Temp" },
			{ label: "Temperatur", id: "Temp", data:data.Temp, lines:{ show:true }, points: { show: true }, color: "rgb(210,210,210)" }

			//{ label: "Humidity", data: data.Humidity, lines: { show: true }, color: "rgb(50,50,50)" }
		];
		$.plot($('.forecastlinesplaceholder'), dataset, {
			xaxis: {
				tickFormatter: function (v) {
					return new Date(v * 1000).toLocaleString();
				}
			},
			legend: {
				backgroundColor: null,
				show: false
			}
		});
		console.log($.plot.version);
	}, 'json');
	
	p.getValues();
};
