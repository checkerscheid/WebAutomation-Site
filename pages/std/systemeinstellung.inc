<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 01.11.2023                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 607                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: systemeinstellung.inc 607 2024-05-05 13:40:32Z           $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\Helper\shelly;
require_once 'system/Helper/shelly.psys';

$zimmer = array( 'WZ', 'SZ', 'BU', 'KU', 'BA', 'KZ' );

$points = array(
	'FK_BU'			=> '_BU_FK',
	'FK_WZ'			=> '_WZ_FK',
	'FK_WZ_T'		=> '_WZ_FK_TE',
	'FK_SZ'			=> '_SZ_FK',
	'FK_KU'			=> '_KU_FK',
	'FK_KZli'		=> '_KZ_FK_LI',
	'FK_KZre'		=> '_KZ_FK_RE',
	'FK_BA'			=> '_BA_FK',
);

foreach($zimmer as $kurz) {
	$points['RT_' . $kurz . '_ROH'] = '_' . $kurz . '_RT_Roh';
	$points['RT_' . $kurz . '_ADD'] = '_' . $kurz . '_RT_SENS_Add';
	$points['RT_' . $kurz] = '_' . $kurz . '_RT';
}

$wpDebug = array(
	'wpDebug',
	'wpDebugSQL',
	'wpDebugOPC',
	'wpDebugTransferID',
	'wpDebugWatchdog',
	'wpDebugFactor',
	'wpDebugTrend',
	'wpDebugCalendar',
	'wpDebugOpcRouter',
	'wpDebugWebSockets',
	'wpDebugShelly',
	'wpDebugD1Mini',
	'wpDebugMQTT'
);
?>
<div id="systemeinstellung" class="ps-flex-container">
	<div class="ps-container ps-flex-item">
		<h3>Temperaturkorrektur</h3>
		<table>
			<tr>
				<td>Wohnzimmer:</td>
				<td><span data-value="RT_WZ_ROH" class="ps-input">undefined</span></td>
				<td><span data-value="RT_WZ_ADD" data-popup="Wohnzimmer Temperaturoffset" class="ps-input ps-param">undefined</span></td>
				<td><span data-value="RT_WZ" class="ps-input">undefined</span></td>
			</tr>
			<tr>
				<td>Schlafzimmer:</td>
				<td><span data-value="RT_SZ_ROH" class="ps-input">undefined</span></td>
				<td><span data-value="RT_SZ_ADD" data-popup="Schlafzimmer Temperaturoffset" class="ps-input ps-param">undefined</span></td>
				<td><span data-value="RT_SZ" class="ps-input">undefined</span></td>
			</tr>
			<tr>
				<td>Büro:</td>
				<td><span data-value="RT_BU_ROH" class="ps-input">undefined</span></td>
				<td><span data-value="RT_BU_ADD" data-popup="Büro Temperaturoffset" class="ps-input ps-param">undefined</span></td>
				<td><span data-value="RT_BU" class="ps-input">undefined</span></td>
			</tr>
			<tr>
				<td>Küche:</td>
				<td><span data-value="RT_KU_ROH" class="ps-input">undefined</span></td>
				<td><span data-value="RT_KU_ADD" data-popup="Küche Temperaturoffset" class="ps-input ps-param">undefined</span></td>
				<td><span data-value="RT_KU" class="ps-input">undefined</span></td>
			</tr>
			<tr>
				<td>Bad:</td>
				<td><span data-value="RT_BA_ROH" class="ps-input">undefined</span></td>
				<td><span data-value="RT_BA_ADD" data-popup="Bad Temperaturoffset" class="ps-input ps-param">undefined</span></td>
				<td><span data-value="RT_BA" class="ps-input">undefined</span></td>
			</tr>
			<tr>
				<td>Kinderzimmer:</td>
				<td><span data-value="RT_KZ_ROH" class="ps-input">undefined</span></td>
				<td><span data-value="RT_KZ_ADD" data-popup="Kinderzimmer Temperaturoffset" class="ps-input ps-param">undefined</span></td>
				<td><span data-value="RT_KZ" class="ps-input">undefined</span></td>
			</tr>
		</table>
	</div>
	<div class="ps-container ps-flex-item">
		<h3>Fensterkontakt</h3>
		<table>
			<tr>
				<td>Haustür:</td>
				<td><span data-value="FK_BU" data-togglewrite="FK_BU" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
			<tr><td colspan="2"><hr /></td></tr>
			<tr>
				<td>Wohnzimmer:</td>
				<td><span data-value="FK_WZ" data-togglewrite="FK_WZ" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
			<tr>
				<td>Wohnzimmer Tür:</td>
				<td><span data-value="FK_WZ_T" data-togglewrite="FK_WZ_T" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
			<tr><td colspan="2"><hr /></td></tr>
			<tr>
				<td>Schlafzimmer:</td>
				<td><span data-value="FK_SZ" data-togglewrite="FK_SZ" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
			<tr><td colspan="2"><hr /></td></tr>
			<tr>
				<td>Küche:</td>
				<td><span data-value="FK_KU" data-togglewrite="FK_KU" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
			<tr><td colspan="2"><hr /></td></tr>
			<tr>
				<td>Kinderzimmer links:</td>
				<td><span data-value="FK_KZli" data-togglewrite="FK_KZli" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
			<tr>
				<td>Kinderzimmer rechts:</td>
				<td><span data-value="FK_KZre" data-togglewrite="FK_KZre" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
			<tr><td colspan="2"><hr /></td></tr>
			<tr>
				<td>Bad:</td>
				<td><span data-value="FK_BA" data-togglewrite="FK_BA" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
		</table>
	</div>
	<div class="ps-container ps-flex-item">
		<h3>Licht</h3>
		<table>
<?
$database->query("SELECT [s].[name], [dp].[name] AS [dp]
FROM [shelly] [s]
INNER JOIN [opcdatapoint] [dp] ON [s].[id_onoff] = [dp].[id_opcdatapoint]
WHERE " . shelly::relaySqlWhere('s') . " OR " . shelly::lightSqlWhere('s') . " ORDER BY [s].[name]");
while($erg = $database->fetch()) {
	$points[$erg['dp']] = $erg['dp'];
?>
			<tr>
				<td><?=$erg['name']?>:</td>
				<td><span data-value="<?=$erg['dp']?>" data-togglewrite="<?=$erg['dp']?>" class="ps-input pa-Meldung">undefined</span></td>
			</tr>
<?
}
?>
		</table>
	</div>
	<div class="ps-container ps-flex-item">
		<h3>Debug</h3>
		<table summary="">
			<tbody>
<?
foreach($wpDebug as $DebugArea) {
?>
				<tr>
					<td><?=$DebugArea ?></td>
					<td><span class="ps-button wpSetDebug" data-wpDebug="<?=$DebugArea ?>"><?=$DebugArea ?></span></td>
				</tr>
<?
}
?>
			</tbody>
		</table>
	</div>
</div>
