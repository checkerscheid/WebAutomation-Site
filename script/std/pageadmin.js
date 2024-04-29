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
//# Revision     : $Rev:: 522                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: pageadmin.js 522 2021-08-19 16:16:51Z checker            $ #
//#                                                                                 #
//###################################################################################
?> pageadmin */

p.page.load = function() {
	$('#pageadmin').on('click', '.addpage', function() {
		var t = $(this);
		var src = $(this).parents('div:first').find('h3').text();
		var name = $(this).parents('div:first').find('.siteName').val();
		var group = $(this).parents('div:first').find('select').val();
		$.post('std.pageadmin.savenewpage.req', {src:src.split('.inc')[0], name:name, group:group}, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>', 1000);
				$(t).parents('div:first').fadeOut();
			} else {
				p.page.alert('<span class="neg">' + data + '</span>', 5000);
			}
		});
	});
	$('#pageadmin').on('click', '.updatepage', function() {
		var name = $(this).parents('div:first').find('.ps-input.name').val();
		var order = $(this).parents('div:first').find('.ps-input.order option:selected').val();
		var id = $(this).parents('div[data-id]:first').attr('data-id');
		var inwork = $(this).parents('div:first').find('.ps-checkbox').hasClass('checked') ? 'True' : 'False';
		$.post('std.pageadmin.updatepage.req', { id:id, name:name, order:order, inwork:inwork }, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>', 1000);
			} else {
				p.page.alert('<span class="neg">' + data + '</span>', 5000);
			}
		});
	});
	$('#pageadmin').on('click', '.deletepage', function() {
		var div = $(this).parents('div.ps-container:first');
		var id = $(div).attr('data-id');
		var src = $(this).attr('data-src');
		$.post('std.pageadmin.deletepage.req', { id:id,src:src }, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gelöscht</span>', 1000);
				$(div).hide(400, function() { $(div).remove(); });
			} else {
				p.page.alert('<span class="neg">' + data + '</span>', 5000);
			}
		});
	});
	$('#pageadmin').on('click', 'h2', function() {
		$(this).parent('.parentContainer:first').find('.closeable:first').toggleClass('closed');
	});
	$('#pageadmin').on('click', 'h3', function() {
		$(this).parent('.ps-container:first').find('.closeable:first').toggleClass('closed');
	});
	$('#pageadmin').on('click', '.allauf', function() {
		$('.closed').removeClass('closed');
	});
	$('#pageadmin').on('click', '.allein', function() {
		$('.closeable').addClass('closed');
	});
	$('#pageadmin').on('click', '.newOverviewsite', function() {
		var src = $('#newOverviewsiteSrc').val();
		var name = $('#newOverviewsiteName').val();
		var order = $(this).parent('.ps-container:first').find('.order').val();
		$.post('std.pageadmin.newOverviewsite.req', { src:src, name:name, order:order }, function(data) {
			p.page.alert('<span class="neg">' + data + '</span>', 5000);
		});
	});
	$('#pageadmin').on('click', '.newEmptysite', function() {
		var src = $('#newEmptysiteSrc').val();
		var name = $('#newEmptysiteName').val();
		var order = $(this).parent('.ps-container:first').find('.order').val();
		$.post('std.pageadmin.newEmptysite.req', { src:src, name:name, order:order }, function(data) {
			p.page.alert('<span class="neg">' + data + '</span>', 5000);
		});
	});
};
