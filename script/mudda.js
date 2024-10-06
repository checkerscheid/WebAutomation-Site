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
//# Revision     : $Rev:: 696                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mudda.js 696 2024-10-06 19:11:29Z                        $ #
//#                                                                                 #
//###################################################################################
?> mudda */
//<? require_once('system/websockets.js') ?>
ws.logEnabled = false;

timezoneJS.timezone.zoneFileBasePath = 'system/tz';
timezoneJS.timezone.defaultZoneFile = ['europe.txt'];
timezoneJS.timezone.init({async: true});

p.page.load = function() {
	$('#mudda').on('click', '.pa-EinAus.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		$.post('std.wstruefalse.pop', {elem:id, headline:headline, type:'AufZu'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Ventilbedienung', modal: true, width: '300px'
			});
			ws.register();
		});
	});
	$('#mudda').on('click', '.ps-param', function() {
		var obj = {
			name: $(this).attr('data-wswrite'),
			headline: $(this).attr('data-popup')
		};
		$.post('wsparam.pop', obj, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Parameter', modal: true, width: '300px',
				buttons: {
					abbrechen: {
						text: 'Abbrechen',
						click: function() {
							$('#dialog').dialog('close');
						}
					},
					speichern: {
						text: 'speichern',
						click: function() {
							p.automation.wswrite($('#numpad').attr('data-id'), $('#oskinput').val());
							$('#dialog').dialog('close');
						}
					}
				
				}
			});
		});
	});
	$('#mudda').on('click', '.cleanMyTrends', function() {
		$.get('mudda.cleanMyTrends.req', function(data) {
			if(data.erg == 'S_OK') {
				getTrendDataMudda();
			}
		}, 'json');
	});
	getTrendDataMudda();
	ws.connect();
	p.getValues();
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
		data.plotdata.forEach((element) => element.label = element.label.replace(/=.*/, ""));
		plotdataTemp = data.plotdata;
		data.plotoptions.legend = {
			show:true,
			backgroundColor: '#555',
			backgroundOpacity: 0.8
		};
		plotoptionsTemp = data.plotoptions;
		printPlotDataTemp();
	}, 'json');
	var objHum = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [1095,1076,1078], //,1123
		useminmax: 'frompoint',
		only1axes: 'True'
	};
	$.post('std.trend.req', objHum, function(data) {
		data.plotdata.forEach((element) => element.label = element.label.replace(/=.*/, ""));
		plotdataHum = data.plotdata;
		data.plotoptions.legend = {
			show:true,
			backgroundColor: '#555',
			backgroundOpacity: 0.8
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
