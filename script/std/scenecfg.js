/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 22.07.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 570                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: scenecfg.js 570 2024-03-13 18:22:21Z                     $ #
//#                                                                                 #
//###################################################################################
?> scenecfg */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>

groups.tablename = 'scenegroup';
groups.member = 'scene';
groups.target = 'scenecfg';

var isbig = false;

p.page.load = function() {
	groups.init();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.scenecfg.menu' + $(this).attr('data-target') + '.req', {table:groups.tablename});
	});
//###################################################################################
// neue Scenen
//###################################################################################
	$('#erg').on('click', '.sceneupdate', function() {
		var id = $(this).parent('div').attr('data-scene');
		var name = $(this).parent('div').find('input[type=text]').val();
		var group = $(this).parent('div').find('select').val();
		p.page.save('std.scenecfg.sceneupdate.req', {id:id, name:name, group:group});
	});
//###################################################################################
	$('#erg').on('click', '.sceneinsert', function() {
		var name = $(this).parent('div').find('input[type=text]').val();
		var group = $(this).parent('div').find('select').val();
		$.post('std.scenecfg.sceneinsert.req', {name:name, group:group}, function(data) {
			if(data.substr(0,4) == 'S_OK') {
				$('div.divupdate').append(data.substr(5, data.length));
			} else {
				p.page.alert(data);
			}
		});
	});
