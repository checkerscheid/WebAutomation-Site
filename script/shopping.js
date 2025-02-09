/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.11.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 716                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shopping.js 716 2025-02-09 09:35:20Z                     $ #
//#                                                                                 #
//###################################################################################
?> shopping */
//<? require_once('script/system/websockets.js') ?>
ws.logEnabled = true;
var gekaufteAusblenden = false;
p.page.load = function() {
	$('#shopping').on('click', '.gekaufte', function() {
		const list = {
			id: $(this).attr('data-idList'),
			checked: $(this).hasClass('checked') ? 'false' : 'true'
		}
		if(list.checked == 'true') {
			gekaufteAusblenden = true;
			$.each($(this).parents('div[data-idList]:first').find('ul .ps-checkbox'), function() {
				console.log($(this));
				if($(this).hasClass('checked')) $(this).parents('.liproduct:first').addClass('ps-hidden');
				const ul = $(this).parents('ul.ulGroups:first');
				if($(ul).find('.ps-checkbox').length == $(ul).find('.ps-checkbox.checked').length) {
					$(ul).addClass('ps-hidden');
				}
			});
		} else {
			gekaufteAusblenden = false;
			$.each($('ul.ulGroups'), function() { $(this).removeClass('ps-hidden') });
			$(this).parents('div[data-idList]:first').find('.liproduct').removeClass('ps-hidden');
		}
	});
	$('#shopping').on('click', '.groupproduct', function() {
		const product = $(this).find('span.ps-checkbox');
		const prod = {
			checked: $(product).hasClass('checked') ? 'false' : 'true',
			idGroup: $(product).attr('data-idGroup'),
			idProduct: $(product).attr('data-idProduct')
		};
		console.log(prod);
		if(prod.checked && gekaufteAusblenden) {
			$(this).addClass('ps-hidden');
			const ul = $(this).parents('ul.ulGroups:first');
			const check = $(ul).find('.ps-checkbox').length;
			const checked = $(ul).find('.ps-checkbox.checked').length + 1;
			console.log(check, checked);
			if(check == checked) {
				$(ul).addClass('ps-hidden');
			}
		}
		$.post('shopping.setGroupProductChecked.req', prod, function(data) {
		});
	});
	$('#shopping').on('click', '.product', function() {
		const product = $(this).find('span.ps-checkbox');
		const prod = {
			checked: $(product).hasClass('checked') ? 'false' : 'true',
			idList: $(product).attr('data-idList'),
			idProduct: $(product).attr('data-idProduct')
		};
		console.log(prod);
		if(prod.checked && gekaufteAusblenden) {
			$(this).addClass('ps-hidden');
			const ul = $(this).parents('ul.ulGroups:first');
			const check = $(ul).find('.ps-checkbox').length;
			const checked = $(ul).find('.ps-checkbox.checked').length + 1;
			console.log(check, checked);
			if(check == checked) {
				$(ul).addClass('ps-hidden');
			}
		}
		$.post('shopping.setProductChecked.req', prod, function(data) {
		});
	});
	ws.connect();
	// p.getValues();
};

