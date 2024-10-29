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
//# Revision     : $Rev:: 704                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mudda.js 704 2024-10-20 17:29:04Z                        $ #
//#                                                                                 #
//###################################################################################
?> mudda */
//<? require_once('system/websockets.js') ?>
//<? require_once('script/system/wpAnalogOut.js') ?>
ws.logEnabled = false;

timezoneJS.timezone.zoneFileBasePath = 'system/tz';
timezoneJS.timezone.defaultZoneFile = ['europe.txt'];
timezoneJS.timezone.init({async: true});

p.page.load = function() {
	wpAnalogOut.Init('mudda');
	$('#mudda').on('click', '.pa-EinAus.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		$.post('std.wstruefalse.pop', {elem:id, headline:headline, type:'AufZu'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Ventilbedienung', modal: true, width: '300px',
				buttons: null
			});
			ws.register();
		});
	});
	$('.page').on('click', '.writeTopic', function() {
		const topic = $(this).attr('data-topic');
		const value = $(this).attr('data-write');
		$.post('mudda.writetopic.req', {topic:topic, value:value}, function(data) {
			
		});
	});
	$('#dialog').on('click', '.writeTopic', function() {
		const topic = $(this).attr('data-topic');
		const value = $(this).attr('data-write');
		const text = $(this).text();
		$.post('mudda.writetopic.req', {topic:topic, value:value}, function(data) {
			$('[data-topic="' + topic + '"]').text(text);
			$('#dialog').dialog('close');
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
	$('.topic-slider').slider({
		min: 0,
		max: 100,
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
			const topic = $(this).attr('data-topic');
			$.post('std.d1mini.writetopic.req', {topic:topic, value:ui.value});
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
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
	getTrendDataMudda();
	ws.connect();
	p.getValues();
};
const WGT = 1120;
const WGH = 1121;
const KUT = 1551;
const KUH = 1552;
const WZT = 1554;
const WZH = 1555;
const EST = 1545;
const ESH = 1546;
const BAT = 1548;
const BAH = 1549;
const SZT = 1117;
const SZH = 1118;
const EIT = 1542;
const EIH = 1543;
const FL2T = 1123;
const FL2H = 1124;
function getTrendDataMudda() {
	var objTemp = {
		time: 'last24Hours',
		choosen: 'timerange',
		ids: [WGT, KUT, WZT, EST, BAT, SZT, EIT, FL2T],
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
		ids: [WGH, KUH, WZH, ESH, BAH, SZH, EIH, FL2H],
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
