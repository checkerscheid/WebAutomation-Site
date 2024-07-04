/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 30.03.2016                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 638                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: useralarming.js 638 2024-07-04 14:41:27Z                 $ #
//#                                                                                 #
//###################################################################################
?> useralarming */

p.page.load = function() {
//###################################################################################
	$('#erg').on('click', '.ps-tree-parent', function() {
		var ptree = $(this);
		if($(this).hasClass('open')) {
			$('[data-alarms]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$(ptree).addClass('loading');
			$('[data-alarms]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-group');
			$.post('std.useralarming.getalarms.req', {group:group}, function(data) {
				$('[data-alarms=' + group + ']').html(data);
				$(ptree).removeClass('loading');
			});
		}
	});
//###################################################################################
	$('#erg').on('click', '.info', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		var name = $(tr).attr('data-name');
		$.post('std.useralarming.alarminginfo.req', {id:id, name:name}, function(data) {
			$('#dialog').html(data).dialog({
				//title: 'Zugewiesene Alarmierungen von "'+name+'"', modal: true, width: p.popup.width.std,
				title: 'Alarmierung', modal: true, width: p.popup.width.middle,
				buttons: [{
					text:'OK',
					click: function() {
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
//###################################################################################
	$('#erg').on('click', '.entfernen', function() {
		var tr = $(this).parents('div.tr:first');
		var id = $(tr).attr('data-id');
		var name = $(tr).attr('data-name');
		$.post('std.useralarming.delete.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				$(tr).fadeOut();
			} else {
				p.page.alert(data, 5000);
			}
		});
	});
	p.getValues();
};