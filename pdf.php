<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Meat Loaf                                                        #
//# Date         : 28.11.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 561                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pdf.php 561 2024-01-16 02:06:50Z                         $ #
//#                                                                                 #
//###################################################################################
use system\stdAjax as std;
use system\Helper\security;
include('system/const.psys');
include('system/system.psys');

$system = new std();
$system->checkRequest(std::gets('src'), std::gets('path'));

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

echo ob_get_clean();
