/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 30.09.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 701                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: eg_hzg.js 701 2024-10-14 00:14:32Z                       $ #
//#                                                                                 #
//###################################################################################
?> eg_hzg */
//<? require_once('system/websockets.js') ?>
ws.logEnabled = true;

p.page.load = function() {
	$('#eg_hzg').on('click', '.pa-EinAus.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		$.post('std.wstruefalse.pop', {elem:id, headline:headline, type:'AufZu'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Ventilbedienung', modal: true, width: '300px'
			});
			ws.register();
		});
	});
	$('#eg_hzg').on('click', '.ps-param', function() {
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
	// p.getValues();
	ws.connect();
};
