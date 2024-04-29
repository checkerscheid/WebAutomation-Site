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
//# File-ID      : $Id:: kueche.inc 550 2023-12-25 03:02:54Z                      $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer;

$kueche = new zimmer('KU', 'Küche');
$kueche->setFussboden();
$kueche->setHeizung();

$kueche->addFenster();

$kueche->addShelly();
$kueche->addLicht('LI_LL', 'Lichtleiste');

$kueche->setTrendIds(array(1016,1017,1018,1019));
$kueche->setScheduleId(4);

$points = array();
$points += $kueche->getDatapoints();
?>

<div id="kueche" class="page">
	<?=$kueche->print(); ?>
</div>
