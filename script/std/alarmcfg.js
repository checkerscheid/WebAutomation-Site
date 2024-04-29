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
//# Revision     : $Rev:: 568                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: alarmcfg.js 568 2024-01-24 07:36:18Z                     $ #
//#                                                                                 #
//###################################################################################
?> alarmcfg */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>

groups.tablename = 'alarmgroup';
groups.member = 'alarm';
groups.target = 'alarmcfg';

var groupname1 = '<?=$system->nameAlarmGroup1()?>';
var groupname2 = '<?=$system->nameAlarmGroup2()?>';
var groupname3 = '<?=$system->nameAlarmGroup3()?>';
var groupname4 = '<?=$system->nameAlarmGroup4()?>';
var groupname5 = '<?=$system->nameAlarmGroup5()?>';
var globalSelectionForEscalation = 0;
var checkedAlarms = {};
var filtertext = '';

p.page.load = function() {
	groups.init();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.alarmcfg.menu' + $(this).attr('data-target') + '.req', {table:groups.tablename});
	});
//###################################################################################
	$('#erg').on('click', '.filter', function() {
		filtertext = $('#filtertext').val();
		$.post('std.alarmcfg.filter.req', {filtertext:filtertext}, function(data) {
			$('#alarms').html(data);
		});
	});
//###################################################################################
	$('#erg').on('click', '.reset', function() {
		p.page.change('#erg', 'std.alarmcfg.menualarms.req');
	});
