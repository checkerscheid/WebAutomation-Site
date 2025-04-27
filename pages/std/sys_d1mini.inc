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
//# Revision     : $Rev:: 734                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sys_d1mini.inc 734 2025-04-25 19:30:07Z                  $ #
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
		<div class="ps-container ps-flex-element">
			<table summary="">
				<thead>
					<tr>
						<th>Name</th>
						<th>Beschreibung</th>
						<th>IP</th>
						<th>MAC</th>
						<th>RSSI</th>
						<th>Version</th>
						<th>Channel</th>
						<th>Boot Counter</th>
						<th>Boot Reason</th>
						<th>Online Duration</th>
					</tr>
				</thead>
				<tbody>
<?
	$database->query("SELECT [name], [description], [ip], [mac], [active] FROM [d1mini] ORDER BY [active] DESC, [name]");
	while($erg = $database->fetch()) {
?>
					<tr id="<?=$erg['name'] ?>">
						<td><a href="std.d1mini.<?=$erg['name'] ?>.htm"><?=$erg['name'] ?></a></td>
						<td><?=$erg['description']?></td>
						<td><a class="storedIp" data-ip="<?=$erg['ip'] ?>" href="http://<?=$erg['ip'] ?>/print" target="_blank"><?=$erg['ip'] ?></a></td>
						<td><?=$erg['mac'] ?></td>
						<td><?=($erg['active'] == 1 ?
							'<span data-ws="' . $erg['name'] . '_Rssi" class="' . wpa::rssi . ' ps-hidden">-</span><span class="d1mOffline ps-fontred">-- Offline --</span>' :
							'<span class="ps-fontyellow">-- Deactivated --</span>') ?></td>
						<td><span class="d1mVersion">--</span></td>
						<td><span class="d1mUpdateChanel">--</span></td>
						<td><span class="d1mBootCounter">--</span></td>
						<td><span class="d1mRestartReason">--</span></td>
						<td><span class="d1mOnDuration">--</span></td>
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
