<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: emailhistorics.inc 550 2023-12-25 03:02:54Z              $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'emailhistorics'");
$headline = $database->fetch();
?>
<div id="emailhistorics">
	<h1><?=$headline['name']?></h1>
	<div id="Filter">
		<h2>Filter</h2>
		<span>von:</span><input type="text" class="ps-input dt-from" />
		<span>bis:</span><input type="text" class="ps-input dt-to" />
		<input type="button" class="ps-button dt-filter" value="Filtern" />
		<hr />
	</div>
	<div id="erg">
	</div>
</div>
