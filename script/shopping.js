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
//# Revision     : $Rev:: 733                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shopping.js 733 2025-04-16 03:01:56Z                     $ #
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
		const that = $(this);
		const product = $(that).find('span.ps-checkbox');
		const prod = {
			checked: $(product).hasClass('checked') ? 'false' : 'true',
			idGroup: $(product).attr('data-idGroup'),
			idProduct: $(product).attr('data-idProduct')
		};
		console.log(prod);
		// if(prod.checked && gekaufteAusblenden) {
		// 	$(that).addClass('ps-hidden');
		// 	const ul = $(that).parents('ul:first');
		// 	CheckGroupHide(ul);
		// }
		$.post('shopping.setGroupProductChecked.req', prod, function(data) {
		});
	});
	$('#shopping').on('click', '.product', function() {
		const that = $(this);
		const product = $(that).find('span.ps-checkbox');
		const prod = {
			checked: $(product).hasClass('checked') ? 'false' : 'true',
			idList: $(product).attr('data-idList'),
			idProduct: $(product).attr('data-idProduct')
		};
		console.log(prod);
		// if(prod.checked && gekaufteAusblenden) {
		// 	$(that).addClass('ps-hidden');
		// 	const ul = $(that).parents('ul:first');
		// 	CheckGroupHide(ul);
		// }
		$.post('shopping.setProductChecked.req', prod, function(data) {
			if(data.erg != 'S_OK') {
				$(product).toggleClass('checked');
				p.page.alertWarning('Product konnte nicht gespeichert werden');
			}
		});
	});
	ws.connect();
	// p.getValues();
};
function SetShoppingChecked(idGroup, idProduct, isChecked) {
	console.log('SetShoppingChecked', idGroup, idProduct, isChecked);
	var product, ul;
	if(idGroup > 0) {
		product = $('[data-idGroup="' + idGroup + '"][data-idProduct="' + idProduct + '"]');
	} else {
		product = $('.product [data-idProduct="' + idProduct + '"]');
	}
	if(isChecked) {
		$(product).addClass('checked');
		if(gekaufteAusblenden) {
			$(product).parents('li:first').addClass('ps-hidden');
		}
	} else {
		$(product).removeClass('checked');
		if(gekaufteAusblenden) {
			$(product).parents('li:first').removeClass('ps-hidden');
		}
	}
	ul = $(product).parents('ul:first');
	CheckGroupHide(ul);
}
function CheckGroupHide(ul) {
	const check = $(ul).find('.ps-checkbox').length;
	const checked = $(ul).find('.ps-checkbox.checked').length;
	console.log(check, checked);
	if(check == checked) {
		$(ul).addClass('ps-hidden');
	} else {
		$(ul).removeClass('ps-hidden');
	}

}

