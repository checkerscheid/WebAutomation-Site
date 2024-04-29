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
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: emailcfg.js 505 2021-05-07 21:55:45Z checker             $ #
//#                                                                                 #
//###################################################################################
?> emailcfg */

p.page.load = function() {
	$('#submenu').on('click', '.ps-button', function() {
		p.page.change('#erg', 'emailcfg.menu' + $(this).attr('data-target') + '.req');
	});
	$('#erg').on('click', '.email-edit', function() {
		var id = $(this).parents('div:first').attr('data-id');
		$.post('emailcfg.popupemail.req', {id:id}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Kontakt bearbeiten',
				modal: true,
				width: p.popup.width.middel,
				buttons: [{
					text: 'OK',
					click: function() {
						var Obj = {
							id: $('#dialog').find('div.table').attr('data-id'),
							address: $('#dialog').find('input.email').val(),
							etc: $('#dialog').find('input.etc').val(),
							phone: $('#dialog').find('input.phone').val(),
							lastname: $('#dialog').find('input.lastname').val(),
							name: $('#dialog').find('input.name').val(),
							active: $('#dialog').find('span.active').hasClass('checked') ? '1' : '0'
						};
						$.post('emailcfg.saveemail.req', Obj, function(data) {
							if(data == 'S_OK') {
								var toUpdate = $('#erg').find('div[data-id=' + Obj.id + ']');
								$(toUpdate).find('h2').text(Obj.lastname + ', ' + Obj.name);
								if(Obj.active == '1') $(toUpdate).find('span.active').addClass('pos').removeClass('neg').text('aktiv');
								else $(toUpdate).find('span.active').removeClass('pos').addClass('neg').text('inaktiv');
								$(toUpdate).find('.address').text(Obj.address);
								$('#dialog').dialog('close');
								p.page.alert('<span class="pos">gespeichert</span>');
							} else {
								p.page.alert(data);
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
		p.page.save('emailcfg.saveorder.req', {id_email:$('div.TheTree').attr('data-id'), cinsert:cinsert, cdelete:cdelete});
	});
	$('#erg').on('click', '.addnewemail', function() {
		$.get('emailcfg.popupnewemail.req', function(data) {
			$('#dialog').html(data).dialog({
				title: 'Neuer Kontakt',
				modal: true,
				width: p.popup.width.middel,
				buttons: [{
					text: 'OK',
					click: function() {
						var Obj = {
							address: $('#dialog').find('input.email').val(),
							phone: $('#dialog').find('input.phone').val(),
							etc: $('#dialog').find('input.etc').val(),
							lastname: $('#dialog').find('input.lastname').val(),
							name: $('#dialog').find('input.name').val(),
							active: $('#dialog').find('span.active').hasClass('checked') ? '1' : '0'
						};
						$.post('emailcfg.savenewemail.req', Obj, function(data) {
							if(data == 'S_OK') {
								$('#dialog').dialog('close');
								p.page.change('#erg', 'emailcfg.menuemails.req');
							} else {
								p.page.alert(data);
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
	$('#erg').on('click', '.email-delete', function() {
		var me = $(this).parents('div.existemail');
		var id = $(me).attr('data-id');
		$.post('emailcfg.deleteemail.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>');
				$(me).remove();
			} else {
				p.page.alert(data);
			}
		});
	});
	$('#erg').on('click', 'h2.editorder', function() {
		$.post('emailcfg.treegroup.req', {id:$(this).attr('data-id')}, function(data) {
			$('#erg').html(data);
		});
	});
	$('#erg').on('click', '.ps-tree-parent', function() {
		var me = $(this).parents('li:first');
		if($(me).hasClass('gebrowsed')) {
			$(me).find('span:first').toggleClass('open');
			$(me).find('ul').toggleClass('ps-hidden');
			$(me).find('.markallintree').toggleClass('ps-hidden');
			$(me).find('.marknointree').toggleClass('ps-hidden');
		} else {
			$(me).find('span:first').addClass('loading');
			$.post('emailcfg.treealarm.req', {idgroup:$(me).attr('data-id'),idmail:$('div.TheTree').attr('data-id')}, function(data) {
				$(me).find('span:first').removeClass('loading').addClass('open');
				$(me).addClass('gebrowsed').append(data);
				$(me).find('.markallintree').removeClass('ps-hidden');
				$(me).find('.marknointree').toggleClass('ps-hidden');
			});
		}
	});

	$('#erg').on('click', '.insertalltouser', function() {
		var id = $('div.TheTree').attr('data-id');
		$.post('emailcfg.insertalltouser.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>');
				p.page.change('#erg', 'emailcfg.treegroup.req', {id:id});
			} else {
				p.page.alert(data);
			}
		});
	});
	$('#erg').on('click', '.deleteallfromuser', function() {
		var id = $('div.TheTree').attr('data-id');
		$.post('emailcfg.deleteallfromuser.req', {id:id}, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>');
				p.page.change('#erg', 'emailcfg.treegroup.req', {id:id});
			} else {
				p.page.alert(data);
			}
		});
	});

	$('#erg').on('click', '.markallintree', function() {
		$(this).parents('li.gebrowsed').find('span.ps-checkbox').addClass('checked');
	});

	$('#erg').on('click', '.marknointree', function() {
		$(this).parents('li.gebrowsed').find('span.ps-checkbox').removeClass('checked');
	});

	$('#erg').on('keyup', '.emailfilter', function() { emailfilter(); });
	$('#erg').on('change', '.emailfilter', function() { emailfilter(); });
};

function emailfilter() {
	if($('input.emailfilter').val().length == 0) {
		$('div.existemail').removeClass('ps-hidden');
	} else {
		$('div.existemail').each(function() {
			if($(this).find('span.address').text().indexOf($('input.emailfilter').val()) == -1) {
				$(this).addClass('ps-hidden');
			} else {
				$(this).removeClass('ps-hidden');
			}
		});
	}
}
