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
//# Revision     : $Rev:: 738                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: websockets.js 738 2025-05-03 00:04:48Z                   $ #
//#                                                                                 #
//###################################################################################
use system\Helper\wpa;
require_once 'system/Helper/wpa.psys';
//$url = ($_SERVER['HTTP_HOST'] == 'ltchecker.freakazone.com') ? 'ltchecker.freakazone.com' : 'automation.freakazone.com:81';
?> websockets */

var ws = {
	logEnabled: false,
	connection: null,
	connectionstring: 'wss://automation.freakazone.com/Remote',
	registered: [],
	toalive: null,
	alive: 0,
	connect: function() {
		ws.alive = 0;
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
				ws.alive = 0;
				ws.connection.close(1000, 'Timeout');
				ws.error('close, Timeout');
				//ws.connect();
			}
		}, 2000);
		ws.registerNoAlive();
	},
	registerNoAlive: function() {
		$.each($('[data-ws]'), function() {
			if($(this).attr('data-ws') != null && $(this).attr('data-ws') != '' &&
				!ws.registered.includes($(this).attr('data-ws'))) {
				ws.registered.push($(this).attr('data-ws'));	
			}
		});
		var cmd = {
			'command': 'addDatapoints',
			'data': ws.registered
		};
		ws.send(cmd);
	},
	onopen: function(e) {
		ws.register();
		ws.log(e);
		if(typeof(wsInit) == 'function') wsInit();
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
			if(msg.response == 'getD1MiniJson') {
				console.log(msg);
				if(typeof setD1MiniInfo === 'function')
					setD1MiniInfo(msg.data.D1Mini);
			}
			if(msg.response == 'SearchD1Mini') {
				if(typeof getHtmlNewD1MiniRow === 'function')
					getHtmlNewD1MiniRow(msg.data.exists, msg.data.recieved.Iam);
			}
			if(msg.response == 'SearchD1MiniFinished') {
				if(typeof SearchD1MiniFinished === 'function')
					SearchD1MiniFinished();
			}
			if(msg.response == 'setShoppingChecked') {
				if(typeof SetShoppingChecked === 'function')
					SetShoppingChecked(msg.idGroup, msg.idProduct, msg.isChecked);
			}
			if(msg.response == 'sendDatapoint' || msg.response == 'addDatapoints') {
				$.each(msg.data, function() {
					var that = $(this)[0];
					ws.log(that);
					if($('[data-ws=' + that.name + ']').length) {
						$.each($('[data-ws=' + that.name + ']'), function() {
							$(this).attr('data-id', that.id);
							var textTrue = $(this).attr('data-True');
							var textFalse = $(this).attr('data-False');
	//###################################################################################
							if($(this).hasClass('<?=wpa::GreyGreen ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-green')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).addClass('ps-green')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::GreyYellow ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-yellow')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).addClass('ps-yellow')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::GreyRed ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-red')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).addClass('ps-red')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::GreenYellow ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-yellow').addClass('ps-green')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-green').addClass('ps-yellow')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::GreenRed ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-red').addClass('ps-green')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-green').addClass('ps-red')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::RedGreen ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-green').addClass('ps-red')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-red').addClass('ps-green')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::YellowGreen ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-green').addClass('ps-yellow')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-yellow').addClass('ps-green')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::BlueYellow ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-yellow').addClass('ps-blue')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-blue').addClass('ps-yellow')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::YellowBlue ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-blue').addClass('ps-yellow')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-yellow').addClass('ps-blue')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}


	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontGreyGreen ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontgreen')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).addClass('ps-fontgreen')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontGreyYellow ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontyellow')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).addClass('ps-fontyellow')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontGreyRed ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontred')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).addClass('ps-fontred')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontGreenYellow ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontyellow').addClass('ps-fontgreen')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-fontgreen').addClass('ps-fontyellow')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontGreenRed ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontred').addClass('ps-fontgreen')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-fontgreen').addClass('ps-fontred')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontRedGreen ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontgreen').addClass('ps-fontred')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-fontred').addClass('ps-fontgreen')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontYellowGreen ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontgreen').addClass('ps-fontyellow')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-fontyellow').addClass('ps-fontgreen')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontBlueYellow ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontyellow').addClass('ps-fontblue')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-fontblue').addClass('ps-fontyellow')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::FontYellowBlue ?>')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).removeClass('ps-fontblue').addClass('ps-fontyellow')
										.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).removeClass('ps-fontyellow').addClass('ps-fontblue')
										.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}

	//###################################################################################
							} else if($(this).hasClass('pa-hide')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).addClass('ps-hidden');
								} else {
									$(this).removeClass('ps-hidden');
								}
	//###################################################################################
							} else if($(this).hasClass('pa-heizenModus')) {
								if(that.value == 'False' || that.value == '0' || that.value == 'Off') {
									$(this).addClass('ps-fontblue').removeClass('ps-fontyellow').attr('title', 'Modus: Heizbetrieb')
									.html(typeof(textFalse) == 'undefined' ? that.valuestring : textFalse);
								} else {
									$(this).addClass('ps-fontyellow').removeClass('ps-fontblue').attr('title', 'Modus: Sommerbetrieb')
									.html(typeof(textTrue) == 'undefined' ? that.valuestring : textTrue);
								}
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::rssi ?>')) {
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
							} else if($(this).hasClass('<?=wpa::indikator ?>')) {
								let indiTemp = {"m": 21, "n": 23.5, "p": 25};
								let indiTempOut = {"m": 15, "n": 23.5, "p": 25};
								let indiHum = {"m": 37.5, "n": 45, "p": 55};
								let indiPfl = {"m": 50, "n": 57, "p": 65};
								$(this).removeClass('indi-m indi-0 indi-p indi-pp');
								let indi;
								let n = Number(that.value.replace(',', '.'));
								if($(this).hasClass('indikator-temp')) {
									indi = indiTemp;
								}
								if($(this).hasClass('indikator-tempout')) {
									indi = indiTempOut;
								}
								if($(this).hasClass('indikator-hum')) {
									indi = indiHum;
								}
								if($(this).hasClass('indikator-pfl')) {
									indi = indiPfl;
								}
								if(n < indi.m) $(this).addClass('indi-m');
								if(n >= indi.m && n < indi.n) $(this).addClass('indi-0');
								if(n >= indi.n && n < indi.p) $(this).addClass('indi-p');
								if(n >= indi.p) $(this).addClass('indi-pp');
	//###################################################################################
							} else if($(this).hasClass('<?=wpa::formatdate ?>')) {
								$(this).text(p.time.print(that.value, true, false));
							} else if($(this).hasClass('<?=wpa::formattime ?>')) {
								$(this).text(p.time.print(that.value, false, true));
							} else if($(this).hasClass('<?=wpa::formatdatetime ?>')) {
								$(this).text(p.time.print(that.value, true, true));
							} else if($(this).hasClass('<?=wpa::SecToTime ?>')) {
								$(this).text(p.time.secToTime(that.value));
							} else if($(this).hasClass('wp-b-to-p')) {
								$(this).html(parseInt(that.value / 2.55) + ' ' + that.unit);
							} else if($(this).hasClass('topic-slider') || $(this).hasClass('wpSlider')) {
								if(!$(this).hasClass('WriteOnly')) {
									var slidervalue = parseInt(that.value);
									if(isNaN(slidervalue)) slidervalue = 0;
									$(this).slider('option', 'value', slidervalue);
								}
							} else if($(this).hasClass('wpSlider-255')) {
								if(!$(this).hasClass('WriteOnly')) {
									var slidervalue = parseInt(that.value);
									if(isNaN(slidervalue)) slidervalue = 0;
									$(this).slider('option', 'value', slidervalue / 2.55);
								}
							} else if($(this).hasClass('wpNoAction')) {
								// do nothing
							} else {
								$(this).text(that.valuestring);
							}
						});
					}
					if($('[data-wsroh=' + that.name + ']').length) {
						$.each($('[data-wsroh=' + that.name + ']'), function() {
							$(this).text(that.value == '' ? '-' : that.value);
						});
					}
					if($('[data-wslastchange=' + that.name + ']').length) {
						$.each($('[data-wslastchange=' + that.name + ']'), function() {
							$(this).text(that.lastchange);
						});
					}
				});
			}
		}
	},
	onclose: function(e) {
		ws.log(e);
	},
	send: function(msg) {
		var message = JSON.stringify(msg);
		ws.connection.send(message);
		ws.log(msg);
	},
	log: function(msg) {
		if(ws.logEnabled) console.log(msg);
	},
	error: function(msg) {
		console.error(msg);
	}
};
