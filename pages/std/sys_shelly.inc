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
//# Revision     : $Rev:: 682                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_shelly.inc 682 2024-07-21 14:28:53Z                  $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\WebCom, system\wpInit;
use system\Helper\shelly;
use system\Helper\wpa;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_shelly'");
$headline = $database->fetch();

//new RegisterSignals($points);
$database->query("SELECT
		CAST(SERVERPROPERTY('productversion') as varchar) AS [pv],
		CAST(SERVERPROPERTY('productlevel') as varchar) AS [pl],
		CAST(SERVERPROPERTY('edition') as varchar) AS [e]");
$erg = $database->fetch();

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

<div id="shelly">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
		<div class="ps-container ps-flex-element">
			<h1>Shelly</h1>
			<table>
				<tbody>
					<tr>
						<td>K-Bus Fehler:</td>
						<td><span data-value="KBUS_Error" id="KBUS_Error" class="ps-input pa-Stoerung">undefined</span></td>
					</tr>
					<tr>
						<td>angeschlossene Klemmen:</td>
						<td><span data-value="KBUS_Klemmen" id="KBUS_Klemmen" class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Klemmenfehler an Klemme Nummer:</td>
						<td><span data-value="KBUS_Klemmenfehler" id="KBUS_Klemmenfehler" class="ps-input pa-Stoerung">undefined</span></td>
					</tr>
					<tr>
						<td>SPS Programm gestartet:</td>
						<td><span data-value="SPS_Start" id="SPS_Start" class="ps-input pa-StoerungNeg">undefined</span></td>
					</tr>
					<tr>
						<td>aktueller Watchdog Wert:</td>
						<td><span data-value="Watchdog" id="Watchdog" class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Watchdog schreiben jede X Minute:</td>
						<td><span data-value="WatchdogMinutes" data-popup="Watchdog schreiben jede X Minute" id="WatchdogMinutes" class="ps-input ps-param">undefined</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<hr />
	<p class="serverinfo">
		<?=apache_get_version()?><br />
		MSSQL/<?=$erg['e']?> <?=$erg['pl']?> <?=$erg['pv']?><br />
		WEBautomationCS/<?=$serverVersion?><br />
		Connected Database:<?=wpInit::$db['database']?></p>
</div>
