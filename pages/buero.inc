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
//# File-ID      : $Id:: buero.inc 696 2024-10-06 19:11:29Z                       $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer;

$buero = new zimmer('BU', 'Büro');
$buero->setFussboden();

$buero->addFenster('FK', 'Eingangstür');
$buero->addFenster('KE_FK', 'Kellertür');

$buero->addShelly();
$buero->addShelly('LI_FL', 'Flurlicht');
$buero->addLicht('LI_KL', 'Klingellicht');

$buero->setTrendIds(array(1020,1021,1022));
$buero->setScheduleId(2);

$points = array();
$points += $buero->getDatapoints();
?>

<div id="buero" class="page">
	<?=$buero->print(); ?>
	<div id="D1MiniSites" class="ps-container">
		<ul>
			<li><a class="ps-button" href="std.d1mini.BU_RU.htm">Raumüberwachung</a></li>
			<li><a class="ps-button" href="std.d1mini.FL_RU.htm">Flur</a></li>
		</ul>
	</div>
</div>
