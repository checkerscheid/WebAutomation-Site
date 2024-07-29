<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 27.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pageadmin.req 550 2023-12-25 03:02:54Z                   $ #
//#                                                                                 #
//###################################################################################
?>
<div id="page">
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
