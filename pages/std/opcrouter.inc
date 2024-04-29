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
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: opcrouter.inc 550 2023-12-25 03:02:54Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'opcrouter'");
$headline = $database->fetch();
?>
<div id="opcroutercontainer">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="routefrom">Neue Route</span></li>
		<li><span class="ps-button" data-target="routeto">Routenzuordnung</span></li>
	</ul>
	<hr />
	<div id="opcroute">
		<div id="erg"></div>
	</div>
</div>