//###################################################################################
// Alarme
//###################################################################################
	// Treeview
	$('#erg').on('click', '#alarms .ps-tree-parent', function() {
		var ptree = $(this);

		var groupids = new Array();

		groupids[5] = $(this).attr('data-idgroup5');
		groupids[4] = $(this).attr('data-idgroup4');
		groupids[3] = $(this).attr('data-idgroup3');
		groupids[2] = $(this).attr('data-idgroup2');
		groupids[1] = $(this).attr('data-idgroup1');
		groupids[0] = $(this).attr('data-idgroup0');

		var actualgroup = $(this).attr('data-actualgroup');

		if($(this).hasClass('open')) {
			if(groupids[0] != 'NULL'){
				$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html('');
			} else {
				$('[data-alarms=NULL]').html('');
			}
			$(this).removeClass('open');
		} else {
			$('[data-actualgroupalarms=' + actualgroup + ']').html('');
			$('[data-actualgroup=' + actualgroup + ']').removeClass('open');
			$(ptree).addClass('loading');
			$(this).addClass('open');

			$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {

				if(groupids[0] != 'NULL'){
					$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
				} else {
					$('[data-alarms=NULL]').html(data);
				}
				$(ptree).removeClass('loading');
			});
		}
	});
	$('#erg').on('click', '#newalarms .ps-tree-parent.newServer', function() {
		var ptree = $(this);
		if($(this).hasClass('open')) {
			$('[data-groups]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$(ptree).addClass('loading');
			$('[data-groups]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var server = $(this).attr('data-server');
			$.post('std.alarmcfg.getnewgroups.req', {server:server}, function(data) {
				$('[data-groups=' + server + ']').html(data);
				$(ptree).removeClass('loading');
			});
		}
	});

	$('#erg').on('click', '#newalarms .ps-tree-parent.newGroup', function() {
		var ptree = $(this);
		if($(this).hasClass('open')) {
			$('[data-alarms]').html('');
			$('.ps-tree-parent.newGroup').removeClass('open');
		} else {
			$(ptree).addClass('loading');
			$('[data-alarms]').html('');
			$('.ps-tree-parent.newGroup').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-group');
			$.post('std.alarmcfg.getnewalarms.req', {group:group}, function(data) {
				$('[data-alarms=' + group + ']').html(data);
				$(ptree).removeClass('loading');
			});
		}
	});
	$('#erg').on('click', '.ps-tree-parent-group', function() {
		var ptree = $(this);
		//$('.escg-save').addClass('inactive');
		//$('.esct-save').addClass('inactive');
		globalSelectionForEscalation = 0;
		if($(this).hasClass('open')) {
			$('.p-tree-child-group').html('');
			$('.ps-tree-parent-group').removeClass('open');
		} else {
			$(ptree).addClass('loading');
			$('.p-tree-child-group').html('');
			$('.ps-tree-parent-group').removeClass('open');
			$(this).addClass('open');
			var group = $(this).parent().attr('data-group');
			$.post('std.alarmcfg.escalationalarm.req', {group:group}, function(data) {
				$('[data-alarmgroup=' + group + ']').html(data);
				$(ptree).removeClass('loading');
			});
		}
	});
	$('#erg').on('click', '.p-tree-child-alarms', function() {
		var ptree = $(this);
		if($(this).hasClass('open')) {
			$('[data-alarm]').html('');
			$('#assignedAlarm .p-tree-child-alarms').removeClass('open');
			//$('.escg-save').addClass('inactive');
			//$('.esct-save').addClass('inactive');
			globalSelectionForEscalation = 0;
		} else {
			$(ptree).addClass('loading');
			$('[data-alarm]').html('');
			$(' .p-tree-child-alarms').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-alarms');
			globalSelectionForEscalation = group;
			$.post('std.alarmcfg.assignedemployee.req', {group:group}, function(data) {
				$('[data-alarm=' + group + ']').html(data);
				//$('.escg-save').removeClass('inactive');
				//$('.esct-save').removeClass('inactive');
				$(ptree).removeClass('loading');
			});
		}
	});
	$('#erg').on('click', '.ps-tree-escg-parent', function() {
		if($(this).hasClass('open')) {
			$('.ps-tree-escg-child').addClass('ps-hidden');
			$('.ps-tree-escg-parent').removeClass('open');
		} else {
			$(this).addClass('loading');
			$('.ps-tree-escg-child').addClass('ps-hidden');
			$('.ps-tree-escg-parent').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-escg-group');
			$('[data-escg-child=' + group + ']').removeClass('ps-hidden');
			$(this).removeClass('loading');
		}
	});
	$('#erg').on('click', '.ps-tree-esct-parent', function() {
		if($(this).hasClass('open')) {
			$('.ps-tree-esct-child').addClass('ps-hidden');
			$('.ps-tree-esct-parent').removeClass('open');
		} else {
			$(this).addClass('loading');
			$('.ps-tree-esct-child').addClass('ps-hidden');
			$('.ps-tree-esct-parent').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-esct-template');
			$('[data-esct-child=' + group + ']').removeClass('ps-hidden');
			$(this).removeClass('loading');
		}
	});
//###################################################################################
	$('#erg').on('click', '.changedelay', function() {
		var email = $(this).attr('data-email');
		var alarm = $(this).attr('data-alarm');
		$.get('std.numpad.pop', function(data) {
			$('#dialog').html(data).dialog({
				title: 'Verzögerung', modal: true, width: p.popup.width.std,
				buttons: [{
					text:'speichern',
					click: function() {
						var newdelay = $.trim($('#oskinput').val());
						$.post('std.alarmcfg.changedelay.req', { email: email, alarm: alarm, newdelay: newdelay }, function(data) {
							if(data == 'S_OK') {
								$.post('std.alarmcfg.assignedemployee.req', {group:alarm}, function(data) {
									$('[data-alarm=' + alarm + ']').html(data);
								});
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
	// Markierungen
	$('#erg').on('click', '.markall', function() {
		$('#erg .ps-checkbox').not('ps-hidden').addClass('checked');
	});
	$('#erg').on('click', '.markno', function() {
		$('#erg .ps-checkbox').removeClass('checked');
	});
	// Neuer Alarm
	$('#erg').on('click', '.savenewalarm', function() {
		var newAlarms = [];
		$('#newalarms li.checked').each(function() {
			p.log.write('attr: ' + $(this).attr('data-value'));
			newAlarms.push($(this).attr('data-value'));
		});
		$.post('std.alarmpointcfg.savenewalarms.req', {newAlarms:newAlarms}, function(data) {
			if(data != 'S_OK') {
				p.page.alert(data);
			} else {
				p.page.change('#erg', 'std.alarmcfg.menunewalarms.req');
			}
		});
	});
//###################################################################################
// Funktionen fuer alle markierten Alarme
//###################################################################################
	$('#erg').on('click', '.allgroup', function() {

		var actualgroup = 0;

		var groupids = new Array();

		groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
		groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
		groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
		groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
		groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
		groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

		var tr = $(this).parents('ul.alarmsingroup:first');
		var ids = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.get('std.alarmpointcfg.getavailablegroups.req', function(data) {
				$('#dialog').html(data).dialog({
					title: 'Alarmgruppe ändern', modal: true, width: p.popup.width.middel,
					buttons: [{
						text:'OK',
						click: function() {
							var newgroup = $('#c-group').val();
							$.post('std.alarmpointcfg.saveallgroup.req', {ids:ids, newgroup:newgroup}, function(data) {
								if(data == 'S_OK') {
									//p.page.change('#erg', 'std.alarmcfg.menualarms.req');
									p.page.alert('<span class="pos">gespeichert</span>');
									$('#dialog').dialog('close');
								} else {
									p.page.alert('<span class="neg">' + data + '</span>', 3000);
								}
							});

							if(filtertext == ''){
								$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
									if(groupids[0] != 'NULL'){
										$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
									} else {
										$('[data-alarms=NULL]').html(data);
									}
								});
							} else {
								$.post('std.alarmcfg.filter.req', {filtertext:filtertext}, function(data) {
									$('#alarms').html(data);
								});
							}
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
			p.page.alert('Keine Alarme Ausgewählt');
		}
	});
//###################################################################################
$('#erg').on('click', '.allgroup1', function() {

	var actualgroup = 0;

	var groupids = new Array();

	groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
	groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
	groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
	groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
	groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
	groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

	var tr = $(this).parents('ul.alarmsingroup:first');
	var ids = [];
	$(tr).find('[data-id]').each(function() {
		if($(this).find('.ps-checkbox').hasClass('checked')) {
			ids.push($(this).attr('data-id'));
		}
	});
	if(ids.length > 0) {
		$.get('std.alarmpointcfg.getavailablegroups1.req', function(data) {
			$('#dialog').html(data).dialog({
				title: groupname1+' ändern', modal: true, width: p.popup.width.middel,
				buttons: [{
					text:'OK',
					click: function() {
						var newgroup1 = $('#c-group1').val();
						var newgroup1text = $('#c-group1 option:selected').text();
						$.post('std.alarmpointcfg.saveallgroup1.req', {ids:ids, newgroup1:newgroup1}, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$(tr).find('[data-id]').each(function() {
									if(p.valueexist($(this).attr('data-id'), ids)) {
										$(this).find('.tr-groups1').text(newgroup1text);
									}
								});
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});

						if(filtertext == ''){
							$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
								if(groupids[0] != 'NULL'){
									$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
								} else {
									$('[data-alarms=NULL]').html(data);
								}
							});
						} else {
							$.post('std.alarmcfg.filter.req', {filtertext:filtertext}, function(data) {
								$('#alarms').html(data);
							});
						}
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
		p.page.alert('Keine Alarme Ausgewählt');
	}
});
//###################################################################################
$('#erg').on('click', '.allgroup2', function() {
	var actualgroup = 0;

	var groupids = new Array();

	groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
	groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
	groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
	groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
	groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
	groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

	var tr = $(this).parents('ul.alarmsingroup:first');
	var ids = [];
	$(tr).find('[data-id]').each(function() {
		if($(this).find('.ps-checkbox').hasClass('checked')) {
			ids.push($(this).attr('data-id'));
		}
	});
	if(ids.length > 0) {
		$.get('std.alarmpointcfg.getavailablegroups2.req', function(data) {
			$('#dialog').html(data).dialog({
				title: groupname2+' ändern', modal: true, width: p.popup.width.middel,
				buttons: [{
					text:'OK',
					click: function() {
						var newgroup2 = $('#c-group2').val();
						var newgroup2text = $('#c-group2 option:selected').text();
						$.post('std.alarmpointcfg.saveallgroup2.req', {ids:ids, newgroup2:newgroup2}, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$(tr).find('[data-id]').each(function() {
									if(p.valueexist($(this).attr('data-id'), ids)) {
										$(this).find('.tr-groups2').text(newgroup2text);
									}
								});
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
						if(filtertext == ''){
							$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
								if(groupids[0] != 'NULL'){
									$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
								} else {
									$('[data-alarms=NULL]').html(data);
								}
							});
						} else {
							$.post('std.alarmcfg.filter.req', {filtertext:filtertext}, function(data) {
								$('#alarms').html(data);
							});
						}
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
		p.page.alert('Keine Alarme Ausgewählt');
	}
});
//###################################################################################
$('#erg').on('click', '.allgroup3', function() {
	var actualgroup = 0;

	var groupids = new Array();

	groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
	groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
	groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
	groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
	groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
	groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

	var tr = $(this).parents('ul.alarmsingroup:first');
	var ids = [];
	$(tr).find('[data-id]').each(function() {
		if($(this).find('.ps-checkbox').hasClass('checked')) {
			ids.push($(this).attr('data-id'));
		}
	});
	if(ids.length > 0) {
		$.get('std.alarmpointcfg.getavailablegroups3.req', function(data) {
			$('#dialog').html(data).dialog({
				title: groupname3+' ändern', modal: true, width: p.popup.width.middel,
				buttons: [{
					text:'OK',
					click: function() {
						var newgroup3 = $('#c-group3').val();
						var newgroup3text = $('#c-group3 option:selected').text();
						$.post('std.alarmpointcfg.saveallgroup3.req', {ids:ids, newgroup3:newgroup3}, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$(tr).find('[data-id]').each(function() {
									if(p.valueexist($(this).attr('data-id'), ids)) {
										$(this).find('.tr-groups3').text(newgroup3text);
									}
								});
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
						if(filtertext == ''){
							$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
								if(groupids[0] != 'NULL'){
									$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
								} else {
									$('[data-alarms=NULL]').html(data);
								}
							});
						} else {
							$.post('std.alarmcfg.filter.req', {filtertext:filtertext}, function(data) {
								$('#alarms').html(data);
							});
						}
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
		p.page.alert('Keine Alarme Ausgewählt');
	}
});
//###################################################################################
$('#erg').on('click', '.allgroup4', function() {

	var actualgroup = 0;

	var groupids = new Array();

	groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
	groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
	groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
	groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
	groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
	groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

	var tr = $(this).parents('ul.alarmsingroup:first');
	var ids = [];
	$(tr).find('[data-id]').each(function() {
		if($(this).find('.ps-checkbox').hasClass('checked')) {
			ids.push($(this).attr('data-id'));
		}
	});
	if(ids.length > 0) {
		$.get('std.alarmpointcfg.getavailablegroups4.req', function(data) {
			$('#dialog').html(data).dialog({
				title: groupname4+' ändern', modal: true, width: p.popup.width.middel,
				buttons: [{
					text:'OK',
					click: function() {
						var newgroup4 = $('#c-group4').val();
						var newgroup4text = $('#c-group4 option:selected').text();
						$.post('std.alarmpointcfg.saveallgroup4.req', {ids:ids, newgroup4:newgroup4}, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$(tr).find('[data-id]').each(function() {
									if(p.valueexist($(this).attr('data-id'), ids)) {
										$(this).find('.tr-groups4').text(newgroup4text);
									}
								});
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
						if(filtertext == ''){
							$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
								if(groupids[0] != 'NULL'){
									$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
								} else {
									$('[data-alarms=NULL]').html(data);
								}
							});
						} else {
							$.post('std.alarmcfg.filter.req', {filtertext:filtertext}, function(data) {
								$('#alarms').html(data);
							});
						}
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
		p.page.alert('Keine Alarme Ausgewählt');
	}
});
//###################################################################################
$('#erg').on('click', '.allgroup5', function() {

	var actualgroup = 0;

	var groupids = new Array();

	groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
	groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
	groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
	groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
	groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
	groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

	var tr = $(this).parents('ul.alarmsingroup:first');
	var ids = [];
	$(tr).find('[data-id]').each(function() {
		if($(this).find('.ps-checkbox').hasClass('checked')) {
			ids.push($(this).attr('data-id'));
		}
	});
	if(ids.length > 0) {
		$.get('std.alarmpointcfg.getavailablegroups5.req', function(data) {
			$('#dialog').html(data).dialog({
				title: groupname5+' ändern', modal: true, width: p.popup.width.middel,
				buttons: [{
					text:'OK',
					click: function() {
						var newgroup5 = $('#c-group5').val();
						var newgroup5text = $('#c-group5 option:selected').text();
						$.post('std.alarmpointcfg.saveallgroup5.req', {ids:ids, newgroup5:newgroup5}, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$(tr).find('[data-id]').each(function() {
									if(p.valueexist($(this).attr('data-id'), ids)) {
										$(this).find('.tr-groups5').text(newgroup5text);
									}
								});
								$('#dialog').dialog('close');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 3000);
							}
						});
						if(filtertext == ''){
							$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
								if(groupids[0] != 'NULL'){
									$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
								} else {
									$('[data-alarms=NULL]').html(data);
								}
							});
						} else {
							$.post('std.alarmcfg.filter.req', {filtertext:filtertext}, function(data) {
								$('#alarms').html(data);
							});
						}
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
		p.page.alert('Keine Alarme Ausgewählt');
	}
});
//###################################################################################
	$('#erg').on('click', '.alltype', function() {
		var tr = $(this).parents('ul.alarmsingroup:first');
		var ids = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.get('std.alarmpointcfg.getavailabletypes.req', function(data) {
				$('#dialog').html(data).dialog({
					title: 'Alarmtyp ändern', modal: true, width: p.popup.width.middel,
					buttons: [{
						text:'OK',
						click: function() {
							var newtype = $('#c-type').val();
							var newtypetext = $('#c-type option:selected').text();
							$.post('std.alarmpointcfg.savealltype.req', {ids:ids, newtype:newtype}, function(data) {
								if(data == 'S_OK') {
									p.page.alert('<span class="pos">gespeichert</span>');
									$(tr).find('[data-id]').each(function() {
										if(p.valueexist($(this).attr('data-id'), ids)) {
											$(this).find('.tr-alarmtyp').text(newtypetext);
										}
									});
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
			p.page.alert('Keine Alarme Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.allcondition', function() {
		var tr = $(this).parents('ul.alarmsingroup:first');
		var ids = [];
		var bool = 'True';
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
				if($(this).attr('data-pointtype') != 'VT_BOOL') bool = 'False';
			}
		});
		if(ids.length > 0) {
			$.post('std.alarmpointcfg.getavailableconditions.req', {bool:bool}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Alarmbedingung ändern', modal: true, width: p.popup.width.middel,
					buttons: [{
						text:'OK',
						click: function() {
							var newcondition = {
								condition: $('#c-condition').val(),
								min: $('#c-min').val(),
								max: $('#c-max').val()
							};
							var newconditiontext = $('#c-condition option:selected').text();
							$.post('std.alarmpointcfg.saveallcondition.req', {ids:ids, newcondition:newcondition}, function(data) {
								if(data == 'S_OK') {
									p.page.alert('<span class="pos">gespeichert</span>');
									$(tr).find('[data-id]').each(function() {
										if(p.valueexist($(this).attr('data-id'), ids)) {
											$(this).find('.tr-condition').text(newconditiontext);
											$(this).find('.tr-min').text(newcondition.min);
											$(this).find('.tr-max').text(newcondition.max);
										}
									});
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
			p.page.alert('Keine Alarme Ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.alldelete', function() {
		var tr = $(this).parents('ul.alarmsingroup:first');
		var ids = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.post('std.alarmpointcfg.deleteall.req', {ids:ids}, function(data) {
				if(data == 'S_OK') {
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
			p.page.alert('Keine Alarme Ausgewählt');
		}
	});
//###################################################################################
// Funtionen fuer einzelne Alarme
//###################################################################################
	$('#erg').on('click', '.alarmedit', function() {

		var actualgroup = 0;

		var groupids = new Array();

		groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
		groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
		groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
		groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
		groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
		groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		var name = $(tr).attr('data-name');
		$.post('std.alarmpointcfg.getonealarm.req', {id:id,name:name,type:$(tr).attr('data-pointtype')}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Alarm bearbeiten', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
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
							id: id,
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
						var newtype = $('#c-type option:selected').text();
						var newcondition = $('#c-condition option:selected').text();
						var groups1 = $('#c-groups1').val() == 'NULL' ? '' : $('#c-groups1 option:selected').text();
						var groups2 = $('#c-groups2').val() == 'NULL' ? '' : $('#c-groups2 option:selected').text();
						var groups3 = $('#c-groups3').val() == 'NULL' ? '' : $('#c-groups3 option:selected').text();
						var groups4 = $('#c-groups4').val() == 'NULL' ? '' : $('#c-groups4 option:selected').text();
						var groups5 = $('#c-groups5').val() == 'NULL' ? '' : $('#c-groups5 option:selected').text();
						//p.log.write('Gruppe: ' + newgroup);
						$.post('std.alarmpointcfg.saveonealarm.req', TheObj, function(data) {
							if(data == 'S_OK') {
								p.page.alert('<span class="pos">gespeichert</span>');
								$('#dialog').dialog('close');
								$(tr).find('span.tr-alarmtext').text(TheObj.description);
								$(tr).find('span.tr-alarmlink').text(TheObj.link);
								$(tr).find('span.tr-groups1').text(groups1);
								$(tr).find('span.tr-groups2').text(groups2);
								$(tr).find('span.tr-groups3').text(groups3);
								$(tr).find('span.tr-groups4').text(groups4);
								$(tr).find('span.tr-groups5').text(groups5);
								$(tr).find('span.tr-alarmtyp').text(newtype);
								$(tr).find('span.tr-condition').text(newcondition);
								$(tr).find('span.tr-min').text(TheObj.min);
								$(tr).find('span.tr-max').text(TheObj.max);
								$(tr).find('span.tr-delay').text(TheObj.delay + ' sek');
								//p.page.change('#erg', 'std.alarmcfg.menucondition.req');
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 5000);
							}
						});
						/*
						if(filtertext == ''){
							$.post('std.alarmcfg.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
								if(groupids[0] != 'NULL'){
									$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
								} else {
									$('[data-alarms=NULL]').html(data);
								}
							});
						} else {
							$.post('std.alarming.filter.req', {filtertext:filtertext}, function(data) {
								$('#erg').html(data);
							});
						}
						*/
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
		//p.page.change('#ergcondition', 'std.alarmpointcfg.' + $(this).attr('data-id') + '.req');
	});
//###################################################################################
	$('#erg').on('click', '.alarmdelete', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		$.post('std.alarmpointcfg.deleteonealarm.req', {id:id}, function(data) {
			if(data == 'S_OK') $(tr).hide();
		});
	});
//###################################################################################
// Dialogfunktionen
//###################################################################################
	$('#dialog').on('change', '#c-condition', function() {
		if($(this).val() == '5' || $(this).val() == '6') {
			$('#c-max').val('').removeClass('ps-hidden');
		} else {
			$('#c-max').val('').addClass('ps-hidden');
		}
	});
	$('#dialog').on('click', '.ps-checkbox select', function(ev) {
		ev.stopPropagation();
		var t = $(this).parents('.ps-checkbox');
		if($(t).hasClass('p-checkboxgroup')) {
			$('[data-checkboxgroup=' + $(t).attr('data-checkboxgroup') + ']').removeClass('checked');
		}
		$(t).addClass('checked');
	});
//###################################################################################
	$('#dialog').on('keyup', '.newdpfilter', function() { setDPFilter(); });
	$('#dialog').on('change', '.newdpfilter', function() { setDPFilter(); });
	$('#erg').on('keyup', '.newdpfilter', function() { setDPFilter(); });
	$('#erg').on('change', '.newdpfilter', function() { setDPFilter(); });
//###################################################################################
	$('#erg').on('click', 'h2.editorder', function() {
		$.post('std.emailcfg.treegroup.req', {id:$(this).attr('data-id')}, function(data) {
			$('#erg').html(data);
		});
	});
//###################################################################################
	$('#erg').on('click', '.saveorder', function() {
		var cinsert = [];
		var cdelete = [];
		$('div.TheTree span.ps-checkbox').each(function() {
			if($(this).attr('data-cross') == '' && $(this).hasClass('checked')) {
				cinsert.push($(this).attr('data-idalarm'));
				p.log.write('INSERT Alarm: ' + $(this).attr('data-idalarm'));
			}
			if($(this).attr('data-cross') != '' && !$(this).hasClass('checked')) {
				cdelete.push($(this).attr('data-cross'));
				p.log.write('DELETE Alarm: ' + $(this).attr('data-cross'));
			}
		});
		p.page.save('std.emailcfg.saveorder.req', {id_email:$('div.TheTree').attr('data-id'), cinsert:cinsert, cdelete:cdelete});
	});
//###################################################################################
	$('#erg').on('click', '.TheTree span.ps-tree-parent', function() {
		var me = $(this).parents('li:first');
		if($(me).hasClass('gebrowsed')) {
			$(me).find('span:first').toggleClass('open');
			$(me).find('ul').toggleClass('ps-hidden');
			$(me).find('.markallintree').toggleClass('ps-hidden');
			$(me).find('.marknointree').toggleClass('ps-hidden');
		} else {
			$(me).find('span:first').addClass('loading');
			$.post('std.emailcfg.treealarm.req', {idgroup:$(me).attr('data-id'),idmail:$('div.TheTree').attr('data-id')}, function(data) {
				$(me).find('span:first').removeClass('loading').addClass('open');
				$(me).addClass('gebrowsed').append(data);
				$(me).find('.markallintree').removeClass('ps-hidden');
				$(me).find('.marknointree').toggleClass('ps-hidden');
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.insertalltouser', function() {
		var id = $('div.TheTree').attr('data-id');
		$.post('std.emailcfg.insertalltouser.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>');
				p.page.change('#erg', 'std.emailcfg.treegroup.req', {id:id});
			} else {
				p.page.alert(data);
			}
		});
	});
//###################################################################################
	$('#erg').on('click', '.deleteallfromuser', function() {
		var id = $('div.TheTree').attr('data-id');
		$.post('std.emailcfg.deleteallfromuser.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>');
				p.page.change('#erg', 'std.emailcfg.treegroup.req', {id:id});
			} else {
				p.page.alert(data);
			}
		});
	});
//###################################################################################
	$('#erg').on('click', '.markallintree', function() {
		$(this).parents('li.gebrowsed').find('span.ps-checkbox').addClass('checked');
	});
//###################################################################################
	$('#erg').on('click', '.marknointree', function() {
		$(this).parents('li.gebrowsed').find('span.ps-checkbox').removeClass('checked');
	});
	p.getValues();
};
//###################################################################################
function setDPFilter() {
	if($('input.newdpfilter').val().length == 0) {
		$('input.newdpfilter').removeClass('neg');
		$('.SelectNewAlarms li').removeClass('ps-hidden');
	} else {
		$('.SelectNewAlarms li').each(function() {
			$('input.newdpfilter').addClass('neg');
			if($(this).text().indexOf($('input.newdpfilter').val()) == -1) {
				$(this).addClass('ps-hidden').removeClass('checked');
			} else {
				$(this).removeClass('ps-hidden');
			}
		});
	}
}
