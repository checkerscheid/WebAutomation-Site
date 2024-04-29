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
//# File-ID      : $Id:: bad.inc 550 2023-12-25 03:02:54Z                         $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer;

$bad = new zimmer('BA', 'Bad');
$bad->setFussboden();
$bad->setHeizung();

$bad->addFenster();

$bad->addShelly();
$bad->addLicht('LI_SP', 'Spiegellicht');

$bad->setTrendIds(array(1023,1024,1025,1032));
$bad->setScheduleId(1);

$points = array();
$points += $bad->getDatapoints();
?>

<div id="bad" class="page">
	<?=$bad->print(); ?>
</div>