<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 15.06.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 624                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mqttactive.inc 624 2024-06-16 09:21:59Z                  $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'mqttactive'");
$headline = $database->fetch();
?>
<div id="mqttactivecontainer">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="groups">MQTT gruppen</span></li>
		<li><span class="ps-button" data-target="newelem">Neuen Topic anlegen</span></li>
		<li><span class="ps-button" data-target="editelem">Topics</span></li>
	</ul>
	<hr />
	<div id="mqttactive">
		<div id="erg">
		</div>
	</div>
</div>
