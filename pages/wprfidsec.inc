<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 29.10.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 707                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wprfidsec.inc 707 2024-11-04 15:10:04Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages;
use system\std;
use system\WebCom;
$cardID = std::gets('RFID');
$WebCom = new WebCom();
$WebCom->send('checkNewRFID', $cardID);

