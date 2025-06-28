/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christopher Korn                                                 #
//# Date         : 06.06.2015                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 745                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: router.js 745 2025-06-18 08:33:40Z                       $ #
//#                                                                                 #
//###################################################################################
?> router */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/groups.js'; ?>
//<? require_once 'script/system/dps.js'; ?>

groups.tablename = 'router';
groups.member = 'router';
groups.target = 'router';

dps.tablename = 'router';
dps.target = 'router';

p.page.load = function() {
	groups.init();
	dps.init();
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.router.menu' + $(this).attr('data-target') + '.req', {table:groups.tablename, targetClass:'saveelemfrom'});
	});

//###################################################################################
// OPC Routen
//###################################################################################
	// Treeview
	$('#erg').on('click', '.saveelemfrom', function() {
		var newelems = [];
		$('#erg li.checked').each(function() {
			if(!$(this).hasClass('ps-hidden') && !$(this).hasClass('ps-disabled')) {
				p.log.write('attr: ' + $(this).attr('data-dp'));
				newelems.push($(this).attr('data-dp'));
			}
		});
		$.post('std.' + dps.target + '.menuroutefrom.req', {table:dps.tablename, newelems:newelems}, function(data) {
			if(data.erg == 'S_OK') {
				p.page.message('Die neuen Elemente wurden erfolgreich gespeichert.');
				p.page.change('#erg', 'std.' + dps.target + '.menunewelem.req', {table:dps.tablename});
			}
		}, 'json');
	});
	// $('#erg').on('click', '#tree .ps-tree-parent', function() {
	// 	$('input.filtertext').val('').removeClass('neg');
	// 	if($(this).hasClass('open')) {
	// 		$('[data-points]').html('');
	// 		$('.ps-tree-parent').removeClass('open');
	// 	} else {
	// 		$('[data-points]').html('');
	// 		$('.ps-tree-parent').removeClass('open');
	// 		$(this).addClass('open');
	// 		var group = $(this).attr('data-group');
	// 		$.post('std.router.getpoints.req', {group:group}, function(data) {
	// 			$('[data-points=' + group + ']').html(data);
	// 		});
	// 	}
	// });
	// $('#erg').on('click', '[data-dp]', function() {
	// 	var datapoint = $(this).attr('data-dp');
	// 	var name = $(this).html();
	// 	p.page.change('#erg', 'std.router.menurouteto.req', {datapoint:datapoint, name:name}, function() {
	// 		$('#routwahl option[data-point=' + datapoint + ']').attr('selected', 'selected');
	// 		$.post('std.router.menuroutetochoice.req', {datapoint:datapoint}, function(data) {
	// 			$('#tree1').html(data);
	// 		});
	// 		$.get('std.router.submenu.req', function(data) {
	// 			$('#selectdp').html(data);
	// 		});
	// 	});
	// });
	$('#erg').on('click', '.ps-delete', function() {
		var router = $('select option:selected').attr('data-point');
		$.post('std.router.deleterouter.req', {router:router}, function(data) {
			if(data == 'S_OK') {
				$('#selectdp').html('');
				$('#tree1').html('');
				$('select option:selected').remove();
				$('select option:first-child').attr('selected','selected');
			} else {
				p.page.alert('<span class="neg">Konnte nicht gelöscht werden!</span>');
			}
		});
	});
	$('#erg').on('change', '#routwahl', function() {
		var datapoint = $('select option:selected').attr('data-point');
		if(typeof(datapoint) != 'undefined') {
			$.post('std.router.menuroutetochoice.req', {datapoint:datapoint}, function(data) {
				$('#tree1').html('<div class="ps-container">' + data + '</div>');
			});
			$.post('std.router.menunewelem.req', {targetClass:'savenewroute'}, function(data) {
				$('#selectdp').html('<div class="ps-container">' + data + '</div>');
			});
		} else {
			$('#tree1').html('');
			$('#selectdp').html('');
		}
	});
	// $('#erg').on('click', '#selectdp .ps-tree-parent', function() {
	// 	$('input.newdpfilter').val('').removeClass('neg');
	// 	var datapoint = $('select option:selected').attr('data-point');
	// 	if($(this).hasClass('open')) {
	// 		$('[data-points]').html('');
	// 		$('.ps-tree-parent').removeClass('open');
	// 	} else {
	// 		$('[data-points]').html('');
	// 		$('.ps-tree-parent').removeClass('open');
	// 		$(this).addClass('open');
	// 		var group = $(this).attr('data-group');
	// 		$.post('std.router.getnewrout.req', {group:group, datapoint:datapoint}, function(data) {
	// 			$('[data-points=' + group + ']').html(data);
	// 		});
	// 	}
	// });
