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
//# Revision     : $Rev:: 723                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ug.inc 723 2025-02-27 14:24:23Z                          $ #
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
		</div>
	</div>
</div>
