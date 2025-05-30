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
//# Revision     : $Rev:: 743                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: groups.js 743 2025-05-30 11:15:44Z                       $ #
//#                                                                                 #
//###################################################################################
?> groups */

var groups = {
	tablename: '',
	member: '',
	target: '',
	init: function() {
//###################################################################################
		$('#erg').on('click', '.dpnamespacefolder', function() {
			if($(this).hasClass('open')) {
				$('[data-groups]').html('');
				$('.dpnamespacefolder').removeClass('open');
			} else {
				$('[data-groups]').html('');
				$('.dpnamespacefolder').removeClass('open');
				$(this).addClass('open');
				var dpnamespace = $(this).attr('data-dpnamespace');
				$.post('std.' + dps.target + '.dpgroup.req', {dpnamespace:dpnamespace}, function(data) {
					$('[data-groups=' + dpnamespace + ']').html(data);
				});
			}
		});
//###################################################################################
		$('#erg').on('click', '.groupinsert', function() {
			var name = $(this).parent('div').find('input[type=text]').val();
			$.post('std.' + groups.target + '.groupinsert.req', {table:groups.tablename, name:name}, function(data) {
				if(data.erg == 'S_OK') {
					$('div.divupdate').append(data.forhtml);
				} else {
					p.page.alert(data.message);
				}
			}, 'json');
		});
//###################################################################################
		$('#erg').on('click', '.groupupdate', function() {
			var id = $(this).parent('div').find('input[type=hidden]').val();
			var name = $(this).parent('div').find('input[type=text]').val();
			$.post('std.' + groups.target + '.groupupdate.req', {table:groups.tablename, id:id, name:name}, function(data) {
				if(data.erg == 'S_ERROR') p.page.alert(data.message);
			}, 'json');
		});
//###################################################################################
		$('#erg').on('click', '.groupdelete', function() {
			var that = $(this).parent('div');
			var id = $(that).find('input[type=hidden]').val();
			$.post('std.' + groups.target + '.groupdelete.req', {table:groups.tablename, member:groups.member, id:id}, function(data) {
				switch(data.erg) {
					case 'S_OK':
						$(that).fadeOut().remove();
						break;
					case 'S_CK':
						$('#dialog').html('Es befinden sich ' + data.count + ' Elemente in dieser Gruppe, die ebenfalls gelöscht werden.<br />Fortfahren?').dialog({
							title: 'Bestätigen', modal: true, width: p.popup.width.middle,
							buttons: [{
								text:'OK',
								click: function() {
									$.post('std.' + groups.target + '.groupdelete.req', {table:groups.tablename, member:groups.member, id:id, force:'true'}, function(data) {
										if(data.erg == 'S_OK') $(that).fadeOut().remove();
									}, 'json');
								}
							},{
								text: 'Abbruch',
								click: function() { $('#dialog').dialog('close'); }
							}]
						});
						break;
					default:
						p.page.alert(data);
						break;
				}
			}, 'json');
		});
//###################################################################################
		$('#erg').on('keyup', '.filterGroup', function() { groups.setGroupFilter(); });
		$('#erg').on('change', '.filterGroup', function() { groups.setGroupFilter(); });
	},
	setGroupFilter: function() {
		if($('input.filterGroup').val().length == 0) {
			$('input.filterGroup').removeClass('neg');
			$('#erg div.divupdate div').removeClass('ps-hidden');
		} else {
			$('input.filterGroup').addClass('neg');
			$('#erg div.divupdate div').each(function() {
				var text = $(this).find('input.ps-input:first').val().toLowerCase();
				if(text.indexOf($('input.filterGroup').val().toLowerCase()) == -1) {
					$(this).addClass('ps-hidden');
				} else {
					$(this).removeClass('ps-hidden');
				}
			});
		}
	}
};
