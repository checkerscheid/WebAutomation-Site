<?
header('Content-Type: text/css; charset=utf-8');
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
//# File-ID      : $Id:: css.php 603 2024-05-01 06:01:25Z                         $ #
//#                                                                                 #
//###################################################################################
$st = microtime(true);
use system\std;
use system\html;
use system\wpInit;
require_once 'system/Helper/security.psys';
require_once 'system/Helper/wpDatabase.psys';
require_once 'system/Helper/wpConvert.psys';
require_once 'system/wpInit.psys';
require_once 'system/system.psys';

$system = new std();
$system->checkScript(std::gets('src'), std::gets('path'));

include('style/system/system.css');
if(file_exists('style/project.css')) include('style/project.css');
if(file_exists('style/'.$system->getFullSrc().'.css')) include('style/'.$system->getFullSrc().'.css');

if(wpInit::$OneLine == false) echo ob_get_clean();
else echo html::cleanOutput(ob_get_clean());
echo '/* '.(microtime(true) - $st).' */'.PHP_EOL;
// echo '/* '.(session_encode()).' */';
