/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.06.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 666                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1mini.js 666 2024-07-10 19:43:40Z                       $ #
//#                                                                                 #
//###################################################################################
use system\std
?> d1mini */
//<? require_once('script/system/websockets.js') ?>
p.page.load = function() {
	$.get('std.d1mini.getD1MiniSettings.<?=std::gets("param1")?>.req');

	$('.buttonContainer').on('click', '.SetCmd', function() {
		var ip = $(this).attr('data-ip');
		var cmd = $(this).attr('data-cmd');
		$.post('std.d1mini.setcmd.req', {ip:ip, cmd:cmd});
	});
	
	$('.page').on('click', '.writeTopic', function() {
		const topic = $(this).attr('data-topic');
		const value = $(this).attr('data-write');
		$.post('std.d1mini.writetopic.req', {topic:topic, value:value}, function(data) {
			
		});
	});
	$('#dialog').on('click', '.writeTopic', function() {
		const topic = $(this).attr('data-topic');
		const value = $(this).attr('data-write');
		const text = $(this).text();
		$.post('std.d1mini.writetopic.req', {topic:topic, value:value}, function(data) {
			$('[data-topic="' + topic + '"]').text(text);
			$('#dialog').dialog('close');
		});
	});
	$('.page').on('click', '.ps-param', function() {
		const that = $(this)
		const topic = $(this).attr('data-topic');
		const unit = $(this).attr('data-unit');
		$.post('std.write.pop', {headline:topic, unit:unit}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Topic setzen',
				width: p.popup.width.std,
				buttons: [{
					text: 'schreiben',
					click: function() {
						const value = $('.popup .newDpVal').val();
						$.post('std.d1mini.writetopic.req', {topic:topic, value:value}, function(data) {
							if(data.erg == 'S_OK') {
								$(that).text(value + ' ' + unit);
								$('#dialog').dialog('close');
							} else if(data.erg == 'S_WARNING') {
								p.page.alertWarning(data.msg);
							} else if(data.erg == 'S_ERROR') {
								p.page.alertError(data.msg);
							}
						}, 'json');
					}
				}, {
					text: 'Abbrechen',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	$('.page').on('click', '.ps-parambool', function() {
		const that = $(this)
		const topic = $(this).attr('data-topic');
		const unit = $(this).attr('data-unit');
		$.post('std.writebool.pop', {topic:topic, unit:unit}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Topic setzen',
				width: p.popup.width.std,
				buttons: null
			});
		});
	});
	ws.connect();
};
