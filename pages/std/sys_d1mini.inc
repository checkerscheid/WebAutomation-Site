<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 27.02.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 729                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_d1mini.inc 729 2025-02-27 22:40:52Z                  $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 */
namespace pages\std;
use system\WebCom, system\wpInit;
use system\Helper\wpa;

require_once 'system/Helper/wpa.psys';

$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'sys_d1mini'");
$headline = $database->fetch();

$database->query("SELECT
		CAST(SERVERPROPERTY('productversion') as varchar) AS [pv],
		CAST(SERVERPROPERTY('productlevel') as varchar) AS [pl],
		CAST(SERVERPROPERTY('edition') as varchar) AS [e]");
$sys = $database->fetch();

$WebCom = new WebCom();
$serverVersion = $WebCom->send('getVersion');

?>
<div id="d1mini" class="page">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
<?
	$database->query("SELECT [name], [description], [ip], [mac], [active] FROM [d1mini] ORDER BY [name]");
	while($erg = $database->fetch()) {
?>
		<div id="<?= $erg['name']?>" class="ps-container ps-flex-element">
			<h1><?=$erg['description']?></h1>
<?
		if($erg['active'] == 1) {
?>
			<h2 class="d1mOffline ps-fontred">-- Offline --</h2>
<?
		} else {
?>
			<h2 class="ps-fontyellow">-- Deactivated --</h2>
<?
		}
?>
			<table summary="">
				<tbody>
					<tr class="ps-hidden">
						<th class="ps-taleft">
							<?= $erg['name']?>
						</th>
						<th class="ps-taleft">
							<span class="d1mVersion"></span>
						</th>
						<th class="ps-taleft">
							<p class="storedIp" data-ip="<?=$erg['ip'] ?>">(<?=$erg['ip'] ?>, <?=$erg['mac'] ?>)</p>
						</th>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><a href="std.d1mini.<?= $erg['name']?>.htm"><?= $erg['description']?></a>:</td>
						<td><span data-ws="<?= $erg['name']?>_Rssi" class="<?= wpa::rssi?>">-</span></td>
						<td>
<?
				if($erg['active'] == 1) {
?>
							<span data-ws="<?= $erg['name']?>_Online" class="ps-input <?= wpa::GreenRed?>">-</span>
<?
				} else {
?>
							<span class="ps-input">deactivated</span>
<?
				}
?>
						</td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>newName:</span></td>
						<td><input class="ps-input newName" type="text" value="<?=$erg['name'] ?>" /></td>
						<td><span class="ps-hidden ps-button SetName">speichern</span></td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>newDescrption:</span></td>
						<td><input class="ps-input newDescrption" type="text" value="<?=$erg['description'] ?>" /></td>
						<td><span class="ps-hidden ps-button SetDescrption">speichern</span></td>
					</tr>
					<tr>
						<td colspan="3"><hr /></td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>updateChanel:</span></td>
						<td>
							<select class="ps-input d1mUpdateChanel">
<?
$updateChanel = array (
	99 => 'clean',
	0 => 'firmware',
	1 => 'light',
	2 => 'io',
	3 => 'heating',
	4 => 'rfid'
);
foreach($updateChanel as $key => $value) {
	echo '<option value="' . $key . '">' . $value . '</option>';
}
?>
							</select>
						</td>
						<td><span class="ps-hidden ps-button SetChanel">speichern</span></td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>Last Boot Reason:</span></td>
						<td class="ps-taleft" colspan="2"><span class="d1mRestartReason">--</span></td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>Boot Counter:</span></td>
						<td class="ps-taleft"><span class="d1mBootCounter">--</span></td>
						<td class="buttonContainer">
							<span class="ps-hidden ps-button SetCmd" data-cmd="ResetBootCounter">reset</span>
						</td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>Online Since:</span></td>
						<td class="ps-taleft" colspan="2"><span class="d1mOnSince">--</span></td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>Online Duration:</span></td>
						<td class="ps-taleft" colspan="2"><span class="d1mOnDuration">--</span></td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>WiFi Since:</span></td>
						<td class="ps-taleft" colspan="2"><span class="d1mWiFiSince">--</span></td>
					</tr>
					<tr class="ps-hidden">
						<td class="ps-taleft"><span>MQTT Since:</span></td>
						<td class="ps-taleft" colspan="2"><span class="d1mMQTTSince">--</span></td>
					</tr>
				</tbody>
			</table>
		</div>
<?
	}
?>
	</div>
	<hr />
	<p class="serverinfo">
		<?=apache_get_version()?><br />
		MSSQL/<?=$sys['e']?> <?=$sys['pl']?> <?=$sys['pv']?><br />
		WEBautomationCS/<?=$serverVersion?><br />
		Connected Database:<?=wpInit::$db['database']?></p>
</div>
