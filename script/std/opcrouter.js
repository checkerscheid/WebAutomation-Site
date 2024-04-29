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
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: opcrouter.js 505 2021-05-07 21:55:45Z checker            $ #
//#                                                                                 #
//###################################################################################
?> opcrouter */

// p.log.level = p.log.type.info;

p.page.load = function() {
//###################################################################################
// Allgemein
//###################################################################################
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'std.opcrouter.menu' + $(this).attr('data-target') + '.req');
	});

//###################################################################################
// OPC Routen
//###################################################################################
	// Treeview
	$('#erg').on('click', '#tree .ps-tree-parent', function() {
		$('input.filtertext').val('').removeClass('neg');
		if($(this).hasClass('open')) {
			$('[data-points]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('[data-points]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-group');
			$.post('std.opcrouter.getpoints.req', {group:group}, function(data) {
				$('[data-points=' + group + ']').html(data);
			});
		}
	});
	$('#erg').on('click', '[data-dp]', function() {
		var datapoint = $(this).attr('data-dp');
		var name = $(this).html();
		p.page.change('#erg', 'std.opcrouter.menurouteto.req', {datapoint:datapoint, name:name}, function() {
			$('#routwahl option[data-point=' + datapoint + ']').attr('selected', 'selected');
			$.post('std.opcrouter.menuroutetochoice.req', {datapoint:datapoint}, function(data) {
				$('#tree1').html(data);
			});
			$.get('std.opcrouter.submenu.req', function(data) {
				$('#selectdp').html(data);
			});
		});
	});
	$('#erg').on('click', '.ps-delete', function() {
		var router = $('select option:selected').attr('data-point');
		$.post('std.opcrouter.deleterouter.req', {router:router}, function(data) {
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
			$.post('std.opcrouter.menuroutetochoice.req', {datapoint:datapoint}, function(data) {
				$('#tree1').html(data);
			});
			$.get('std.opcrouter.submenu.req', function(data) {
				$('#selectdp').html(data);
			});
		} else {
			$('#tree1').html('');
			$('#selectdp').html('');
		}
	});
	$('#erg').on('click', '#selectdp .ps-tree-parent', function() {
		$('input.newdpfilter').val('').removeClass('neg');
		var datapoint = $('select option:selected').attr('data-point');
		if($(this).hasClass('open')) {
			$('[data-points]').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('[data-points]').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open');
			var group = $(this).attr('data-group');
			$.post('std.opcrouter.getnewrout.req', {group:group, datapoint:datapoint}, function(data) {
				$('[data-points=' + group + ']').html(data);
			});
		}
	});
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
		$('#erg li.checked').each(function() {
			routes.push($(this).attr('data-value'));
		});
		if(routes.length > 0) {
			$.post('std.opcrouter.savenewroute.req', {routes:routes, router:router}, function(data) {
				$.post('std.opcrouter.menuroutetochoice.req', {datapoint:router}, function(data) {
					$('#tree1').html(data);
				});
				$.get('std.opcrouter.submenu.req',function(data) {
					$('#selectdp').html(data);
				});
			});
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
		$.post('std.opcrouter.deletesingle.req', {single:single, router:router}, function(data) {
			$.post('std.opcrouter.menuroutetochoice.req', {datapoint:router}, function(data) {
				$('#tree1').html(data);
			});
			$.get('std.opcrouter.submenu.req',function(data){
				$('#selectdp').html(data);
			});
		});
	});
	$('#erg').on('click', '.deletemarked', function() {
		var group = [];
		var router = $('select option:selected').attr('data-point');
		$('#erg span.checked').each(function() {
			group.push($(this).attr('data-routid'));
		});
		$.post('std.opcrouter.deletechecked.req', {group:group, router:router}, function(data) {
			$.post('std.opcrouter.menuroutetochoice.req', {datapoint:router}, function(data) {
				$('#tree1').html(data);
			});
			$.get('std.opcrouter.submenu.req',function(data){
				$('#selectdp').html(data);
			});
		});
	});
	p.getValues();
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
