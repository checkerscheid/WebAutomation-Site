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
//# File-ID      : $Id:: alarmhistorics.inc 561 2024-01-16 02:06:50Z              $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'alarmhistorics'");
$headline = $database->fetch();
?>
<div id="alarmhistorics">
	<h1><?=$headline['name']?></h1>
	<div id="Filter">
		<h2>Filter</h2>
		<span>von:</span><input type="text" class="ps-input dt-from" />
		<span>bis:</span><input type="text" class="ps-input dt-to" />
		<input type="button" class="ps-button dt-filter" value="Filtern" />
		<hr />
		<div class="floatr">
			<table>
				<tr>
					<td><span>Filter nach quittiert von:</span></td>
					<td><span class="ps-button flt-quit">setzen</span></td>
				</tr>
				<tr>
					<td><span>Filter nach Alarmtyp:</span></td>
					<td><span class="ps-button flt-type">setzen</span></td>
				</tr>
				<tr>
					<td><span>Filter nach Alarmgruppe:</span></td>
					<td><span class="ps-button flt-group">setzen</span></td>
				</tr>
				<tr>
					<td><span>Filter nach Datenpunkt:</span></td>
					<td><span class="ps-button flt-dp">setzen</span></td>
				</tr>
			</table>
		</div>
		<div class="floatr">
			<table>
				<?
				$system = new std();

				if($system->useAlarmGroup5()){
					echo '<tr>';
					echo	'<td><span>Filter nach '.$system->nameAlarmGroup5().':</span></td>';
					echo	'<td><span class="ps-button flt-group5">setzen</span></td>';
					echo '</tr>';
				}
				if($system->useAlarmGroup4()){
					echo '<tr>';
					echo	'<td><span>Filter nach '.$system->nameAlarmGroup4().':</span></td>';
					echo	'<td><span class="ps-button flt-group4">setzen</span></td>';
					echo '</tr>';
				}
				if($system->useAlarmGroup3()){
					echo '<tr>';
					echo	'<td><span>Filter nach '.$system->nameAlarmGroup3().':</span></td>';
					echo	'<td><span class="ps-button flt-group3">setzen</span></td>';
					echo '</tr>';
				}
				if($system->useAlarmGroup2()){
					echo '<tr>';
					echo	'<td><span>Filter nach '.$system->nameAlarmGroup2().':</span></td>';
					echo	'<td><span class="ps-button flt-group2">setzen</span></td>';
					echo '</tr>';
				}
				if($system->useAlarmGroup1()){
					echo '<tr>';
					echo	'<td><span>Filter nach '.$system->nameAlarmGroup1().':</span></td>';
					echo	'<td><span class="ps-button flt-group1">setzen</span></td>';
					echo '</tr>';
				}
				?>
			</table>
		</div>
		<div class="floatr">
			<table>
				<tr>
					<td><span class="ps-button show-dp">zeige Datenpunkte</span></td>
				</tr>
				<tr>
					<td><span class="ps-button flt-entf">Filter entfernen</span></td>
				</tr>
			</table>
		</div>
		<hr />
	</div>
	<div id="erg">
	</div>
</div>
