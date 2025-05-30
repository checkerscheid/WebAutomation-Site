/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 22.01.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: dps.js 582 2024-04-10 06:45:45Z                          $ #
//#                                                                                 #
//###################################################################################
?> dps */

var dps = {
	tablename: '',
	target: '',
	writable: false,
	init: function() {
//###################################################################################
		$('#erg').on('click', '.dpgroupfolder', function() {
			console.log($(this))
			if($(this).hasClass('open')) {
				$('[data-dps]').html('');
				$('.dpgroupfolder').removeClass('open');
			} else {
				$('[data-dps]').html('');
				$('.dpgroupfolder').removeClass('open');
				$(this).addClass('open');
				var dpgroup = $(this).attr('data-dpgroup');
				$.post('std.' + dps.target + '.dp.req', {table:dps.tablename, writeable:dps.writable ? 'True' : 'False', dpgroup:dpgroup}, function(data) {
					$('[data-dps=' + dpgroup + ']').html(data);
				});
			}
		});
//###################################################################################
		$('#erg').on('click', '.savenewelem', function() {
			var newelems = [];
			$('#erg li.checked').each(function() {
				if(!$(this).hasClass('ps-hidden') && !$(this).hasClass('ps-disabled')) {
					p.log.write('attr: ' + $(this).attr('data-dp'));
					newelems.push($(this).attr('data-dp'));
				}
			});
			$.post('std.' + dps.target + '.savenewelems.req', {table:dps.tablename, newelems:newelems}, function(data) {
				if(data.erg == 'S_OK') {
					p.page.message('Die neuen Elemente wurden erfolgreich gespeichert.');
					p.page.change('#erg', 'std.' + dps.target + '.menunewelem.req', {table:dps.tablename});
				}
			}, 'json');
		});
//###################################################################################
		// Markierungen
		$('#erg').on('click', '.markall', function() {
			$('#erg .ps-checkbox:not(.ps-disabled)').addClass('checked');
		});
		$('#erg').on('click', '.markno', function() {
			$('#erg .ps-checkbox:not(.ps-disabled)').removeClass('checked');
		});
//###################################################################################
		// Filter
		$('#erg').on('keyup', '.filterNewelem', function() { dps.setNewFilter(); });
		$('#erg').on('change', '.filterNewelem', function() { dps.setNewFilter(); });
	},
	setNewFilter: function() {
		if($('input.filterNewelem').val().length == 0) {
			$('input.filterNewelem').removeClass('neg');
			$('#erg .ps-checkbox').removeClass('checked');
			$('#erg .ps-checkbox').removeClass('ps-hidden');
		} else {
			$('input.filterNewelem').addClass('neg');
			$('#erg .ps-checkbox').each(function() {
				var text = $(this).text().toLowerCase();
				if(text.indexOf($('input.filterNewelem').val().toLowerCase()) == -1) {
					$(this).addClass('ps-hidden');
					$('#erg .ps-checkbox').removeClass('checked');
				} else {
					$(this).removeClass('ps-hidden');
				}
			});
		}
	}
};