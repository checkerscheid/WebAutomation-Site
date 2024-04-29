<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 561                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: opcbrowse.inc 561 2024-01-16 02:06:50Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'opcbrowse'");
$headline = $database->fetch();
?>
<h1><?=$headline['name']?></h1>
<ul id="submenu">
	<li><span class="opcserverbutton ps-button">OPC Server anzeigen</span></li>
	<li><span class="remoteopcbutton ps-checkbox">Remote aktivieren</span></li>
	<li><input type="text" class="remoteserverinput ps-input" value="localhost" /></li>
</ul>
<hr />
<div id="opcbrowse">
	<div id="erg">
	</div>
</div>
