<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 02.04.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 733                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: heizzentrale.inc 733 2025-04-16 03:01:56Z                $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
?>
<div id="heizzentrale" class="page">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-container">
		<div class="ps-flex-container">
			<span class="description">Radiatoren Rücklauf</span>
			<span class="ps-input" data-ws="KE_HZG_Temp1">- °C</span>
		</div>
		<div class="ps-flex-container">
			<span class="description">Radiatoren Vorlauf</span>
			<span class="ps-input" data-ws="KE_HZG_Temp2">- °C</span>
		</div>
		<div class="ps-flex-container">
			<span class="description">Fussboden Vorlauf</span>
			<span class="ps-input" data-ws="KE_HZG_Temp3">- °C</span>
		</div>
		<div class="ps-flex-container">
			<span class="description">Fussboden Rücklauf</span>
			<span class="ps-input" data-ws="KE_HZG_Temp4">- °C</span>
		</div>
		<div class="ps-flex-container">
			<span class="ps-button cleanTrends">clean Trends</span>
		</div>
	</div>
	<div class="ps-container">
		<h2>Temperaturen</h2>
		<div id="ergTrend"></div>
	</div>
	<div class="ps-container">
		<h2>Ventile</h2>
		<div id="ergTrendValve"></div>
	</div>
</div>
