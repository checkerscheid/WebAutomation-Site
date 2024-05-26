<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 03.04.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 614                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1minicfg.inc 614 2024-05-18 01:53:00Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'd1minicfg'");
$headline = $database->fetch();

?>
<div id="d1miniactive">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="groups">D1 Mini Gruppen</span></li>
		<li><span class="ps-button" data-target="searchd1mini">Neuen D1 Mini anlegen</span></li>
		<li><span class="ps-button" data-target="editelem">D1 Mini</span></li>
		<li><span class="ps-button" data-target="serversettings">D1 Mini Server</span></li>
	</ul>
	<hr />
	<div id="d1minicfg">
		<div id="erg">
		</div>
	</div>
</div>