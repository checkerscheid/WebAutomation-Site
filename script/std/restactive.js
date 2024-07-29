/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 21.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 688                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: restactive.js 688 2024-07-29 03:53:39Z                   $ #
//#                                                                                 #
//###################################################################################
use request\std;
?> restactive */

// p.log.level = p.log.type.info;

//<? require_once 'script/system/websockets.js' ?>

p.page.load = function() {
	ws.logEnabled = true;
	ws.connect();
};
