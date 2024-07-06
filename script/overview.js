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
//# Revision     : $Rev:: 631                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uebersicht.js 631 2024-06-29 12:29:38Z                   $ #
//#                                                                                 #
//###################################################################################
?> uebersicht */

//<? require_once('system/websockets.js') ?>
var getdimmervalue = true;
var configwithtimeout = [];

ws.logEnabled = true;

const lautsprecher = '192.168.80.122';
const kamin = '192.168.80.124';
const buero = '192.168.80.135';
const herz = '192.168.80.125';
const testboard = '192.168.80.117';

p.page.load = function() {
	$('#uebersicht').on('click', '.ForceMqttUpdate', function() {
		$.get('std.request.ForceMqttUpdate.req', function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('#uebersicht').on('click', '.setBrowseMqtt', function() {
		$.get('std.request.BrowseMqtt.req', function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('#uebersicht').on('click', '.getBrowseMqtt', function() {
		$.get('std.request.getBrowseMqtt.req', function(data) {
			//if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('#uebersicht').on('click', '.getD1Mini', function() {
		$.get('uebersicht.getd1minisettings.req', function(data) {
			//if(data != 'S_OK') p.page.alert(data);
		}, 'json');
	});
	$('#uebersicht').on('click', '.getShellyStatus', function() {
		$.get('uebersicht.getshellystatus.req', function(data) {
			//if(data != 'S_OK') p.page.alert(data);
		}, 'json');
	});
	$('#uebersicht').on('click', '.writereg1', function() {
		$.post('uebersicht.writedp.req', {dpid:$(this).attr('data-dpid'), value:$(this).parents('tr').find('input').val()}, function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
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
	$('#uebersicht').on('click', '.wz-gemuetlich', function() {
		$.post('std.shellycom.set-dimmer.req', {ShellyIP:lautsprecher, turn:'true', brightness:35}); // Lautsprecher
		$.post('std.shellycom.set-dimmer.req', {ShellyIP:kamin, turn:'true', brightness:20}); // Kamin
		//$.post('std.shellycom.set-relay.req', {ShellyIP:herz, turn:'true'}); // Herz
		$.post('std.shellycom.set-dimmer.req', {ShellyIP:buero, turn:'true', brightness:20}); // Büro
		$.post('std.shellycom.set-rgbw.req', {ShellyIP:testboard, turn:'true', gain:20, red:254, green:75, blue:1});
	});
	$('#uebersicht').on('click', '.wz-feuer-aus', function() {
		$.post('std.shellycom.set-rgbw.req', {ShellyIP:testboard, turn:'false'});
	});
	$('#uebersicht').on('click', '.wz-feuer', function() {
		$.post('std.shellycom.set-rgbw.req', {ShellyIP:testboard, turn:'true', gain:20, red:254, green:75, blue:1});
	});
	$('#uebersicht').on('click', '.wz-wn-an', function() {
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.178', turn:'true'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.179', turn:'true'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.180', turn:'true'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.185', turn:'true'});
	});
	$('#uebersicht').on('click', '.wz-wn-aus', function() {
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.178', turn:'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.179', turn:'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.180', turn:'false'});
		$.post('std.shellycom.set-relay.req', {ShellyIP:'192.168.80.185', turn:'false'});
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
	//p.getValues();
	ws.connect();
	//hastimeout();
	//shellydimmer();
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

