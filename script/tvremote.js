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
//# Revision     : $Rev:: 719                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: tvremote.js 719 2025-02-13 12:27:37Z                     $ #
//#                                                                                 #
//###################################################################################
?> tvremote */
p.page.load = function() {
	// p.getValues();
	$('.tvonoff').on('click', function() {
		const params = {
			name: $('.tvName').val(),
			button: $(this).attr('data-tvbutton')
		}
		$.post('tvremote.onoff.req', params, function(data) {
			p.page.message(data.message);
		}, 'json');
	});
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
