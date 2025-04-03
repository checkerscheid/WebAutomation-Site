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
//# Revision     : $Rev:: 732                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: eghzg.js 732 2025-04-03 16:39:02Z                        $ #
//#                                                                                 #
//###################################################################################
?> eghzg */
//<? require_once('system/websockets.js') ?>
ws.logEnabled = true;

p.page.load = function() {
	$('#eghzg').on('click', '.pa-EinAus.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		$.post('std.wstruefalse.pop', {elem:id, headline:headline, type:'AufZu'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Ventilbedienung', modal: true, width: '300px'
			});
			ws.register();
		});
	});
	$('#eghzg').on('click', '.ps-param', function() {
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
