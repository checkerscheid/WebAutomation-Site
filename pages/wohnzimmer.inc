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
//# File-ID      : $Id:: wohnzimmer.inc 696 2024-10-06 19:11:29Z                  $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer;

$wohnzimmer = new zimmer('WZ', 'Wohnzimmer');
$wohnzimmer->setFussboden();

$wohnzimmer->addFenster();
$wohnzimmer->addFenster('FK_TE', 'Gartentür');

$wohnzimmer->addShelly();
$wohnzimmer->addShelly('LI_LL', 'Lichtleiste');
$wohnzimmer->addShelly('LI_LS', 'Lautsprecherlicht');
$wohnzimmer->addLicht('LI_SL', 'Stehlampe');
$wohnzimmer->addShelly('LI_GA', 'Gartenlicht');

$wohnzimmer->setTrendIds(array(1010,1011,1012));
$wohnzimmer->setScheduleId(6);

$points = array();
$points += $wohnzimmer->getDatapoints();

$points['LI_GA'] = '_GA_TA_LI';
$points['LI_GA_BM'] = '_GA_BM_LI';
$points['LI_GA_SM'] = '_GA_SM_LI';
$points['LI_GA_DO'] = '_DO_GA_LI';
?>

<div id="wohnzimmer" class="page">
	<?=$wohnzimmer->print(); ?>
	<div id="D1MiniSites" class="ps-container">
		<ul>
			<li><a class="ps-button" href="std.d1mini.WZ_NP.htm">Lichtleiste</a></li>
			<li><a class="ps-button" href="std.d1mini.WZ_LS_NP.htm">Lautsprecher</a></li>
			<li><a class="ps-button" href="std.d1mini.WZ_PF_TE.htm">Pflanze zur Terrasse</a></li>
			<li><a class="ps-button" href="std.d1mini.WZ_PF_FE_LI.htm">Pflanze am Fesnter links</a></li>
			<li><a class="ps-button" href="std.d1mini.WZ_PF_FE.htm">Pflanze am Fenster</a></li>
			<li><a class="ps-button" href="std.d1mini.WZ_PF_FE_RE1.htm">Pflanze am Fenster 1. rechts</a></li>
			<li><a class="ps-button" href="std.d1mini.WZ_PF_FE_RE2.htm">Pflanze am Fenster 2. rechts</a></li>
			<li><a class="ps-button" href="std.d1mini.WZ_PF_TI.htm">Pflanze auf dem Tisch</a></li>
			<li><a class="ps-button" href="std.d1mini.Melonie.htm">Melonie</a></li>
		</ul>
	</div>
</div>
