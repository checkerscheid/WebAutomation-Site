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
//# Revision     : $Rev:: 737                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uebersicht_parameter.js 737 2025-05-01 20:16:09Z         $ #
//#                                                                                 #
//###################################################################################
?> uebersicht_parameter */

//p.log.level = p.log.type.info;

//<? require_once('system/websockets.js') ?>

p.page.load = function() {
	$('#uebersicht_parameter').on('click', '.pa-EinAus.ps-parambool', function() {
		var headline = $(this).attr('data-popup');
		$.post('uebersicht_parameter.pop_summer.req', {elem:$(this).attr('data-value'), headline:headline}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Parameter', modal: true, width: '300px', buttons:null
			});
		});
	});
	$('#dialog').on('click', '.setSummer', function() {
		$.post('uebersicht_parameter.set_summer.req', {summer:1}, function(data) {
			if(data.erg == 'S_OK') {
				p.page.alert(data.message);
				$('#dialog').dialog('close');
			}
		}, 'json');
	});
	$('#dialog').on('click', '.setWinter', function() {
		$.post('uebersicht_parameter.set_summer.req', {summer:0}, function(data) {
			if(data.erg == 'S_OK') {
				p.page.alert(data.message);
				$('#dialog').dialog('close');
			}
		}, 'json');
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
