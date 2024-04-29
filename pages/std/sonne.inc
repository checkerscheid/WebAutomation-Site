<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 22.05.2015                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: sonne.inc 552 2024-01-06 13:56:24Z                       $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
$current_h1 = \system\html::getPagename('sonne');

$points = array (
	'AT' => 'WGCSCHEID01_Aussen',
	'AZ' => 'WGCSCHEID01_Azimut',
	'EL' => 'WGCSCHEID01_Elevation',
	//'AZ' => 'WGCSCHEID01_M_AO_1_1',
	//'EL' => 'WGCSCHEID01_M_AO_1_2',
	'Wind' => 'WGCSCHEID01_Wind',
	'Regen' => 'WGCSCHEID01_Regen',
	'LichtO' => 'WGCSCHEID01_LichtOst',
	'LichtS' => 'WGCSCHEID01_LichtSued',
	'LichtW' => 'WGCSCHEID01_LichtWest',
	'Daemmerung' => 'WGCSCHEID01_Daemmerung'
);

?>

<div id="sonne">
	<h1><?=\system\html::fillHeadline($current_h1)?></h1>
	<div id="AT" class="Temperatur aussen">
		<span data-value="AT" class="ps-input">undefined</span>
	</div>
	<div class="sonnenstand">
		<h2>Sonnenstand</h2>
		<div class="sued">Süden</div>
		<div class="sonnecontainer">
			<div class="sonne ps-hidden" data-az="AZ" data-el="EL">
			</div>
			<table summary="">
				<tr>
					<td>Azimut:</td>
					<td><span class="ps-input az" data-value="AZ">-</span></td>
				</tr>
				<tr>
					<td>Elevation:</td>
					<td><span class="ps-input el" data-value="EL">-</span></td>
				</tr>
			</table>
			<div class="sonnebaum"></div>
		</div>
		<div class="winkel">
			<span class="left90">90 °</span>
			<span class="right270">270 °</span>
			<span class="center180">180 °</span>
		</div>
		<div class="ostwest">
			<span class="ost">Osten</span>
			<span class="west">Westen</span>
		</div>
	</div>
	<div class="wetterdaten">
		<div class="wettercontainer">
			<span class="text t-wind">Wind:</span>
			<span class="ps-input" data-value="Wind">-</span>
			<span class="text t-regen">Niederschlag:</span>
			<span class="ps-input pa-Meldung" data-value="Regen" data-true="Regen" data-false="trocken">-</span>
			<span class="text t-lichto">Licht Osten:</span>
			<span class="ps-input" data-value="LichtO">-</span>
			<span class="text t-lichts">Licht Süden:</span>
			<span class="ps-input" data-value="LichtS">-</span>
			<span class="text t-lichtw">Licht Westen:</span>
			<span class="ps-input" data-value="LichtW">-</span>
			<span class="text t-daemmerung">Dämmerung:</span>
			<span class="ps-input" data-value="Daemmerung">-</span>
		</div>
	</div>
</div>
