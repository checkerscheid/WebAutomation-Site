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
//# Revision     : $Rev:: 594                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1minibrowse.js 594 2024-04-29 17:52:07Z                 $ #
//#                                                                                 #
//###################################################################################
?> d1miniactive */

p.page.load = function() {
//###################################################################################
	$('#globalD1MiniCmd').on('click', '.startSearch', function() {
		$('.searchResult').addClass('ps-loading').removeClass('ps-container');
		$('.searchResult .foundNew').text('');
		$('.searchResult .erg').text('');
		$.get('std.d1minibrowse.startFreakaZoneSearch.req', function(data) {
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
		var myData = $('.searchResult').data('foundNew')[$(this).attr('data-key')]['Iam'];
		$.get('std.d1minibrowse.popInfoToSaveD1Mini.req', function(data) {
			$('#dialog').html(data).dialog({
				title: 'D1 Mini speichern', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
					click: function() {
						myData['id_d1minigroup'] = $('#dialog .id_d1minigroup').val();
						myData['id_mqttbroker'] = $('#dialog .id_mqttbroker').val();
						myData['id_dpgroup'] = $('#dialog .id_dpgroup').val();
						myData['id_trendgroup'] = $('#dialog .id_trendgroup').val();
						$.post('std.d1minibrowse.saveSearchedDevice.req', myData, function(data) {
							if(data == 'S_OK') {
								$('#dialog').dialog('close');
							} else {
								p.page.alert(data);
							}
						});
					}
				},{
					text: 'Abbruch',
					click: function() { $('#dialog').dialog('close'); }
				}]
			});
		});
	});
//###################################################################################
	//p.getValues();
};

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
