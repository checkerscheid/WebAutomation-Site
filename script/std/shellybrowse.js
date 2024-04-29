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
//# File-ID      : $Id:: shellybrowse.js 562 2024-01-16 02:08:14Z                 $ #
//#                                                                                 #
//###################################################################################
?> scenecfg */

// p.log.level = p.log.type.info;

p.page.load = function() {
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.shellycfg.menu' + $(this).attr('data-target') + '.req');
	});
	// Markierungen
	$('#erg').on('click', '.markall', function() {
		$('#erg .ps-checkbox').addClass('checked');
	});
	$('#erg').on('click', '.markno', function() {
		$('#erg .ps-checkbox').removeClass('checked');
	});
	$('#erg').on('click', '.shelly-dimmer-on', function() {
		var ip = $(this).parents('div[data-ip]').attr('data-ip');
		$.post('std.shellycom.set-dimmer.req', {ShellyIP:ip, turn:'True'});
	});
	$('#erg').on('click', '.shelly-dimmer-off', function() {
		var ip = $(this).parents('div[data-ip]').attr('data-ip');
		$.post('std.shellycom.set-dimmer.req', {ShellyIP:ip, turn:'False'});
	});

	$('#erg .shelly-dimmer').slider({
		min: 0,
		max: 100,
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
			var ip = $(this).parents('div[data-ip]').attr('data-ip');
			$.post('std.shellycom.set-dimmer.req', {ShellyIP:ip, brightness:ui.value});
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
	//###################################################################################
	// Tree View
	//###################################################################################
	$('#dialog').on('click', '[data-server] .ps-tree-parent', function() {
		if($(this).hasClass('open')) {
			$('[data-groups]').addClass('ps-hidden');
			$('[data-server] .ps-tree-parent').removeClass('open');
		} else {
			$('[data-groups]').addClass('ps-hidden');
			$('[data-server] .ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var server = $(this).parents('[data-server]:first').attr('data-server');
			$('[data-groups=' + server + ']').removeClass('ps-hidden');
		}
	});
	//###################################################################################
	$('#dialog').on('click', '[data-group] .ps-tree-parent', function() {
		if($(this).hasClass('open')) {
			$('[data-items]').addClass('ps-hidden');
			$('[data-group] .ps-tree-parent').removeClass('open');
		} else {
			$('[data-items]').addClass('ps-hidden');
			$('[data-group] .ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var group = $(this).parents('[data-group]:first').attr('data-group');
			$('[data-items=' + group + ']').removeClass('ps-hidden');
		}
	});
//###################################################################################
// menushellygroup
//###################################################################################
	$('#erg').on('click', '#shellygroup .groupupdate', function() {
		shelly.group.update($(this));
	});
	$('#erg').on('click', '#shellygroup .groupinsert', function() {
		shelly.group.insert($(this));
	});
	$('#erg').on('click', '#shellygroup .groupdelete', function() {
		shelly.group.delete($(this));
	});
	$('#erg').on('keyup', '#FilterGroup', function() { setGroupFilter(); });
	$('#erg').on('change', '#FilterGroup', function() { setGroupFilter(); });
//###################################################################################
// menushellynew
//###################################################################################
	$('#erg').on('click', '#shellynew .do-scan', function() {
		shelly.new.scan();
	});
	$('#erg').on('click', '#shellynew .addShelly', function() {
		var target = $(this).parents('div.tr');
		var ip = $(this).parents('div.tr').find('.sh-ip').text();
		var type = $(this).parents('div.tr').find('.sh-type').text();
		var mac = $(this).parents('div.tr').find('.sh-mac').text();
		shelly.new.insert(ip, type, mac, function() {
			shelly.new.scanRow(ip, target);
		});
	});
	$('#erg').on('click', '#shellynew .typeupdate', function() {
		var target = $(this).parents('div.tr');
		var ip = $(this).parents('div.tr').find('.sh-ip').text();
		var id = $(this).parents('div.tr').attr('data-id');
		var type = $(this).parents('div.tr').find('.sh-type').text();
		shelly.new.updateType(id, type, function() {
			shelly.new.scanRow(ip, target);
		});
	});
	$('#erg').on('click', '#shellynew .macupdate', function() {
		var target = $(this).parents('div.tr');
		var ip = $(this).parents('div.tr').find('.sh-ip').text();
		var id = $(this).parents('div.tr').attr('data-id');
		var mac = $(this).parents('div.tr').find('.sh-mac').text();
		shelly.new.updateMac(id, mac, function() {
			shelly.new.scanRow(ip, target);
		});
	});
	$('#erg').on('click', '#shellynew .credsupdate', function() {
		var target = $(this).parents('div.tr');
		var ip = $(this).parents('div.tr').find('.sh-ip').text();
		var id = $(this).parents('div.tr').attr('data-id');
		shelly.new.updateCreds(id, function() {
			shelly.new.scanRow(ip, target);
		});
	});
	$('#erg').on('click', '#shellynew .removeShelly', function() {
		var target = $(this).parents('div.tr');
		var id = $(this).parents('div.tr').attr('data-id');
		shelly.new.delete(id, function() {
			$(target).remove();
		});
	});
//###################################################################################
// menushellyedit
//###################################################################################
	$('#erg').on('click', '#shellyedit .ps-tree-parent', function() {
		shelly.edit.opengroup($(this));
	});
	$('#erg').on('click', '.allgroup', function() {
		var ids = [];
		$(this).parents('ul.shellyingroup').find('.ps-checkbox.checked').each(function() {
			ids.push($(this).parents('tr').attr('data-id'));
		});
		if(ids.length == 0) { p.page.alert('keine Shelly\'s ausgewählt'); return; }
		var groupid = $(this).parents('.shellyingroup').attr('data-group');
		$.post('std.shellycfg.popgroupselect.req', {ids:ids, groupid:groupid}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Shelly\'s in andere Gruppe verschieben', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'verschieben',
					click: function() {
						var newgroup = $('#c-group').val();
						$.post('std.shellycfg.savegroupselect.req', {ids:ids, shellygroup:$('.movetogroup').val()}, function(data) {
							if(data == 'S_OK') {
								$.each(ids, function(i, v) {
									$('[data-id=' + v + ']').remove();
								});
								p.page.alert('<span class="pos">verschoben</span>');
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	$('#erg').on('click', '.allactive', function() {
		var ids = [];
		$(this).parents('ul.shellyingroup').find('.ps-checkbox.checked').each(function() {
			ids.push($(this).parents('tr').attr('data-id'));
		});
		if(ids.length == 0) { p.page.alert('keine Shelly\'s ausgewählt'); return; }
		var groupid = $(this).parents('.shellyingroup').attr('data-group');
		$.post('std.shellycfg.popactive.req', {ids:ids}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Shelly\'s aktivieren', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'aktivieren',
					click: function() {
						$.post('std.shellycfg.saveactive.req', {ids:ids, active:'True'}, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">aktiviert</span>');
								$('li[data-group=' + groupid + ']').removeClass('open');
								shelly.edit.opengroup($('li[data-group=' + groupid + ']'));
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				},{
					text:'deaktivieren',
					click: function() {
						$.post('std.shellycfg.saveactive.req', {ids:ids, active:'False'}, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">deaktiviert</span>');
								$('li[data-group=' + groupid + ']').removeClass('open');
								shelly.edit.opengroup($('li[data-group=' + groupid + ']'));
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	$('#erg').on('click', '.alldelete', function() {
		var ids = [];
		$(this).parents('ul.shellyingroup').find('.ps-checkbox.checked').each(function() {
			ids.push($(this).parents('div.tr').attr('data-id'));
		});
		if(ids.length == 0) { p.page.alert('keine Shelly\'s ausgewählt'); return; }
		$.post('std.shellycfg.popdelete.req', {ids:ids}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Shelly\'s löschen', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'löschen',
					click: function() {
						var newgroup = $('#c-group').val();
						$.post('std.shellycfg.savedelete.req', {ids:ids}, function(data) {
							if(data == 'S_OK') {
								$.each(ids, function(i, v) {
									$('[data-id=' + v + ']').remove();
								});
								p.page.alert('<span class="pos">gelöscht</span>');
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	$('#erg').on('click', '#shellyedit .sh-editname', function() {
		shelly.edit.edittext($(this), 'name', 'Neuer Name');
	});
	$('#erg').on('click', '#shellyedit .sh-editip', function() {
		shelly.edit.edittext($(this), 'ip', 'Neue IP Adresse');
	});
	$('#erg').on('click', '#shellyedit .ps-info', function() {
		var ip = $(this).parents('tr').find('.sh-ip').text();
		shelly.edit.info(ip);
	});
	$('#erg').on('click', '#shellyedit .ps-refresh', function() {
		var ip = $(this).parents('tr').find('.sh-ip').text();
		shelly.edit.restart(ip);
	});
	$('#erg').on('click', '#shellyedit .ps-import', function() {
		var ip = $(this).parents('tr').find('.sh-ip').text();
		shelly.edit.update(ip);
	});
	$('#erg').on('click', '#shellyedit .ps-export', function() {
		var id = $(this).parents('tr[data-id]').attr('data-id');
		$.post('std.shellycom.set-default.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Shelly default', modal: true, width: p.popup.width.middle, maxHeight:800
			});
		});
	});
	$('#erg').on('click', '#shellyedit .ps-active', function() {
		var id = $(this).parents('div[data-id]').attr('data-id');
		$.post('std.shellycfg.shellyactive.req', {id:id}, function(data) {
			p.page.alert(data, 5000);
		}, 'json');
	});
	$('#erg').on('click', '#shellyedit .setShellydefault', function() {
		$('#dialog')
			.html('<span class="ps-red ps-bold">Es werden alle Shellys mit den Standardwerten gesetzt!</span><br /><span>fortfahren?</span>')
			.dialog({
				title: 'Default Einstellungen setzen',
				modal: true,
				buttons:[{
					text: 'beginnen',
					click: function() {
						$.get('std.shellycom.set-default.req', function(data) {
							$('#dialog').html(data).dialog({
								title: 'Shelly default', modal: true, width: p.popup.width.middle
							});
							p.page.alert(data, 5000);
						});
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbrechen',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
	});
	$('#erg').on('click', '#shellyedit .sh-editonoff', function() {
		var id = $(this).parents('tr').attr('data-id');
		$(this).parents('td').find('.description').addClass('toUpdate');
		shelly.edit.onoff($(this).parents('td'), id);
	});
	$('#erg').on('click', '#shellyedit .sh-edittemp', function() {
		var id = $(this).parents('tr').attr('data-id');
		$(this).parents('td').find('.description').addClass('toUpdate');
		shelly.edit.temp($(this).parents('td'), id);
	});
	$('#erg').on('click', '#shellyedit .sh-editfeuchte', function() {
		var id = $(this).parents('tr').attr('data-id');
		$(this).parents('td').find('.description').addClass('toUpdate');
		shelly.edit.feuchte($(this).parents('td'), id);
	});
	$('#erg').on('click', '#shellyedit .sh-editlux', function() {
		var id = $(this).parents('tr').attr('data-id');
		$(this).parents('td').find('.description').addClass('toUpdate');
		shelly.edit.lux($(this).parents('td'), id);
	});
	$('#dialog').on('click', '.datapointchooseable', function() {
		var shelly = $('#dialog .ps-tree-top').attr('data-shelly');
		var action = $('#dialog .ps-tree-top').attr('data-action');
		var id = $(this).attr('data-id');
		var name = $(this).text();
		$.post('std.shellycom.set-datapoint.req', {shelly:shelly, action:action, id:id}, function(data) {
			if(data != 'S_OK') p.page.alert(data, 5000);
			else {
				$('.description.toUpdate').attr({'title':id}).text(name);
				$('.description.toUpdate').removeClass('toUpdate');
			}
			$('#dialog').dialog('close');
		});
	});
//###################################################################################
	/*p.getValues(function() {
		$('.shelly-manual').each(function() {
			var div = $(this);
			if(typeof(shellyValues[$(div).attr('data-id')]) == 'undefined') shellyValues[$(div).attr('data-id')] = {};
			$.post('std.shelly.get-light-0.req', {ShellyIP:$(div).attr('data-ip')}, function(data) {
				//if(shellyValues[$(div).attr('data-id')]['b'] != data.brightness) {
					shellyValues[$(div).attr('data-id')]['b'] = data.brightness;
					var slider = $(div).find('.ps-slider');
					if(!$(slider).hasClass('WriteOnly')) $(slider).slider('value', data.brightness);
					//p.page.alert(data.brightness);
				//}
				//if(shellyValues[$(div).attr('data-id')]['s'] != data.ison) {
					shellyValues[$(div).attr('data-id')]['s'] = data.ison;
					if(data.ison) $(div).find('.ps-button').addClass('bm');
					else $(div).find('.ps-button').removeClass('bm');
					//p.page.alert(data.ison);
				//}
			}, 'json');
		});
	});*/
	p.automation.pointrate = 3000;
};

var shellyValues = {};

var shelly = {
//###################################################################################
// menushellygroup
//###################################################################################
	group: {
		update: function(t) {
			var id = $(t).parent('div').find('input[type=hidden]').val();
			var name = $(t).parent('div').find('input[type=text]').val();
			p.page.save('std.shellycfg.groupupdate.req', {id:id, name:name});
		},
		insert: function(t) {
			var name = $(t).parent('div').find('input[type=text]').val();
			$.post('std.shellycfg.groupinsert.req', {name:name}, function(data) {
				if(data.substr(0,4) == 'S_OK') {
					$('div.divupdate').append(data.substr(5, data.length));
				} else {
					p.page.alert(data);
				}
			});
		},
		delete: function(t) {
			var me = $(t).parent('div');
			var id = $(me).find('input[type=hidden]').val();
			$.post('std.shellycfg.groupdelete.req', {id:id}, function(data) {
				switch(data.substr(0, 4)) {
					case 'S_OK':
						$(me).fadeOut().remove();
						break;
					case 'S_CK':
						if(confirm('Es befinden sich ' + data.substr(4, data.length) + ' Shelly in dieser Gruppe, die ebenfalls gelöscht werden.\r\nFortfahren?')) {
							$.post('std.shellycfg.groupdelete.req', {id:id, force:'true'}, function(data) {
								if(data == 'S_OK') $(me).fadeOut().remove();
								else p.page.alert(data);
							});
						}
						break;
					default:
						p.page.alert(data);
						break;
				}
			});
		}
	},
//###################################################################################
// menushellynew
//###################################################################################
	new: {
		scan: function() {
			var ShellyIpNet = $('.ShellyIpNet').val();
			var ShellyIpFrom = $('.ShellyIpFrom').val();
			var ShellyIpTo = $('.ShellyIpTo').val();
			$('#ergScan div.tr').not('.firstRow').remove();
			$.post('std.shellycom.do-scan.req', {ShellyIpNet: ShellyIpNet, ShellyIpFrom: ShellyIpFrom, ShellyIpTo: ShellyIpTo}, function(data) {
				$('#ergScan').append(data);
				$('#ergScan div.tr').not('.firstRow').each(function() {
					var thisShelly = $(this);
					$.post('std.shellycom.do-scan-row.req', { ShellyIp: ShellyIpNet + '.' + $(this).attr('data-ipseg') }, function(datarow) {
						$(thisShelly).replaceWith(datarow);
					});
				});
			});
		},
		scanRow: function(ip, target) {
			$.post('std.shellycom.do-scan-row.req', { ShellyIp: ip }, function(data) {
				$(target).replaceWith(data);
			});
		},
		insert: function(ip, type, mac, cb) {
			$.post('std.shellycfg.insertshelly.req', { ip:ip, type:type, mac:mac }, function(data) {
				if(data != 'S_OK') p.page.alertred(data);
				else if(typeof(cb) == 'function') cb();
			});
		},
		updateType: function(id, type, cb) {
			$.post('std.shellycfg.updateshellytype.req', { id:id, type:type }, function(data) {
				if(data != 'S_OK') p.page.alertred(data);
				else if(typeof(cb) == 'function') cb();
			});
		},
		updateMac: function(id, mac, cb) {
			$.post('std.shellycfg.updateshellymac.req', { id:id, mac:mac }, function(data) {
				if(data != 'S_OK') p.page.alertred(data);
				else if(typeof(cb) == 'function') cb();
			});
		},
		updateCreds: function(id, cb) {
			$.post('std.shellycfg.updateshellycreds.req', { id:id }, function(data) {
				if(data != 'S_OK') p.page.alertred(data);
				else if(typeof(cb) == 'function') cb();
			});
		},
		delete: function(id, cb) {
			$.post('std.shellycfg.deleteshelly.req', { id:id }, function(data) {
				if(data != 'S_OK') p.page.alertred(data);
				else if(typeof(cb) == 'function') cb();
			});
		}
	},
//###################################################################################
// menushellyedit
//###################################################################################
	edit: {
		opengroup: function(t) {
			$('[data-shelly]').html('');
			if($(t).hasClass('open')) {
				$('.ps-tree-parent').removeClass('open');
			} else {
				$('.ps-tree-parent').removeClass('open');
				$(t).addClass('open');
				var group = $(t).attr('data-group');
				$.post('std.shellycfg.getshellyingroup.req', {group:group}, function(data) {
					$('[data-shelly=' + group + ']').html(data);
					$('[data-shelly=' + group + '] tr[data-id]').each(function() {
						var id = $(this).attr('data-id');
						var ip = $(this).find('.sh-ip').text();
						var shType = $(this).find('.sh-type').text();
						if(shType == 'SHSW-PM' || shType == 'SHDM-1' || shType == 'SHDM-2' || shType == 'SHPLG-S') {
							$.post('std.shellycom.get-update-signal.req', {ShellyIP:ip}, function() {
								$('[data-id="' + id + '"] .ps-update div').html(getUpdate());
								$('[data-id="' + id + '"] .ps-signal div').html(getSignal());
								$('[data-id="' + id + '"] .ps-names div').html(getNames());
							}, 'script');
						} else if(shType == 'Plus1PM' || shType == 'Mini1PMG3') {
							$.post('std.shellycom.get-update-signal-2.req', {ShellyIP:ip}, function() {
								$('[data-id="' + id + '"] .ps-update div').html(getUpdate());
								$('[data-id="' + id + '"] .ps-signal div').html(getSignal());
								$('[data-id="' + id + '"] .ps-names div').html(getNames());
							}, 'script');
						} else {
							$('[data-id="' + id + '"] .ps-signal div').html('<span class="sh-rssi rssibat">Batterie</span>');
						}
					});
				});
			}
		},
		edittext: function(t, cssClass, description) {
			var id = $(t).parents('tr').attr('data-id');
			var toUpdate = $(t).parents('tr').find('.sh-' + cssClass);
			$.post('std.shellycfg.edittext.pop', {description:description, value:$(t).text() }, function(data) {
				$('#dialog').html(data).dialog({
					title: description, modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newText = $('#dialog .ps-input').val();
							$.post('std.shellycfg.saveshelly' + cssClass + '.req', {id:id, newText:newText}, function(data) {
								if(data == 'S_OK') {
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
									$('#dialog').dialog('close');
								}
							});
						}
					},{
						text: 'Abbruch',
						click: function() {
							$('#dialog').dialog('close');
						}
					}]
				});
			});
		},
		info: function(ip) {
			$.post('std.shellycom.get-info.req', { ShellyIP: ip }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + ip, modal: true, width: p.popup.width.middle
				});
			});
		},
		restart: function(ip) {
			$.post('std.shellycom.do-reboot.req', { ShellyIP: ip }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + ip, modal: true, width: p.popup.width.middle
				});
			});
		},
		update: function(ip) {
			$.post('std.shellycom.do-update.req', { ShellyIP: ip }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + ip, modal: true, width: p.popup.width.middle
				});
			});
		},
		onoff: function(td, id) {
			$.post('std.shellycom.get-onoff.req', { ShellyID: id }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + id, modal: true, width: 1000, maxHeight: 600, buttons: [{
						text:'Löschen',
						click: function() {
							var action = $('#dialog .ps-tree-top').attr('data-action');
							var dpid = 'NULL';
							$.post('std.shellycom.set-datapoint.req', {shelly:id, action:action, id:dpid}, function(data) {
								if(data != 'S_OK') p.page.alert(data, 5000);
								else {
									$(td).find('.description').attr({'title':''}).text('');
									$('.description.toUpdate').removeClass('toUpdate');
								}
								$('#dialog').dialog('close');
							});
						}
					}]
				});
			});
		},
		temp: function(td, id) {
			$.post('std.shellycom.get-temp.req', { ShellyID: id }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + id, modal: true, width: 1000, maxHeight: 600, buttons: [{
						text:'Löschen',
						click: function() {
							var action = $('#dialog .ps-tree-top').attr('data-action');
							var dpid = 'NULL';
							$.post('std.shellycom.set-datapoint.req', {shelly:id, action:action, id:dpid}, function(data) {
								if(data != 'S_OK') p.page.alert(data, 5000);
								else {
									$(td).find('.description').attr({'title':''}).text('');
									$('.description.toUpdate').removeClass('toUpdate');
								}
								$('#dialog').dialog('close');
							});
						}
					}]
				});
			});
		},
		feuchte: function(td, id) {
			$.post('std.shellycom.get-feuchte.req', { ShellyID: id }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + id, modal: true, width: 1000, maxHeight: 600, buttons: [{
						text:'Löschen',
						click: function() {
							var action = $('#dialog .ps-tree-top').attr('data-action');
							var dpid = 'NULL';
							$.post('std.shellycom.set-datapoint.req', {shelly:id, action:action, id:dpid}, function(data) {
								if(data != 'S_OK') p.page.alert(data, 5000);
								else {
									$(td).find('.description').attr({'title':''}).text('');
									$('.description.toUpdate').removeClass('toUpdate');
								}
								$('#dialog').dialog('close');
							});
						}
					}]
				});
			});
		},
		lux: function(td, id) {
			$.post('std.shellycom.get-lux.req', { ShellyID: id }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + id, modal: true, width: 1000, maxHeight: 600, buttons: [{
						text:'Löschen',
						click: function() {
							var action = $('#dialog .ps-tree-top').attr('data-action');
							var dpid = 'NULL';
							$.post('std.shellycom.set-datapoint.req', {shelly:id, action:action, id:dpid}, function(data) {
								if(data != 'S_OK') p.page.alert(data, 5000);
								else {
									$(td).find('.description').attr({'title':''}).text('');
									$('.description.toUpdate').removeClass('toUpdate');
								}
								$('#dialog').dialog('close');
							});
						}
					}]
				});
			});
		},
		bat: function(td, id) {
			$.post('std.shellycom.get-bat.req', { ShellyID: id }, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Shelly ' + id, modal: true, width: 1000, maxHeight: 600, buttons: [{
						text:'Löschen',
						click: function() {
							var action = $('#dialog .ps-tree-top').attr('data-action');
							var dpid = 'NULL';
							$.post('std.shellycom.set-datapoint.req', {shelly:id, action:action, id:dpid}, function(data) {
								if(data != 'S_OK') p.page.alert(data, 5000);
								else {
									$(td).find('.description').attr({'title':''}).text('');
									$('.description.toUpdate').removeClass('toUpdate');
								}
								$('#dialog').dialog('close');
							});
						}
					}]
				});
			});
		}
	}
};
var shellycfgpopup = {
	movetogroup: function(ids) {
		
	}
};
//###################################################################################
// Helper Funtionen
//###################################################################################
function setGroupFilter() {
	if($('input.FilterText').val().length == 0) {
		$('input.FilterText').removeClass('neg');
		$('#erg div.divupdate div').removeClass('ps-hidden');
	} else {
		$('input.FilterText').addClass('neg');
		$('#erg div.divupdate div').each(function() {
			var text = $(this).find('input.ps-input:first').val().toLowerCase();
			if(text.indexOf($('input.FilterText').val().toLowerCase()) == -1) {
				$(this).addClass('ps-hidden');
			} else {
				$(this).removeClass('ps-hidden');
			}
		});
	}
}

