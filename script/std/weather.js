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

var plot = null;
p.page.load = function() {
	$.get('std.weather.weather.req', function(data) {
		$('.condition').html(data);
	});
	$.get('std.weather.forecast.req', function(data) {
		$('.forecast').html(data);
	});
	
	$.get('std.weather.forecastLines.req', function(data) {
		var now = new Date;
		var marker1 = get00(now, 0);
		var marker2 = get00(now, 1);
		var marker3 = get00(now, 2);
		var marker4 = get00(now, 3);
		var marker5 = get00(now, 4);
		
		var markings = [
			{ color: "#555", lineWidth: 1, xaxis: { from: marker1.ts, to: marker1.ts } },
			{ color: "#555", lineWidth: 1, xaxis: { from: marker2.ts, to: marker2.ts } },
			{ color: "#555", lineWidth: 1, xaxis: { from: marker3.ts, to: marker3.ts } },
			{ color: "#555", lineWidth: 1, xaxis: { from: marker4.ts, to: marker4.ts } },
			{ color: "#555", lineWidth: 1, xaxis: { from: marker5.ts, to: marker5.ts } }
		];
		var dataset = [
			{ label: "Rain", data: data.Rain, bars: {show: true, fill: true, barWidth:5000, align: "center"}, color: "rgba(169,25,25,0.7)", yaxis: 3 },
			{ label: "Humidity", data: data.Humidity, lines: { show: true }, color: "rgba(20,20,50,0.7)", yaxis: 2 },
			{ data: data.TempMin, lines: { show: true, lineWidth: 0.1, fill: 0.2 }, color: "rgba(50,50,255,0.7)", fillBetween: "Temp", yaxis: 1 },
			{ data: data.TempMax, lines: { show: true, lineWidth: 0.1, fill: 0.2 }, color: "rgba(255,50,50,0.7)", fillBetween: "Temp", yaxis: 1 },
			{ label: "Temperatur", id: "Temp", data:data.Temp, lines:{ show:true }, points: { show: true }, color: "rgb(210,210,210)", yaxis: 1 }
		];
		plot = $.plot($('#forecastlinesplaceholder'), dataset, {
			xaxis: {
				tickFormatter: function (v) {
					return new Date(v * 1000).toLocaleString();
				}
			},
			yaxes: [{
			},{
				min: 20,
				max: 300,
				ticks: [25,50,75,100],
				position:'right'
			},{
				min: 0,
				max: 10,
				show: false
			}],
			legend: {
				backgroundColor: null,
				show: false
			},
			grid: {
				markings: markings,
				hoverable: true
			},
			crosshair: {
				"mode":"x"
			},
			legend: {
				show:true,
				backgroundColor: '#555',
				backgroundOpacity: 0.8
			}
		});
		
		var o1 = plot.pointOffset({ x: marker1.ts, y: 0});
		if(o1.left > 0) {
			if(o1.left < 40) o1.left = 40;
			$('#forecastlinesplaceholder').append(
				"<div style='position:absolute;left:" + (o1.left + 10) + "px;top:10px;color:#666;'>" + marker1.d + "</div>");
		}
		var o2 = plot.pointOffset({ x: marker2.ts, y: 0});
		var o3 = plot.pointOffset({ x: marker3.ts, y: 0});
		var o4 = plot.pointOffset({ x: marker4.ts, y: 0});
		var o5 = plot.pointOffset({ x: marker5.ts, y: 0});
		
		$('#forecastlinesplaceholder').append(
			"<div style='position:absolute;left:" + (o2.left + 10) + "px;top:10px;color:#666;'>" + marker2.d + "</div>");
		$('#forecastlinesplaceholder').append(
			"<div style='position:absolute;left:" + (o3.left + 10) + "px;top:10px;color:#666;'>" + marker3.d + "</div>");
		$('#forecastlinesplaceholder').append(
			"<div style='position:absolute;left:" + (o4.left + 10) + "px;top:10px;color:#666;'>" + marker4.d + "</div>");
		$('#forecastlinesplaceholder').append(
			"<div style='position:absolute;left:" + (o5.left + 10) + "px;top:10px;color:#666;'>" + marker5.d + "</div>");
		
		console.log($.plot.version);
	}, 'json');

	$('#forecastlinesplaceholder').on('plothover', function (event, pos, item) {
		if (!pos.x || !pos.y) {
			return;
		}

		if (item) {
			var x = item.datapoint[0];
			$("#forecastlinestooltip").html($('#dt' + x).html())
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(200);
		} else {
			$("#forecastlinestooltip").hide();
		}
	});

	$('forecastlinesplaceholder').on("plothovercleanup", function (event, pos, item) {
		console.log('plothovercleanup');
		$("#forecastlinestooltip").hide();
	});
	p.getValues();
};

var days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

function get00(date, addDays) {
	var thatDay = new Date(date);
	thatDay.setHours(0, 0, 0, 0);
	thatDay.setDate(thatDay.getDate() + addDays);
	var returns = {
		ts: thatDay.getTime() / 1000,
		d: days[thatDay.getDay()]
	};
	return returns;
}
