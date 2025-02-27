<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 09.12.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 728                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_shelly.inc 728 2025-02-27 22:40:10Z                  $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 */
namespace pages\std;
use system\WebCom, system\wpInit;
use system\Helper\shelly;
use system\Helper\wpa;

require_once 'system/Helper/shelly.psys';
require_once 'system/Helper/wpa.psys';

$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_shelly'");
$headline = $database->fetch();

//new RegisterSignals($points);
$database->query("SELECT
		CAST(SERVERPROPERTY('productversion') as varchar) AS [pv],
		CAST(SERVERPROPERTY('productlevel') as varchar) AS [pl],
		CAST(SERVERPROPERTY('edition') as varchar) AS [e]");
$sys = $database->fetch();

$WebCom = new WebCom();
$serverVersion = $WebCom->send('getVersion');

$gen2 = array();
$database->query("SELECT [name], [type], [mqtt_id] FROM [shelly] ORDER BY [name]");
while($erg = $database->fetch()) {
	if(shelly::isGen2($erg['type'])) {
		$gen2[$erg['name']] = '
			<tr>
				<td colspan="2">' . $erg['name'] . ':</td>
				<td colspan="2"><span data-ws="' . $erg['mqtt_id'] . '_Rssi" class="' . wpa::rssi . '">-</span></td>
				<td colspan="2">
				<span data-ws="' . $erg['mqtt_id'] . '_Online" class="ps-input ' . wpa::GreenRed . '">-</span>
				</td>
			</tr>';
	}
	if(shelly::hasBat($erg['type'])) {
	}
}
?>

<div id="shelly" class="page">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
		<div class="ps-container ps-flex-element">
			<table>
				<thead>
					<tr>
						<th>Shelly</th>
						<th>IP</th>
						<th>MAC</th>
						<th>RSSI</th>
						<th>Type</th>
						<th>Secured</th>
						<th>MQTT Active</th>
						<th>MQTT ID</th>
						<th>MQTT Prefix</th>
					</tr>
				</thead>
				<tbody>
<?
	$database->query("SELECT [name], [ip], [mac], ISNULL([un], 'No') AS [un], [pw], [type], [mqtt_active], [mqtt_id], [mqtt_prefix] FROM [shelly] WHERE [mqtt_id] IS NOT NULL ORDER BY [name]");
	while($erg = $database->fetch()) {
?>
					<tr>
						<td><?= $erg['name']?></td>
						<td><a href="http://<?= ($erg['un'] != 'No' ? $erg['un'] . ':' . $erg['pw'] . '@' : '').$erg['ip']?>" target="_blank"><?= $erg['ip']?></a></td>
						<td><?= $erg['mac']?></td>
						<td>
<?
		if($erg['mqtt_active'] == 1) {
?>
							<span data-ws="<?= $erg['mqtt_id']?>_Rssi" class="<?= wpa::rssi?>">-</span>
<?
		}
?>
						</td>
						<td><?=$erg['type']?></td>
						<td><?=($erg['un'] == 'No' ? '<span class="ps-fontyellow">No</span>' : '<span class="ps-fontgreen">Yes</span>')?></td>
						<td><?=($erg['mqtt_active'] == 1 ? '<span class="ps-fontgreen">Yes</span>' : '<span class="ps-fontyellow">No</span>')?></td>
						<td><?=($erg['mqtt_active'] == 1 ? $erg['mqtt_id'] : '<span title="' . $erg['mqtt_id'] . '">--</span>')?></td>
						<td><?=($erg['mqtt_active'] == 1 ? $erg['mqtt_prefix'] : '<span title="' . $erg['mqtt_prefix'] . '">--</span>')?></td>
					</tr>
<?
	}
?>
				</tbody>
			</table>
		</div>
	</div>
	<hr />
	<p class="serverinfo">
		<?=apache_get_version()?><br />
		MSSQL/<?=$sys['e']?> <?=$sys['pl']?> <?=$sys['pv']?><br />
		WEBautomationCS/<?=$serverVersion?><br />
		Connected Database:<?=wpInit::$db['database']?></p>
</div>