//###################################################################################
// Markierungen
//###################################################################################
	$('#erg').on('click', '.markall', function() {
		$('#selectdp .ps-checkbox').addClass('checked');
	});
	$('#erg').on('click', '.markno', function() {
		$('#selectdp .ps-checkbox').removeClass('checked');
	});
//###################################################################################
// Filter Aufruf
//###################################################################################
	$('#erg').on('keyup', 'input.newdpfilter', function() {
		setToFilter();
	});
	$('#erg').on('keyup', 'input.filtertext', function() {
		setFromFilter();
	});
//###################################################################################
// Neue Routen
//###################################################################################
	$('#erg').on('click', '.savenewroute', function() {
		var routes = [];
		var router = $('select option:selected').attr('data-point');
		$('#selectdp li.checked').each(function() {
			routes.push($(this).attr('data-dp'));
		});
		if(routes.length > 0) {
			$.post('std.router.savenewroute.req', {routes:routes, router:router}, function(data) {
				$.post('std.router.menuroutetochoice.req', {datapoint:router}, function(data) {
					$('#tree1').html('<div class="ps-container">' + data + '</div>');
				});
				$.get('std.router.submenu.req',function(data){
					$('#selectdp').html('<div class="ps-container">' + data + '</div>');
				});
			}, 'json');
		}
	});
//###################################################################################
// Markierungen/löschen bestehender Routen
//###################################################################################
	$('#erg').on('click', '.markallroutes', function() {
		$('#tree1 .ps-checkbox').addClass('checked');
	});
	$('#erg').on('click', '.marknone', function() {
		$('#tree1 .ps-checkbox').removeClass('checked');
	});
	$('#erg').on('click', '.deletesingle', function() {
		var single = $(this).parents('div.tr').find('[data-routid]').attr('data-routid');
		var router = $('select option:selected').attr('data-point');
		$.post('std.router.deletesingle.req', {single:single, router:router}, function(data) {
			$.post('std.router.menuroutetochoice.req', {datapoint:router}, function(data) {
				$('#tree1').html('<div class="ps-container">' + data + '</div>');
			});
			$.get('std.router.submenu.req',function(data){
				$('#selectdp').html('<div class="ps-container">' + data + '</div>');
			});
		});
	});
	$('#erg').on('click', '.deletemarked', function() {
		var group = [];
		var router = $('select option:selected').attr('data-point');
		$('#erg span.checked').each(function() {
			group.push($(this).attr('data-routid'));
		});
		$.post('std.router.deletechecked.req', {group:group, router:router}, function(data) {
			$.post('std.router.menuroutetochoice.req', {datapoint:router}, function(data) {
				$('#tree1').html('<div class="ps-container">' + data + '</div>');
			});
			$.get('std.router.submenu.req',function(data){
				$('#selectdp').html('<div class="ps-container">' + data + '</div>');
			});
		});
	});
	//p.getValues();
};
//###################################################################################
// Filter Funktion
//###################################################################################
function setToFilter() {
	if($('input.newdpfilter').val().length == 0) {
		$('input.newdpfilter').removeClass('neg');
		$('#selectnewrouts li').removeClass('ps-hidden');
	} else {
		$('input.newdpfilter').addClass('neg');
		$('#selectnewrouts li').each(function() {
			p.log.write($(this).text());
			if($(this).text().indexOf($('input.newdpfilter').val()) == -1) {
				$(this).addClass('ps-hidden').removeClass('checked');
			} else {
				$(this).removeClass('ps-hidden');
			}
		});
	}
}
function setFromFilter() {
	if($('input.filtertext').val().length == 0) {
		$('input.filtertext').removeClass('neg');
		$('.dps li').removeClass('ps-hidden');
	} else {
		$('input.filtertext').addClass('neg');
		$('.dps li').each(function() {
			p.log.write($(this).text());
			if($(this).text().indexOf($('input.filtertext').val()) == -1) {
				$(this).addClass('ps-hidden').removeClass('checked');
			} else {
				$(this).removeClass('ps-hidden');
			}
		});
	}
}
