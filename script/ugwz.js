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
//# Revision     : $Rev:: 711                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ug_wz.js 711 2024-11-21 13:09:32Z                        $ #
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
