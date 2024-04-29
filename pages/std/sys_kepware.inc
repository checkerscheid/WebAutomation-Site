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
//# File-ID      : $Id:: sys_kepware.inc 550 2023-12-25 03:02:54Z                 $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\WebCom, system\wpInit;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_kepware'");
$headline = $database->fetch();

$systemDP = array(
	'System__Error'					=> 'Verbindung',
	'System__Enabled'				=> 'Aktiv',
	'System__DeviceId'				=> 'Ip Adresse',
	'System__ScanRateMs'			=> 'Lesezyklus',
	'System__SecondsInError'		=> 'in Störung',
	'Statistics__MsgTotal'			=> 'gesendete Anfragen',
	'Statistics__TotalResponses'	=> 'bekommene Antworten',
	'Statistics__SuccessfulReads'	=> 'erfolgreiche Leseanfragen',
	'Statistics__FailedReads'		=> 'fehlerhafte Leseanfragen',
	'Statistics__SuccessfulWrites'	=> 'erfogreiche Schreibbefehle',
	'Statistics__FailedWrites'		=> 'fehlerhafte Schreibbefehle',
	'Statistics__PercentReturn'		=> 'beantwortete Anfragen',
	'Statistics__PercentValid'		=> 'gültige Antworten');
$points = array();
foreach(wpInit::$kepware as $sps => $spsName) {
	foreach($systemDP as $systempoint => $systemname) {
		$points[$sps.'__'.$systempoint] = $sps.'__'.$systempoint;
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

<div id="kepware">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
<?
	foreach(wpInit::$kepware as $sps => $spsName) {
?>
		<div class="ps-container ps-flex-element">
			<h2 class="ps-nowrap" title="<?=$sps?>"><?=$spsName?></h2>
<?
	$counter = 0;
	$hasdiv = false;
	foreach($systemDP as $systempoint => $systemname) {
		$css = '';
		$data = 'data-value';
		if($systempoint == 'System__Error' || $systempoint == 'System__Enabled') {
			if($systempoint == 'System__Enabled') {
				$css = ' pa-StoerungNeg';
			} else {
				$css = ' pa-Stoerung';
			}
		}
		if($systempoint == 'System__SecondsInError' || $systempoint == 'Statistics__FailedReads' || $systempoint == 'Statistics__FailedWrites') $data = 'data-gt0';
		if($systempoint == 'Statistics__PercentReturn' || $systempoint == 'Statistics__PercentValid') $data = 'data-lt100';
		if($counter++ > 2 && !$hasdiv) {
			echo '<div class="height0">';
			$hasdiv = true;
		}
?>
			<div>
				<span class="besch"><?=$systemname?>:</span>
				<span class="ps-input<?=$css?>" <?=$data?>="<?=$sps.'__'.$systempoint?>">undefined</span>
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
