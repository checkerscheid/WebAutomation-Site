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
//# Revision     : $Rev:: 561                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: opcactive.js 561 2024-01-16 02:06:50Z                     $ #
//#                                                                                 #
//###################################################################################
use system\std;
?> opcactive */

// p.log.level = p.log.type.info;

var commstart = {0:false};
var id = 0;
var showalltext = true;
p.automation.pointrate = 10000;
p.page.load = function() {
	if($('#masterul').length) {
		var masterserver = $('#masterul').attr('data-serverid');
		var mastergroup = $('#masterul').attr('data-groupid');
		$('[data-server=' + masterserver + '] .ps-tree-parent').addClass('open');
		$.post('std.opcactive.getgroups.req', {server: masterserver}, function(data) {
			$('[data-groups=' + masterserver + ']').html(data);
			
			$('[data-group=' + mastergroup + '] .ps-tree-parent').addClass('open');
			$.post('std.opcactive.getitems.req', {group: mastergroup, mark: '<?=std::gets("param1")?>'}, function(data) {
				$('[data-items=' + mastergroup + ']').html(data);
				commstart[++id] = true;
				p.log.write('COM gestartet: ' + id);
				getValues(id);
				if(showalltext) $('div.td').removeClass('maxw');
				window.location = '#id<?=std::gets("param1")?>';
			});
		});
	}
	//###################################################################################
	// Tree View
	//###################################################################################
	$('#opcactive').on('click', '[data-server] .ps-tree-parent', function() {
		$('[data-groups]').html('');
		if($(this).hasClass('open')) {
			$('[data-server] .ps-tree-parent').removeClass('open');
		} else {
			$('[data-server] .ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			if(commstart[id]) {
				commstart[id] = false;
				p.log.write('COM gestoppt: ' + id);
			}
			var server = $(this).parents('[data-server]:first').attr('data-server');
			$.post('std.opcactive.getgroups.req', {server:server}, function(data) {
				$('[data-groups=' + server + ']').html(data);
			});
		}
	});
	//###################################################################################
	$('#opcactive').on('click', '[data-group] .ps-tree-parent', function() {
		$('[data-items]').html('');
		if($(this).hasClass('open')) {
			$('[data-group] .ps-tree-parent').removeClass('open');
		} else {
			$('[data-group] .ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			if(commstart[id]) {
				commstart[id] = false;
				p.log.write('COM gestoppt: ' + id);
			}
			var group = $(this).parents('[data-group]:first').attr('data-group');
			$.post('std.opcactive.getitems.req', {group:group}, function(data) {
				$('[data-items=' + group + ']').html(data);
				commstart[++id] = true;
				p.log.write('COM gestartet: ' + id);
				getValues(id);
				if(showalltext) $('div.td').removeClass('maxw');
			});
		}
	});
	//###################################################################################
	// Server
	//###################################################################################
	$('#opcactive').on('click', '.renameserver', function() {
		var serverid = $(this).parents('li[data-server]:first').attr('data-server');
		var defaultValue = $(this).parents('li[data-server]:first').find('span:first').text();
		$.post('std.osk.pop', {type:'min', defaultValue:defaultValue}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'OPC Server umbenennen', modal: true, width: p.popup.width.osk,
				buttons: [{
					text: 'speichern',
					click: function() {
						var newname = $.trim($('#oskinput').val()).replace(/[^a-zA-Z0-9_ äöüÄÖÜß]/, '_');
						$.post('std.opcactive.renameopcserver.req', {serverid:serverid,newname:newname}, function(data) {
							if(data == 'S_OK') {
								$('li[data-server=' + serverid + ']').find('span:first').text(newname);
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
	$('#opcactive').on('click', '.deleteserver', function() {
		var serverid = $(this).parents('li[data-server]:first').attr('data-server');
		$('#dialog').html('<h1 class="neg">Wollen Sie wirklich löschen?</h1>' +
		                  '<p>Es werden auch alle OPC Gruppen und OPC Datenpunkte entfernt</p>').dialog({
			title: 'OPC Server löschen', modal: true, width: p.popup.width.middle,
			buttons: [{
				text: 'Ja, löschen',
				click: function() {
					$.post('std.opcactive.deleteopcserver.req', {serverid:serverid}, function(data) {
						if(data == 'S_OK') {
							p.page.alert('<span class="pos">gespeichert</span>');
							$('[data-server=' + serverid + ']').remove();
							$('[data-groups=' + serverid + ']').remove();
						} else {
							p.page.alert('<span class="neg">' + data + '</span>', 3000);
						}
						$('#dialog').dialog('close');
					});
				}
			}, {
				text: 'Abbrechen',
				click: function() {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	$('#opcactive').on('click', '.editserver', function() {
		var serverid = $(this).parents('li[data-server]:first').attr('data-server');
		var headline = $(this).parents('li[data-server]:first').text();
		var writelevel = $(this).attr('data-writelevel');
		var writegroup = $(this).attr('data-writegroup');
		$.post('std.writelevel.pop', {type:'setdefaultforceserver',headline:headline, writelevel:writelevel, writegroup:writegroup}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Schreibrechte OPC Server bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var obj = {
							serverid:serverid,
							value:$.trim($('#oskinput').val()),
							forcewritelevel:$('.force').hasClass('checked') ? 'True' : 'False',
							defaultvalue:$('.null').hasClass('checked') ? 'True' : 'False'
						};
						$.post('std.opcactive.editopcserver.req', obj, function(data) {
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
	$('#dialog').on('click', '.ps-checkbox.null', function() {
		if($(this).hasClass('checked')) {
			$('#dialog .writelevel #oskinput').removeClass('inactive').prop('disabled', false);
			$('#dialog .writelevel .ps-checkbox.force').removeClass('ps-disabled');
		} else {
			$('#dialog .writelevel #oskinput').addClass('inactive').prop('disabled', true);
			$('#dialog .writelevel .ps-checkbox.force').addClass('ps-disabled');
		}
	});
	$('#opcactive').on('click', '.infoserver', function() {
		var serverid = $(this).parents('li[data-server]:first').attr('data-server');
		$.post('std.opcactive.infoopcserver.req', {serverid:serverid}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'OPC Server Informationen', modal: true, width: p.popup.width.osk, maxHeight:600,
				buttons:null
			});
		});
	});
	$('#opcactive').on('click', '.addgroup', function() {
		var serverid = $(this).parents('li[data-server]:first').attr('data-server');
		$.post('std.osk.pop', {type:'min'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Neue OPC Gruppe - Name', modal: true, width: p.popup.width.osk,
				buttons: [{
					text:'speichern',
					click: function() {
						var newname = $.trim($('#oskinput').val()).replace(/[^a-zA-Z0-9_]/, '_');
						$.post('std.opcactive.newopcgroup.req', {serverid:serverid,newname:newname}, function(data) {
							if(data == 'S_OK') {
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
	$('#opcactive').on('click', '.showdpnames', function() {
		$('[data-opcname]').each(function() {
			if(!$(this).hasClass('thishasopcname'))
				$(this).html($(this).html() + '<br />' + $(this).attr('data-opcname')).addClass('thishasopcname');
		});
	});
	//###################################################################################
	// Gruppen
	//###################################################################################
	$('#opcactive').on('click', '.renamegroup', function() {
		var groupid = $(this).parents('li[data-group]:first').attr('data-group');
		var defaultValue = $(this).parents('li[data-group]:first').find('span:first').text();
		$.post('std.osk.pop', {type:'min',defaultValue:defaultValue}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'OPC Gruppe umbenennen', modal: true, width: p.popup.width.osk,
				buttons: [{
					text: 'speichern',
					click: function() {
						var newname = $.trim($('#oskinput').val()).replace(/[^a-zA-Z0-9_]/, '_');
						$.post('std.opcactive.renameopcgroup.req', {idgroup:groupid,newname:newname}, function(data) {
							if(data == 'S_OK') {
								$('li[data-group=' + groupid + ']').find('span:first').text(newname);
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
	$('#opcactive').on('click', '.deletegroup', function() {
		var groupid = $(this).parents('li[data-group]:first').attr('data-group');
		$('#dialog').html('<h1 class="neg">Wollen Sie wirklich löschen?</h1>' +
		                  '<p>Es werden auch alle OPC Datenpunkte entfernt</p>').dialog({
			title: 'OPC Gruppe löschen', modal: true, width: p.popup.width.middle,
			buttons: [{
				text: 'Ja, löschen',
				click: function() {
					$.post('std.opcactive.deleteopcgroup.req', {groupid:groupid}, function(data) {
						if(data == 'S_OK') {
							p.page.alert('<span class="pos">gespeichert</span>');
							$('[data-group=' + groupid + ']').remove();
							$('[data-items=' + groupid + ']').remove();
						} else {
							p.page.alert('<span class="neg">' + data + '</span>', 3000);
						}
						$('#dialog').dialog('close');
					});
				}
			}, {
				text: 'Abbrechen',
				click: function() {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	$('#opcactive').on('click', '.editgroup', function() {
		var groupid = $(this).parents('li[data-group]:first').attr('data-group');
		var headline = $(this).parents('li[data-group]:first').text();
		var writelevel = $(this).attr('data-writelevel');
		var writegroup = $(this).attr('data-writegroup');
		$.post('std.writelevel.pop', {type:'setdefaultforcegroup',headline:headline, writelevel:writelevel, writegroup:writegroup}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Schreibrechte OPC Gruppe bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var obj = {
							groupid:groupid,
							value:$.trim($('#oskinput').val()),
							forcewritelevel:$('.force').hasClass('checked') ? 'True' : 'False',
							defaultvalue:$('.null').hasClass('checked') ? 'True' : 'False'
						};
						$.post('std.opcactive.editopcgroup.req', obj, function(data) {
							if(data == 'S_OK') {
								$('#dialog').dialog('close');
								if($('[data-group=' + groupid + '] .ps-tree-parent').hasClass('open')) {
									$.post('std.opcactive.getitems.req', {group:groupid}, function(data) {
										$('[data-items=' + groupid + ']').html(data);
										if(showalltext) $('div.td').removeClass('maxw');
									});
								}
							} else {
								p.page.alert(data);
							}
						});
					}
				}]
			});
		});
	});
	$('#opcactive').on('click', '.infogroup', function() {
		var groupid = $(this).parents('li[data-group]:first').attr('data-group');
		$.post('std.opcactive.infoopcgroup.req', {groupid:groupid}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'OPC Gruppe Informationen', modal: true, width: p.popup.width.osk, maxHeight: 500,
				buttons:null
			});
		});
	});
	$('#opcactive').on('click', '.activegroup', function() {
		var groupid = $(this).parents('li[data-group]:first').attr('data-group');
		$.post('std.opcactive.activeopcgroup.req', {groupid:groupid}, function(data) {
			switch(data) {
				case 'True':
					$.post('std.opcactive.getitems.req', {group:groupid}, function(data) {
						$('[data-group=' + groupid + ']').removeClass('inactive');
						$('[data-items=' + groupid + ']').html(data).removeClass('inactive');
						if(showalltext) $('div.td').removeClass('maxw');
					});
					break;
				case 'False':
					$.post('std.opcactive.getitems.req', {group:groupid}, function(data) {
						$('[data-group=' + groupid + ']').addClass('inactive');
						$('[data-items=' + groupid + ']').html(data).addClass('inactive');
						if(showalltext) $('div.td').removeClass('maxw');
					});
					break;
				default:
					p.page.alert('fehler passieren!' + data);
					break;
			}
		});
	});
	//###################################################################################
	// Items
	//###################################################################################
	$('#opcactive').on('click', '.writeitem', function() {
		var dpType = $(this).parents('div.tr').find('[data-type]').text();
		var point = $(this).attr('data-point');
		switch(dpType) {
			case 'VT_BOOL':
				$.post('std.truefalseohnehandauto.pop', {headline:point,elem:point}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'OPC Datenpunkt beschreiben', modal: true, width: p.popup.width.std,
						buttons:null
					});
				});
				break;
			case 'VT_BSTR':
				isbig = false;
				$.post('std.osk.pop', {headline:point,elem:point}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'OPC Datenpunkt beschreiben', modal: true, width: p.popup.width.osk,
						buttons: [{
							text: 'speichern',
							click: function() {
								var value = $.trim($('#oskinput').val());
								p.automation.write(point, value);
								$('#dialog').dialog('close');
							}
						}]
					});
				});
				break;
			default:
				$.post('std.numpad.pop', {headline:point,elem:point}, function(data) {
					firstclick = true;
					$('#dialog').html(data).dialog({
						title: 'OPC Datenpunkt beschreiben', modal: true, width: p.popup.width.std,
						buttons: [{
							text: 'speichern',
							click: function() {
								var value = $.trim($('#oskinput').val());
								p.automation.write(point, value);
								$('#dialog').dialog('close');
							}
						}]
					});
				});
				break;
		}
	});
	//###################################################################################
	$('#opcactive').on('click', '.moveitem', function() {
		var idserver = $(this).parents('[data-groups]').attr('data-groups');
		var idgroup = $(this).parents('[data-items]').attr('data-items');
		var idpoint = $(this).parents('div.tr:first').attr('data-item');
		var namepoint = $(this).parents('div.tr:first').attr('data-name');
		var t = $(this).parents('div.tr:first');
		$.post('std.opcactive.selectgrouptomoveitem.req', {idserver:idserver,idgroup:idgroup,idpoint:idpoint,namepoint:namepoint}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'OPC Datenpunkt in andere OPC Gruppe verschieben', modal: true, width: p.popup.width.osk,
				buttons: [{
					text:'verschieben',
					click: function() {
						var newgroup = $('#dialog .opcgrouptomoveto').val();
						$.post('std.opcactive.moveopcitem.req', {itemid:idpoint,groupid:newgroup}, function(data) {
							if(data == 'S_OK') {
								$(t).remove();
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});

	});
	//###################################################################################
	$('#opcactive').on('click', '.renameitem', function() {
		var itemid = $(this).parents('div[data-item]:first').attr('data-item');
		var itemspan = $(this).parents('div.td:first').find('span:first');
		$.post('std.osk.pop', {type:'min', defaultValue:$(itemspan).text()}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'OPC Datenpunkt umbenennen', modal: true, width: p.popup.width.osk,
				buttons: [{
					text:'speichern',
					click: function() {
						var newname = $.trim($('#oskinput').val()).replace(/[^a-zA-Z0-9_ äöüÄÖÜß]/, '_');
						$.post('std.opcactive.renameopcitem.req', {itemid:itemid,newname:newname}, function(data) {
							if(data == 'S_OK') {
								$(itemspan).text(newname);
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
//###################################################################################
	$('#opcactive').on('click', '.descriptionitem', function() {
		var itemid = $(this).parents('div.tr:first').attr('data-item');
		var itemspan = $(this).parents('div.td:first').find('span:first');
		$.post('std.osk.pop', {type:'min', defaultValue:$(itemspan).text()}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Beschreibung bearbeiten', modal: true, width: p.popup.width.osk,
				buttons: [{
					text:'speichern',
					click: function() {
						var newname = $.trim($('#oskinput').val()).replace(/[^a-zA-Z0-9_ äöüÄÖÜß]/, '_');
						$.post('std.opcactive.descriptionitem.req', {itemid:itemid,newname:newname}, function(data) {
							if(data == 'S_OK') {
								$(itemspan).text(newname);
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
	//###################################################################################
	$('#opcactive').on('click', '.deleteitem', function() {
		var itemrow = $(this).parents('div.tr:first');
		var itemid = $(itemrow).attr('data-item');
		$('#dialog').html('<h1 class="neg">Wollen Sie wirklich löschen?</h1>').dialog({
			title: 'OPC Datenpunkt löschen', modal: true, width: p.popup.width.middle,
			buttons: [{
				text: 'Ja, löschen',
				click: function() {
					$.post('std.opcactive.deleteopcitem.req', {itemid:itemid}, function(data) {
						if(data == 'S_OK') {
							p.page.alert('<span class="pos">gespeichert</span>');
							$(itemrow).remove();
						} else {
							p.page.alert('<span class="neg">' + data + '</span>', 3000);
						}
						$('#dialog').dialog('close');
					});
				}
			}, {
				text: 'Abbrechen',
				click: function() {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	//###################################################################################
	$('#opcactive').on('click', '.edititem', function() {
		var itemid = $(this).parents('div[data-item]:first').attr('data-item');
		var groupid = $(this).parents('li[data-items]:first').attr('data-items');
		var headline = $(this).parents('div[data-item]:first').attr('data-name');
		var writelevel = $(this).attr('data-writelevel');
		var writegroup = $(this).attr('data-writegroup');
		$.post('std.writelevel.pop', {type:'setdefault', headline:headline, writelevel:writelevel, writegroup:writegroup}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Schreibrechte OPC Datenpunkt bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var obj = {
							itemid:itemid,
							value:$.trim($('#oskinput').val()),
							defaultvalue:$('.null').hasClass('checked') ? 'True' : 'False'
						};
						$.post('std.opcactive.editopcitem.req', obj, function(data) {
							if(data == 'S_OK') {
								$('#dialog').dialog('close');
								if($('[data-group=' + groupid + '] .ps-tree-parent').hasClass('open')) {
									$.post('std.opcactive.getitems.req', {group:groupid}, function(data) {
										$('[data-items=' + groupid + ']').html(data);
										if(showalltext) $('div.td').removeClass('maxw');
									});
								}
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
	$('#opcactive').on('click', '.nksitem', function() {
		var itemid = $(this).parents('div.tr:first').attr('data-item');
		var nksspan = $(this).parents('div.td:first').find('span:first');
		$.post('std.numpad.pop', {type:'setdefault'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Nachkommastelle bearbeiten', modal: true, width: p.popup.width.std,
				buttons: [{
					text:'speichern',
					click: function() {
						var newnks = $.trim($('#oskinput').val());
						var isnull = 'False';
						if($('.null').hasClass('checked') || newnks == '') {
							isnull = 'True';
							newnks = '';
						}
						$.post('std.opcactive.nksopcitem.req', {itemid:itemid,newnks:newnks,isnull:isnull}, function(data) {
							if(data == 'S_OK') {
								$(nksspan).text(newnks);
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
	//###################################################################################
	$('#dialog').on('click','#weitere',function(){
		$(this).parents('tr').find('#bedingung').append('<input class="ps-input" type="text" value="<?=std::posts("defaultValue")?>" />');
		$(this).parents('tr').find('#text').append('<input class="ps-input" type="text" value="<?=std::posts("defaultValue")?>" />');
	});
	$('#dialog').on('click','#weniger',function(){
		if($(this).parents('tr').find('#bedingung input').length > 1){
			$(this).parents('tr').find('#bedingung input:last-child').detach();
			$(this).parents('tr').find('#text input:last-child').detach();
		}
	});
	$('#opcactive').on('click', '.unititem', function() {
		var spanunit = $(this).parents('div.td:first').find('span:first');
		var special = {
			type: 'unit',
			itemid: $(this).parents('div.tr:first').attr('data-item'),
			dtype: $(this).parents('div.tr:first').find('[data-type]').text(),
			newunit: '',
			utype: ''
		};

		$.post('std.osk.pop', special, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Einheit bearbeiten', modal: true, width: p.popup.width.osk,
				buttons: [{
					text:'speichern',
					click: function() {
						var radio = '';
						special.utype = $('input[type=radio]:checked').val();
						if(special.utype == 'boolean') {
							var wahr = $('.ibool:first').val();
							var falsch = $('.ibool:last').val();
							radio = 'True:' + wahr + ';False:' + falsch + ';';
						} else if(special.utype == 'nAuswahl') {
							var i = 1;
							radio = '';
							$('#bedingung input').each(function() {
								radio += $(this).val() + ':' + $('#text input:nth-child(' + i + ')').val() + ';';
								i++;
							});
						} else {
							radio = $('input[type=radio]:checked').parents('tr').find('input.ps-input').val();
							if(typeof(radio) == 'undefined') radio = $('input[type=radio]:checked').parents('tr').find('select option:selected').text();
						}
						special.newunit = $.trim(radio);
						$.post('std.opcactive.unitopcitem.req', special, function(data) {
							if(data == 'S_OK') {
								$(spanunit).text(special.newunit);
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
	//###################################################################################
	$('#opcactive').on('click', '.factoritem', function() {
		var itemid = $(this).parents('div.tr:first').attr('data-item');
		var factorspan = $(this).parents('div.td:first').find('span:first');
		$.post('std.numpad.pop', {type:'setdefault'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Faktor bearbeiten', modal: true, width: p.popup.width.std,
				buttons: [{
					text:'speichern',
					click: function() {
						var newfactor = $.trim($('#oskinput').val());
						var isnull = 'False';
						if($('.null').hasClass('checked') || newfactor == '') {
							isnull = 'True';
							newfactor = '1.0';
						}
						$.post('std.opcactive.factoropcitem.req', {itemid:itemid,newfactor:newfactor,isnull:isnull}, function(data) {
							if(data == 'S_OK') {
								$(factorspan).text(newfactor);
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
	//###################################################################################
	$('#opcactive').on('click', '.minitem', function() {
		var itemid = $(this).parents('div.tr:first').attr('data-item');
		var minspan = $(this).parents('div.td:first').find('span:first');
		$.post('std.numpad.pop', {type:'setdefault'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Minimalwert bearbeiten', modal: true, width: p.popup.width.std,
				buttons: [{
					text:'speichern',
					click: function() {
						var newmin = $.trim($('#oskinput').val());
						var isnull = 'False';
						if($('.null').hasClass('checked') || newmin == '') {
							isnull = 'True';
							newmin = '0.0';
						}
						$.post('std.opcactive.minopcitem.req', {itemid:itemid,newmin:newmin,isnull:isnull}, function(data) {
							if(data == 'S_OK') {
								$(minspan).text(newmin);
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
	//###################################################################################
	$('#opcactive').on('click', '.maxitem', function() {
		var itemid = $(this).parents('div.tr:first').attr('data-item');
		var maxspan = $(this).parents('div.td:first').find('span:first');
		$.post('std.numpad.pop', {type:'setdefault'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Maximalwert bearbeiten', modal: true, width: p.popup.width.std,
				buttons: [{
					text:'speichern',
					click: function() {
						var newmax = $.trim($('#oskinput').val());
						var isnull = 'False';
						if($('.null').hasClass('checked') || newmax == '') {
							isnull = 'True';
							newmax = '100.0';
						}
						$.post('std.opcactive.maxopcitem.req', {itemid:itemid,newmax:newmax,isnull:isnull}, function(data) {
							if(data == 'S_OK') {
								$(maxspan).text(newmax);
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
	//###################################################################################
	$('#opcactive').on('click', '.tasteritem', function() {
		var dpType = $(this).parents('div.tr:first').find('[data-type]').text();
		var itemid = $(this).parents('div.tr:first').attr('data-item');
		var point = $(this).parents('div.tr:first').attr('data-name');
		var valueelem = $(this).parents('div.td:first').find('span:first');
		var value = $(this).parents('div.td:first').find('span:first').text();
		switch(dpType) {
			case 'VT_BOOL':
				$.post('std.opcactive.tasterdefaultboolpopup.req', {headline:point,value:value}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'erzwungenen Wert setzen', modal: true, width: p.popup.width.std,
						buttons:[{
							text: 'speichern',
							click: function() {
								var value = $.trim($('div.popup').find('.ps-checkbox.checked:first').text());
								if(value == 'kein Default Wert') value = 'NULL';
								$.post('std.opcactive.tasterdefaultitem.req', {value:value, itemid:itemid}, function(data) {
									if(data == 'S_OK') {
										if(value == 'NULL') value = '';
										$(valueelem).text(value);
										$('#dialog').dialog('close');
									} else {
										p.page.alert('<span class="neg">' + data + '</span>', 2000);
									}
								});
							}
						}]
					});
				});
				break;
			case 'VT_BSTR':
				isbig = false;
				$.post('std.osk.pop', {headline:point,elem:point}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'erzwungenen Wert setzen', modal: true, width: p.popup.width.osk,
						buttons: [{
							text: 'speichern',
							click: function() {
								var value = $.trim($('#oskinput').val());
								$.post('std.opcactive.tasterdefaultitem.req', {value:value, itemid:itemid}, function(data) {
									if(data == 'S_OK') $('#dialog').dialog('close');
									else p.page.alert('<span class="neg">' + data + '</span>', 2000);
								});
							}
						}]
					});
				});
				break;
			default:
				$.post('std.numpad.pop', {type:'setdefault',headline:point,elem:point}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'erzwungenen Wert setzen', modal: true, width: p.popup.width.std,
						buttons: [{
							text: 'speichern',
							click: function() {
								var value;
								if($('.ps-checkbox.null').hasClass('checked')) {
									value = 'NULL';
								} else {
									value = $.trim($('#oskinput').val());
								}
								$.post('std.opcactive.tasterdefaultitem.req', {value:value, itemid:itemid}, function(data) {
									if(data == 'S_OK') {
										if(value == 'NULL') value = '';
										$(valueelem).text(value);
										$('#dialog').dialog('close');
									} else {
										p.page.alert('<span class="neg">' + data + '</span>', 2000);
									}
								});
							}
						}]
					});
				});
				break;
		}
	});
	//###################################################################################
	$('#opcactive').on('click', '.typeitem', function() {
		var itemid = $(this).parents('div.tr:first').attr('data-item');
		var spantype = $(this).parents('div.td:first').find('[data-type]');
		var type = $(spantype).text();
		$.post('std.opcactive.typeopcitempopup.req', {type:type}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'OPC Datentyp bearbeiten', modal: true, width: p.popup.width.std,
				buttons: [{
					text:'speichern',
					click: function() {
						var newtype = $('#dialog .ps-checkbox.checked:first').text();
						if(newtype == '') newtype = 'default';
						$.post('std.opcactive.typeopcitem.req', {itemid:itemid,newtype:newtype}, function(data) {
							if(data == 'S_OK') {
								if(newtype == 'default') $(spantype).removeClass('neg');
								else $(spantype).addClass('neg');
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
					}
				}]
			});
		});
	});
	$('#opcactive').on('click', '.alarm', function() {
		var alarmid = $(this).attr('data-alarmid');
		var opcname = $(this).parents('div.tr').find('[data-opcname]').attr('data-opcname');
		$.post('std.alarmpointcfg.getonealarm.req', {id: alarmid, name: opcname}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Alarm bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var desc = '', min = '';
						if($('.c-dropdescription').hasClass('checked')) {
							desc = $('#c-dropdescription').val();
						}
						if($('.c-description').hasClass('checked')) {
							desc = $('#c-description').val();
						}
						if($('[data-isbool]').attr('data-isbool') == 'True') {
							min = $('#c-mindd').val();
						} else {
							min = $('#c-min').val();
						}
						var TheObj = {
							id: alarmid,
							description: desc,
							link:$('#c-link').val(),
							group: $('#c-group').val(),
							groups1: $('#c-groups1').val(),
							groups2: $('#c-groups2').val(),
							groups3: $('#c-groups3').val(),
							groups4: $('#c-groups4').val(),
							groups5: $('#c-groups5').val(),
							type: $('#c-type').val(),
							condition: $('#c-condition').val(),
							min: min,
							max: $('#c-max').val(),
							delay: $('#c-delay').val()
						};
						$.post('std.alarmpointcfg.saveonealarm.req', TheObj, function(data) {
							if(data != 'S_OK') {
								p.page.alert('<span class="neg">' + data + '</span>', 5000);
							}
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
	});
	$('#opcactive').on('click', '.alarm-ia', function() {
		var alarm = $(this);
		var id = $(this).parents('div.tr').attr('data-item');
		var name = $(this).parents('div.tr').attr('data-name');
		var opcname = $(this).parents('div.tr').find('[data-opcname]').attr('data-opcname');
		$('#dialog').html('Dem OPC Datenpunkt "' + name + '" einen Alarm zuordnen?').dialog({
			title: 'Alarm zuordnen', modal: true, width: p.popup.width.middle,
			buttons: [{
				text: 'Alarm zuordnen',
				click: function() {
					$('#dialog').dialog('close');
					$.post('std.alarmpointcfg.savenewalarm.req', {newAlarm: id}, function(data) {
						var alarmid = data;
						$(alarm).addClass('alarm').removeClass('alarm-ia').attr({'data-alarmid': alarmid});
						$.post('std.alarmpointcfg.getonealarm.req', {id: alarmid, name: opcname}, function(data) {
							$('#dialog').html(data).dialog({
								title: 'Alarm bearbeiten', modal: true, width: p.popup.width.middle,
								buttons:[{
									text: 'speichern',
									click: function() {
										var desc = '', min = '';
										if($('.c-dropdescription').hasClass('checked')) {
											desc = $('#c-dropdescription').val();
										}
										if($('.c-description').hasClass('checked')) {
											desc = $('#c-description').val();
										}
										if($('[data-isbool]').attr('data-isbool') == 'True') {
											min = $('#c-mindd').val();
										} else {
											min = $('#c-min').val();
										}
										var TheObj = {
											id: alarmid,
											description: desc,
											link:$('#c-link').val(),
											group: $('#c-group').val(),
											groups1: $('#c-groups1').val(),
											groups2: $('#c-groups2').val(),
											groups3: $('#c-groups3').val(),
											groups4: $('#c-groups4').val(),
											groups5: $('#c-groups5').val(),
											type: $('#c-type').val(),
											condition: $('#c-condition').val(),
											min: min,
											max: $('#c-max').val(),
											delay: $('#c-delay').val()
										};
										$.post('std.alarmpointcfg.saveonealarm.req', TheObj, function(data) {
											if(data != 'S_OK') {
												p.page.alert('<span class="neg">' + data + '</span>', 5000);
											}
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
					});
				}
			},{
				text: 'Abbrechen',
				click: function() {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	$('#opcactive').on('click', '.trend', function() {
		var trendid = $(this).attr('data-trendid');
		$.post('std.trendcfg.getonetrend.req', {id: trendid}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Trend bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text: 'speichern',
					click: function() {
						var TheObj = {
							id: trendid,
							description: $('#c-description').val(),
							intervall: $('#c-intervall').val(),
							group: $('#c-group').val(),
							max: $('#c-max').val(),
							maxage: $('#c-maxage').val(),
							active: $('#c-active').hasClass('checked') ? 'True' : 'False'
						};
						$.post('std.trendcfg.saveonetrend.req', TheObj, function(data) {
							if(data != 'S_OK') {
								p.page.alert('<span class="neg">' + data + '</span>', 5000);
							}
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
	});
	$('#opcactive').on('click', '.trend-ia', function() {
		var trend = $(this);
		var id = $(this).parents('div.tr').attr('data-item');
		var name = $(this).parents('div.tr').attr('data-name');
		$('#dialog').html('Dem OPC Datenpunkt "' + name + '" einen Trend zuordnen?').dialog({
			title: 'Trend zuordnen', modal: true, width: p.popup.width.middle,
			buttons: [{
				text: 'Trend zuordnen',
				click: function() {
					$('#dialog').dialog('close');
					$.post('std.trendcfg.savenewtrend.req', {newTrend: id}, function(data) {
						var trendid = data;
						$(trend).addClass('trend').removeClass('trend-ia').attr({'data-trendid': trendid});
						$.post('std.trendcfg.getonetrend.req', {id: trendid}, function(data) {
							$('#dialog').html(data).dialog({
								title: 'Trend bearbeiten', modal: true, width: p.popup.width.middle,
								buttons: [{
									text: 'speichern',
									click: function() {
										var TheObj = {
											id: trendid,
											description: $('#c-description').val(),
											intervall: $('#c-intervall').val(),
											group: $('#c-group').val(),
											max: $('#c-max').val(),
											maxage: $('#c-maxage').val(),
											active: $('#c-active').hasClass('checked') ? 'True' : 'False'
										};
										$.post('std.trendcfg.saveonetrend.req', TheObj, function(data) {
											if(data != 'S_OK') {
												p.page.alert('<span class="neg">' + data + '</span>', 5000);
											}
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
					});
				}
			},{
				text: 'Abbrechen',
				click: function() {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	$('#opcactive').on('click', '.calendar-ia', function() {
		var schedule = $(this);
		var id = $(this).parents('div.tr').attr('data-item');
		var name = $(this).parents('div.tr').attr('data-name');
		$('#dialog').html('Dem OPC Datenpunkt "' + name + '" ein Zeitprogramm zuordnen?').dialog({
			title: 'Zeitprogramm zuordnen', modal: true, width: p.popup.width.middle,
			buttons: [{
				text: 'Zeitprogramm zuordnen',
				click: function() {
					$('#dialog').dialog('close');
					$.post('std.calendarcfg.savenewcalendar.req', {newCalendar: id}, function(data) {
						var calendarid = data;
						$(schedule).addClass('calendar').removeClass('calendar-ia').attr({'data-calendarid': calendarid});
						$.post('std.calendarcfg.getonecalendar.req', {id: calendarid}, function(data) {
							$('#dialog').html(data).dialog({
								title: 'Zeitprogramm bearbeiten', modal: true, width: p.popup.width.middle,
								buttons: [{
									text: 'speichern',
									click: function() {
										var TheObj = {
											id: id,
											description: $('#c-description').val(),
											active: $('#c-active').hasClass('checked') ? 'True' : 'False',
											group: $('#c-group').val()
										};
										$.post('std.calendarcfg.saveonecalendar.req', TheObj, function(data) {
											if(data != 'S_OK') {
												p.page.alert('<span class="neg">' + data + '</span>', 5000);
											}
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
					});
				}
			},{
				text: 'Abbrechen',
				click: function() {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	$('#opcactive').on('change', '.speed', function() {
		p.automation.pointrate = $(this).val();
		if(commstart[id]) {
			commstart[id] = false;
			p.log.write('COM gestoppt: ' + id);
		}

		commstart[++id] = true;
		p.log.write('COM gestartet: ' + id);
		getValues(id);

	});
};
//###################################################################################
function getValues(id) {
	if(commstart[id]) {
		$.get('std.request.activedpextended.req', function(data) {
			for(var elem in wpResult) {
				if(wpResult[elem]['Value'] == 'True') $('[data-value=' + elem + ']').removeClass('neg').addClass('pos');
				if(wpResult[elem]['Value'] == 'False') $('[data-value=' + elem + ']').removeClass('pos').addClass('neg');
				$('[data-value=' + elem + ']').text(wpResult[elem]['Value']);
				$('[data-rawvalue=' + elem + ']').text(wpResult[elem]['ValueString']);
				$('[data-quality=' + elem + ']').removeClass('pos neg warn');
				$('[data-type=' + elem + ']').text(wpResult[elem]['Type']);
				$('[data-quality=' + elem + ']').attr({title: wpResult[elem]['Quality']});
				switch (wpResult[elem]['Quality']) {
					case '192':
						$('[data-quality=' + elem + ']').text(wpResult[elem]['QualityString']).addClass('pos');
						break;
					case '216':
						$('[data-quality=' + elem + ']').text(wpResult[elem]['QualityString']).addClass('warn');
						break;
					default:
						if(wpResult[elem]['QualityString'] == wpResult[elem]['Quality']) {
							$('[data-quality=' + elem + ']').text(wpResult[elem]['Quality']).addClass('neg');
						} else {
							$('[data-quality=' + elem + ']').text(wpResult[elem]['QualityString']).addClass('neg');
						}
						break;
				}
				$('[data-timestamp=' + elem + ']').text(wpResult[elem]['TimeStamp']);
			}
		}, 'script').always(function() {
			window.setTimeout(function() { getValues(id); }, p.automation.pointrate);
		});
	}
}
