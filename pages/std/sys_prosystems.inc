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
//# File-ID      : $Id:: sys_prosystems.inc 550 2023-12-25 03:02:54Z              $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\std, system\WebCom, system\wpInit;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_prosystems'");
$headline = $database->fetch();

$systemDP = array(
	'_' => 'Verbindung',
);
$points = array();
foreach(wpInit::$prosystems as $sps => $path) {
	foreach($systemDP as $systempoint => $systemname) {
		$points[$sps.$systempoint] = 'CommunicationStatus_' . $sps.$systempoint;
	}
	foreach($path as $folder => $name) {
		if($folder != 'name') {
			$points[$sps.'_'.$folder.'_Alarm']		= $sps.'_'.$folder.'_ML50_SM__BI_';
			$points[$sps.'_'.$folder.'_Down']		= $sps.'_'.$folder.'_ML51_SM__BI_';
			$points[$sps.'_'.$folder.'_Fault']		= $sps.'_'.$folder.'_ML52_SM__BI_';
			$points[$sps.'_'.$folder.'_Disabled']	= $sps.'_'.$folder.'_ML53_SM__BI_';
			$points[$sps.'_'.$folder.'_Stale']		= $sps.'_'.$folder.'_ML54_SM__BI_';
		}
	}
}

$database->query("SELECT
		CAST(SERVERPROPERTY('productversion') as varchar) AS [pv],
		CAST(SERVERPROPERTY('productlevel') as varchar) AS [pl],
		CAST(SERVERPROPERTY('edition') as varchar) AS [e]");
$erg = $database->fetch();

$WebCom = new WebCom();
$serverVersion = $WebCom->send('getVersion');
?>

<div id="prosystems">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
<?
foreach(wpInit::$prosystems as $sps => $path) {
?>
		<div class="ps-container ps-flex-element">
			<h2 class="ps-nowrap" title="<?=$sps?>"><?=std::arrays(wpInit::$prosystems[$sps], 'name')?></h2>
<?
		foreach($systemDP as $systempoint => $systemname) {
?>
			<div>
				<span class="besch"><?=$systemname?>:</span>
				<span class="ps-input pa-StoerungNeg" data-value="<?=$sps.$systempoint?>">undefined</span>
			</div>
<?
		}
		foreach($path as $folder => $name) {
			if($folder != 'name') {
?>
			<h3 class="ps-nowrap"><?=$name?></h3>
			<div>
				<span class="besch">Status Down:</span>
				<span class="ps-input pa-Stoerung" data-value="<?=$sps.'_'.$folder?>_Down">undefined</span>
			</div>
			<div class="height0">
				<div>
					<span class="besch">Status Stale:</span>
					<span class="ps-input pa-Stoerung" data-value="<?=$sps.'_'.$folder?>_Stale">undefined</span>
				</div>
				<div>
					<span class="besch">Status Fault:</span>
					<span class="ps-input pa-Stoerung" data-value="<?=$sps.'_'.$folder?>_Fault">undefined</span>
				</div>
				<div>
					<span class="besch">Status Disabled:</span>
					<span class="ps-input pa-Stoerung" data-value="<?=$sps.'_'.$folder?>_Disabled">undefined</span>
				</div>
				<div>
					<span class="besch">Status Alarm:</span>
					<span class="ps-input pa-Stoerung" data-value="<?=$sps.'_'.$folder?>_Alarm">undefined</span>
				</div>
			</div>
<?
			}
		}
?>
		</div>
<?
	}
?>
	</div>
	<hr />
	<p class="serverinfo"><?=apache_get_version()?> MSSQL/<?=$erg['e']?> <?=$erg['pl']?> <?=$erg['pv']?> WEBautomationCS/<?=$serverVersion?></p>
</div>
