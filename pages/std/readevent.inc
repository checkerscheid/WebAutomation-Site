<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 03.07.2017                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: readevent.inc 550 2023-12-25 03:02:54Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'readevent'");
$headline = $database->fetch();
?>

<div id="readevent">
	<h1><?=$headline['name']?></h1>
	<div class="erg"></div>
	<span class="ps-button reload">Reload Server Settings</span>
</div>
