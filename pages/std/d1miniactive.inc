<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 03.04.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 591                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1miniactive.inc 591 2024-04-24 20:57:52Z                $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'd1miniactive'");
$headline = $database->fetch();

$database->query("SELECT [id_d1mini], [name], [description], [ip], [mac], [version], [active] FROM [d1mini] ORDER BY [name]");
?>
<div id="d1miniactive">
	<h1><?=$headline['name']?></h1>
	<div id="globalD1MiniCmd">
		<span class="ps-button startSearch">Start Search</span>
	</div>
	<div class="searchResult">
		<h3 class="foundNew"></h3>
		<div class="erg"></div>
		<pre class="wpDebugResult"></pre>
	</div>
	<table summary="">
		<thead>
			<tr>
				<th>Name</th>
				<th>Beschreibung</th>
				<th>IP</th>
				<th>MAC</th>
				<th>Version</th>
				<th>SSID</th>
				<th>UpdateMode</th>
				<th>aktiv</th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
<?
while($erg = $database->fetch()) {
?>
			<tr class="D1MiniDevice" data-id="<?=$erg['id_d1mini'] ?>" data-name="<?=$erg['name'] ?>">
				<td data-column="name">
					<div class="buttonContainer">
						<span class="ps-hover-noborder ps-image-button ps-refresh"></span>
					</div>
					<span class="stored"><?=$erg['name'] ?></span><br />
					<span class="smallfont name"></span>
				</td>
				<td data-column="description">
					<div class="buttonContainer">
						<span class="ps-hover-noborder ps-image-button ps-refresh"></span>
					</div>
					<span class="stored"><?=$erg['description'] ?></span><br />
					<span class="smallfont description"></span>
				</td>
				<td data-column="ip">
					<div class="buttonContainer">
						<span class="ps-hover-noborder ps-image-button ps-refresh"></span>
						<a href="http://<?=$erg['ip'] ?>/print" target="_blank" class="ps-hover-noborder ps-image-button ps-edit" title="Debug"></a>
						<a href="http://<?=$erg['ip'] ?>/status" target="_blank" class="ps-hover-noborder ps-image-button ps-info" title="Status"></a>
					</div>
					<span class="stored"><?=$erg['ip'] ?></span><br />
					<span class="smallfont ip"></span>
				</td>
				<td data-column="mac">
					<div class="buttonContainer">
						<span class="ps-hover-noborder ps-image-button ps-refresh"></span>
					</div>
					<span class="stored"><?=$erg['mac'] ?></span><br />
					<span class="smallfont mac"></span>
				</td>
				<td data-column="version">
					<div class="buttonContainer">
						<span class="ps-hover-noborder ps-image-button ps-refresh"></span>
					</div>
					<span class="stored"><?=$erg['version'] ?></span><br />
					<span class="smallfont version"></span>
				</td>
				<td data-column="ssid">
					<span class="ssid"></span>
				</td>
				<td data-column="updatemode">
					<span class="updatemode"></span>
				</td>
				<td><?=($erg['active'] == 1 ? '<span class="ps-green">aktiv</span>' : '<span class="ps-yellow">deaktiviert</span>') ?></td>
				<td class="buttonbox"><span class="ps-button forceupdate" title="Force MQTT Update">MQTT Update</span></td>
				<td class="buttonbox"><span class="ps-button setupmode" title="Set FW Update Mode On">Update Mode</span></td>
				<td class="buttonbox"><span class="ps-button restartdevice">neu starten</span></td>
			</tr>
<?
}
?>
		</tbody>
	</table>
</div>