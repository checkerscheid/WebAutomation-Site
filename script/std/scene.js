/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 23.07.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 539                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: scene.js 539 2023-10-19 22:23:43Z checker                $ #
//#                                                                                 #
//###################################################################################
?> scene */

// p.log.level = p.log.type.info;

p.page.load = function() {
	// Treeview
	$('#scene').on('click', '.p-tree-parent-group', function() {
		if($(this).hasClass('open')) {
			$('.p-tree-child-group').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('.p-tree-child-group').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open loading');
			var group = $(this).attr('data-group');
			$.post('std.scene.getgroup.req', {group:group}, function(data) {
				$('[data-scenen=' + group + ']').html(data);
				$('.ps-tree-parent').removeClass('loading');
			});
		}
	});
	$('#scene').on('click', '.p-tree-parent-scene', function() {
		if($(this).hasClass('open')) {
			$('.p-tree-child-scene').html('');
			$('.p-tree-parent-scene').removeClass('open');
		} else {
			$('.p-tree-child-scene').html('');
			$('.p-tree-parent-scene').removeClass('open');
			$(this).addClass('open loading');
			var scene = $(this).parent('.GroupHeadLine').attr('data-scene');
			$.post('std.scene.getpoint.req', {id:scene}, function(data) {
				$('[data-points=' + scene + ']').html(data);
				$('.p-tree-parent-scene').removeClass('loading');
			});
		}
	});
//###################################################################################
	$('#scene').on('click', '[data-writescene]', function(data) {
		$.post('std.writescene.setid.req', {id:$(this).attr('data-writescene')}, function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
//###################################################################################
	getValues();
};
function getValues() {
	$.get('std.request.activedp.req', function(data) {
		for(var elem in wpResult) {
			p.automation.stdClass(elem, wpResult[elem].ValueString);
		}
	}, 'script').always(function() {
		window.setTimeout(function() { getValues(); }, p.automation.pointrate);
	});
}
