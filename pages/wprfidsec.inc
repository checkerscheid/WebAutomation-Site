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
//# Revision     : $Rev:: 696                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pageadmin.req 696 2024-10-06 19:11:29Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages;
use system\std;
use system\WebCom;
$cardID = std::gets('RFID');
$WebCom = new WebCom();
$WebCom->send('checkNewRFID', $cardID);

