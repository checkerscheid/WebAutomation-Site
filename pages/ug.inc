<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 31.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 750                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ug.inc 750 2025-09-21 14:18:43Z                          $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
?>
<div id="ug" class="page">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-menu-container">
		<? html::getUebersichtMenu();?>
		<div class="ps-flex-page">
			<div class="ps-container">
				<h2>Temperaturen</h2>
				<div id="ergTemp"></div>
			</div>
			<div class="ps-container">
				<h2>Feuchte</h2>
				<div id="ergHum"></div>
			</div>
		</div>
	</div>
</div>
