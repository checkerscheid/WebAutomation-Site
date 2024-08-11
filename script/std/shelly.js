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
//# Revision     : $Rev:: 694                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shelly.js 694 2024-08-11 22:33:43Z                       $ #
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
