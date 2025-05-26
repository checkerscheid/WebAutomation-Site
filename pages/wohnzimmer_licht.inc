<?
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
//# File-ID      : $Id:: wohnzimmer_licht.inc 741 2025-05-25 18:12:07Z            $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
use system\Helper\wpa;
use system\Helper\wpNeoPixel;
use system\Helper\wpCwWw;

require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/wpNeoPixel.psys';
require_once 'system/Helper/wpCwWw.psys';
?>
<div id="wohnzimmerlicht">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container page">
<?
	$neoPixel = new wpNeoPixel('172.17.80.99', 'WZ_NP');
	$neoPixel->getStatus();
	$neoPixel->getColorPicker('Lichtleiste');
	$neoPixel->getColorScenen('Lichtleiste');

	$cwww = new wpCwWw('172.17.80.97', 'WZ_KE');
	$cwww->getStatus();
	$cwww->getColorPicker('Eventbeleuchtung', 'Kette', 'Bild');

	$lautsprecher = new wpNeoPixel('172.17.80.98', 'WZ_LS_NP');
	$lautsprecher->getStatus();
	$lautsprecher->getColorPicker('Lautsprecher');
	$lautsprecher->getColorScenen('Lautsprecher');

	
	$pflanze = new wpNeoPixel('172.17.80.106', 'WZ_PF_TE');
	$pflanze->getStatus();
	$pflanze->getColorPicker('Pflanze');
	$pflanze->getColorScenen('Pflanze');
?>
	</div>
</div>
