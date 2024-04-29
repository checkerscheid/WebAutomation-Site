<?
header('Content-Type: text/html; charset=utf-8');
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
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: popup.php 550 2023-12-25 03:02:54Z                       $ #
//#                                                                                 #
//###################################################################################
use system\stdAjax;
$st = microtime(true);
require_once 'system/Helper/security.psys';
require_once 'system/Helper/wpDatabase.psys';
require_once 'system/Helper/wpConvert.psys';
require_once 'system/Helper/wpItem.psys';
require_once 'system/wpInit.psys';
require_once 'system/system.psys';

$system = new stdAjax();
$system->checkPopup(stdAjax::gets('src'), stdAjax::gets('path'));

if(file_exists('popup/'.$system->getFullSrc().'.req')) {
	include('popup/'.$system->getFullSrc().'.req');
} else {
	header("HTTP/1.0 404 Not Found");
	echo 'Error File not found';
}

echo \system\html::cleanOutput(ob_get_clean());
echo '<!-- '.(microtime(true) - $st).' -->';
