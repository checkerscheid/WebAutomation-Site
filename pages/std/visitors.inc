<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 28.03.2017                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 636                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: visitors.inc 636 2024-07-04 14:28:56Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\Helper\security;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'visitors'");
$headline = $database->fetch();
?>
<div id="visitors">
	<h1><?=$headline['name']?></h1>
	<div id="Filter">
		<h2>Filter</h2>
		<span>von:</span><input type="text" class="ps-input dt-from" />
		<span>bis:</span><input type="text" class="ps-input dt-to" />
		<input type="button" class="ps-button dt-filter" value="Filtern" />
		<hr />
<? if(security::checkGroup(security::entwickler)) { ?>
		<h2>DSGVO</h2>
		<span>
			Alle Daten löschen, die älter als
			<select class="ps-input form-dsgvo">
				<option value="30">30 Tage</option>
				<option value="60">60 Tage</option>
				<option value="120">120 Tage</option>
				<option value="365" selected="selected">365 Tage</option>
			</select>
			sind.
		</span>
		<span class="ps-button form-dsgvo-go">go</span>
<? } ?>
	</div>
	<div id="erg">
	</div>
</div>
