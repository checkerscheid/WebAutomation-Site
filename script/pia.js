/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 27.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 693                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia.js 693 2024-08-11 22:32:17Z                          $ #
//#                                                                                 #
//###################################################################################
use system\std
?> pia */
//<? require_once('script/system/websockets.js') ?>
//<? require_once('script/system/wpNeoPixel.js') ?>
//<? require_once('script/system/wpRGB.js') ?>
ws.logEnabled = true;
p.page.load = function() {
	wpNeoPixel.Init('pia');
	wpRGB.Init('pia');
	$('#pia').on('click', '.ps-input.ps-operable.zp', function() {
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
	$('#pia').on('click', '.pa-Analog.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		p.popup.title = 'Ventilbedienung';
		p.popup.AnalogSchieberegler(headline, id);
	});
	ws.connect();
	p.getValues();
};
