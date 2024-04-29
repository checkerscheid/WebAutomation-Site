/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.06.2021                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 587                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: websockets.js 587 2024-04-15 23:04:17Z                   $ #
//#                                                                                 #
//###################################################################################
use system\Helper\wpa;
require_once 'system/Helper/wpa.psys';
?> websockets */

var ws = {
	logEnabled: false,
	connection: null,
	connectionstring: 'ws://192.168.80.203/Remote',
	registered: [],
	toalive: null,
	alive: 0,
	connect: function() {
		ws.connection = new WebSocket(ws.connectionstring);
		ws.connection.onopen = function(e) { ws.onopen(e) };
		ws.connection.onmessage = function(e) { ws.onmessage(e); };
		ws.connection.onclose = function(e) { ws.onclose(e); };
		$(window).on('unload', function() {
			ws.connection.close(1000, '`unload` event fired');
		});
		$(window).on('beforeunload', function(){
			ws.connection.close(1000, '`beforeunload` event fired');
		});
	},
	register: function() {
		ws.toalive = setInterval(function() {
			if(ws.alive++ > 10) {
				ws.connection.send('PING');
				ws.log('PING');
			}
			if(ws.alive > 15) {
				ws.connection.close(1000, 'Timeout');
				ws.error('close, Timeout');
				ws.connect();
			}
		}, 1000);
		$.each($('[data-ws]'), function() {
			ws.registered.push($(this).attr('data-ws'));
		});
		var cmd = {
			'type': 'command',
			'command': 'addDatapoints',
			'data': ws.registered
		};
		ws.send(cmd);
	},
	onopen: function(e) {
		ws.register();
		ws.log(e);
	},
	onmessage: function(e) {
		ws.alive = 0;
		if(e.data == 'PONG') {
			ws.log(e.data);
		} else {
			var msg = {"data":[]};
			try {
				msg = JSON.parse(e.data);
			} catch(error) {
				console.error(error);
				ws.log(e.data);
			}
			$.each(msg.data, function() {
				var that = $(this)[0];
				ws.log(that);
				if($('[data-ws=' + that.name + ']').length) {
					$.each($('[data-ws=' + that.name + ']'), function() {
						var textTrue = $(this).attr('data-True');
						var textFalse = $(this).attr('data-False');
//###################################################################################
						if($(this).hasClass('<?=wpa::$GreyGreen ?>')) {
							if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
								$(this).removeClass('ps-green')
									.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
							} else {
								$(this).addClass('ps-green')
									.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
							}
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$GreyYellow ?>')) {
							if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
								$(this).removeClass('ps-yellow')
									.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
							} else {
								$(this).addClass('ps-yellow')
									.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
							}
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$GreyRed ?>')) {
							if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
								$(this).removeClass('ps-red')
									.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
							} else {
								$(this).addClass('ps-red')
									.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
							}
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$GreenRed ?>')) {
							if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
								$(this).removeClass('ps-red').addClass('ps-green')
									.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
							} else {
								$(this).removeClass('ps-green').addClass('ps-red')
									.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
							}
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$RedGreen ?>')) {
							if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
								$(this).removeClass('ps-green').addClass('ps-red')
									.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
							} else {
								$(this).removeClass('ps-red').addClass('ps-green')
									.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
							}
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$BlueYellow ?>')) {
							if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
								$(this).removeClass('ps-yellow').addClass('ps-blue')
									.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
							} else {
								$(this).removeClass('ps-blue').addClass('ps-yellow')
									.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
							}
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$rssi ?>')) {
							$(this).removeClass('rssi60 rssi70 rssi80 rssi90 rssi100 rssibat rssioff');
							var rssi = -1 * that.value;
							if(rssi == 0 || rssi == null) $(this).addClass('rssioff');
							if(rssi > 0 && rssi <= 70) $(this).addClass('rssi70');
							if(rssi > 70 && rssi <= 80) $(this).addClass('rssi80');
							if(rssi > 80 && rssi <= 90) $(this).addClass('rssi90');
							if(rssi > 90 && rssi <= 100) $(this).addClass('rssi100');
							if(rssi > 100) $(this).addClass('rssi110');
							$(this).text(that.valuestring);
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$indikator ?>')) {
							let indiTemp = {"m": 21, "n": 23.5, "p": 25};
							let indiHum = {"m": 37.5, "n": 45, "p": 50};
							$(this).removeClass('indi-m indi-0 indi-p indi-pp');
							let indi;
							let n = Number(that.value.replace(',', '.'));
							if($(this).hasClass('indikator-temp')) {
								indi = indiTemp;
							}
							if($(this).hasClass('indikator-hum')) {
								indi = indiHum;
							}
							if(n < indi.m) $(this).addClass('indi-m');
							if(n >= indi.m && n < indi.n) $(this).addClass('indi-0');
							if(n >= indi.n && n < indi.p) $(this).addClass('indi-p');
							if(n >= indi.p) $(this).addClass('indi-pp');
//###################################################################################
						} else if($(this).hasClass('<?=wpa::$formatdate ?>')) {
							$(this).text(p.time.print(that.value, true, false));
						} else if($(this).hasClass('<?=wpa::$formattime ?>')) {
							$(this).text(p.time.print(that.value, false, true));
						} else if($(this).hasClass('<?=wpa::$formatdatetime ?>')) {
							$(this).text(p.time.print(that.value, true, true));
						} else {
							$(this).text(that.valuestring);
						}
					});
				}
				if($('[data-wsroh=' + that.name + ']').length) {
					$.each($('[data-wsroh=' + that.name + ']'), function() {
						$(this).text(that.value);
					});
				}
				if($('[data-wslastchange=' + that.name + ']').length) {
					$.each($('[data-wslastchange=' + that.name + ']'), function() {
						$(this).text(that.lastchange);
					});
				}
			});
		}
	},
	onclose: function(e) {
		ws.log(e);
	},
	send: function(msg) {
		var message = JSON.stringify(msg);
		ws.connection.send(message);
	},
	log: function(msg) {
		if(ws.logEnabled) console.log(msg);
	},
	error: function(msg) {
		console.error(msg);
	}
};
