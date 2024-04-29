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
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_wago.inc 550 2023-12-25 03:02:54Z                    $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\WebCom, system\wpInit;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_wago'");
$headline = $database->fetch();

$systemDP = array(
	'_Connected' => 'Verbindung',
	'_Status' => 'Status',
	'_ItemCount' => 'registrierte Items',
	'_ErrorCount' => 'fehlerhafte Items',
	'_IpAddress' => 'IP Adresse',
	'_ServerCycle' => 'SPS kontaktiert',
	'_PollingInterval' => 'eingestelltes Intervall',
	'_MaxInterval' => 'aktuelles Intervall');
$points = array();
foreach(wpInit::$wago as $sps) {
	foreach($systemDP as $systempoint => $systemname) {
		$points[$sps.$systempoint] = '_System_Data_Source_Modbus_' . $sps.$systempoint;
	}
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

<div id="wago" class="ps-center">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
<?
	foreach(wpInit::$wago as $sps) {
?>
		<div class="ps-container ps-flex-element">
			<h2 class="ps-nowrap">SPS Überwachung - <?=$sps?></h2>
<?
	$counter = 0;
	$hasdiv = false;
	foreach($systemDP as $systempoint => $systemname) {
		$css = '';
		$data = 'data-value';
		if($systempoint == '_SPS_IN_RUN' || $systempoint == '_Connected') {
			if((in_array($sps, wpInit::$wagoTurned) && $systempoint == '_SPS_IN_RUN')) {
				$css = ' pa-Stoerung';
			} else {
				$css = ' pa-StoerungNeg';
			}
		}
		if($systempoint == '_BrowsingReady') $data = 'data-eq1';
		if($systempoint == '_Status' || $systempoint == '_ErrorCount') $data = 'data-gt0';
		if($systempoint == '_Status') $css = ' hasStatusEnum';
		if($counter++ == 2) {
			echo '<div class="height0">';
			$hasdiv = true;
		}
?>
			<div>
				<span class="besch"><?=$systemname?>:</span>
				<span class="ps-input<?=$css?>" <?=$data?>="<?=$sps.$systempoint?>">undefined</span>
			</div>
<?
	}
	if($hasdiv) echo '</div>';
?>
		</div>
<?
	}
?>
	</div>
	<hr />
	<p class="serverinfo"><?=apache_get_version()?> MSSQL/<?=$erg['e']?> <?=$erg['pl']?> <?=$erg['pv']?> WEBautomationCS/<?=$serverVersion?></p>
</div>
