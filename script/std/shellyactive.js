/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 16.12.2019                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 562                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shellyactive.js 562 2024-01-16 02:08:14Z                 $ #
//#                                                                                 #
//###################################################################################
?> shelly */

var ShellyIP;

p.page.load = function() {
	p.getValues();
	$('#shelly').on('click', '.ps-button.scan', function() {
		$('.ShellyIp').val('');
		var ShellyIpFrom = $('.ShellyIpFrom').val();
		var ShellyIpTo = $('.ShellyIpTo').val();
		$('#ergScan').html('').addClass('ps-loading');
		$.post('std.shelly.' + $(this).attr('data-method') + '.req', { ShellyIpFrom: ShellyIpFrom, ShellyIpTo: ShellyIpTo }, function(data) {
			$('#ergScan').html('<pre>' + data + '</pre>').removeClass('ps-loading');
		});
	});
	$('#shelly').on('click', '.ps-button.get', function() {
		ShellyIP = $('.ShellyIp').val();
		$('#erg').html('').addClass('ps-loading');
		$.post('std.shelly.' + $(this).attr('data-method') + '.req', { ShellyIP: ShellyIP }, function(data) {
			$('#erg').html('<pre>' + data + '</pre>').removeClass('ps-loading');
		});
	});
	$('#shelly').on('click', '.ps-button.set', function() {
		ShellyIP = $('.ShellyIp').val();
		$('#erg').html('').addClass('ps-loading');
		var key = 'name';
		var value = $('.ShellyRelayName').val();
		$.post('std.shelly.' + $(this).attr('data-method') + '.req', { ShellyIP: ShellyIP, key: key, value: value }, function(data) {
			$('#erg').html('<pre>' + data + '</pre>').removeClass('ps-loading');
		});
	});
	$('#shelly').on('click', '.configThis', function() {
		$('.ShellyIp').val($(this).text());
	});
};


