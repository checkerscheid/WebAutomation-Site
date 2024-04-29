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
//# Revision     : $Rev:: 585                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1miniactive.js 585 2024-04-15 22:57:57Z                 $ #
//#                                                                                 #
//###################################################################################
?> d1miniactive */

p.page.load = function() {
//###################################################################################
	$('#globalD1MiniCmd').on('click', '.startSearch', function() {
		$('.searchResult').addClass('ps-loading').removeClass('ps-container');
		$('.searchResult .foundNew').text('');
		$('.searchResult .erg').text('');
		$.get('std.d1miniactive.startFreakaZoneSearch.req', function(data) {
			$('.searchResult').removeClass('ps-loading').addClass('ps-container');
			let foundNew = 0;
			let htmlNew = `
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>IP</th>
			<th>MAC</th>
			<th>Version</th>
			<th></th>
		</tr>
	</thead>
	<tbody>`;
			for (const [key, value] of Object.entries(data)) {
				foundNew++;
				//mac correction
				data[key]['Iam']['MAC'] = data[key]['Iam']['MAC'].toLowerCase().replaceAll(':', '');
				htmlNew += getHtmlNew(key, value.Iam);
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
	});
	$('.searchResult').on('click', '.d1MiniAdd', function() {
		let myData = $('.searchResult').data('foundNew')[$(this).attr('data-key')]['Iam'];
		$.post('std.d1miniactive.saveSearchedDevice.req', myData, function(data) {
			p.page.alert(data);
		});
		console.log($('.searchResult').data('foundNew')[$(this).attr('data-key')]['Iam']);
	});
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
	$.get('std.d1miniactive.getsettings.req', function(data) {
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
function getHtmlNew(name, newObj) {
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
