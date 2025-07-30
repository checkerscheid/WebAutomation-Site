<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 07.07.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 748                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia_parameter.inc 748 2025-07-07 14:20:45Z               $ #
//#                                                                                 #
//###################################################################################
namespace pages;

use system\Helper\wpCwWw;
use system\html;

require_once 'system/Helper/wpCwWw.psys';

$cwww = new wpCwWw('172.17.80.164', 'KZ_KE');
$cwww->setText();
?>
<div id="pia_parameter">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container page">
		<div class="ps-container">
			<h2>Eventeleuchtung Kanalname</h2>
			<span>linker Kanal:</span><br />
			<input class="ps-input KZ_KE_L" type="text" value="<?=$cwww->getWwText()?>" /><br />
			<span>rechter Kanal:</span><br />
			<input class="ps-input KZ_KE_R" type="text" value="<?=$cwww->getCwText()?>" /><br />
			<span class="ps-button SetKZKE">speichern</span>
		</div>
	</div>
</div>
