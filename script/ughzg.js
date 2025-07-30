/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.10.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 747                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ughzg.js 747 2025-07-07 14:14:56Z                        $ #
//#                                                                                 #
//###################################################################################
?> ughzg */
//<? require_once('system/websockets.js') ?>

ws.logEnabled = true;

timezoneJS.timezone.zoneFileBasePath = 'resources/tz';
timezoneJS.timezone.defaultZoneFile = ['europe.txt'];
timezoneJS.timezone.init({async: true});

p.page.load = function() {
	$('#ughzg').on('click', '.pa-EinAus.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		$.post('std.truefalse.pop', {elem:id, headline:headline, type:'AufZu'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Ventilbedienung', modal: true, width: '300px',
				buttons: null
			});
		});
	});
	$('#ughzg').on('click', '.pa-Analog.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		p.popup.title = 'Ventilbedienung';
		p.popup.AnalogSchieberegler(headline, id);
	});
	$('#ughzg').on('click', '.ps-input.ps-operable.zp', function() {
		var dpType = 'VT_BOOL';
		if($(this).attr('data-bm') == 'KZ_ZP_RM') dpType = 'SW';
		var point = $(this).attr('data-zp');
		var unit = 'True:Normalbetrieb;False:Absenkbetrieb;';
		$.post('std.calendaredit.popupwriteitem.req', {headline:point,type:dpType,unit:unit}, function(data) {
			firstclick = true;
			$('#dialog').html(data).dialog({
				title: 'Sollwert', modal: true, width: p.popup.width.std,
				buttons: [{
					text: 'speichern',
					click: function() {
						var value = $.trim($('#calendarwriteitem').val());
						p.automation.write(point, value);
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	// Kinderzimmer VT_MAX, Geräuschminimierung
	$('#ughzg').on('click', '.ps-param', function() {
		var headline = $(this).attr('data-popup');
		var elem = $(this).attr('id');
		$.post('paramnumpad.pop', {elem:elem, id:elem, headline:headline}, function(data) {
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
							p.automation.write($('#numpad').attr('data-id'), $('#oskinput').val());
							$('#dialog').dialog('close');
						}
					}
				
				}
			});
		});
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
	getTrendDataUgHzg();
	p.getValues();
	ws.connect();
};

const WZT = 1114;
const SZT = 1186;
const BUT = 1145;
const KUT = 1200;
const FLT = 1517;
const BAT = 1182;
const KZT = 1153;
const WZH = 1115;
const SZH = 1183;
const BUH = 1146;
const KUH = 1201;
const FLH = 1518;
const BAH = 1179;
const KZH = 1151;
function getTrendDataUgHzg() {
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
