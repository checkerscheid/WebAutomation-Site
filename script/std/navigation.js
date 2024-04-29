/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.12.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 544                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: navigation.js 544 2023-12-22 01:39:09Z                   $ #
//#                                                                                 #
//###################################################################################
?> navigation */

p.page.load = function() {
	calcBrowseHide();
	$(window).resize(function() {
		calcBrowseHide();
	});
	$('.sortable').sortable({
		connectWith: '.connectedSortable',
		stop: function(event, ui) {
			var droppedid = $(ui.item).find('span.id_webpage').attr('data-id');
			var parentid = $(ui.item).parent('ul').attr('data-parentid');
			var position = 1;
			var pos = {};
			$(ui.item).parent('ul').find('li').each(function() {
				pos[$(this).find('span.id_webpage').attr('data-id')] = position++;
			});
			$.post('std.navigation.saveitem.req', { id:droppedid, parentid:parentid, pos:pos }, function(erg) {
				if(erg != '') p.page.alert(erg, 5000);
				setUlEmptyClasses();
			});
		}
	}).disableSelection();
	$('#navigation').on('click', '.clapthisin', function() {
		var li = $(this).parent('li:first');
		var ul = $(li).find('ul:first');
		if($(ul).hasClass('mini')) {
			$(this).text('-');
			$(ul).removeClass('mini');
			$(li).find('.id_webpage:first').removeClass('thisisclapped');
		} else {
			$(this).text('+');
			$(ul).addClass('mini');
			$(li).find('.id_webpage:first').addClass('thisisclapped');
		}
	});
	$('#navigation').on('click', '.deletethis', function() {
		var li = $(this).parent('li:first');
		var id = $(this).attr('data-id');
		$('#dialog').html('<p>Es werden alle Items mit den Subitems entfernt.</p>').dialog({
			title: 'Menüeinträge entfernen', modal: true, width:p.popup.width.std,
			buttons:[{
				text: 'Ja, entfernen',
				click: function() {
					$.post('std.navigation.deleteitem.req', { id:id }, function(erg) {
						if(erg != '') p.page.alert(erg, 5000);
						$.get('std.navigation.availablesites.req', function(data) {
							$('#availableSites').html(data);
							$(li).remove();
							setUlEmptyClasses();
							$('#dialog').dialog('close');
						})
					});
				}
			}, {
				text: 'Abbrechen',
				click: function() {
					$('#dialog').dialog('close');
				}
			}]
		});
	});
	p.getValues();
};
function setUlEmptyClasses() {
	$('#sortedtMenuList ul:has(li)').removeClass('empty');
	$('#sortedtMenuList ul:not(:has(li))').addClass('empty')
}
function calcBrowseHide() {
	var siteheight = $('#header').height() + $('.pagemenu').height() + $('#footer').height() + 140;
	p.log.write($(window).height() - siteheight, p.log.type.warn);
	
	$('.scrollbar').css({overflow:'auto', height:($(window).height() - siteheight) + 'px'});
}
