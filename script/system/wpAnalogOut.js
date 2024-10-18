/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 01.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 703                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpAnalogOut.js 703 2024-10-18 23:17:50Z              $ #
//#                                                                                 #
//###################################################################################
?> wpCwWw */

var wpAnalogOut = {
	ip: null,
	target:null,
	Init: function(target) {
		wpAnalogOut.ip = $('.wpAnalogOut').attr('data-ip');
		wpAnalogOut.target = target;
		wpAnalogOut.Register();
	},
	Register: function() {
		$('.setAnalogOutPidType').on('click', function() {
			const pidtype = {
				ip: wpAnalogOut.ip,
				id: $('.AnalogOutPidType').val()
			};
			$.post(wpAnalogOut.target + '.AnalogOutPidType.req', pidtype, function(data) {
			}, 'json');
		});
	}
};
