/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 28.02.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 729                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_d1mini.js 729 2025-02-27 22:40:52Z                   $ #
//#                                                                                 #
//###################################################################################
?> d1mini */
//<? require_once('script/system/websockets.js') ?>

ws.logEnabled = true;
p.page.load = function() {
	ws.connect();
};
const updateChanel = {
	'clean': 99,
	'firmware': 0,
	'light': 1,
	'io': 2,
	'heating': 3,
	'rfid': 4
};
function wsInit() {
	$('.storedIp').each(function() {
		var ip = $(this).attr('data-ip');
		var question = {
			'command': 'getD1MiniJson',
			'data': ip
		};
		ws.send(question);
	});
}
function setD1MiniInfo(data) {
	console.log(data);
	var d1m = data.FreakaZoneDevice;
	var name = d1m.DeviceName;
	$('#' + name + ' .ps-hidden').removeClass('ps-hidden');
	$('#' + name).find('.d1mOffline').addClass('ps-hidden');
	$('#' + name).find('.d1mVersion').text(d1m.Version);
	$('#' + name).find('.d1mUpdateChanel').val(updateChanel[d1m.UpdateChanel]);
	$('#' + name).find('.d1mRestartReason').text(d1m.RestartReason);
	$('#' + name).find('.d1mBootCounter').text(d1m.BootCounter);
	$('#' + name).find('.d1mOnSince').text(d1m.OnSince);
	$('#' + name).find('.d1mOnDuration').text(d1m.OnDuration);
	$('#' + name).find('.d1mWiFiSince').text(d1m.WiFiSince);
	$('#' + name).find('.d1mMQTTSince').text(d1m.MQTTSince);
}
