/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 29.02.2016                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 638                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: alarming.js 638 2024-07-04 14:41:27Z                     $ #
//#                                                                                 #
//###################################################################################
?> alarming */

var filtertext = '';

p.page.load = function() {
//###################################################################################
	// Markierungen
	$('#erg').on('click', '.markall', function() {
		$('#erg .ps-checkbox').addClass('checked');
	});
	$('#erg').on('click', '.markno', function() {
		$('#erg .ps-checkbox').removeClass('checked');
	});

//###################################################################################
	$('#filter').on('click', '.filter', function() {
		filtertext = $('#filtertext').val();
		$.post('std.alarming.filter.req', {filtertext:filtertext}, function(data) {
			$('#erg').html(data);
		});
	});
//###################################################################################
	$('#filter').on('click', '.reset', function() {
		location.reload();
	});
//###################################################################################
	$('#erg').on('click', '.contactstomarked', function() {
		var tr = $(this).parents('ul.alarmsingroup:first');
		var name = 'Alle markierten Alarme';
		var ids = [];
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.post('std.alarming.editcontacts.req', {ids:ids, name:name}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Teilnehmerzuweisung', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'Speichern',
						click: function() {
							var alarmids = ids;
							var cinsert = [];
							var cdelete = [];
							$('div.allcontacts span.ps-checkbox').each(function() {
								if($(this).hasClass('checked')) {
									cinsert.push($(this).attr('data-idcontact'));
									//p.log.write('INSERT Alarm: ' + $(this).attr('data-idcontact'));
								}
								if(!$(this).hasClass('checked')) {
									//! TODO andere Lösung für Teilnehmer entfernen
									//cdelete.push($(this).attr('data-idcontact'));
									//p.log.write('DELETE Alarm: ' + $(this).attr('data-idcontact'));
								}
							});
							$('#dialog').dialog('close');
							p.page.save('std.alarming.contactstoalarm.req', {alarmids:alarmids, cinsert:cinsert, cdelete:cdelete});
						}
					}]
				});
				$("#dialog").css('max-height','600px');
			});
		} else {
			p.page.alert('Keine Alarme ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.groupstomarked', function() {
		var actualgroup = 0;

		var groupids = new Array();

		groupids[5] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup5');
		groupids[4] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup4');
		groupids[3] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup3');
		groupids[2] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup2');
		groupids[1] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup1');
		groupids[0] = $(this).parents('ul.alarmsingroup:first').attr('data-idgroup0');

		var tr = $(this).parents('ul.alarmsingroup:first');
		var name = 'Alle markierten Alarme';
		var ids = [];
		var alarmgroupid = $(tr).attr('data-group');
		$(tr).find('[data-id]').each(function() {
			if($(this).find('.ps-checkbox').hasClass('checked')) {
				ids.push($(this).attr('data-id'));
			}
		});
		if(ids.length > 0) {
			$.post('std.alarming.editgroups.req', {ids:ids, name:name, alarmgroupid:alarmgroupid}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Eskalationsgruppenzuweisung', modal: true, width: p.popup.width.middle,
					buttons: [{
						text:'Speichern',
						click: function() {
							var group = $('div.allgroups').attr('data-alarmgroupid');
							var alarmids = ids;
							var cinsert = [];
							var cdelete = [];
							$('div.allgroups span.ps-checkbox').each(function() {
								if($(this).hasClass('checked')) {
									cinsert.push($(this).attr('data-idgroup'));
									//p.log.write('INSERT Alarm: ' + $(this).attr('data-idcontact'));
								}
								if(!$(this).hasClass('checked')) {
									cdelete.push($(this).attr('data-idgroup'));
									//p.log.write('DELETE Alarm: ' + $(this).attr('data-idcontact'));
								}
							});
							$('#dialog').dialog('close');
							p.page.save('std.alarming.groupstoalarm.req', {alarmids:alarmids, cinsert:cinsert, cdelete:cdelete});

							//abfrage ob gefiltert wurde -> globale variable filtertext
							if(filtertext == ''){
								$.post('std.alarming.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
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
						}
					}]
				});
				$("#dialog").css('max-height','600px');
			});
		} else {
			p.page.alert('Keine Alarme ausgewählt');
		}
	});
