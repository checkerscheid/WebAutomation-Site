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
//# Revision     : $Rev:: 711                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shopping.js 711 2024-11-21 13:09:32Z                     $ #
//#                                                                                 #
//###################################################################################
?> shopping */
//<? require_once('script/system/websockets.js') ?>
ws.logEnabled = true;
p.page.load = function() {
	$('#shopping').on('click', '.product', function() {
		const product = $(this).find('span.ps-checkbox');
		const prod = {
			checked: !$(product).hasClass('checked'),
			id_list: $(product).attr('data-idlist'),
			id_group: $(product).attr('data-idgroup'),
			id_product: $(product).attr('data-idproduct')
		}
		console.log(prod);
	});
	ws.connect();
	// p.getValues();
};
