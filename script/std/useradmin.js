/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 24.06.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 572                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: useradmin.js 572 2024-03-20 06:52:42Z                    $ #
//#                                                                                 #
//###################################################################################
use system\wpInit;
?> useradmin */

// p.log.level = p.log.type.info;

p.page.load = function() {
	$('#useradmin').on('click', '.p-userdelete', function() {
		var div = $(this).parents('.usercontainer');
		var id = $(div).attr('data-id');
		$('#dialog').html('Der Benutzer wird gelöscht.<br /><span class="ps-bold">Diese Aktion ist endgültig</span>').dialog({
			title: 'Benutzer löschen', modal: true, width: p.popup.width.std,
			buttons: [{
				text:'fortsetzen',
				click:function () {
					$.post('std.useradmin.deleteuser.req', {id:id}, function(data) {
						if(data == 'S_OK') {
							$(div).remove();
							$('#dialog').dialog('close');
						} else {
							p.page.alert('<span class="neg">' + data + '</span>');
						}
					});
				}
			},{
				text:'abbrechen',
				click:function () {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	$('#useradmin').on('click', '.p-userrefresh', function() {
		var div = $(this).parents('.usercontainer');
		var id = $(div).attr('data-id');
		$('#dialog').html('Das Userpasswort wird auf:<br /><span class="ps-bold"><?=wpInit::$stdpwd?></span><br />zurückgestzt.<br />Der Benutzer kann dieses dann selbst wieder &auml;ndern.').dialog({
			title: 'Passwort zurücksetzen', modal: true, width: p.popup.width.std,
			buttons: [{
				text:'fortsetzen',
				click:function () {
					$.post('std.useradmin.resetpasswort.req', {id:id}, function(data) {
						if(data == 'S_OK') {
							$(div).find('h3').addClass('noreset');
							$('#dialog').dialog('close');
						} else {
							p.page.alert('<span class="neg">' + data + '</span>');
						}
					});
					$('#dialog').dialog('close');
				}
			},{
				text:'Abbrechn',
				click:function () {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	$('#useradmin').on('click', '.p-useredit', function() {
		var div = $(this).parents('.usercontainer');
		var id = $(div).attr('data-id');
		$.post('std.useradmin.useredit.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Benutzer bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: null
			});
		});
	});
	$('#useradmin').on('click', '.copyPW', function() {
		if(!navigator.clipboard) {
			return
		}
		navigator.clipboard.writeText($('#password').text())
			.then(() => {
				p.page.alert('<span class="pos">&#10004;</span>');
				console.log('Text copied to clipboard...');
			}).catch(err => {
				console.log('Something went wrong', err);
			});
	});

	$('.ps-container').on('click', 'h3', function() {
		var elem = $(this).parent('.ps-container').find('.height0');
		if($(elem).hasClass('open')) {
			$(this).removeClass('open');
			$(elem).removeClass('open').animate({ height:'0px' });
		} else {
			$(this).addClass('open');
			$(elem).addClass('open').animate({ height:$(elem).get(0).scrollHeight });
		}
	});

	$('#dialog').on('click', '.usereditsend', function() {
		var obj = {
				lastname:$('#pulastname').val(),
				name:$('#puname').val(),
				gruppe:$('#pugruppe').val(),
				startpage:$('#pustartpage').val(),
				autologoff:$('#puautologoff').val(),
				showpopup:$('#pushowpopup').val(),
				contact:$('#pucontact').val(),
				id:$('#puiduser').val()
		};
		$.post('std.useradmin.saveuseredit.req', obj, function(data) {
			if(data == 'S_OK') {
				$('#dialog').dialog('close');
				p.page.href('useradmin');
			} else {
				$('#dialog').find('.puerror').html(data);
			}
		});
	});
	p.getValues();
};
