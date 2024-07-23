<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 21.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pageadmin.req 550 2023-12-25 03:02:54Z                   $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 */
namespace pages\std;
//use system\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'restactive'");
$headline = $database->fetch();
?>
<div id="restactive">
	<h1><?=$headline['name']?></h1>
	<div class="center">
	</div>
</div>
