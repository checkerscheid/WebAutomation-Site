/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 07.07.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 748                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia_parameter.js 748 2025-07-07 14:20:45Z                $ #
//#                                                                                 #
//###################################################################################
?> pia_parameter */
p.page.load = function() {
	// p.getValues();
	$('#pia_parameter').on('click', '.SetKZKE', function() {
		var newName = {
			ww: $('.KZ_KE_L').val(),
			cw: $('.KZ_KE_R').val()
		};
		$.post('pia_parameter.setChanelName.req', newName, function(data) {

		});
	});
};
