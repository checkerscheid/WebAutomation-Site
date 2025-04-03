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
//# Revision     : $Rev:: 732                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: heizzentrale.js 732 2025-04-03 16:39:02Z                 $ #
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