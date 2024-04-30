<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 16.12.2019                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 595                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shellycfg.inc 595 2024-04-30 01:38:01Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'shellycfg'");
$headline = $database->fetch();

?>
<div id="shellycfgcontainer">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="shellygroup">Shellygruppen</span></li>
		<li><span class="ps-button" data-target="shellynew">Neue Shelly anlegen</span></li>
		<li><span class="ps-button" data-target="shellyedit">Shellys Konfigurieren</span></li>
	</ul>
	<hr />
	<div id="shellycfg">
		<div id="erg">
			<!--div>
				<h2>Schelly Dimmertest</h2>
<?
	$database->query("SELECT [ip], [name] FROM [shelly] WHERE [type] = 'SHDM-1'");
	while($erg = $database->fetch()) {
?>
				<div class="ps-container">
					<h3><?=$erg['name']?></h3>
					<div class="shelly-manual" data-ip="<?=$erg['ip']?>">
						<span class="ps-button shelly-dimmer-on">Ein</span>
						<span class="ps-button shelly-dimmer-off">Aus</span>
						<div class="ps-slider shelly-dimmer">
						</div>
					</div>
				</div>
<?
	}
?>
			</div-->
		</div>
	</div>
</div>
