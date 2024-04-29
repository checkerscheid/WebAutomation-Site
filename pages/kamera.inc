<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.03.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 575                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: kamera.inc 575 2024-03-22 16:39:56Z                      $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
?>

<div id="kamera">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container page">
		<div class="ps-container">
			<div class="imageContainer">
				<img class="imgReload" alt="" data-kamera="KameraEingang" src="" />
			</div>
		</div>
		<div class="ps-container">
			<div class="imageContainer">
				<img class="imgReload" alt="" data-kamera="KameraGarten" src="" />
			</div>
		</div>
	</div>
</div>
