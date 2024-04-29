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
//# File-ID      : $Id:: alarmcfg.inc 561 2024-01-16 02:06:50Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'alarmcfg'");
$headline = $database->fetch();
?>
<div id="alarmcfgcontainer">
	<h1 id="h1"><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="groups">Alarmgruppen</span></li>
		<li><span class="ps-button" data-target="newalarms">Neue Alarme anlegen</span></li>
		<li><span class="ps-button" data-target="alarms">Alarme</span></li>
	</ul>
	<hr />
	<div id="alarmcfg">
		<div id="erg"></div>
	</div>
</div>
