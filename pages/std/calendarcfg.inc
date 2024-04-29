<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 15.05.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 568                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendarcfg.inc 568 2024-01-24 07:36:18Z                 $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'calendarcfg'");
$headline = $database->fetch();
?>
<div id="calendarcfgcontainer">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="groups">Zeitprogrammgruppen</span></li>
		<li><span class="ps-button" data-target="newelem">Neues Zeitprogramm anlegen</span></li>
		<li><span class="ps-button" data-target="editelem">Zeitprogramme</span></li>
	</ul>
	<hr />
	<div id="calendarcfg">
		<div id="erg">
		</div>
	</div>
</div>
