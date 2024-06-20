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
//# Revision     : $Rev:: 621                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: weather.inc 621 2024-06-15 00:47:41Z                     $ #
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
		<div id="forecastlinestooltip" class="ps-container"></div>
		<div class="forecast ps-container ps-loading">
			<div class="ps-loading"></div>
		</div>
	</div>
</div>
