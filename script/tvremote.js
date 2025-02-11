/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 10.02.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 718                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: tvremote.js 718 2025-02-11 05:57:26Z                     $ #
//#                                                                                 #
//###################################################################################
?> tvremote */
p.page.load = function() {
	// p.getValues();
	$('.tvbutton').on('click', function() {
		const params = {
			name: $('.tvName').val(),
			button: $(this).attr('data-tvbutton')
		}
		$.post('tvremote.button.req', params, function(data) {
			p.page.message(data.message);
		}, 'json');
	});
	$('.tvdienst').on('click', function() {
		const params = {
			name: $('.tvName').val(),
			button: $(this).attr('data-tvbutton')
		}
		$.post('tvremote.dienst.req', params, function(data) {
			p.page.message(data.message);
		}, 'json');
	});
	$('.tvrichtung').on('click', function() {
		const params = {
			name: $('.tvName').val(),
			button: $(this).attr('data-tvbutton')
		}
		$.post('tvremote.richtung.req', params, function(data) {
			p.page.message(data.message);
		}, 'json');
	});
};
