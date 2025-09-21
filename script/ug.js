/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 31.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 750                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ug.js 750 2025-09-21 14:18:43Z                           $ #
//#                                                                                 #
//###################################################################################
?> ug */
//<? require_once('system/websockets.js') ?>

timezoneJS.timezone.zoneFileBasePath = 'resources/tz';
timezoneJS.timezone.defaultZoneFile = ['europe.txt'];
timezoneJS.timezone.init({async: true});

p.page.load = function() {
	p.menuStd.init();
	getTrendDataMudda();
	// p.getValues();
	ws.connect();
	$('#ergTemp').on('click', '.legendLabel', function() {
		var id = $(this).find('span').attr('data-id');
		plotdataTemp.forEach((element, i) => {
			if(element.id == id) {
				plotdataTemp[i].lines.show = !plotdataTemp[i].lines.show;
				printPlotDataTemp();
			}
		});
		plotdataTemp.forEach((element, i) => {
			if(plotdataTemp[i].lines.show) {
				$('#ergTemp span[data-id=' + element.id + ']').removeClass('ps-fontgrey');
			} else {
				$('#ergTemp span[data-id=' + element.id + ']').addClass('ps-fontgrey');
			}
		});
	});
	$('#ergHum').on('click', '.legendLabel', function() {
		var id = $(this).find('span').attr('data-id');
		plotdataHum.forEach((element, i) => {
			if(element.id == id) {
				plotdataHum[i].lines.show = !plotdataHum[i].lines.show;
				printPlotDataHum();
			}
		});
		plotdataHum.forEach((element, i) => {
			if(plotdataHum[i].lines.show) {
				$('#ergHum span[data-id=' + element.id + ']').removeClass('ps-fontgrey');
			} else {
				$('#ergHum span[data-id=' + element.id + ']').addClass('ps-fontgrey');
			}
		});
	});
};
const WZT = 1114;
const WZH = 1115;
const SZT = 1186;
const SZH = 1183;
const BUT = 1145;
const BUH = 1146;
const KUT = 1200;
const KUH = 1201;
const FLT = 1517;
const FLH = 1518;
const BAT = 1182;
const BAH = 1179;
const KZT = 1153;
const KZH = 1151;
function getTrendDataMudda() {
	var objTemp = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [WZT, SZT, BUT, KUT, FLT, BAT, KZT],
		useminmax: 'frompoint',
		only1axes: 'True'
	};
	$.post('std.trend.req', objTemp, function(data) {
		data.plotdata.forEach((element) => element.label = element.label.replace(/=.*/, ""));
		plotdataTemp = data.plotdata;
		data.plotoptions.legend = {
			show:true,
			backgroundColor: '#555',
			backgroundOpacity: 0.8,
			position: 'nw',
			labelFormatter: function(label, series) {
				return '<span data-id="' + series.id + '">' + label + '</span>';
			}
		};
		plotoptionsTemp = data.plotoptions;
		printPlotDataTemp();
	}, 'json');
	var objHum = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [WZH, SZH, BUH, KUH, FLH, BAH, KZH],
		useminmax: 'frompoint',
		only1axes: 'True'
	};
	$.post('std.trend.req', objHum, function(data) {
		data.plotdata.forEach((element) => element.label = element.label.replace(/=.*/, ""));
		plotdataHum = data.plotdata;
		data.plotoptions.legend = {
			show:true,
			backgroundColor: '#555',
			backgroundOpacity: 0.8,
			position: 'nw',
			labelFormatter: function(label, series) {
				return '<span data-id="' + series.id + '">' + label + '</span>';
			}
		};
		plotoptionsHum = data.plotoptions;
		printPlotDataHum();
	}, 'json');
}
var plotTemp = null;
var plotdataTemp;
var plotoptionsTemp;
function printPlotDataTemp() {
	if(plotTemp == null) {
		plotTemp = $.plot($('#ergTemp'), plotdataTemp, plotoptionsTemp);
	} else {
		plotTemp.setData(plotdataTemp);
		plotTemp.setupGrid(plotoptionsTemp);
		plotTemp.draw();
	}
}
var plotHum = null;
var plotdataHum;
var plotoptionsHum;
function printPlotDataHum() {
	if(plotHum == null) {
		plotHum = $.plot($('#ergHum'), plotdataHum, plotoptionsHum);
	} else {
		plotHum.setData(plotdataHum);
		plotHum.setupGrid(plotoptionsHum);
		plotHum.draw();
	}
}
