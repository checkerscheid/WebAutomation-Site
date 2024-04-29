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
//# File-ID      : $Id:: kinderzimmer.inc 550 2023-12-25 03:02:54Z                $ #
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
</div>
