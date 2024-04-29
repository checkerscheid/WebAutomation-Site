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
//# Revision     : $Rev:: 562                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mqttactive.inc 562 2024-01-16 02:08:14Z                  $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'mqttactive'");
$headline = $database->fetch();
?>
<div id="mqttactive">
	<h1><?=$headline['name']?></h1>
	<hr />
</div>