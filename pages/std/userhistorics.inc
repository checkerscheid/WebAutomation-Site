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
//# Revision     : $Rev:: 561                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: userhistorics.inc 561 2024-01-16 02:06:50Z               $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'userhistorics'");
$headline = $database->fetch();
?>
<div id="userhistorics">
	<h1><?=$headline['name']?></h1>
	<div id="Filter">
		<h2>Filter</h2>
		<span>von:</span><input type="text" class="ps-input dt-from" />
		<span>bis:</span><input type="text" class="ps-input dt-to" />
		<input type="button" class="ps-button dt-filter" value="Filtern" />
		<hr />
		<table>
			<tr>
				<td><span data-value="text">Filter nach Benutzername:</span></td>
				<td><span class="ps-button flt-un">setzen</span></td>
			</tr>
			<tr>
				<td><span data-text="text2">Filter nach Datenpunkt:</span></td>
				<td><span class="ps-button flt-dp">setzen</span></td>
			</tr>
			<tr>
				<td colspan="2" class="tac"><span class="ps-button flt-entf">Filter entfernen</span></td>
			</tr>
		</table>
		<hr />
	</div>
	<div id="erg">
	</div>
</div>
