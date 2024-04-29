/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 01.11.2023                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: systemeinstellung.js 582 2024-04-10 06:45:45Z            $ #
//#                                                                                 #
//###################################################################################
?> systemeinstellung */
p.page.load = function() {
	$('#systemeinstellung').on('click', '.ps-param', function() {
		var headline = $(this).attr('data-popup');
		var elem = $(this).attr('data-value');
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
	$('#systemeinstellung').on('click', '.wpSetDebug', function() {
		$.post('std.request.wpSetDebug.req', {wpDebug: $(this).attr('data-wpDebug')}, function(data) {
			if(data.erg == 'S_OK') {
				getDebugValues();
				//p.page.alert(data.msg);
			} else p.page.alertred(data.msg);
		}, 'json');
	});
	getDebugValues();
	p.getValues();
};
function getDebugValues() {
	$.get('std.request.wpGetDebug.req', function(data) {
		for(const [key, value] of Object.entries(data)) {
			if(value) $('[data-wpDebug=' + key + ']').addClass('bm');
			else $('[data-wpDebug=' + key + ']').removeClass('bm');
		}
	}, 'json');
}
