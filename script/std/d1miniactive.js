/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 03.04.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 593                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1miniactive.js 593 2024-04-29 17:50:03Z                 $ #
//#                                                                                 #
//###################################################################################
?> d1miniactive */

p.page.load = function() {
//###################################################################################
	$('.D1MiniDevice').on('click', '.ps-refresh', function() {
		var tr = $(this).parents('tr:first');
		var td = $(this).parents('td:first');
		var id = $(tr).attr('data-id');
		var column = $(td).attr('data-column');
		var value = $(td).find('.smallfont.' + column).text();
		$.post('std.d1miniactive.updateColumn.req', {id:id, column:column, value:value}, function() {
			$(td).find('.stored').text(value);
			$(td).find('.ps-refresh').addClass('ps-hidden');
			$(td).find('.smallfont').addClass('ps-hidden');
		});
	});
	$('.D1MiniDevice').on('click', '.forceupdate', function() {
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		$.post('std.d1miniactive.setcmd.req', {name:name,cmd:'ForceMqttUpdate'}, function(data) {
			if(data == 'S_OK') D1MiniRenew();
		});
	});
	$('.D1MiniDevice').on('click', '.setupmode', function() {
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		$.post('std.d1miniactive.setcmd.req', {name:name,cmd:'UpdateFW'}, function(data) {
			if(data == 'S_OK') D1MiniRenew();
		});
	});
	$('.D1MiniDevice').on('click', '.restartdevice', function() {
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		$.post('std.d1miniactive.setcmd.req', {name:name,cmd:'RestartDevice'});
	});
//###################################################################################
	D1MiniRenew();
	//p.getValues();
};

function D1MiniRenew() {
	$.get('std.d1miniactive.getalld1minisettings.req', function(data) {
		for (const [key, value] of Object.entries(data)) {
			var mac = value.Mac.toLowerCase().replaceAll(':', '');
			setTextIfNotStored(key, 'name', value.DeviceName);
			setTextIfNotStored(key, 'description', value.DeviceDescription);
			setTextIfNotStored(key, 'ip', value.Ip);
			setTextIfNotStored(key, 'mac', mac);
			setTextIfNotStored(key, 'version', value.Version);
			setTextIfNotStored(key, 'ssid', value.Ssid);
			setTextIfNotStored(key, 'updatemode', value.UpdateMode);
		}
	}, 'json');
}
function setTextIfNotStored(name, column, givenValue) {
	var td = $(`tr[data-name=${name}] td[data-column=${column}]`);
	$(td).find('.ps-refresh').addClass('ps-hidden');
	$(td).find(`.${column}`).addClass('ps-hidden');
	var storedValue = $(td).find('.stored').text();
	if(givenValue != storedValue) {
		$(td).find('.ps-refresh').removeClass('ps-hidden');
		$(td).find(`.${column}`).text(givenValue).removeClass('ps-hidden');
	}
}
