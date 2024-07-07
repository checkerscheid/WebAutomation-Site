/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 14.01.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 657                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: overview_parameter.js 657 2024-07-07 21:24:59Z           $ #
//#                                                                                 #
//###################################################################################
?> uebersicht_parameter */

//p.log.level = p.log.type.info;

//<? require_once('system/websockets.js') ?>

p.page.load = function() {
	$('#uebersicht_parameter').on('click', '.pa-EinAus.ps-parambool', function() {
		var headline = $(this).attr('data-popup');
		$.post('std.truefalseohnehandauto.pop', {elem:$(this).attr('data-value'), type:'EinAus', headline:headline, dataTrue:'Sommerbetrieb', dataFalse:'Heizbetrieb'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Parameter', modal: true, width: '300px', buttons:null
			});
		});
	});
	$('#uebersicht_parameter').on('click', '.ps-param', function() {
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
	$('#uebersicht_parameter').on('click', '.set-wz', function() { $.get('uebersicht_parameter.set_wz.req') });
	$('#uebersicht_parameter').on('click', '.unset-wz', function() { $.get('uebersicht_parameter.unset_wz.req') });
	$('#uebersicht_parameter').on('click', '.set-wb', function() { $.get('uebersicht_parameter.set_wb.req') });
	$('#uebersicht_parameter').on('click', '.unset-wb', function() { $.get('uebersicht_parameter.unset_wb.req') });
	$('#uebersicht_parameter').on('click', '.pia-wn', function() { $.get('uebersicht_parameter.pia_wn.req') });
	$('#uebersicht_parameter').on('click', '.pia-we', function() { $.get('uebersicht_parameter.pia_we.req') });
	$('#uebersicht_parameter').on('click', '.pia-wnwe', function() { $.get('uebersicht_parameter.pia_wnwe.req') });
	
	$('#uebersicht_parameter').on('click', '.darkmode', function() {
		if($('html').hasClass('black')) {
			$('html').removeClass('black');
			$(this).text('Darkmode');
			p.page.setsession('Whitemode', 1);
		} else {
			$('html').addClass('black');
			$(this).text('Whitemode');
			p.page.setsession('Whitemode', 0);
		}
	});
	p.getValues();
	
	ws.connect();
};
