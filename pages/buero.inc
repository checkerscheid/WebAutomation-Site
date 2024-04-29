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
//# File-ID      : $Id:: buero.inc 550 2023-12-25 03:02:54Z                       $ #
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
</div>
