/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 680                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: dpactive.js 680 2024-07-20 00:28:36Z                     $ #
//#                                                                                 #
//###################################################################################
use request\std;
?> dpactive */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/websockets.js' ?>

p.page.load = function() {
	//###################################################################################
	// DP Namespace
	//###################################################################################
	$('#dpactive').on('click', '.ps-tree-parent.dpnamespace', function() {
		var namespaceId = $(this).parents('li').attr('data-dpnamespace');
		if($(this).hasClass('open')) {
			$('.ps-tree-parent.dpnamespace').removeClass('open');
			$('.dpgroups').html('');
		} else {
			$('.ps-tree-parent.dpnamespace').removeClass('open');
			$('.dpgroups').html('');
			$.post('std.dpactive.getdpgroups.req', {iddpnamespace:namespaceId}, function(data) {
				$('.dpgroups[data-dpgroups=' + namespaceId + ']').html(data);
			});
			$(this).addClass('open');
		}
	});
	
	// writelevel Namespace
	$('#dpactive').on('click', '.dpnamespacecontainer .ps-edit', function() {
		var namespaceId = $(this).parents('li').attr('data-dpnamespace');
		var headline = $(this).parents('li').find('.dpnamespace').text();
		var writelevel = $(this).attr('data-writelevel');
		var writegroup = $(this).attr('data-writegroup');
		$.post('std.writelevel.pop', {type:'setdefaultforceserver', headline:headline, writelevel:writelevel, writegroup:writegroup}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Schreibrechte Datenpunkt Namespace bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var obj = {
							serverid:namespaceId,
							value:$.trim($('#oskinput').val()),
							forcewritelevel:$('.force').hasClass('checked') ? 'True' : 'False',
							defaultvalue:$('.null').hasClass('checked') ? 'True' : 'False'
						};
						$.post('std.dpactive.writeleveldpnamespace.req', obj, function(data) {
							if(data == 'S_OK') {
								$('#dialog').dialog('close');
							} else {
								p.page.alert(data);
							}
						});
					}
				}]
			});
		});
	});
	
	// rename Namespace
	$('#dpactive').on('click', '.dpnamespacecontainer .ps-refresh', function() {
		var namespaceContainer = $(this).parents('li');
		var namespaceId = $(namespaceContainer).attr('data-dpnamespace');
		$.post('std.dpactive.renamedpnamespace.pop', {iddpnamespace:namespaceId}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Datenpunktnamespace umbenennen', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var name = $('#UpdateDpNamespaceName').val();
						var description = $('#UpdateDpNamespaceDescription').val();
						$.post('std.dpactive.renamedpnamespace.req', {iddpnamespace:namespaceId, name:name, description:description}, function(data) {
							switch(data.erg) {
								case 'S_OK':
									$(namespaceContainer).attr('title', description);
									$(namespaceContainer).find('.dpnamespace').text(name);
									$('#dialog').dialog('close');
									break;
								case 'S_ERROR':
									p.page.alertred(data.message);
									$('#dialog').dialog('close');
									break;
								default:
									$('#dialog').dialog('close');
							}
						}, 'json');
					}
				}]
			});
		});
	});

	// new Group in Namespace
	$('#dpactive').on('click', '.dpnamespacecontainer .ps-add', function() {
		var namespaceId = $(this).parents('li').attr('data-dpnamespace');
		var headline = $(this).parents('li').find('.dpnamespace .boldfont').text();
		$.post('std.dpactive.dpgroupadd.pop', {headline:headline}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Neue Gruppe im Namespace anlegen', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var obj = {
							namespaceId:namespaceId,
							name:$.trim($('#NewGroupInNamespaceName').val()),
							desc:$.trim($('#NewGroupInNamespaceNameDesc').val())
						};
						$.post('std.dpactive.dpgroupadd.req', obj, function(data) {
							if(data.erg == 'S_OK') $('#dialog').dialog('close');
							if(data.erg == 'S_ERROR') p.page.alertred(data.message);
						}, 'json');
					}
				}]
			});
		});
	});
	
	// delete namespace
	$('#dpactive').on('click', '.dpnamespacecontainer .ps-delete', function() {
		var namespaceContainer = $(this).parents('li');
		var namespaceId = $(namespaceContainer).attr('data-dpnamespace');
		$.post('std.dpactive.deletedpnamespace.req', {iddpnamespace:namespaceId}, function(data) {
			switch(data.erg) {
				case 'S_OK':
					$('.dpgroups' + namespaceId).fadeOut().remove();
					break;
				case 'S_CK':
					$('#dialog').html(data.message).dialog({
						title: 'Datenpunktnamespace löschen', modal: true, width: p.popup.width.middle,
						buttons: [{
							text: 'löschen', click: function() {
								$.post('std.dpactive.deletedpnamespace.req', {iddpnamespace:namespaceId, force:'True'});
							}
						},{
							text: 'Abbrechen', click: function() {
								$('#dialog').dialog('close');
							}
						}]
					});
					break;
			}
		}, 'json');
	});

	$('#dpactive').on('click', '.saveNewDpNamespace', function() {
		var name = $('#newDpNamespaceName').val();
		var description = $('#newDpNamespaceDescription').val();
		$.post('std.dpactive.newdpnamespace.req', {name:name, description:description}, function(data) {
			if(data.erg == 'S_OK') $('.newDpNamespace').before(data.html);
			if(data.erg == 'S_ERROR') p.page.alertred(data.message);
		}, 'json');
	});

	$('#dpactive').on('click', '.ps-tree-parent.dpgroup', function() {
		var groupId = $(this).parents('li').attr('data-dpgroup');
		if($(this).hasClass('open')) {
			$('.ps-tree-parent.dpgroup').removeClass('open');
			$('.dps').html('');
		} else {
			$('.ps-tree-parent.dpgroup').removeClass('open');
			$('.dps').html('');
			$.post('std.dpactive.getdp.req', {iddpgroup:groupId}, function(data) {
				$('.dps[data-dps=' + groupId + ']').html(data);
				ws.register();
			});
			$(this).addClass('open');
		}
	});
	
