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
//# File-ID      : $Id:: schlafzimmer.inc 696 2024-10-06 19:11:29Z                $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer;

$schlafzimmer = new zimmer('SZ', 'Schlafzimmer');
$schlafzimmer->setFussboden();
$schlafzimmer->addFenster();
$schlafzimmer->addShelly();

$schlafzimmer->setTrendIds(array(1013,1014,1015));
$schlafzimmer->setScheduleId(5);

$points = array();
$points += $schlafzimmer->getDatapoints();
?>

<div id="schlafzimmer" class="page">
<?=$schlafzimmer->print(); ?>
	<div id="D1MiniSites" class="ps-container">
		<ul>
			<li><a class="ps-button" href="std.d1mini.SZ_RU.htm">Raumüberwachung</a></li>
		</ul>
	</div>
</div>
