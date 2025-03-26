<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 26.01.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 696                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: kinderzimmer.inc 696 2024-10-06 19:11:29Z                $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer;

$kinderzimmer = new zimmer('KZ', 'Kinderzimmer');
$kinderzimmer->setHeizung();

$kinderzimmer->addFenster('FK_LI', 'Fenster links');
$kinderzimmer->addFenster('FK_RE', 'Fenster rechts');

$kinderzimmer->addShelly();
$kinderzimmer->addLicht('LI_SL', 'Stehlampe');

$kinderzimmer->setTrendIds(array(1029,1030,1031));
$kinderzimmer->setScheduleId(3);

$points = array();
$points += $kinderzimmer->getDatapoints();
?>

<div id="kinderzimmer" class="page">
	<?=$kinderzimmer->print(); ?>
	<div id="D1MiniSites" class="ps-container">
		<ul>
			<li><a class="ps-button" href="std.d1mini.KZ_RU.htm">Raumüberwachung</a></li>
			<li><a class="ps-button" href="std.d1mini.KZ_NP.htm">Lichtleiste</a></li>
			<li><a class="ps-button" href="std.d1mini.KZ_PF_BE.htm">Bee(r)ti</a></li>
			<li><a class="ps-button" href="std.d1mini.KZ_PF_PF.htm">Pflanzi</a></li>
		</ul>
	</div>
</div>
