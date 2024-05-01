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
//# Revision     : $Rev:: 603                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_codesys.inc 603 2024-05-01 06:01:25Z                 $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\WebCom, system\wpInit;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_codesys'");
$headline = $database->fetch();

//new RegisterSignals($points);
$database->query("SELECT
		CAST(SERVERPROPERTY('productversion') as varchar) AS [pv],
		CAST(SERVERPROPERTY('productlevel') as varchar) AS [pl],
		CAST(SERVERPROPERTY('edition') as varchar) AS [e]");
$erg = $database->fetch();

$WebCom = new WebCom();
$serverVersion = $WebCom->send('getVersion');

$points = array(
	'KBUS_Error'			=> '_KBUS_Error',
	'KBUS_Klemmen'			=> '_KBUS_Klemmen',
	'KBUS_Klemmenfehler'	=> '_KBUS_Klemmenfehler',
	'SPS_Start'				=> '_SPS_Start',
	'Watchdog'				=> 'Watchdog',
	'WatchdogMinutes'		=> 'WatchdogMinutes',
);
//\phpinfo();
?>

<div id="codesys">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
		<div class="ps-container ps-flex-element">
			<h1>Wago UG</h1>
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
