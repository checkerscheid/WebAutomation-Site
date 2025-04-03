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
//# Revision     : $Rev:: 732                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ughzg.js 732 2025-04-03 16:39:02Z                        $ #
//#                                                                                 #
//###################################################################################
?> ughzg */
//<? require_once('system/websockets.js') ?>

ws.logEnabled = true;

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
	p.getValues();
	ws.connect();
};
