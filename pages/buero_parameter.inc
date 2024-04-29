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
//# File-ID      : $Id:: buero_parameter.inc 550 2023-12-25 03:02:54Z             $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer_parameter;
$zimmer = new zimmer_parameter('BU', 'Büro');
$zimmer->setFussboden();

$points = array();
$points += $zimmer->getDatapoints();
?>

<div id="buero_parameter" class="parampage">
	<?=$zimmer->print(); ?>
</div>
