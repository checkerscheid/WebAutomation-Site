/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.12.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 700                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uebersicht.js 700 2024-10-14 00:13:37Z                   $ #
//#                                                                                 #
//###################################################################################
?> uebersicht */
//<? require_once('system/websockets.js') ?>

//p.log.level = p.log.type.info;

ws.logEnabled = true;
var getdimmervalue = true;
var configwithtimeout = [];

const lautsprecher = '172.17.80.92';
const kamin = '172.17.80.94';
const buero = '172.17.80.120';
const herz = '172.17.80.95';
const feuer = '172.17.80.97';
// Weihnachten
const wn_kamin = '172.17.1.60';
const wn_baum = '172.17.1.61';
const wn_fenster = '172.17.80.133';

p.page.load = function() {
	$('#uebersicht').on('click', '.pa-EinAus.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		$.post('std.truefalse.pop', {elem:id, headline:headline, type:'AufZu'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Ventilbedienung', modal: true, width: '300px'
			});
		});
	});
	$('#uebersicht').on('click', '.pa-Analog.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		p.popup.title = 'Ventilbedienung';
		p.popup.AnalogSchieberegler(headline, id);
	});
	$('#uebersicht').on('click', '.clicklicht', function() {
		var write = $(this).attr('data-taster');
		p.automation.write(write, 'True');
	});
	$('#uebersicht').on('click', '.AllesAus', function() {
		const allesaus = [
			// Wohnzimmer
			setNeoPixelOff('172.17.80.99', 'Wohnzimmer NeoPixel Lichtleiste'),
			setShellyDimmerOff('172.17.80.92', 'Wohnzimmer Lautsprecher'),
			setNeoPixelOff('172.17.80.98', 'Wohnzimmer Lautsprecher farbe'),
			setShellyDimmerOff('172.17.80.94', 'Wohnzimmer Kamin'),
			setNeoPixelOff('172.17.80.106', 'Wohnzimmer RGB Pflanze'),
			setShellyRelayOff('172.17.80.95', 'Wohnzimmer Herz'),
			setShellyRelayOff('172.17.80.93', 'Wohnzimmer Stehlampe'),
			setShellyDimmerOff('172.17.80.90', 'Wohnzimmer'),
			setShellyRelayOff('172.17.80.91', 'Wohnzimmer Lichtleiste'),
			// Schlafzimmer
			setShellyDimmerOff('172.17.80.110', 'Schlafzimmer'),
			// Flur
			setFLRUAuto('172.17.80.125', 'Flur set Auto'),
			setShellyDimmerOff('172.17.80.120', 'Flur'),
			// Küche
			setShellyRelayOff('172.17.80.130', 'Küche'),
			setShellyRelayOff('172.17.80.131', 'Küche Strahler'),
			setCwWwOff('172.17.80.142', 'Küche White-LED'),
			// Bad
			setShellyDimmerOff('172.17.80.150', 'Bad'),
			// Kinderzimmer
			setNeoPixelOff('172.17.80.169', 'Kinderzimmer NeoPixel Lichtleiste'),
			setShellyRelayOff('172.17.80.160', 'Kinderzimmer'),
			setShellyRelayOff('172.17.80.161', 'Kinderzimmer Bett'),
			setShellyRelayOff('172.17.80.162', 'Kinderzimmer Nachtlicht'),
			setShellyRGBWOff('172.17.80.163', 'Kinderzimmer Bilderrahmen')
		];
		Promise.all(allesaus).then((responses) => {
			var msg = 'Alles aus:<br />';
			for(const response of responses) {
				msg += response;// + '<br />';
			}
			p.page.alert(msg, 5000);
		});
	});
	$('#uebersicht').on('click', '.wz-gemuetlich', function() {
		const promiseLautsprecher = new Promise((resolve) => {
			$.post('std.shellycom.set-dimmer.req', {ShellyIP:lautsprecher, turn:'true', brightness:35},
				function(data) {
					resolve('Lautsprecher ist ' + (data.ison ? 'an' : 'aus') + ', (' + data.brightness + ' %)');
				},
			'json'); // Lautsprecher
		});
		const promiseKamin = new Promise((resolve) =>{
			$.post('std.shellycom.set-dimmer.req', {ShellyIP:kamin, turn:'true', brightness:20},
				function(data) {
					resolve('Kamin ist ' + (data.ison ? 'an' : 'aus') + ', (' + data.brightness + ' %)')
				},
			'json'); // Kamin
		});
		//$.post('std.shellycom.set-relay.req', {ShellyIP:herz, turn:'true'}); // Herz
		const promiseBuero = new Promise((resolve) =>{
			$.post('std.shellycom.set-dimmer.req', {ShellyIP:buero, turn:'true', brightness:20},
				function(data) {
					resolve('Büro ist ' + (data.ison ? 'an' : 'aus') + ', (' + data.brightness + ' %)')
				},
			'json'); // Büro
		});
		const promiseFeuer = new Promise((resolve) =>{
			$.post('std.shellycom.set-rgbw.req', {ShellyIP:feuer, turn:'true', gain:20, red:255, green:75, blue:0},
				function(data) {
					resolve('Feuer ist ' + (data.ison ? 'an' : 'aus') + ', (' + data.gain + ' %)')
				},
			'json'); //Feuer
		});
		Promise.all([promiseLautsprecher, promiseKamin, promiseBuero, promiseFeuer]).then((responses) => {
			var msg = 'Wohnzimmer gemütlich:<br />';
			for(const response of responses) {
				msg += response + '<br />';
			}
			p.page.alert(msg);
		});
	});
	$('#uebersicht').on('click', '.wz-feuer-aus', function() {
		$.post('std.shellycom.set-rgbw.req', {ShellyIP:feuer, turn:'false'},
			function(data) {
				p.page.alert('Leuchte ist ' + (data.ison ? 'an' : 'aus'));
			},
		'json');
	});
	$('#uebersicht').on('click', '.wz-feuer', function() {
		$.post('std.shellycom.set-rgbw.req', {ShellyIP:feuer, turn:'true', gain:20, red:255, green:75, blue:0},
			function(data) {
				p.page.alert('Leuchte ist ' + (data.ison ? 'an' : 'aus'));
			},
		'json');
	});
	$('#uebersicht').on('click', '.wz-wn-an', function() {
		$.post('std.shellycom.set-relay.req', {ShellyIP:wn_kamin, turn:'true'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:wn_baum, turn:'true'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:wn_fenster, turn:'true'});
	});
	$('#uebersicht').on('click', '.wz-wn-aus', function() {
		$.post('std.shellycom.set-relay.req', {ShellyIP:wn_kamin, turn:'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:wn_baum, turn:'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:wn_fenster, turn:'false'});
	});
	$('#uebersicht').on('click', '.RenewShellyState', function() {
		$.get('std.shellycom.renewshellystate.req', function(data) {
			if(data.erg != 'S_OK') p.page.alert(data.msg, 3000);
		}, 'json');
	});
	$('#uebersicht').on('click', '.RU_Auto', function() {
		const setAuto = {
			ip: $(this).attr('data-ip')
		};
		$.post('uebersicht.setAuto.req', setAuto, null, 'json');
	});
	$('#uebersicht').on('click', '.RU_Manual', function() {
		const setManual = {
			ip: $(this).attr('data-ip')
		};
		$.post('uebersicht.setManual.req', setManual, null, 'json');
	});
	$('#uebersicht').on('click', '.ps-input.ps-operable.zp', function() {
		var dpType = 'VT_BOOL';
		if($(this).attr('data-bm') == 'KZ_ZP_RM') dpType = 'SW';
		var point = $(this).attr('data-zp');
		var unit = 'True:Normalbetrieb;False:Absenkbetrieb;';
		$.post('std.calendaredit.popupwriteitem.req', {headline:point,type:dpType,unit:unit}, function(data) {
			firstclick = true;
			$('#dialog').html(data).dialog({
				title: 'Sollwert', modal: true, width: p.popup.width.std,
				buttons: [{
					text: 'speichern',
					click: function() {
						var value = $.trim($('#calendarwriteitem').val());
						p.automation.write(point, value);
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	$('#uebersicht').on('click', '.ps-param', function() {
		var headline = $(this).attr('data-popup');
		var elem = $(this).attr('id');
		$.post('paramnumpad.pop', {elem:elem, id:elem, headline:headline}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Parameter', modal: true, width: '300px',
				buttons: {
					abbrechen: {
						text: 'Abbrechen',
						click: function() {
							$('#dialog').dialog('close');
						}
					},
					speichern: {
						text: 'speichern',
						click: function() {
							p.automation.write($('#numpad').attr('data-id'), $('#oskinput').val());
							$('#dialog').dialog('close');
						}
					}
				
				}
			});
		});
	});
	$('.shelly-dimmer').slider({
		min: 0,
		max: 100,
		step: 5,
		start: function() {
			$(this).addClass('WriteOnly');
			$(this).find('a').append('<span class="toleft">--</span>');
		},
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $(this).find('span.toleft');
			$(TheSpan).text(TheValue);
		},
		stop: function(event, ui) {
			var ip = $(this).attr('data-ip');
			$.post('std.shellycom.set-dimmer.req', {ShellyIP:ip, brightness:ui.value});
			$(this).find('.ui-slider-handle').attr('title', ui.value + ' %');
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
	$('.setNeoPixelOff').on('click', function() {
		var ip = $(this).attr('data-ip');
		if($(this).hasClass('ps-yellow')) {
			$.post('uebersicht.setNeoPixelOff.req', {ip:ip});
		} else {
			$.post('uebersicht.setNeoPixelOn.req', {ip:ip});
		}
	});
	$('.setCwWwOff').on('click', function() {
		var ip = $(this).attr('data-ip');
		if($(this).hasClass('ps-yellow')) {
			$.post('uebersicht.CwWwOff.req', {ip:ip});
		} else {
			$.post('uebersicht.CwWwOn.req', {ip:ip});
		}
	});
/*	$('.brightness-slider').slider({
		min: 0,
		max: 255,
		step: 12.75,
		start: function() {
			$(this).addClass('WriteOnly');
			$(this).find('a').append('<span class="toleft">--</span>');
		},
		slide: function(event, ui) {
			var TheValue = Math.round(ui.value / 2.55);
			var TheSpan = $(this).find('span.toleft');
			$(TheSpan).text(TheValue);
		},
		stop: function(event, ui) {
			var ip = $(this).attr('data-ip');
			$.post('uebersicht.NeoPixelBrightness.req', {ip:ip, brightness:ui.value});
			$(this).find('.ui-slider-handle').attr('title', ui.value + ' %');
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});*/
	p.getValues();
	ws.connect();
	hastimeout();
	shellydimmer();
};

function hastimeout() {
	$('.ShellyDirect').each(function() {
		if($(this).parents('tr').hasClass('ps-hastimer'))
			configwithtimeout.push($(this));
	});
	remaintimeout();
}
function hastimeout_() {
	$('.ShellyDirect').each(function() {
		var that = $(this);
		var ip = $(that).attr('data-ip');
		$.post('std.shellycom.get-timerisset.req', {ShellyIP:ip}, function(data) {
			$(that).parents('tr').removeClass('loading');
			if(data.auto_off > 0) {
				configwithtimeout.push($(that));
				$(that).parents('tr').addClass('ps-hastimer');
			}
		});
	});
	remaintimeout();
}
function checkautooff() {
	$('.ShellyDirect').each(function() {
		var that = $(this);
		var ip = $(that).attr('data-ip');
		$.post('std.shellycom.get-timerisset.req', {ShellyIP:ip}, function(data) {
			if(data.auto_off > 0) {
				$(that).parents('tr').addClass('ps-hastimer');
				$(that).attr('data-autooff', data.autooff);
			}
		});
	});
}
function remaintimeout() {
	window.setInterval(function() {
		$(configwithtimeout).each(function() {
			if($(this).hasClass('bm') || $(this).hasClass('ps-yellow')) {
				var remaintime = $(this).parents('tr').find('span.time_remain').attr('data-remaintime');
				if(remaintime > 0 && remaintime%60 != 0) {
					remaintime--;
					var remaintext = Math.floor(remaintime/60) + ':' + (Math.floor(remaintime%60).toString().padStart(2, '0'));
					$(this).parents('tr').find('span.time_remain').text(remaintext).attr('data-remaintime', remaintime);
				} else {
					console.log('renew remaintime: ' + remaintime);
					shellytimeout($(this));
				}
			} else {
				$(this).parents('tr').find('span.time_remain').text('').attr('data-remaintime', 0);
			}
		});
	}, 1000);
}
function shellytimeout(that) {
	var remainspan = $(that).parents('tr').find('span.time_remain');
	var remaintime = 0;
	$.post('std.shellycom.get-out.req', {ShellyIP:$(that).attr('data-ip')}, function(data) {
		remaintime = data.timer_remaining;
		if(remaintime > 0) {
			var remaintext = Math.floor(remaintime/60) + ':' + (Math.floor(remaintime%60).toString().padStart(2, '0'));
			$(remainspan).text(remaintext).attr('data-remaintime', remaintime);
		}
	}, 'json');
}
function shellydimmer() {
	$('.shelly-dimmer').each(function() {
		var slider = $(this);
		var ip = $(this).attr('data-ip');
		$.post('std.shellycom.get-light-0.req', {ShellyIP:ip}, function(data) {
			if(!$(slider).hasClass('WriteOnly')) {
				$(slider).slider('value', data.brightness);
				$(slider).find('.ui-slider-handle').attr('title', data.brightness + ' %');
			}
		}, 'json');
	});
	window.setTimeout(function() { shellydimmer(); }, 30000);
}
function setShellyRelayOff(ip, name) {
	return new Promise((resolve) => {
		$.post('std.shellycom.set-relay.req', {ShellyIP:ip, turn:'false'},
			function(data) {
				resolve(name + ' ist aus');
			},
		'json');
	});
}
function setShellyDimmerOff(ip, name) {
	return new Promise((resolve) => {
		$.post('std.shellycom.set-dimmer.req', {ShellyIP:ip, turn:'false'},
			function(data) {
				resolve(name + ' ist ' + (data.ison ? 'an' : 'aus') + ', (' + data.brightness + ' %)');
			},
		'json');
	});
}
function setShellyRGBWOff(ip, name) {
	return new Promise((resolve) => {
		$.post('std.shellycom.set-rgbw.req', {ShellyIP:ip, turn:'false'},
			function(data) {
				resolve(name + ' ist aus');
			},
		'json');
	});
}
function setNeoPixelOff(ip, name) {
	return new Promise((resolve) => {
		$.post('uebersicht.setNeoPixelOff.req', {ip:ip},
			function(data) {
				resolve(name + ' ist aus');
			},
		'json');
	});
}
function setCwWwOff(ip, name) {
	return new Promise((resolve) => {
		$.post('uebersicht.CwWwOff.req', {ip:ip},
			function(data) {
				resolve(name + ' ist aus');
			},
		'json');
	});
}
function setFLRUAuto(ip, name) {
	return new Promise((resolve) => {
		const setAuto = {
			ip: ip
		};
		$.post('uebersicht.setAuto.req', setAuto,
			function(data) {
				resolve(name + ' ist aus');
			},
		'json');
	});
}

