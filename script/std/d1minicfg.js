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
//# Revision     : $Rev:: 610                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1minicfg.js 610 2024-05-15 20:26:33Z                    $ #
//#                                                                                 #
//###################################################################################
?> d1minicfg */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>

groups.tablename = 'd1minigroup';
groups.member = 'd1mini';
groups.target = 'd1minicfg';

p.page.load = function() {
	groups.init();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		var menuitemclicked = $(this).attr('data-target');
		p.page.change('#erg', 'std.d1minicfg.menu' + menuitemclicked + '.req', {table:groups.tablename}, function() {
			if(menuitemclicked == 'searchd1mini') {
				D1MiniSearch();
				D1MiniRegistered();
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
				D1MiniRenew(d1minigroup);
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
	$('#d1minicfg').on('click', '.searchResult .d1MiniAdd', function() {
		var myData = $('.searchResult').data('foundNew')[$(this).attr('data-key')]['Iam'];
		$.get('std.d1minicfg.infoToSaveD1Mini.pop', function(data) {
			$('#dialog').html(data).dialog({
				title: 'D1 Mini speichern', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
					click: function() {
						myData['id_d1minigroup'] = $('#dialog .id_d1minigroup').val();
						myData['id_mqttgroup'] = $('#dialog .id_mqttgroup').val();
						myData['id_dpgroup'] = $('#dialog .id_dpgroup').val();
						myData['id_trendgroup'] = $('#dialog .id_trendgroup').val();
						$.post('std.d1minicfg.saveSearchedDevice.req', myData, function(data) {
							console.log(data);
							if(data.erg == 'S_OK') {
								p.page.alert(data.msg);
								$('#dialog').dialog('close');
							} else {
								p.page.alertred(data.msg, 10000);
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
		$.get('std.d1minicfg.infoToSaveD1Mini.pop', function(data) {
			$('#dialog').html(data).dialog({
				title: 'D1 Mini MQTT und Trend erneuern', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
					click: function() {
						myData['id_d1minigroup'] = $('#dialog .id_d1minigroup').val();
						myData['id_mqttgroup'] = $('#dialog .id_mqttgroup').val();
						myData['id_dpgroup'] = $('#dialog .id_dpgroup').val();
						myData['id_trendgroup'] = $('#dialog .id_trendgroup').val();
						myData['id_alarmgroup'] = $('#dialog .id_alarmgroup').val();
						$.post('std.d1minicfg.renewDevice.req', myData, function(data) {
							console.log(data);
							if(data.erg == 'S_OK') {
								p.page.alert(data.msg);
								$('#dialog').dialog('close');
							} else {
								p.page.alertred(data.msg, 10000);
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
		var that = $(this);
		var tr = $(this).parents('tr:first');
		var td = $(this).parents('td:first');
		var id = $(tr).attr('data-id');
		var column = $(td).attr('data-column');
		var value = $(td).find('.smallfont.' + column).text();
		$.post('std.d1minicfg.updateColumn.req', {id:id, column:column, value:value}, function() {
			$(td).find('.stored').text(value);
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
	$('#erg').on('click', '.D1MiniDevice .restartdevice', function() {
		var name = $(this).parents('tr.D1MiniDevice').attr('data-name');
		$.post('std.d1minicfg.setcmd.req', {name:name,cmd:'RestartDevice'});
	});
//###################################################################################
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
				p.alertred(data.msg, 5000);
			}
		}, 'json');
	});
//###################################################################################
	$('#erg').on('click', '.OnlineTogglerWait', function() {
		var newVal = $('#OnlineTogglerWait').val();
		$.post('std.d1minicfg.setServerSetting.req', {key:'OnlineTogglerSendIntervall', val:newVal}, function(data) {
			if(data.erg != 'S_OK') {
				p.alertred(data.msg, 5000);
			}
		}, 'json');
	});
//###################################################################################
	//p.getValues();
};

function D1MiniRenew(d1minigroup) {
	$.post('std.d1minicfg.getalld1minisettings.req', {d1minigroup:d1minigroup},  function(data) {
		for (const [key, value] of Object.entries(data)) {
			var mac = value.Mac.toLowerCase().replaceAll(':', '');
			setTextIfNotStored(key, 'name', value.DeviceName);
			setTextIfNotStored(key, 'description', value.DeviceDescription);
			setTextIfNotStored(key, 'ip', value.Ip);
			setTextIfNotStored(key, 'mac', mac);
			var wpFZVersion = typeof value.wpFreakaZoneVersion == 'undefined' ? '' : value.wpFreakaZoneVersion;
			setTextIfNotStored(key, 'wpFreakaZoneVersion', wpFZVersion);
			setTextIfNotStored(key, 'version', value.Version);
			//setTextIfNotStored(key, 'ssid', value.Ssid);
			var updateMode = value.UpdateMode ? '<span class="ps-fontyellow">aktiv</span>' : '<span class="ps-fontgreen">deaktiviert</span>';
			setTextIfNotStored(key, 'updatemode', updateMode);
			setTextIfNotStored(key, 'compiledWith', value.compiledWith);
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
function D1MiniSearch() {
	$('.searchResult').addClass('ps-loading').removeClass('ps-container');
	$('.searchResult .foundNew').text('searching...');
	$('.searchResult .erg').text('');
	$.get('std.d1minicfg.startFreakaZoneSearch.req', function(data) {
		$('.searchResult').removeClass('ps-loading').addClass('ps-container');
		let foundNew = 0;
		let htmlNew = `
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>IP</th>
			<th>MAC</th>
			<th>wpFreakaZone</th>
			<th>Version</th>
			<th></th>
		</tr>
	</thead>
	<tbody>`;
		for (const [key, value] of Object.entries(data)) {
			foundNew++;
			//mac correction
			data[key]['Iam']['MAC'] = data[key]['Iam']['MAC'].toLowerCase().replaceAll(':', '');
			htmlNew += getHtmlNewD1Mini(key, value.Iam);
		}
		htmlNew += `
	</tbody>
</table>`;
		$('.searchResult .foundNew').text(`Neue Devices gefunden: ${foundNew}`);
		if(foundNew > 0) {
			$('.searchResult').data('foundNew', data);
			$('.searchResult .erg').html(htmlNew);
		}
		//$('.searchResult pre').text(JSON.stringify(data, null, 4));
	}, 'json');
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
	<td>${newObj.wpFreakaZoneVersion}</td>
	<td>${newObj.Version}</td>
	<td class="buttonbox"><span class="ps-button d1MiniAdd" data-key="${name}">Add</span></td>
</tr>`;
	return returns;
}
