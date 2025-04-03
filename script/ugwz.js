/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.11.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 732                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ugwz.js 732 2025-04-03 16:39:02Z                         $ #
//#                                                                                 #
//###################################################################################
?> ugwz */
//<? require_once('script/system/websockets.js') ?>
//<? require_once('script/system/wpNeoPixel.js') ?>
//<? require_once('script/system/wpCwWw.js') ?>
ws.logEnabled = true;
p.page.load = function() {
	wpNeoPixel.Init('ugwz');
	wpCwWw.Init('ugwz');
	// p.getValues();
	ws.connect();
};
