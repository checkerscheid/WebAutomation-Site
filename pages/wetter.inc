<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 12.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 678                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wetter.inc 678 2024-07-15 13:58:59Z                      $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
?>
<div id="wetter">
	<h1><? html::getPageHeadline();?></h1>
	<div class="center">
		<div id="WE_Nord" class="dragthis ps-container">
			<span class="ps-input" data-ws="_GA_RT">undefined</span>
		</div>
		<div id="WE_Ost" class="dragthis ps-container">
			<span class="ps-input" data-ws="GA_WE_Ost_Temp">undefined</span><br />
			<span class="ps-input" data-ws="GA_WE_Ost_Hum">undefined</span><br />
			<span class="ps-input" data-ws="GA_WE_Ost_Light">undefined</span><br />
			<span class="ps-input" data-ws="GA_WE_Ost_Rain">undefined</span>
		</div>
		<div id="WE_Sued" class="dragthis ps-container">
			<span class="ps-input" data-ws="GA_WE_Sued_Temp">undefined</span><br />
			<span class="ps-input" data-ws="GA_WE_Sued_Hum">undefined</span><br />
			<span class="ps-input" data-ws="GA_WE_Sued_Light">undefined</span>
		</div>
		<div id="WE_Gaube" class="dragthis ps-container">
			<span class="ps-input" data-ws="GA2_WE_Gaube_Temp">undefined</span><br />
			<span class="ps-input" data-ws="GA2_WE_Gaube_Hum">undefined</span><br />
			<span class="ps-input" data-ws="GA2_WE_Gaube_Rain">undefined</span>
		</div>
		<div id="WE_Gartenhaus" class="dragthis ps-container">
			<span class="ps-input" data-ws="GA1_FS_Temp">undefined</span><br />
			<span class="ps-input" data-ws="GA1_FS_Hum">undefined</span><br />
			<span class="ps-input" data-ws="GA1_FS_Vol">undefined</span>
		</div>
	</div>
</div>
