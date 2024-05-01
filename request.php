<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 603                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: request.php 603 2024-05-01 06:01:25Z                     $ #
//#                                                                                 #
//###################################################################################
use system\Helper\security;
use system\stdAjax;
use system\html;
use system\wpInit;
require_once 'system/Helper/security.psys';
require_once 'system/Helper/wpDatabase.psys';
require_once 'system/Helper/wpConvert.psys';
require_once 'system/Helper/wpItem.psys';
require_once 'system/wpInit.psys';
require_once 'system/system.psys';

$system = new stdAjax();
$system->checkRequest(stdAjax::gets('src'), stdAjax::gets('path'));

if(security::checkAjaxLevel()) {
	if(file_exists('request/'.$system->getFullSrc().'.req')) {
		include('request/'.$system->getFullSrc().'.req');
	} else {
		header("HTTP/1.0 404 Not Found");
		echo 'Error File not found';
	}
} else {
	header("HTTP/1.0 403 Forbidden");
	echo 'Error Not allowed';
}
if(stdAjax::gets('src') == 'getsession' || stdAjax::gets('src') == 'kamera' || wpInit::$OneLine == false) echo ob_get_clean();
else echo html::cleanOutput(ob_get_clean());
