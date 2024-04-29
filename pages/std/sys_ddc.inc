<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 28.06.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_ddc.inc 582 2024-04-10 06:45:45Z                     $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\std, system\WebCom, system\wpInit;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_ddc'");
$headline = $database->fetch();

$cbusNr = std::gets('param1') == '' ? '0' : std::gets('param1');
$cbus = std::arrays(wpInit::$ddc, $cbusNr);
$prefix = std::arrays($cbus, 'GaWa') == '' ? '' : std::arrays($cbus, 'GaWa').'_';

$points = array(
	'CommunicationError' => $prefix.'SystemItems_CommunicationError1',
	'CurrentPoint' => $prefix.'SystemItems_CurrentPoint',
	'FirmwareVersion' => $prefix.'SystemItems_FirmwareVersion1',
	'FirstCycle' => $prefix.'SystemItems_FirstCycle1',
	'FirstNonReadyPoint' => $prefix.'SystemItems_FirstNonReadyPoint1',
	'NumberOfNonReadyPoints' => $prefix.'SystemItems_NumberOfNonReadyPoints1',
	'MaxNumberOfPoints' => $prefix.'SystemItems_MaxNumberOfPoints1',
	'TcpErrorCode' => $prefix.'SystemItems_TcpErrorCode'
);

for($i = 1; $i <= 30; $i++) {
	$points['Controller'.$i] = $prefix.'SystemItems_CBusOccupationMap1_Controller'.$i;
}

//new RegisterSignals($points);
$database->query("SELECT
		CAST(SERVERPROPERTY('productversion') as varchar) AS [pv],
		CAST(SERVERPROPERTY('productlevel') as varchar) AS [pl],
		CAST(SERVERPROPERTY('edition') as varchar) AS [e]");
$erg = $database->fetch();

$WebCom = new WebCom();
$serverVersion = $WebCom->send('getVersion');
?>

<div id="ddc">
	<h1><?=$headline['name']?></h1>
	<div class="ps-center-container">
		<div class="ps-center-element">
			<h2 data-value="">IP Adresse</h2>
			<table summary="">
				<tr>
					<th>TCP/IP Netzwerkkommunikation</th>
					<td><span class="ps-input pa-Stoerung" data-value="CommunicationError">-</span></td>
				</tr>
				<tr>
					<th>TCP/IP Fehler Code</th>
					<td><span class="ps-input" data-gt0="TcpErrorCode">-</span></td>
				</tr>
				<tr>
					<th>Aktuell gelesener Wert</th>
					<td><span class="ps-input" data-value="CurrentPoint">-</span></td>
				</tr>
				<tr>
					<th>Erster Wert der nicht gelesen werden kann</th>
					<td><span class="ps-input" data-value="FirstNonReadyPoint">-</span></td>
				</tr>
				<tr>
					<th>Anzahl nicht lesbarer Punkte</th>
					<td><span class="ps-input" data-gt0="NumberOfNonReadyPoints">-</span></td>
				</tr>
				<tr>
					<th>Erster Lesezyklus (Initialisierung)</th>
					<td><span class="ps-input pa-Meldung" data-value="FirstCycle">-</span></td>
				</tr>
				<tr>
					<th>Firmware-Version</th>
					<td><span class="ps-input" data-value="FirmwareVersion">-</span></td>
				</tr>
				<tr>
					<th>Maximale Anzahl Datenpunkte</th>
					<td><span class="ps-input" data-value="MaxNumberOfPoints">-</span></td>
				</tr>
			</table>
			<h2>Aktive Controller</h2>
			<table summary="">
				<tr class="td-center">
					<td></td>
					<? for($i = 1; $i <= 30; $i++) { ?>
					<td><span><?=$i?></span></td>
					<? } ?>
				</tr>
				<tr>
					<td>am Bus</td>
					<? for($i = 1; $i <= 30; $i++) { ?>
					<td><span class="LED_aus" data-led="Controller<?=$i?>"><?=wpHTML_EMPTY?></span></td>
					<? } ?>
				</tr>
			</table>
		</div>
	</div>
	<hr />
	<p class="serverinfo"><?=apache_get_version()?> MSSQL/<?=$erg['e']?> <?=$erg['pl']?> <?=$erg['pv']?> WEBautomationCS/<?=$serverVersion?></p>
</div>
