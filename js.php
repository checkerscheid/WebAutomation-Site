<?
header('Content-Type: text/javascript; charset=utf-8');
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
//# Revision     : $Rev:: 568                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: js.php 568 2024-01-24 07:36:18Z                          $ #
//#                                                                                 #
//###################################################################################
$st = microtime(true);
use system\std;
use system\html;
require_once 'system/Helper/security.psys';
require_once 'system/Helper/wpDatabase.psys';
require_once 'system/Helper/wpConvert.psys';
require_once 'system/wpInit.psys';
require_once 'system/system.psys';

echo '"use strict";'."\r\n";
echo '
var viewport = document.querySelector("meta[name=viewport]");
if (viewport) {
	var content = viewport.getAttribute("content");
	var parts = content.split(",");
	for (var i = 0; i < parts.length; ++i) {
		var part = parts[i].trim();
		var pair = part.split("=");
		if (pair[0] === "min-width") {
			var minWidth = parseInt(pair[1]);
			if (screen.width < minWidth) {
				document.head.removeChild(viewport);

				var newViewport = document.createElement("meta");
				newViewport.setAttribute("name", "viewport");
				newViewport.setAttribute("content", "width=" + minWidth);
				document.head.appendChild(newViewport);
				break;
			}
		}
	}
}';

$system = new std();
$system->checkScript(std::gets('src'), std::gets('path'));

$alarmRowAdd = 0;
if($system->useAlarmGroup5()) {
	$alarmRowAdd++;
	echo 'var AlarmRowGroup5 = '.(2 + $alarmRowAdd).';'."\r\n";
} else {
	echo 'var AlarmRowGroup5 = 0;'."\r\n";
}
if($system->useAlarmGroup4()) {
	$alarmRowAdd++;
	echo 'var AlarmRowGroup4 = '.(2 + $alarmRowAdd).';'."\r\n";
} else {
	echo 'var AlarmRowGroup4 = 0;'."\r\n";
}
if($system->useAlarmGroup3()) {
	$alarmRowAdd++;
	echo 'var AlarmRowGroup3 = '.(2 + $alarmRowAdd).';'."\r\n";
} else {
	echo 'var AlarmRowGroup3 = 0;'."\r\n";
}
if($system->useAlarmGroup2()) {
	$alarmRowAdd++;
	echo 'var AlarmRowGroup2 = '.(2 + $alarmRowAdd).';'."\r\n";
} else {
	echo 'var AlarmRowGroup2 = 0;'."\r\n";
}
if($system->useAlarmGroup1()) {
	$alarmRowAdd++;
	echo 'var AlarmRowGroup1 = '.(2 + $alarmRowAdd).';'."\r\n";
} else {
	echo 'var AlarmRowGroup1 = 0;'."\r\n";
}
echo 'var AlarmRowAdd = '.$alarmRowAdd.';'."\r\n";

include('script/system/init.js');
if(file_exists('script/project.js')) include('script/project.js');
if(file_exists('script/'.$system->getFullSrc().'.js')) include('script/'.$system->getFullSrc().'.js');
include('script/system/system.js');

echo html::cleanOutput(ob_get_clean(), true);
echo '/* '.(microtime(true) - $st).' */'.PHP_EOL;
// echo '/* '.(session_encode()).' */';
