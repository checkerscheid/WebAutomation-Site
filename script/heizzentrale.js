/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 02.04.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 733                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: heizzentrale.js 733 2025-04-16 03:01:56Z                 $ #
//#                                                                                 #
//###################################################################################
?> heizzentrale */

//<? require_once('system/websockets.js') ?>

ws.logEnabled = true;

timezoneJS.timezone.zoneFileBasePath = 'resources/tz';
timezoneJS.timezone.defaultZoneFile = ['europe.txt'];
timezoneJS.timezone.init({async: true});

p.page.load = function() {
	$('#ergTrend').on('click', '.legendLabel', function() {
		var id = $(this).find('span').attr('data-id');
		plotdata.forEach((element, i) => {
			if(element.id == id) {
				plotdata[i].lines.show = !plotdata[i].lines.show;
				printPlotData();
			}
		});
		plotdata.forEach((element, i) => {
			if(plotdata[i].lines.show) {
				$('#ergTrend span[data-id=' + element.id + ']').removeClass('ps-fontgrey');
			} else {
				$('#ergTrend span[data-id=' + element.id + ']').addClass('ps-fontgrey');
			}
		});
	});
	$('#ergTrendValve').on('click', '.legendLabel', function() {
		var id = $(this).find('span').attr('data-id');
		plotdataValve.forEach((element, i) => {
			if(element.id == id) {
				plotdataValve[i].lines.show = !plotdataValve[i].lines.show;
				printPlotDataValve();
			}
		});
		plotdataValve.forEach((element, i) => {
			if(plotdataValve[i].lines.show) {
				$('#ergTrendValve span[data-id=' + element.id + ']').removeClass('ps-fontgrey');
			} else {
				$('#ergTrendValve span[data-id=' + element.id + ']').addClass('ps-fontgrey');
			}
		});
	});
	$('#heizzentrale').on('click', '.cleanTrends', function() {
		$.get('heizzentrale.cleanTrends.req', function(data) {
			if(data.erg == 'S_OK'){
				getTrendDataHeizzentrale();
			}
		}, 'json');
	});
	// p.getValues();
	ws.connect();
	getTrendDataHeizzentrale();
	getTrendDataVentile();
};
const RVL = 1605;
const RRL = 1604;
const FVL = 1606;
const FRL = 1607;

function getTrendDataHeizzentrale() {
	var objTemp = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [RVL, RRL, FVL, FRL],
		useminmax: 'frompoint',
		only1axes: 'True'
	};
	$.post('std.trend.req', objTemp, function(data) {
		data.plotdata.forEach((element) => element.label = element.label.replace(/=.*/, ""));
		plotdata = data.plotdata;
		data.plotoptions.legend = {
			show:true,
			backgroundColor: '#555',
			backgroundOpacity: 0.8,
			position: 'nw',
			labelFormatter: function(label, series) {
				return '<span data-id="' + series.id + '">' + label + '</span>';
			}
		};
		plotoptions = data.plotoptions;
		printPlotData();
	}, 'json');
}
var plot = null;
var plotdata;
var plotoptions;
function printPlotData() {
	if(plot == null) {
		plot = $.plot($('#ergTrend'), plotdata, plotoptions);
	} else {
		plot.setData(plotdata);
		plot.setupGrid(plotoptions);
		plot.draw();
	}
}

const EG_SZ = 1582;
const UG_KZ = 1031;
const EG_KU = 1532;
const EG_FL_ES = 1537;
const EG_BA = 1538;
const EG_WZ_FE = 1534;
const EG_WZ_MI = 1533;
const EG_WZ_KA = 1535;
const EG_FL_EI = 1539;
const UG_WZ_FE = 1010;
const UG_WZ_KA = 1035;
const UG_SZ = 1013;
const UG_BU = 1020;
const UG_KU = 1016;
const UG_BA = 1032;

function getTrendDataVentile() {
	var objTemp = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [EG_SZ, UG_KZ, EG_KU, EG_FL_ES, EG_BA, EG_WZ_FE, EG_WZ_MI, EG_WZ_KA, EG_FL_EI, UG_WZ_FE, UG_WZ_KA, UG_SZ, UG_BU, UG_KU, UG_BA],
		useminmax: 'minmax',
		only1axes: 'True'
	};
	$.post('std.trend.req', objTemp, function(data) {
		data.plotdata.forEach((element) => element.label = element.label.replace(/=.*/, ""));
		plotdataValve = data.plotdata;
		data.plotoptions.legend = {
			show:true,
			backgroundColor: '#555',
			backgroundOpacity: 0.8,
			position: 'nw',
			labelFormatter: function(label, series) {
				return '<span data-id="' + series.id + '">' + label + '</span>';
			}
		};
		plotoptionsValve = data.plotoptions;
		printPlotDataValve();
	}, 'json');
}
var plotValve = null;
var plotdataValve;
var plotoptionsValve;
function printPlotDataValve() {
	if(plotValve == null) {
		plotValve = $.plot($('#ergTrendValve'), plotdataValve, plotoptionsValve);
	} else {
		plotValve.setData(plotdataValve);
		plotValve.setupGrid(plotoptionsValve);
		plotValve.draw();
	}
}
