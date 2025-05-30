<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christopher Korn                                                 #
//# Date         : 06.06.2015                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 744                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: router.inc 744 2025-05-30 11:17:23Z                      $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'router'");
$headline = $database->fetch();
?>
<div id="routercontainer">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="newelem">Neue Route</span></li>
		<li><span class="ps-button" data-target="routeto">Routenzuordnung</span></li>
	</ul>
	<hr />
	<div id="router">
		<div id="erg">
		</div>
	</div>
</div>
