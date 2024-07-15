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
//# Revision     : $Rev:: 677                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1minicfg.js 677 2024-07-15 13:51:59Z                    $ #
//#                                                                                 #
//###################################################################################
?> d1minicfg */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>
//<? require_once('script/system/websockets.js') ?>

groups.tablename = 'd1minigroup';
groups.member = 'd1mini';
groups.target = 'd1minicfg';
ws.logEnabled = true;
var CountFound = 0;
var compiledWithExclude = [
	'EEPROM', 'WiFi', 'MQTT', 'Search', 'Rest',
	'Finder', 'Modules', 'OnlineToggler', 'Update', 'WebServer'
];
p.page.load = function() {
	groups.init();
	ws.connect();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		var menuitemclicked = $(this).attr('data-target');
		p.page.change('#erg', 'std.d1minicfg.menu' + menuitemclicked + '.req', {table:groups.tablename}, function() {
			if(menuitemclicked == 'searchd1mini') {
				D1MiniSearch();
				var cmd = {
					'command': 'startD1MiniSearch'
				};
				ws.send(cmd);
				//D1MiniRegistered();
			}
		});
	});
	$('#erg').on('click', '.d1minigroupfolder', function() {
		if($(this).hasClass('open')) {
			$('[data-d1minis]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('[data-d1minis]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var d1minigroup = $(this).attr('data-d1minigroup');
			$.post('std.d1minicfg.getd1minis.req', {d1minigroup:d1minigroup}, function(data) {
				$('[data-d1minis=' + d1minigroup + ']').html(data);
				$('.D1MiniDeviceList tr').each(function() {
					var ip = $(this).find('[data-column="ip"] .stored').text();
					var question = {
						'command': 'getD1MiniJson',
						'data': ip
					};
					ws.send(question);
				});
				//D1MiniRenew(d1minigroup);
			});
		}
	});
//###################################################################################
	// Markierungen
	$('#erg').on('click', '.markall', function() {
		$('#erg .ps-checkbox:not(.ps-disabled)').addClass('checked');
	});
	$('#erg').on('click', '.markno', function() {
		$('#erg .ps-checkbox:not(.ps-disabled)').removeClass('checked');
	});
//###################################################################################
	$('#erg').on('click', '[data-column="name"] .stored', function() {
		var name = $(this).text();
		// $('[data-json="' + name + '"]').find('.showJson').toggleClass('closed');
		location.href = 'std.d1mini.' + name + '.htm';
	});
//###################################################################################
	$('#d1minicfg').on('click', '.searchResult .d1MiniAdd', function() {
		var myData = $(this).data();
		console.log(myData);
		$.get('std.d1minicfg.infoToSaveD1Mini.pop', function(data) {
			$('#dialog').html(data).dialog({
				title: 'D1 Mini speichern', modal: true, width: p.popup.width.osk,
				buttons: [{
					text:'OK',
					click: function() {
						myData['id_d1minigroup'] = $('#dialog .id_d1minigroup').val();
						myData['id_mqttgroup'] = $('#dialog .id_mqttgroup').val();
						myData['id_dpgroup'] = $('#dialog .id_dpgroup').val();
						myData['id_trendgroup'] = $('#dialog .id_trendgroup').val();

						myData['id_alarmgroups5'] = $('#dialog .id_alarmgroups5').length ? $('#dialog .id_alarmgroups5').val() : 'NULL';
						myData['id_alarmgroups4'] = $('#dialog .id_alarmgroups4').length ? $('#dialog .id_alarmgroups4').val() : 'NULL';
						myData['id_alarmgroups3'] = $('#dialog .id_alarmgroups3').length ? $('#dialog .id_alarmgroups3').val() : 'NULL';
						myData['id_alarmgroups2'] = $('#dialog .id_alarmgroups2').length ? $('#dialog .id_alarmgroups2').val() : 'NULL';
						myData['id_alarmgroups1'] = $('#dialog .id_alarmgroups1').length ? $('#dialog .id_alarmgroups1').val() : 'NULL';
						$.post('std.d1minicfg.saveSearchedDevice.req', myData, function(data) {
							console.log(data);
							if(data.erg == 'S_OK') {
								p.page.alert(data.msg, 5000);
								$('#dialog').dialog('close');
							} else {
								p.page.alertred(data.msg, 5000);
							}
						}, 'json');
					}
				},{
					text: 'Abbruch',
					click: function() { $('#dialog').dialog('close'); }
				}]
			});
		});
	});
	$('#erg').on('click', '.D1MiniDevice .renewMqtt', function() {
		var myData = { IP: $(this).attr('data-ip') };
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		$.get('std.d1minicfg.infoToSaveD1Mini.pop', function(data) {
			$('#dialog').html(data).dialog({
				title: 'D1 Mini ' + name + ' MQTT und Trend erneuern', modal: true, width: p.popup.width.osk,
				buttons: [{
					text:'OK',
					click: function() {
						myData['id_d1minigroup'] = $('#dialog .id_d1minigroup').val();
						myData['id_mqttgroup'] = $('#dialog .id_mqttgroup').val();
						myData['id_dpgroup'] = $('#dialog .id_dpgroup').val();
						myData['id_trendgroup'] = $('#dialog .id_trendgroup').val();

						myData['id_alarmgroups5'] = $('#dialog .id_alarmgroups5').length ? $('#dialog .id_alarmgroups5').val() : 'NULL';
						myData['id_alarmgroups4'] = $('#dialog .id_alarmgroups4').length ? $('#dialog .id_alarmgroups4').val() : 'NULL';
						myData['id_alarmgroups3'] = $('#dialog .id_alarmgroups3').length ? $('#dialog .id_alarmgroups3').val() : 'NULL';
						myData['id_alarmgroups2'] = $('#dialog .id_alarmgroups2').length ? $('#dialog .id_alarmgroups2').val() : 'NULL';
						myData['id_alarmgroups1'] = $('#dialog .id_alarmgroups1').length ? $('#dialog .id_alarmgroups1').val() : 'NULL';
						$.post('std.d1minicfg.renewDevice.req', myData, function(data) {
							console.log(data);
							if(data.erg == 'S_OK') {
								p.page.alert(data.msg, 5000);
								$('#dialog').dialog('close');
							} else {
								p.page.alertred(data.msg, 5000);
							}
						}, 'json');
					}
				},{
					text: 'Abbruch',
					click: function() { $('#dialog').dialog('close'); }
				}]
			});
		});
	});
//###################################################################################
	$('#erg').on('click', '.D1MiniDevice .saveFromDevice', function() {
		const wpFreakaZoneLibVersion = $('#wpFreakaZoneLibVersion').text();
		const BasisEmptyVersion = $('#BasisEmptyVersion').text();
		var that = $(this);
		var tr = $(this).parents('tr:first');
		var td = $(this).parents('td:first');
		var id = $(tr).attr('data-id');
		var column = $(td).attr('data-column');
		var value = $(td).find('.smallfont.' + column).text();
		$.post('std.d1minicfg.updateColumn.req', {id:id, column:column, value:value}, function() {
			$(td).find('.stored').text(value);
			if(wpFreakaZoneLibVersion == value || BasisEmptyVersion == value) {
				$(td).find('.stored').removeClass('ps-fontyellow').addClass('ps-fontgreen');
			}
			$(that).addClass('ps-hidden');
			$(td).find('.smallfont').addClass('ps-hidden');
		});
	});
	$('#erg').on('click', '.D1MiniDevice .forceupdate', function() {
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		var d1minigroup = $(this).parents('.d1miniingroup:first').attr('data-group');
		$.post('std.d1minicfg.setcmd.req', {name:name,cmd:'ForceMqttUpdate'}, function(data) {
			if(data == 'S_OK') {
				D1MiniRenew(d1minigroup);
			}
		});
	});
	$('#erg').on('click', '.D1MiniDevice .setupmode', function() {
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		var d1minigroup = $(this).parents('.d1miniingroup:first').attr('data-group');
		$.post('std.d1minicfg.setcmd.req', {name:name,cmd:'UpdateFW'}, function(data) {
			if(data == 'S_OK') {
				D1MiniRenew(d1minigroup);
			}
		});
	});
	$('#erg').on('click', '.D1MiniDevice .setuphttp', function() {
		var ip = $(this).attr('data-ip');
		$.post('std.d1minicfg.starthttpupdate.req', {ip:ip});
	});
	$('#erg').on('click', '.D1MiniDevice .restartdevice', function() {
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		$.post('std.d1minicfg.setcmd.req', {name:name,cmd:'RestartDevice'});
	});
//###################################################################################
	$('#erg').on('click', '.allHttpUpdate', function() {
		var tr = $(this).parents('ul.d1miniingroup:first');
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				var ip = $(this).find('[data-column="ip"] .stored').text();
				$.post('std.d1minicfg.starthttpupdate.req', {ip:ip});
			}
		});
	});
	$('#erg').on('click', '.allForceMqttUpdate', function() {
		var tr = $(this).parents('ul.d1miniingroup:first');
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				var name = $(this).find('[data-column="name"] .stored').text();
				$.post('std.d1minicfg.setcmd.req', {name:name,cmd:'ForceMqttUpdate'});
			}
		});
	});
	$('#erg').on('click', '.allRestart', function() {
		var tr = $(this).parents('ul.d1miniingroup:first');
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				var ip = $(this).find('[data-column="ip"] .stored').text();
				$.post('std.d1minicfg.restartdevice.req', {ip:ip});
			}
		});
	});
	$('#erg').on('click', '.allgroup', function() {
		var tr = $(this).parents('ul.d1miniingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
				names.push($(this).find('[data-column="name"] .stored').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.d1minicfg.allGroup.pop', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'D1 Mini Ggruppe wechseln', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newgroup = $('#c-group').val();
							$.post('std.d1minicfg.allGroup.req', {ids:ids, newgroup:newgroup}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.change('#erg', 'std.d1minicfg.menueditelem.req');
									p.page.alert('<span class="pos">gespeichert</span>');
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">Konnte nicht gespeichert werden.</span>', 3000);
								}
							}, 'json');
						}
					},{
						text: 'Abbruch',
						click: function() { $('#dialog').dialog('close'); }
					}]
				});
			});
		} else {
			p.page.alert('Keine D1 Minis ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allaktiv', function() {
		var tr = $(this).parents('ul.d1miniingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
				names.push($(this).find('[data-column="name"] .stored').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.d1minicfg.allChoosen.pop', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Aktivieren / Deaktivieren', modal: true, width: p.popup.width.middle,
					buttons: [{
						text: 'Aktivieren',
						click: function() {
							$.post('std.d1minicfg.allActive.req', {ids:ids, newaktiv:'True'}, function(data) {
								if(data == 'S_OK') {
									p.page.change('li[data-d1mini=' + $(tr).attr('data-group') + ']', 'std.d1minicfg.getd1minis.req', {d1minigroup:$(tr).attr('data-group')});
									p.page.alert('<span class="pos">gespeichert</span>');
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
								}
							});
						}
					},{
						text: 'Deaktivieren',
						click: function() {
							$.post('std.d1minicfg.allActive.req', {ids:ids, newaktiv:'False'}, function(data) {
								if(data == 'S_OK') {
									p.page.change('li[data-d1mini=' + $(tr).attr('data-group') + ']', 'std.d1minicfg.getd1minis.req', {d1minigroup:$(tr).attr('data-group')});
									p.page.alert('<span class="pos">gespeichert</span>');
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
								}
							});
						}
					},{
						text: 'Abbruch',
						click: function() { $('#dialog').dialog('close'); }
					}]
				});
			});
		} else {
			p.page.alert('Keine Trends Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.alldelete', function() {
		var tr = $(this).parents('ul.d1miniingroup:first');
		var ids = [];
		var names = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
				names.push($(this).find('[data-column="name"] .stored').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.d1minicfg.allChoosen.pop', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Trends löschen', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'löschen',
						click: function() {
							$.post('std.d1minicfg.allDelete.req', {ids:ids}, function(data) {
								if(data.erg == 'S_OK') {
									p.page.alert('<span class="pos">gelöscht</span>');
									$(tr).find('[data-id]').each(function() {
										if(p.valueexist($(this).attr('data-id'), ids)) {
											$(this).remove();
										}
									});
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
								}
							}, 'json');
						}
					},{
						text: 'Abbruch',
						click: function() { $('#dialog').dialog('close'); }
					}]
				});
			});
		} else {
			p.page.alert('Keine Trends ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.OnlineTogglerSendIntervall', function() {
		var newVal = $('#OnlineTogglerSendIntervall').val();
		$.post('std.d1minicfg.setServerSetting.req', {key:'OnlineTogglerSendIntervall', val:newVal}, function(data) {
			if(data.erg != 'S_OK') {
				p.page.alertred(data.msg, 5000);
				D1MiniServerRenew();
			}
		}, 'json');
	});
//###################################################################################
	$('#erg').on('click', '.OnlineTogglerWait', function() {
		var newVal = $('#OnlineTogglerWait').val();
		$.post('std.d1minicfg.setServerSetting.req', {key:'OnlineTogglerWait', val:newVal}, function(data) {
			if(data.erg != 'S_OK') {
				p.page.alertred(data.msg, 5000);
				D1MiniServerRenew();
			}
		}, 'json');
	});
//###################################################################################
	$('#erg').on('click', '.setAllCycle', function() {
		var plugin = $(this).attr('data-plugin');
		var current = 'setAll' + plugin + 'Cycle';
		var newVal = $('#' + current).val();
		$.post('std.d1minicfg.setAllCycle.req', {key:plugin, val:newVal}, function(data) {
			if(data.erg != 'S_OK') {
				p.page.alertred(data.msg, 5000);
			}
		}, 'json');
	});
//###################################################################################
	//p.getValues();
};
function D1MiniServerRenew() {
	$.get('std.d1minicfg.getServerSettings.req', function(renewVal) {
		$('#OnlineTogglerSendIntervall').val(renewVal.OnlineTogglerSendIntervall);
		$('#OnlineTogglerWait').val(renewVal.OnlineTogglerWait);
	}, 'json');
}
function D1MiniRenew(d1minigroup) {
	$.post('std.d1minicfg.getalld1minisettings.req', {d1minigroup:d1minigroup},  function(data) {
		for (const [key, value] of Object.entries(data)) {
			var mac = value.Mac.toLowerCase().replaceAll(':', '');
			setTextIfNotStored(key, 'name', value.DeviceName);
			setTextIfNotStored(key, 'description', value.DeviceDescription);
			setTextIfNotStored(key, 'ip', value.Ip);
			setTextIfNotStored(key, 'mac', mac);
			setTextIfNotStored(key, 'version', value.Version);
			//setTextIfNotStored(key, 'ssid', value.Ssid);
			var updateMode = value.UpdateMode ? '<span class="ps-fontyellow">aktiv</span>' : '<span class="ps-fontgreen">deaktiviert</span>';
			setTextIfNotStored(key, 'updatemode', updateMode);
			setTextIfNotStored(key, 'compiledWith', value.compiledWith);
			var td = $(`tr[data-json=${key}] td.json`);
			$(td).html('<div class="showJsonContainer">' +
				'<div>' +
					'<pre class="showJson closed">' + JSON.stringify(value.D1MiniText, null, '\t') + '</pre>' +
				'</div>' +
			'</div>');
		}
	}, 'json');
}
function setTextIfNotStored(name, column, givenValue) {
	var td = $(`tr[data-name=${name}] td[data-column=${column}]`);
	$(td).find('.ps-export').addClass('ps-hidden');
	$(td).find(`.${column}`).addClass('ps-hidden');
	var storedValue = $(td).find('.stored').text();
	if(givenValue != storedValue) {
		$(td).find('.ps-export').removeClass('ps-hidden');
		$(td).find(`.${column}`).html(givenValue).removeClass('ps-hidden');
	}
}
function setD1MiniInfo(data) {
	console.log(data);
	var values = data.FreakaZoneDevice;
	var name = values.DeviceName;
	var mac = values.MAC.toLowerCase().replaceAll(':', '');
	setTextIfNotStored(name, 'name', values.DeviceName);
	setTextIfNotStored(name, 'description', values.DeviceDescription);
	setTextIfNotStored(name, 'ip', values.IP);
	setTextIfNotStored(name, 'mac', mac);
	setTextIfNotStored(name, 'version', values.Version);
	//setTextIfNotStored(key, 'ssid', value.Ssid);
	var updateMode = values.UpdateMode ? '<span class="ps-fontyellow">aktiv</span>' : '<span class="ps-fontgreen">deaktiviert</span>';
	setTextIfNotStored(name, 'updatemode', updateMode);
	var compiledWith = '';
	for (const [key, value] of Object.entries(values.useModul)) {
		if(value) {
			if(!compiledWithExclude.includes(key)) {
				compiledWith += key + ', ';
			}
		}
	}
	setTextIfNotStored(name, 'compiledWith', (compiledWith.length > 2 ? compiledWith.slice(0, -2) : compiledWith));
	var td = $(`tr[data-json=${name}] td.json`);
	$(td).html('<div class="showJsonContainer">' +
		'<div>' +
			'<pre class="showJson closed">' + JSON.stringify(values, null, '\t') + '</pre>' +
		'</div>' +
	'</div>');
}
function D1MiniSearch() {
	console.log('D1MiniSearch');
	$('.searchResultLoading').addClass('ps-loading').text('searching...');
	CountFound = 0;
	let htmlNew = `
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>IP</th>
			<th>MAC</th>
			<th>Version</th>
			<th>speichern</th>
		</tr>
	</thead>
	<tbody class="FoundNewD1MiniDevices">
	</tbody>
</table>`;
	$('.searchResult .foundNew').html(`Neue Devices gefunden: ${CountFound}`);
	$('.searchResult .erg').html(htmlNew);
}
function D1MiniRegistered() {
	$.get('std.d1minicfg.getregisteredd1minis.req');
}
function getHtmlNewD1Mini(name, newObj) {
	let returns = `
<tr>
	<td>${newObj.FreakaZoneClient}</td>
	<td>${newObj.IP}</td>
	<td>${newObj.MAC}</td>
	<td>${newObj.Version}</td>
	<td class="buttonbox"><span class="ps-button d1MiniAdd" data-key="${name}">Add</span></td>
</tr>`;
	return returns;
}
function getHtmlNewD1MiniRow(exists, iam) {
	console.log('getHtmlNewD1MiniRow');
	iam.MAC = iam.MAC.toLowerCase().replaceAll(':', '');
	let save = exists ? '<span class="ps-fontgreen">vorhanden</span>' : `<span class="ps-button d1MiniAdd" data-key="${iam.FreakaZoneClient}">Add</span>`;
	let returns = `
<tr>
	<td>${iam.FreakaZoneClient}</td>
	<td>${iam.IP}</td>
	<td>${iam.MAC}</td>
	<td>${iam.Version}</td>
	<td class="buttonbox">${save}</td>
</tr>`;
	$('.FoundNewD1MiniDevices').append(returns).find(`[data-key="${iam.FreakaZoneClient}"]`).data(iam);
	$('.searchResult .foundNew').html(`Neue Devices gefunden: ${++CountFound}`);
}
function SearchD1MiniFinished() {
	console.log('SearchD1MiniFinished');
	$('.searchResultLoading').removeClass('ps-loading').text('');
}
