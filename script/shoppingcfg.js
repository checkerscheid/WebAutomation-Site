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
//# Revision     : $Rev:: 731                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shoppingcfg.js 731 2025-04-03 16:37:32Z                  $ #
//#                                                                                 #
//###################################################################################
?> shoppingcfg */
//<? require_once('script/system/websockets.js') ?>
ws.logEnabled = true;
var gekaufteAusblenden = false;
p.page.load = function() {
	$.each($('.newLists [data-idList]'), function() {
		shoppingcfg.loadLists($(this).attr('data-idList'));
	});
	shoppingcfg.loadGroups(true);
	shoppingcfg.loadProducts();
	$('.newGroups').on('keyup', '.searchGroup', function() {
		const search = $(this).val().toLowerCase();
		if(search == '') {
			$('.newGroups li.groupHeader[data-idGroup]').removeClass('ps-hidden');
			$('.newGroups ul[data-idGroupentries]').removeClass('ps-hidden');
		} else {
			$('.newGroups li.groupHeader[data-idGroup]').addClass('ps-hidden');
			$('.newGroups ul[data-idGroupentries]').addClass('ps-hidden');
			$.each($('.newGroups li.groupHeader[data-idGroup]'), function() {
				const id = $(this).attr('data-idGroup');
				const name = $(this).find('.name').val().toLowerCase();
				if(id > 0 && name.indexOf(search) >= 0) {
					$('.newGroups li[data-idGroup=' + id + ']').removeClass('ps-hidden');
					$('.newGroups ul[data-idGroupentries=' + id + ']').removeClass('ps-hidden');
				}
			});
		}
	});
	$('.newProducts').on('keyup', '.searchProduct', function() {
		const search = $(this).val().toLowerCase();
		shoppingcfg.searchProduct(search);
	});
	$('#shoppingcfg .newLists').on('click', '.ps-export, .ps-add', function() {
		const list = {
			id: $(this).parents('li:first').attr('data-idList'),
			name: $(this).parents('li:first').find('.name').val()
		};
		$.post('shoppingcfg.setListName.req', list, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Listname changed');
				shoppingcfg.loadLists(list.id);
			}
		}), 'json';
	});
	$('#shoppingcfg .newGroups').on('click', '.ps-export, .ps-add', function() {
		const group = {
			id: $(this).parents('li:first').attr('data-idGroup'),
			name: $(this).parents('li:first').find('.name').val()
		};
		$.post('shoppingcfg.setGroupName.req', group, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Groupname changed');
				shoppingcfg.loadGroups(true);
			}
		}), 'json';
	});
	$('#shoppingcfg .newProducts').on('click', '.ps-export, .ps-add', function() {
		const product = {
			id: $(this).parents('li:first').attr('data-idProduct'),
			name: $(this).parents('li:first').find('.name').val()
		};
		$.post('shoppingcfg.setProductName.req', product, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Productname changed');
				shoppingcfg.loadProducts(product.name);
			}
		}), 'json';
	});
	$('.newLists').on('click', '.groupname .ps-delete', function() {
		const idList = $(this).parents('div:first').attr('data-idList');
		const idGroup = $(this).parents('div:first').attr('data-idGroup');
		$.post('shoppingcfg.deleteGroupFromList.req', { idList:idList, idGroup:idGroup }, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Group removed');
				shoppingcfg.loadLists(idList);
			}
		}, 'json');
	});
	$('.newLists').on('click', '.liproduct .ps-delete', function() {
		const idList = $(this).parents('div:first').attr('data-idList');
		const idProduct = $(this).parents('div:first').attr('data-idProduct');
		$.post('shoppingcfg.deleteProductFromList.req', { idList:idList, idProduct:idProduct }, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Product removed');
				shoppingcfg.loadLists(idList);
			}
		}, 'json');
	});
	$('.newGroups').on('click', '.ps-delete', function() {
		var elem = $(this).parents('li[data-idProduct]:first');
		const toDelete = {
			idGroup: $(elem).attr('data-idGroup'),
			idProduct: $(elem).attr('data-idProduct')
		};
		$.post('shoppingcfg.deleteProductFromGroup.req', toDelete, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Product deleted');
				shoppingcfg.loadGroupEntries(toDelete.idGroup);
			}
		}, 'json');
	});
	$('.dropGroupToList').droppable({
		accept: '.dragGroup',
		activeClass: 'dropBorder',
		hoverClass: 'dropHoverBorder',
		drop: function(event, ui) {
			const idList = $(this).attr('data-idList');
			const idGroup = ui.draggable.attr('data-idGroup');
			$.post('shoppingcfg.addGroupToList.req', {
				idList: idList,
				idGroup: idGroup
			}, function(data) {
				if(data.erg == 'S_ERROR') {
					p.page.alertError('ERROR: ' + data.msg, 5000);
				}
				if(data.erg == 'S_OK') {
					p.page.message('Group added');
					shoppingcfg.loadLists(idList);
				}
			}, 'json');
		}
	});
	$('#shoppingcfg').on('click', '.addGroupToStdList', function() {
		var that = $(this);
		const idGroup = $(this).parents('li:first').attr('data-idGroup');
		$(this).addClass("dropHoverBorder");
		setTimeout(() => { $(that).removeClass("dropHoverBorder"); }, 500);
		$.post('shoppingcfg.addGroupToList.req', {
			idList: 1,
			idGroup: idGroup
		}, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Group added');
				shoppingcfg.loadLists(1);;
			}
		}, 'json');
	});
	$('.dropProductToList').droppable({
		accept: '.dragProduct',
		activeClass: 'dropBorder',
		hoverClass: 'dropHoverBorder',
		drop: function(event, ui) {
			const idList = $(this).attr('data-idList');
			const idProduct = ui.draggable.attr('data-idProduct');
			$.post('shoppingcfg.addProductToList.req', {
				idList: idList,
				idProduct: idProduct
			}, function(data) {
				if(data.erg == 'S_ERROR') {
					p.page.alertError('ERROR: ' + data.msg, 5000);
				}
				if(data.erg == 'S_OK') {
					p.page.message('Product added');
					shoppingcfg.loadLists(idList);
				}
			}, 'json');
		}
	});
	$('#shoppingcfg').on('click', '.addProductToStdList', function() {
		var that = $(this);
		const idProduct = $(this).parents('li:first').attr('data-idProduct');
		$(this).addClass("dropHoverBorder");
		setTimeout(() => { $(that).removeClass("dropHoverBorder"); }, 500);
		$.post('shoppingcfg.addProductToList.req', {
			idList: 1,
			idProduct: idProduct
		}, function(data) {
			if(data.erg == 'S_ERROR') {
				p.page.alertError('ERROR: ' + data.msg, 5000);
			}
			if(data.erg == 'S_OK') {
				p.page.message('Product added');
				shoppingcfg.loadLists(1);
			}
		}, 'json');
	});
	ws.connect();
	// p.getValues();
};
var shoppingcfg = {
	loadLists: function(id) {
		$.post('shoppingcfg.getHtmlLists.req', { idList:id }, function(data) {
			$('.newLists [data-listentries=' + id + ']').html(data);
			$('.dropGroupToList').droppable({
				accept: '.dragGroup',
				activeClass: 'dropBorder',
				hoverClass: 'dropHoverBorder',
				drop: function(event, ui) {
					const idList = $(this).attr('data-idList');
					const idGroup = ui.draggable.attr('data-idGroup');
					$.post('shoppingcfg.addGroupToList.req', {
						idList: idList,
						idGroup: idGroup
					}, function(data) {
						if(data.erg == 'S_ERROR') {
							p.page.alertError('ERROR: ' + data.msg, 5000);
						}
						if(data.erg == 'S_OK') {
							p.page.message('Product added');
							shoppingcfg.loadLists(id);
						}
					}, 'json');
				}
			});
			$('.dropProductToList').droppable({
				accept: '.dragProduct',
				activeClass: 'dropBorder',
				hoverClass: 'dropHoverBorder',
				drop: function(event, ui) {
					const idList = $(this).attr('data-idList');
					const idProduct = ui.draggable.attr('data-idProduct');
					$.post('shoppingcfg.addProductToList.req', {
						idList: idList,
						idProduct: idProduct
					}, function(data) {
						if(data.erg == 'S_ERROR') {
							p.page.alertError('ERROR: ' + data.msg, 5000);
						}
						if(data.erg == 'S_OK') {
							p.page.message('Product added');
							shoppingcfg.loadLists(id);
						}
					}, 'json');
				}
			});
		});
	},
	loadGroups: function(loadentries = false) {
		$.get('shoppingcfg.getHtmlGroups.req', function(data) {
			$('#shoppingcfg .newGroups').html(data);
			$('.dragGroup').draggable({
				hanlde: '.moveGroup',
				helper: 'clone',
				revert: true,
				start: function(event, ui) {
					$(ui.helper).addClass('dragging');
				}
			});
			if(loadentries) {
				$('.newGroups [data-idGroup]').each(function() {
					shoppingcfg.loadGroupEntries($(this).attr('data-idGroup'));
				});
			}
		});
	},
	loadGroupEntries: function(id = 0) {
		var group;
		if(id == 0) {
			group = {
				id: $(this).attr('data-idGroup')
			};
		} else {
			group = {
				id: id
			};
		}
		$.post('shoppingcfg.getHtmlGroupEntries.req', group, function(data) {
			$('ul[data-idGroupEntries=' + group.id + ']').html(data);
			$('.dropProduct').droppable({
				accept: '.dragProduct',
				activeClass: 'dropBorder',
				hoverClass: 'dropHoverBorder',
				drop: function(event, ui) {
					const idGroup = $(this).attr('data-idGroup');
					const idProduct = ui.draggable.attr('data-idProduct');
					$.post('shoppingcfg.addProductToGroup.req', {
						idGroup: idGroup,
						idProduct: idProduct
					}, function(data) {
						if(data.erg == 'S_ERROR') {
							p.page.alertError('ERROR: ' + data.msg, 5000);
						}
						if(data.erg == 'S_OK') {
							p.page.message('Product added');
							shoppingcfg.loadGroupEntries(idGroup);
						}
					}, 'json');
				}
			});
		});
	},
	loadProducts: function (search = "") {
		$.get('shoppingcfg.getHtmlProducts.req', function(data) {
			$('#shoppingcfg .newProducts').html(data);
			$('.dragProduct').draggable({
				hanlde: '.moveProduct',
				helper: 'clone',
				revert: true,
				start: function(event, ui) {
					$(ui.helper).addClass('dragging');
				}
			});
			if(search != "") {
				shoppingcfg.searchProduct(search);
				$('.newProducts').find('.searchProduct').val(search);
			}
		});
	},
	searchProduct: function(search) {
		search = search.toLowerCase();
		if(search == '') {
			$('.newProducts li.productHeader[data-idProduct]').removeClass('ps-hidden');
		} else {
			$('.newProducts li.productHeader[data-idProduct]').addClass('ps-hidden');
			$.each($('.newProducts li.productHeader[data-idProduct]'), function() {
				const id = $(this).attr('data-idProduct');
				const name = $(this).find('.name').val().toLowerCase();
				if(id > 0 && name.indexOf(search) >= 0) {
					$(this).removeClass('ps-hidden');
				}
			});
		}
	}
}
