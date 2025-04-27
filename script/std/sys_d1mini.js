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
//# Revision     : $Rev:: 734                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_d1mini.js 734 2025-04-25 19:30:07Z                   $ #
//#                                                                                 #
//###################################################################################
?> d1mini */
//<? require_once('script/system/websockets.js') ?>

ws.logEnabled = true;
p.page.load = function() {
	ws.connect();
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
	$('#' + name).find('.wpa-rssi').removeClass('ps-hidden');
	$('#' + name).find('.d1mOffline').addClass('ps-hidden');
	$('#' + name).find('.d1mVersion').text(d1m.Version);
	$('#' + name).find('.d1mUpdateChanel').text(d1m.UpdateChanel);
	$('#' + name).find('.d1mRestartReason').text(d1m.RestartReason);
	$('#' + name).find('.d1mBootCounter').text(d1m.BootCounter);
	var sinceText =
		'OnSince:  \t' + d1m.OnSince + '\r\n' +
		'WiFiSince:\t' + d1m.WiFiSince + '\r\n' +
		'MQTTSince:\t' + d1m.MQTTSince;		
	//$('#' + name).find('.d1mOnSince').text(d1m.OnSince);
	$('#' + name).find('.d1mOnDuration').text(d1m.OnDuration).attr('title', sinceText);
	//$('#' + name).find('.d1mWiFiSince').text(d1m.WiFiSince);
	//$('#' + name).find('.d1mMQTTSince').text(d1m.MQTTSince);
}