//###################################################################################
	// Markierungen
	$('#dpactive').on('click', '.markall', function() {
		$('.noBorder .ps-checkbox:not(.ps-disabled)').addClass('checked');
	});
	$('#dpactive').on('click', '.markno', function() {
		$('.noBorder .ps-checkbox:not(.ps-disabled)').removeClass('checked');
	});
//###################################################################################
	$('#dpactive').on('click', '.allgroup', function() {
		var tr = $(this).parents('ul.uldpgroup:first').find('div.dpingroup');
		var ids = [];
		var names = [];
		$(tr).each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
				names.push($(this).find('.dpName').text());
			}
		});
		if(ids.length > 0) {
			$.post('std.dpactive.popallgroup.req', {names:names}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Datapoints Gruppe wechseln', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'OK',
						click: function() {
							var newgroup = $('#c-group').val();
							$.post('std.dpactive.saveallgroup.req', {ids:ids, newgroup:newgroup}, function(data) {
								if(data.erg == 'S_OK') {
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
			p.page.alert('Keine Datapoints ausgewählt');
		}
	});
//###################################################################################
	$('#dpactive').on('click', '.ps-write', function() {
		var dpId = $(this).parents('tr').attr('data-id');
		var unit = $(this).parents('tr').find('.dpunit').text();
		$.post('std.write.pop', {unit:unit}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Datenpunkt beschreiben', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'schreiben', click: function() {
						$.post('std.dpactive.writedp.req', {dpid:dpId, value:$('.newDpVal').val()}, function(data) {
							if(data == 'S_OK') $('#dialog').dialog('close');
							else p.page.alert(data);
						});
					}
				},{
					text: 'Abbrechen', click: function() {
						$('#dialog').dialog('close');
					}
				}]
			}
			);
		});
	});
	$('#dialog').on('click', '.ps-checkbox.null', function() {
		if($(this).hasClass('checked')) {
			$('#dialog .writelevel #oskinput').removeClass('inactive').prop('disabled', false);
			$('#dialog .writelevel .ps-checkbox.force').removeClass('ps-disabled');
		} else {
			$('#dialog .writelevel #oskinput').addClass('inactive').prop('disabled', true);
			$('#dialog .writelevel .ps-checkbox.force').addClass('ps-disabled');
		}
	});
	
	ws.logEnabled = true;
	ws.connect();
};
