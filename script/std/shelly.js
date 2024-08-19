/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 27.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 692                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia.js 692 2024-08-07 11:51:08Z                          $ #
//#                                                                                 #
//###################################################################################
use system\std
?> pia */
//<? require_once('script/system/websockets.js') ?>
//<? require_once('script/system/wpRGB.js') ?>
ws.logEnabled = true;
p.page.load = function() {
	wpRGB.Init('std.shelly');
	ws.connect();
};
