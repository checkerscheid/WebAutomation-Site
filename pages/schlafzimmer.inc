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
//# File-ID      : $Id:: schlafzimmer.inc 550 2023-12-25 03:02:54Z                $ #
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
</div>
