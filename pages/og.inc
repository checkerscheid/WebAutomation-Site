<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 21.02.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 727                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: og.inc 727 2025-02-27 14:56:33Z                          $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
?>
<div id="og" class="page">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-menu-container">
		<? html::getUebersichtMenu();?>
		<div class="ps-flex-page">
		</div>
	</div>
</div>