//###################################################################################
	$('#erg').on('click', '.scenedelete', function() {
		var me = $(this).parent('div');
		var id = $(me).attr('data-scene');
		$.post('std.scenecfg.scenedelete.req', {id:id}, function(data) {
			switch(data.substr(0, 4)) {
				case 'S_OK':
					$(me).fadeOut().remove();
					break;
				case 'S_CK':
					if(confirm('Es befinden sich ' + data.substr(4, data.length) + ' Datenpunktschaltungen in dieser Gruppe, die ebenfalls gelöscht werden.\r\nFortfahren?')) {
						$.post('std.scenecfg.scenedelete.req', {id:id, force:'true'}, function(data) {
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
	});
//###################################################################################
	$('#erg').on('change', '.scenefilter', function() { setSceneFilter(); });
//###################################################################################
// Scene grouping
//###################################################################################
	$('#erg').on('change', '#selectscene', function() {
		if($(this).val() == '0') {
			$('#availabledp').addClass('ps-hidden');
			$('[data-server]').html('');
			$('.p-tree-parent-server').removeClass('open');
			$('[data-group]').html('');
			$('.p-tree-parent-group').removeClass('open');
		} else {
			$('#availabledp').removeClass('ps-hidden');
			$('[data-group]').html('');
			$('.p-tree-parent-group').removeClass('open');
		}
		$.post('std.scenecfg.getscenedatapoints.req', {id:$(this).val()}, function(data) {
			$('#onescenecfg').html(data);
		});
	});
	// Treeview
	$('#erg').on('click', '.p-tree-parent-namespace', function() {
		if($(this).hasClass('open')) {
			$('[data-namespace]').html('');
			$('.p-tree-parent-namespace').removeClass('open');
		} else {
			$('[data-namespace]').html('');
			$('.p-tree-parent-namespace').removeClass('open');
			$(this).addClass('open loading');
			var namespace = $(this).attr('data-namespaceid');
			$.post('std.scenecfg.getdpgroup.req', {namespace:namespace}, function(data) {
				$('[data-namespace=' + namespace + ']').html(data);
				$('.p-tree-parent-namespace').removeClass('loading');
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.p-tree-parent-group', function() {
		if($(this).hasClass('open')) {
			$('[data-group]').html('');
			$('.p-tree-parent-group').removeClass('open');
		} else {
			$('[data-group]').html('');
			$('.p-tree-parent-group').removeClass('open');
			$(this).addClass('open loading');
			var group = $(this).attr('data-groupid');
			$.post('std.scenecfg.getdatapoint.req', {group:group,scene:$('#selectscene').val()}, function(data) {
				$('[data-group=' + group + ']').html(data);
				$('.p-tree-parent-group').removeClass('loading');
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '#newscene .ps-tree-parent', function() {
		if($(this).hasClass('open')) {
			$('[data-scene]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('[data-scene]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-group');
			$.post('std.scenecfg.getnewscene.req', {group:group}, function(data) {
				$('[data-scene=' + group + ']').html(data);
			});
		}
	});
//###################################################################################
	// Markierungen
	$('#erg').on('click', '.markall', function() {
		$('#erg .ps-checkbox:not(.ps-disabled)').addClass('checked');
	});
//###################################################################################
	$('#erg').on('click', '.markno', function() {
		$('#erg .ps-checkbox').removeClass('checked');
	});
//###################################################################################
	// New scene
	$('#erg').on('click', '.toscene', function() {
		var id = $('#selectscene').val();
		if(id != '0') {
			var newscene = [];
			$('.datapoint li.checked').each(function() {
				if(!$(this).hasClass('ps-hidden')) {
					newscene.push($(this).attr('data-datapoint'));
				}
			});
			$.post('std.scenecfg.savenewscene.req', {newScene:newscene,id:id}, function(data) {
				if(data != '') {
					p.page.alert(data);
				} else {
					$.post('std.scenecfg.getscenedatapoints.req', {id:id}, function(data) {
						$('#onescenecfg').html(data);
						$('#erg .ps-checkbox').removeClass('checked');
					});
				}
			});
		}
	});
//###################################################################################
// Funktionen fuer alle markierten Szenen
//###################################################################################
	$('#erg').on('click', '.allgroup', function() {
		var tr = $(this).parents('ul.sceneingroup:first');
		var ids = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.get('std.scenecfg.getavailablegroups.req', function(data) {
				$('#dialog').html(data).dialog({
					title: 'Szenegruppe wechseln', modal: true, width: p.popup.width.middel,
					buttons: [{
						text:'OK',
						click: function() {
							var newgroup = $('#c-group').val();
							$.post('std.scenecfg.saveallgroup.req', {ids:ids, newgroup:newgroup}, function(data) {
								if(data == 'S_OK') {
									p.page.change('#erg', 'scenecfg.menuscene.req');
									p.page.alert('<span class="pos">gespeichert</span>');
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
		} else {
			p.page.alert('Keine Szenen Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.alldelete', function() {
		var tr = $(this).parents('ul.sceneingroup:first');
		var ids = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.post('std.scenecfg.deleteall.req', {ids:ids}, function(data) {
				if(data.substr(0, 4) == 'S_OK') {
					p.page.alert('<span class="pos">gelöscht</span>');
					$(tr).find('[data-id]').each(function() {
						if(p.valueexist($(this).attr('data-id'), ids)) {
							$(this).remove();
						}
					});
				} else {
					p.page.alert('<span class="neg">' + data + '</span>', 3000);
				}
			});
		} else {
			p.page.alert('Keine Szene ausgewählt');
		}
	});
//###################################################################################
// Funtionen fuer einzelne Szenen
//###################################################################################
	$('#erg').on('click', '.sceneedit', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		$.post('std.scenecfg.getonescene.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Szene bearbeiten', modal: true, width: p.popup.width.middel,
				buttons: [{
					text:'OK',
					click: function() {
						var TheObj = {
							id: id,
							description: $('#c-description').val(),
							group: $('#c-group').val()
						};
						//p.log.write('Gruppe: ' + newgroup);
						$.post('std.scenecfg.saveonescene.req', TheObj, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$('#dialog').dialog('close');
								$(tr).find('span.tr-scenetext').text(TheObj.description);
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 5000);
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
	$('#erg').on('click', '.p-dpdelete', function() {
		var tr = $(this).parents('tr[data-scenevalue]:first');
		var id = $(tr).attr('data-scenevalue');
		$.post('std.scenecfg.deletescenedatapoints.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				$('#availabledp li[data-group]').html('');
				$('#availabledp li[data-groupid]').removeClass('open');
				$(tr).fadeOut(function() { $(this).remove(); });
			} else {
				p.page.alert('<span class="neg">' + data + '</span>');
			}
		});
	});
//###################################################################################
	$('#erg').on('click', '.ps-param', function() {
		var headline = $(this).parents('tr').find('.p-desc').text();
		var elem = $(this).parents('tr').attr('data-scenevalue');
		var id = $(this).parents('tr').find('[data-value]').attr('data-value');
		//! TODO: ersetzen durch default osk / numpad Popup
		switch($(this).parents('tr').find('[data-type]').attr('data-type')) {
			case 'VT_BOOL':
				$.post('std.scenetruefalse.pop', {headline:headline,elem:elem,id:id}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'Szenensollwert', modal: true, width: p.popup.width.std,
						buttons:null
					});
				});
				break;
			case 'VT_BSTR':
				isbig = false;
				$.post('std.sceneosk.pop', {headline:headline,elem:elem,id:id}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'Szenensollwert', modal: true, width: p.popup.width.osk,
						buttons:null
					});
				});
				break;
			default:
				$.post('std.scenenumpad.pop', {headline:headline,elem:elem,id:id}, function(data) {
					$('#dialog').html(data).dialog({
						title: 'Szenensollwert', modal: true, width: p.popup.width.middel,
						buttons: [{
							text: 'speichern',
							click: function() {
								var value = '';
								var text = '-';
								if($('#oskinput').length){
									value = $.trim($('#oskinput').val());
									text = value;
								} else {
									value = $('.nAuswahl option:selected').attr('data-wert');
									text = $('.nAuswahl option:selected').text();
								}
								$.post('std.scenecfg.savenewscenevalue.req', {id:elem,value:value}, function(data) {
									if(data = 'S_OK') {
										$('[data-scenevalue=' + elem + ']').find('.ps-param').text(text);
										$('#dialog').dialog('close');
									} else {
										p.page.alert(data);
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
	$('#dialog').on('click', '#truefalse .ps-button', function() {
		var value = $(this).attr('data-wert');
		var anz = $(this).text();
		var elem = $('#truefalse').attr('data-elem');
		$.post('std.scenecfg.savenewscenevalue.req', {id:elem,value:value}, function(data) {
			if(data = 'S_OK') {
				$('[data-scenevalue=' + elem + ']').find('.ps-param').text(anz);
				$('#dialog').dialog('close');
			} else {
				p.page.alert(data);
			}
		});
	});
//###################################################################################
	$('#dialog').on('click', '#numpad .ps-button', function() {
		switch($(this).text()) {
			case '<-':
				$('#oskinput').val($('#oskinput').val().substr(0, $('#oskinput').val().length - 1));
				break;
			default:
				$('#oskinput').val($('#oskinput').val() + $(this).val());
				break;
		}
	});
//###################################################################################
	$('#dialog').on('click', '#osk .ps-button', function() {
		var elem = $('#' + $('#osk').attr('data-elem'));
		switch($(this).text()) {
			case '<-':
				$('#oskinput').val($('#oskinput').val().substr(0,$('#oskinput').val().length - 1));
				break;
			case 'shift':
				if(isbig) {
					$('#osk .ps-button').each(function() {
						if($(this).text() != 'shift' && $(this).text() != 'space' && $(this).text() != 'OK') {
							$(this).text($(this).text().toLowerCase());
						}
					});
					isbig = false;
				} else {
					$('#osk .ps-button').each(function() {
						if($(this).text() != 'shift' && $(this).text() != 'space' && $(this).text() != 'OK') {
							$(this).text($(this).text().toUpperCase());
						}
					});
					isbig = true;
				}
				break;
			case 'space':
				$('#oskinput').val($('#oskinput').val() + ' ');
				break;
			case 'OK':
				var value = $.trim($('#oskinput').val());
				$.post('std.scenecfg.savenewscenevalue.req', {id:elem,value:value}, function(data) {
					if(data = 'S_OK') {
						$('[data-scenevalue=' + elem + ']').find('.ps-param').text(value);
						$('#dialog').dialog('close');
					} else {
						p.page.alert(data);
					}
				});
				break;
			default:
				$('#oskinput').val($('#oskinput').val() + $(this).text());
				break;
		}
	});
//###################################################################################
	$('#erg').on('click', '[data-writescene]', function(data) {
		$.post('std.writescene.setid.req', {id:$(this).attr('data-writescene')}, function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
//###################################################################################
	$('#erg').on('click', '[data-copyfrom]', function(data) {
		var idgroup = $(this).attr('data-copyfrom');
		var idto = $('#selectscene').val();
		$.post('std.scenecfg.copyfrom.req', {id:idgroup}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Szene kopieren', modal: true, width: p.popup.width.middel,
				buttons: [{
					text:'OK',
					click: function() {
						var idfrom = $('.copyfrom').val();
						$.post('std.scenecfg.copyto.req', {idfrom:idfrom, idto:idto}, function(data) {
							if(data != 'S_OK') p.page.alert(data, 5000);
							$.post('std.scenecfg.getscenedatapoints.req', {id:idto}, function(data) {
								$('#onescenecfg').html(data);
								$('#dialog').dialog('close');
							});
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
	$('#erg').on('click', '[data-unit] .ps-checkbox', function() {
		if(!$(this).hasClass('ps-disabled')) {
		var c = 0;
		var isc = $(this).hasClass('checked');
		$('[data-unit]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) c++;
		});
		if(c == 1 && isc) {
			$('[data-unit]').each(function() {
				$(this).find('.ps-checkbox').removeClass('ps-disabled');
			});
		} else {
			var unit = ($(this).parents('tr:first').attr('data-unit'));
			$('[data-unit]').each(function() {
				if($(this).attr('data-unit') == unit) $(this).find('.ps-checkbox').removeClass('ps-disabled');
				else $(this).find('.ps-checkbox').addClass('ps-disabled');
			});
		}
		}
	});
//###################################################################################
	getValues();
};
function getValues() {
	$.get('std.request.activedpextended.req', function(data) {
		for(var elem in wpResult) {
			p.automation.stdClass(elem, wpResult[elem].ValueString);
			$('[data-value=' + elem + ']').attr('data-type', wpResult[elem].Type);
		}
	}, 'script').always(function() {
		window.setTimeout(function() { getValues(); }, p.automation.pointrate);
	});
};

//###################################################################################
// Helper Funtionen
//###################################################################################
function setGroupFilter() {
	if($('input.groupfilter').val().length == 0) {
		$('input.groupfilter').removeClass('neg');
		$('#erg div.divupdate div').removeClass('ps-hidden');
	} else {
		$('input.groupfilter').addClass('neg');
		$('#erg div.divupdate div').each(function() {
			var text = $(this).find('input.ps-input:first').val().toLowerCase();
			if(text.indexOf($('input.groupfilter').val().toLowerCase()) == -1) {
				$(this).addClass('ps-hidden');
			} else {
				$(this).removeClass('ps-hidden');
			}
		});
	}
}
function setSceneFilter() {
	if($('.scenefilter').val() == 0) {
		$('.scenefilter').removeClass('neg');
		$('#erg div.divupdate div').removeClass('ps-hidden');
	} else {
		$('.scenefilter').addClass('neg');
		$('#erg div.divupdate div').each(function() {
			var text = $(this).attr('data-group');
			if(text == $('.scenefilter').val()) {
				$(this).removeClass('ps-hidden');
			} else {
				$(this).addClass('ps-hidden');
			}
		});
	}
}
