/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 21.03.2016                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 638                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: contacts.js 638 2024-07-04 14:41:27Z                     $ #
//#                                                                                 #
//###################################################################################
?> contacts */

p.page.load = function() {
	//p.page.change('#erg', 'std.contacts.menucontacts.req');

	$('#contacts').on('click', '.addnewcontact', function() {
		$.get('std.contacts.popupnewcontact.req', function(data) {
			$('#dialog').html(data).dialog({
				title: 'Neuen Teilnehmer anlegen',
				modal: true,
				//width: p.popup.width.middel,
				width: 'auto',
				buttons: [{
					text: 'OK',
					click: function() {
						var Obj = {
							address: $('#dialog').find('input.email').val(),
							sms: $('#dialog').find('span.sms').hasClass('checked') ? '1' : '0',
							phone: $('#dialog').find('input.phone').val(),
							phone2: $('#dialog').find('input.phone2').val(),
							etc: $('#dialog').find('input.etc').val(),
							lastname: $('#dialog').find('input.lastname').val(),
							name: $('#dialog').find('input.name').val(),
							active: $('#dialog').find('span.active').hasClass('checked') ? '1' : '0'
						};
						$.post('std.contacts.savenewcontact.req', Obj, function(data) {
							if(data == 'S_OK') {
								$('#dialog').dialog('close');
								location.reload();
							} else {
								p.page.alert(data);
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
//###################################################################################
	$('#contacts').on('click', '.email-edit', function() {
		var id = $(this).attr('data-email');
		$.post('std.contacts.popupeditcontact.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Teilnehmer bearbeiten',
				modal: true,
				width: 'auto',
				//width: p.popup.width.middel,
				buttons: [{
					text: 'Speichern',
					click: function() {
						var Obj = {
							id: $('#dialog').find('div.table').attr('data-id'),
							address: $('#dialog').find('input.email').val(),
							sms: $('#dialog').find('span.sms').hasClass('checked') ? '1' : '0',
							phone: $('#dialog').find('input.phone').val(),
							phone2: $('#dialog').find('input.phone2').val(),
							etc: $('#dialog').find('input.etc').val(),
							lastname: $('#dialog').find('input.lastname').val(),
							name: $('#dialog').find('input.name').val(),
							active: $('#dialog').find('span.active').hasClass('checked') ? '1' : '0'
						};
						$.post('std.contacts.updatecontact.req', Obj, function(data) {
							if(data == 'S_OK') {
								var toUpdate = $('#contacts .table').find('div[data-id=' + Obj.id + ']');
								$(toUpdate).find('h2').text(Obj.lastname + ', ' + Obj.name);
								if(Obj.active == '1') $(toUpdate).find('span.active').addClass('pos').removeClass('neg').text('aktiv');
								else $(toUpdate).find('span.active').removeClass('pos').addClass('neg').text('inaktiv');
								if(Obj.sms == '1') $(toUpdate).find('span.sms').addClass('pos').text('ja');
								else $(toUpdate).find('span.sms').removeClass('pos').text('nein');
								$(toUpdate).find('.address').text(Obj.address);
								$('#dialog').dialog('close');
								p.page.alert('<span class="pos">gespeichert</span>');
								//location.reload();
							} else {
								p.page.alert(data);
							}
						});
					}
				}]
			});
		});
	});
//###################################################################################
	$('#contacts').on('click', '.email-delete', function() {
		var id = $(this).attr('data-email');
		$.post('std.contacts.deletecontact.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				$('#contacts .table').find('div[data-id=' + id + ']').hide(500);
				p.page.alert('<span class="pos">gespeichert</span>');
				//location.reload();
				//$(this).remove();
			} else {
				p.page.alert(data);
			}
		});
	});
};