//###################################################################################
	$('#erg').on('click', '.ps-tree-parent', function() {
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

			$.post('std.alarming.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {

				if(groupids[0] != 'NULL'){
					$('[data-alarms=' + groupids[5] + groupids[4] + groupids[3] + groupids[2] + groupids[1] + groupids[0] + ']').html(data);
				} else {
					$('[data-alarms=NULL]').html(data);
				}
				$(ptree).removeClass('loading');
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.contact', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		var name = $(tr).attr('data-name');
		$.post('std.alarming.editcontacts.req', {id:id, name:name}, function(data) {
			$('#dialog').html(data).dialog({
				//title: 'Teilnehmer für "'+name+'"', modal: true, width: p.popup.width.std,
				title: 'Teilnehmerzuweisung', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'Speichern',
					click: function() {
						var cinsert = [];
						var cdelete = [];
						$('div.allcontacts span.ps-checkbox').each(function() {
							if($(this).hasClass('checked')) {
								cinsert.push($(this).attr('data-idcontact'));
								//p.log.write('INSERT Alarm: ' + $(this).attr('data-idcontact'));
							}
							if(!$(this).hasClass('checked')) {
								cdelete.push($(this).attr('data-idcontact'));
								//p.log.write('DELETE Alarm: ' + $(this).attr('data-idcontact'));
							}
						});
						$('#dialog').dialog('close');
						p.page.save('std.alarming.contactstoalarm.req', {id_alarm:$('div.allcontacts').attr('data-idalarm'), cinsert:cinsert, cdelete:cdelete});
					}
				}]
			});
			$("#dialog").css('max-height','600px');
		});
	});
//###################################################################################
	$('#erg').on('click', '.group', function() {
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
		var ul = $(this).parents('ul.alarmsingroup:first');
		var alarmgroupid = $(ul).attr('data-group');
		$.post('std.alarming.editgroups.req', {id:id, name:name, alarmgroupid:alarmgroupid}, function(data) {
			$('#dialog').html(data).dialog({
				//title: 'Eskalationsgruppenzuweisung für "'+name+'"', modal: true, width: p.popup.width.std,
				title: 'Eskalationsgruppenzuweisung', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'Speichern',
					click: function() {
						var group = $('div.allgroups').attr('data-alarmgroupid');
						var cinsert = [];
						var cdelete = [];
						$('div.allgroups span.ps-checkbox').each(function() {
							if($(this).hasClass('checked')) {
								cinsert.push($(this).attr('data-idgroup'));
								//p.log.write('INSERT Alarm: ' + $(this).attr('data-idcontact'));
							}
							if(!$(this).hasClass('checked')) {
								cdelete.push($(this).attr('data-idgroup'));
								//p.log.write('DELETE Alarm: ' + $(this).attr('data-idcontact'));
							}
						});
						$('#dialog').dialog('close');
						p.page.save('std.alarming.groupstoalarm.req', {id_alarm:$('div.allgroups').attr('data-idalarm'), cinsert:cinsert, cdelete:cdelete});
						if(filtertext == ''){
							$.post('std.alarming.getinnergroups.req', {idgroup5:groupids[5], idgroup4:groupids[4], idgroup3:groupids[3], idgroup2:groupids[2], idgroup1:groupids[1], idgroup0:groupids[0], actualgroup:actualgroup}, function(data) {
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
					}
				}]
			});
		});
		$("#dialog").css('max-height','600px');
	});
//###################################################################################
	$('#erg').on('click', '.info', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		var name = $(tr).attr('data-name');
		$.post('std.alarming.alarminginfo.req', {id:id, name:name}, function(data) {
			$('#dialog').html(data).dialog({
				//title: 'Zugewiesene Alarmierungen von "'+name+'"', modal: true, width: p.popup.width.std,
				title: 'Zugewiesene Alarmierungen', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	p.getValues();
};