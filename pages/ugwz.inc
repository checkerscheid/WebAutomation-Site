<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.11.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 711                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ug_wz.inc 711 2024-11-21 13:09:32Z                       $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
use system\Helper\wpNeoPixel;
use system\Helper\wpCwWw;

require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/wpNeoPixel.psys';
require_once 'system/Helper/wpCwWw.psys';
?>

<div id="pia">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container page">
<?
	$neoPixel = new wpNeoPixel('172.17.80.99', 'WZ_NP');
	$neoPixel->getStatus();
	$neoPixel->getColorPicker('Lichtleiste');
	$neoPixel->getColorScenen('Lichtleiste');
?>
<?
	$cwww = new wpCwWw('172.17.80.97', 'WZ_KE');
	$cwww->getStatus();
	$cwww->getColorPicker('Eventbeleuchtung', 'schwebende Geister', 'Spinnen');
?>
	</div>
</div>
