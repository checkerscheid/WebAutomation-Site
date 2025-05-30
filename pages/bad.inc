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
//# File-ID      : $Id:: bad.inc 696 2024-10-06 19:11:29Z                         $ #
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
	<div id="D1MiniSites" class="ps-container">
		<ul>
			<li><a class="ps-button" href="std.d1mini.BA_RU.htm">Raumüberwachung</a></li>
			<li><a class="ps-button" href="std.d1mini.BA_Lue.htm">Lüfter</a></li>
		</ul>
	</div>
</div>