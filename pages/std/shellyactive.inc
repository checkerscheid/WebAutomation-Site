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
//# Revision     : $Rev:: 561                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shellyactive.inc 561 2024-01-16 02:06:50Z                $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'shelly'");
$headline = $database->fetch();
?>
<div id="shelly">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
		<div>
			Scan: 172.17.0.<input type="text" class="ps-input ShellyIpFrom" value="1" /> To <input type="text" class="ps-input ShellyIpTo" value="29" />
			<span class="ps-button scan" data-method="do-scan">scan</span>
			<hr />
			<div id="ergScan"></div>
		</div>
		<div>
			IP Adresse: <input type="text" class="ps-input ShellyIp" value="" />
			<hr />
			<span class="ps-button get" data-method="get-shelly">get-shelly</span>
			<span class="ps-button get" data-method="get-status">get-status</span>
			<span class="ps-button get" data-method="get-settings">get-settings</span>
			<span class="ps-button get" data-method="get-settings-relay-0">get-settings-relay-0</span>
			<span class="ps-button get" data-method="get-relay-0">get-relay-0</span>
			<hr />
			<span class="ps-button set" data-method="set-settings">set-settings</span>
			<span class="ps-button set" data-method="set-settings-relay-0">set-settings-relay-0</span>
			New Name: <input type="text" class="ps-input ShellyRelayName" value="" />
			<hr />
			<span class="ps-button get" data-method="do-reboot">do-reboot</span>
			<span class="ps-button get" data-method="do-update">do-update</span>
			<hr />
			<div id="erg">
			</div>
		</div>
	</div>
</div>