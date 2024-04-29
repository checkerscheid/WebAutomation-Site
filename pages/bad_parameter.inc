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
//# File-ID      : $Id:: bad_parameter.inc 550 2023-12-25 03:02:54Z               $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
require_once 'pages/system/zimmer.psys';
use pages\system\zimmer_parameter;
$zimmer = new zimmer_parameter('BA', 'Bad');
$zimmer->setFussboden();
$zimmer->setHeizung();

$points = array();
$points += $zimmer->getDatapoints();
?>

<div id="bad_parameter" class="parampage">
	<?=$zimmer->print(); ?>
</div>
