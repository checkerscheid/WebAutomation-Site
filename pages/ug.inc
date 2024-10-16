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
//# Revision     : $Rev:: 701                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ug.inc 701 2024-10-14 00:14:32Z                          $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
?>
<div id="ug">
	<h1><? html::getPageHeadline();?></h1>
	<div class="center">
		<div class="navigationImages">
			<!--img src="images/background/jpg/[dateiname].jpg" alt="" usemap="#image-map" /-->
			<map name="image-map">
<?
				//html::getAreaButton('[dateiname]', '123,456,789');
?>
			</map>
		</div>
		<? html::getUebersichtMenu();?>
	</div>
</div>
