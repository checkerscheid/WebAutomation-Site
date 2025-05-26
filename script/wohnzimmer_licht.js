/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 25.05.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 741                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wohnzimmer_licht.js 741 2025-05-25 18:12:07Z             $ #
//#                                                                                 #
//###################################################################################
use system\std
?> wohnzimmer_licht */
//<? require_once('script/system/websockets.js') ?>
//<? require_once('script/system/wpNeoPixel.js') ?>
//<? require_once('script/system/wpCwWw.js') ?>
//<? require_once('script/system/wpRGB.js') ?>
p.page.load = function() {
	wpNeoPixel.Init('wohnzimmer_licht');
	wpCwWw.Init('wohnzimmer_licht');
	wpRGB.Init('wohnzimmer_licht');
	ws.connect();
	p.getValues();
};
