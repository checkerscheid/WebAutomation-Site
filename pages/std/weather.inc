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
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: weather.inc 552 2024-01-06 13:56:24Z                     $ #
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
		<div class="forecast ps-container ps-loading">
			<div class="ps-loading"></div>
		</div>
	</div>
</div>
