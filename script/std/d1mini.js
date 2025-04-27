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
//# Revision     : $Rev:: 730                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1mini.js 730 2025-03-30 13:24:07Z                       $ #
//#                                                                                 #
//###################################################################################
use system\std
?> d1mini */
//<? require_once('script/system/websockets.js') ?>
//<? require_once('script/system/wpNeoPixel.js') ?>
//<? require_once('script/system/wpCwWw.js') ?>
//<? require_once('script/system/wpAnalogOut.js') ?>


var d1MiniWs = {
	logEnabled: false,
	connection: null,
	connectionstring: null,
	connect: function() {
		d1MiniWs.connection = new WebSocket(d1MiniWs.connectionstring);
		d1MiniWs.connection.onopen = function(e) { d1MiniWs.onopen(e) };
		d1MiniWs.connection.onmessage = function(e) { d1MiniWs.onmessage(e); };
		d1MiniWs.connection.onclose = function(e) { d1MiniWs.onclose(e); };
		$(window).on('unload', function() {
			d1MiniWs.connection.close(1000, '`unload` event fired');
		});
		$(window).on('beforeunload', function(){
			d1MiniWs.connection.close(1000, '`beforeunload` event fired');
		});
	},
	onopen: function(e) {
		d1MiniWs.log('Connection opened', e);
	},
	onmessage: function(e) {
		const d = d1MiniWs.tryParseJSONObject(e.data);
		d1MiniWs.log('Message recieved', d);
		if(typeof d.cmd != 'undefined') {
			if(d.cmd == 'updateProgress') {
				$('.progressContainer').removeClass('ps-hidden');
				$('.progress').width(d.percent.replace(/\s/g, ''));
				$('.progressVal').text(d.percent);
			}
		}
		if(typeof d.msgheader != 'undefined') {
			$('.logContainer').removeClass('ps-hidden');
			$('.d1MiniLog').prepend('<p><span class="' + d.cssClass + '">' + d.msgheader + '</span><span>' + d.msgbody + '</span></p>');
		}
	},
	onclose: function(e) {
		d1MiniWs.log('Connection closed', e);
	},
	log: function(msg, e) {
		if(d1MiniWs.logEnabled) console.log(msg, e);
	},
	tryParseJSONObject: function(jsonString) {
		try {
			var o = JSON.parse(jsonString);
			if (o && typeof o === "object") {
				return o;
			}
		}
		catch (e) { }
		return false;
	}
};

ws.logEnabled = true;
d1MiniWs.logEnabled = true;
p.page.load = function() {
	wpNeoPixel.Init('std.d1mini');
	wpCwWw.Init('std.d1mini');
	wpAnalogOut.Init('std.d1mini');
	// ?? warum war das? $.get('std.d1mini.getD1MiniSettings.<?=std::gets("param1")?>.req');
	$('.buttonContainer').on('click', '.SetCmd', function() {
		var ip = $('#storedIP').attr('data-ip');
		var cmd = $(this).attr('data-cmd');
		$.post('std.d1mini.setcmd.req', {ip:ip, cmd:cmd});
	});
	$('#d1mini').on('click', '.SetName', function() {
		var ip = $('#storedIP').attr('data-ip');
		var cmd = 'SetDeviceName';
		var newName = $('.newName').val();
		if(typeof newName != 'undefined' && newName != '') {
			cmd += '&newName=' + newName;
		}
		$.post('std.d1mini.setcmd.req', {ip:ip, cmd:cmd});
	});
	$('#d1mini').on('click', '.SetDescription', function() {
		var ip = $('#storedIP').attr('data-ip');
		var cmd = 'SetDeviceName';
		var newDescription = $('.newDescription').val();
		if(typeof newDescription != 'undefined' && newDescription != '') {
			cmd += '&newDescription=' + newDescription;
		}
		$.post('std.d1mini.setcmd.req', {ip:ip, cmd:cmd});
	});
	$('#d1mini').on('click', '.SetChanel', function() {
		var ip = $('#storedIP').attr('data-ip');
		var cmd = 'SetUpdateChanel&newUpdateChanel=' + $('.newChanel').val();
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
	$('.topic-slider').slider({
		min: 0,
		max: 100,
		start: function() {
			$(this).addClass('WriteOnly');
			$(this).find('a').append('<span class="toleft"></span>');
		},
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $(this).find('span.toleft');
			$(TheSpan).text(TheValue);
		},
		stop: function(event, ui) {
			const topic = $(this).attr('data-topic');
			$.post('std.d1mini.writetopic.req', {topic:topic, value:ui.value});
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
	$('.page').on('click', '.ps-param', function() {
		const that = $(this)
		const topic = $(this).attr('data-topic');
		const unit = $(this).attr('data-unit') ? $(this).attr('data-unit') : '';
		const value = $(this).text().replace(' ' + unit, '').trim();
		$.post('std.write.pop', {headline:topic, unit:unit, value:value}, function(data) {
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
	$('.page').on('click', '.setUnderfloorWartung', function() {
		const wartung = {
			ip: $('#storedIP').attr('data-ip'),
			id: $(this).attr('data-id')
		}
		$.post('std.d1mini.setUnderfloorWartung.req', wartung, function(data) {
			if(data.erg != 'S_OK') {
				p.page.alertError(data.msg);
			}
		}, 'json');
	});
	ws.connect();
	
	d1MiniWs.connectionstring = 'ws://' + $('#storedIP').attr('data-ip') + '/ws',
	d1MiniWs.connect();
};

