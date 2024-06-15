/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.06.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pageadmin.req 550 2023-12-25 03:02:54Z                   $ #
//#                                                                                 #
//###################################################################################
use system\std
?> d1mini */
//<? require_once('script/system/websockets.js') ?>
p.page.load = function() {
	$.get('std.d1mini.getD1MiniSettings.<?=std::gets("param1")?>.req');
	$('.page').on('click', '.writeTopic', function() {
		const topic = $(this).attr('data-topic');
		const value = $(this).attr('data-write');
		$.post('std.d1mini.writetopic.req', {topic:topic, value:value}, function(data) {
			
		});
	});
	ws.connect();
};
