/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.04.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 646                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mudda.js 646 2024-07-06 18:12:08Z                        $ #
//#                                                                                 #
//###################################################################################
?> mudda */
<? require_once('system/websockets.js') ?>
ws.logEnabled = false;
p.page.load = function() {
	getTrendDataMudda();
	ws.connect();
};
function getTrendDataMudda() {
	var objTemp = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [1096,1077,1079], //,1033
		useminmax: 'frompoint',
		only1axes: 'True'
	};
	$.post('std.trend.req', objTemp, function(data) {
		plotdataTemp = getPlotData();
		plotoptionsTemp = getPlotOptions();
		plotoptionsTemp.legend = {container:$('.trendlegendTemp')};
		printPlotDataTemp();
		$('.trendlegendTemp .legendLabel').each(function() {
			$(this).text($(this).text().replace(/=.*/, ""));
			//$(this).text($(this).text());
		});
	}, 'script');
	var objHum = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [1095,1076,1078], //,1123
		useminmax: 'frompoint',
		only1axes: 'True'
	};
	$.post('std.trend.req', objHum, function(data) {
		plotdataHum = getPlotData();
		plotoptionsHum = getPlotOptions();
		plotoptionsHum.legend = {container:$('.trendlegendHum')};
		printPlotDataHum();
		$('.trendlegendHum .legendLabel').each(function() {
			$(this).text($(this).text().replace(/=.*/, ""));
			//$(this).text($(this).text());
		});
	}, 'script');
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