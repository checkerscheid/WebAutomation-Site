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
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wohnzimmer.inc 550 2023-12-25 03:02:54Z                  $ #
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
</div>
