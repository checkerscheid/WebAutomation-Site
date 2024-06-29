<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 10.01.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 631                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: weather.inc 631 2024-06-29 12:29:38Z                     $ #
//#                                                                                 #
//###################################################################################
namespace pages\std;
?>
<div id="wetter">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="weathercontainer">
		<div class="condition ps-container">
			<div class="ps-loading"></div>
		</div>
		<div class="forecastlines ps-container">
			<div id="forecastlinesplaceholder">
				<div class="ps-loading"></div>
			</div>
		</div>
		<div id="forecastlinestooltip" class="ps-hidden"></div>
		<div class="forecast ps-container ps-loading">
			<div class="ps-loading"></div>
		</div>
	</div>
</div>
