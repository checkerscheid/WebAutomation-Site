<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.12.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 618                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uebersicht.inc 618 2024-05-20 14:53:51Z                  $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
use system\Helper\wpa;
require_once 'system/Helper/wpa.psys';
$points = array(
	'Sommer'	=> 'Sommerbetrieb',
	'num1'		=> 'storage_numeric_reg01',
	'num2'		=> 'storage_numeric_reg02',
	'random'	=> 'numeric_random_int32'
);
class uebersicht {
	private static $Licht = array(
		'BA_SP'			=> 'Bad Spiegelbeleuchtung',
		'KZ_BE'			=> 'Kinderzimmer Bett',
		'SY_TB'			=> 'Testboard',
		'GA_BT'			=> 'Blumentöpfe'
	);
	private static $SystemRelay = array(
		'SY_SS'			=> 'Schaltschrank',
		'SY_WW'			=> 'Warmwasser',
		'SY_WM'			=> 'Waschmaschine'
	);
	private static $HT = array(
		'WZ_HT3'		=> 'Wohnzimmer',
		'WZ_PF_FE'		=> 'Pflanze am Fenster',
		'SZ_RU'			=> 'Schlafzimmer',
		'BU_RU'			=> 'Büro',
		'KU_RU'			=> 'Küche',
		'BA_RU'			=> 'Bad',
		'KZ_HTp'		=> 'Kinderzimmer',
		'KE'			=> 'Keller',
		'GA_WE_Ost'		=> 'Wetterstation Ost',
		'GA_WE_Sued'	=> 'Wetterstation Süd',
		'GA2_WE_Gaube'	=> 'Wetterstation Gaube',
		'BasisTest'		=> 'Breadboard',
		'WG1_HTp'		=> 'Wintergarten',
		'SZ1_HT'		=> 'Schlafzimmer',
		'GA1_FS'		=> 'Gartenhaus',
		'FL2_HT'		=> 'Flur',
		'GA2_WE_Gaube'	=> 'Wetterstation Gaube'
	);
	private static $RSSI = array(
		'WZ_HT3'		=> 'Wohnzimmer',
		'WZ_PF_FE'		=> 'Pflanze am Fenster',
		'SZ_RU'			=> 'Schlafzimmer',
		'BU_RU'			=> 'Büro',
		'KU_RU'			=> 'Küche',
		'BA_RU'			=> 'Bad',
		'BA_SP'			=> 'Bad Spiegelbeleuchtung',
		'KZ_HTp'		=> 'Kinderzimmer',
		'KZ_BE'			=> 'Kinderzimmer Bett',
		'SY_TB'			=> 'Testboard',
		'KE'			=> 'Keller',
		'GA_BT'			=> 'Blumentöpfe',
		'SY_SS'			=> 'Schaltschrank',
		'SY_WW'			=> 'Warmwasser',
		'SY_WM'			=> 'Waschmaschine',
		'GA_WE_Ost'		=> 'Wetterstation Ost',
		'GA_WE_Sued'	=> 'Wetterstation Süd',
		'GA2_WE_Gaube'	=> 'Wetterstation Gaube',
		'BasisTest'		=> 'Breadboard',
		'WG1_HTp'		=> 'EG Wintergarten',
		'SZ1_HT'		=> 'EG Schlafzimmer',
		'GA1_FS'		=> 'EG Gartenhaus',
		'FL2_HT'		=> 'OG Flur'
	);
	private static $d1Minis = array(
		'WZ_PF_FE',
		'BA_RU',
		'BasisTest',
		'BU_RU',
		'GA_WE_Ost',
		'GA_WE_Sued',
		'GA_WE_West',
		'GA1_FS',
		'KU_RU',
		'SZ_RU',
		'GA2_WE_Gaube'
	);
	public static function getD1HT() {
		$returns = '';
		foreach(uebersicht::$HT as $dp => $name) {
			$returns .= '
				<tr>
					<td colspan="2">' . $name . ':</td>
					<td colspan="2">
						<span data-ws="' . $dp . '_Temp" class="ps-input">undefined</span>
						<span data-ws="' . $dp . '_Temp" class="' . wpa::$indikatorTemp . '">' . wpHTML_EMPTY . '</span>
					</td>
					<td colspan="2">
						<span data-ws="' . $dp . '_Hum" class="ps-input">undefined</span>
						<span data-ws="' . $dp . '_Hum" class="' . wpa::$indikatorHum . '">' . wpHTML_EMPTY . '</span>
					</td>
				</tr>';
		}
		return $returns;
	}
	public static function getLicht() {
		$returns = '';
		foreach(uebersicht::$Licht as $dp => $name) {
			$returns .= '
				<tr>
					<td>' . $name . ':</td>
					<td><span data-ws="' . $dp . '" class="ps-input ' . wpa::$GreyYellow . '">undefined</span></td>
				</tr>';
		}
		foreach(uebersicht::$SystemRelay as $dp => $name) {
			$returns .= '
				<tr>
					<td>' . $name . ':</td>
					<td><span data-ws="' . $dp . '" class="ps-input ' . wpa::$RedGreen . '">undefined</span></td>
				</tr>';
		}
		return $returns;
	}
	public static function getPower() {
		$returns = '';
		$all = uebersicht::$Licht + uebersicht::$SystemRelay;
		foreach($all as $dp => $name) {
			$returns .= '
				<tr>
					<td>' . $name . ':</td>
					<td><span data-ws="' . $dp . '_Power" class="ps-input">undefined</span></td>
				</tr>';
		}
		return $returns;
	}
	public static function getRSSI() {
		$returns = '';
		foreach(uebersicht::$RSSI as $dp => $name) {
			$returns .= '
				<tr>
					<td colspan="2">' . $name . ':</td>
					<td colspan="2"><span data-ws="' . $dp . '_Rssi" class="' . wpa::$rssi . '">undefined</span></td>
					<td colspan="2">';
			if(in_array($dp, uebersicht::$d1Minis)) {
				$returns .= '<span data-ws="' . $dp . '_Online" class="ps-input ' . wpa::$GreenRed . '">-</span>';
			}
			$returns .= '
					</td>
				</tr>';
		}
		return $returns;
	}
}
?>
<div id="uebersicht" class="ps-flex-container page">
	<div class="ps-container">
		<table id="LichtEnergie">
			<tbody>
				<tr><td colspan="2"><h2>Licht / Relais</h2></td></tr>
				<tr><td colspan="2"><hr /></td></tr>
				<?=uebersicht::getLicht() ?>
				<tr><td colspan="2"><h2>Energie</h2></td></tr>
				<tr><td colspan="2"><hr /></td></tr>
				<?=uebersicht::getPower() ?>
				<tr><td colspan="2"><h2>Energiezähler</h2></td></tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Leistung:</td>
					<td><span data-ws="SY_EZ_power" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td>Blindleistung:</td>
					<td><span data-ws="SY_EZ_reactive_power" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td>cos &phi;:</td>
					<td><span data-ws="SY_EZ_pf" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td>Energie:</td>
					<td><span data-ws="SY_EZ_energy" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td>erzeugte Energie:</td>
					<td><span data-ws="SY_EZ_returned_energy" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td>Spannung:</td>
					<td><span data-ws="SY_EZ_voltage" class="ps-input">undefined</span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="ps-container">
		<table id="Sensoren">
			<tbody>
				<tr><td colspan="6"><h2>Sensoren</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<?=uebersicht::getD1HT() ?>
				<tr><td colspan="6"><h2>Wetterstation</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Licht Osten:</td>
					<td colspan="3"><span data-ws="GA_WE_Ost_Light" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Licht Süden:</td>
					<td colspan="3"><span data-ws="GA_WE_Sued_Light" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Regen Ost:</td>
					<td colspan="3"><span data-ws="GA_WE_Ost_Rain" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Regen Gaube:</td>
					<td colspan="3"><span data-ws="GA2_WE_Gaube_Rain" class="ps-input">undefined</span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="ps-container">
		<table id="SensorenII">
			<tbody>
				<tr><td colspan="6"><h2>Gartenhaus</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Füllstand:</td>
					<td colspan="3"><span data-ws="GA1_FS_Vol" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Füllstand Höhe (RAW):</td>
					<td colspan="3"><span data-ws="GA1_FS_Raw" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Füllstand Höhe (AVG):</td>
					<td colspan="3"><span data-ws="GA1_FS_Avg" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="2"></td>
					<td colspan="2"><h2>Licht</h2></td>
					<td colspan="2"><h2>BM</h2></td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="2">Büro:</td>
					<td colspan="2"><span data-ws="BU_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="BU_RU_BM" class="ps-input <?=wpa::$GreyGreen ?>">undefined</span></td>
				</tr>
				<tr>
					<td colspan="2">Küche:</td>
					<td colspan="2"><span data-ws="KU_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="KU_RU_BM" class="ps-input <?=wpa::$GreyGreen ?>">undefined</span></td>
				</tr>
				<tr>
					<td colspan="2">Bad:</td>
					<td colspan="2"><span data-ws="BA_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="BA_RU_BM" class="ps-input <?=wpa::$GreyGreen ?>">undefined</span></td>
				</tr>
				<tr>
					<td colspan="2">Schlafzimmer:</td>
					<td colspan="2"><span data-ws="SZ_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"></td>
				</tr>
				<tr><td colspan="6"><h2>Wetter</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Sonne:</td>
					<td colspan="3"><span data-ws="Sonne" class="ps-input <?=wpa::$BlueYellow ?>">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Aufgang:</td>
					<td colspan="3"><span data-ws="Sonnenaufgang" class="ps-input <?=wpa::$formattime ?>">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Untergang:</td>
					<td colspan="3"><span data-ws="Sonnenuntergang" class="ps-input <?=wpa::$formattime ?>">undefined</span></td>
				</tr>
				<tr><td colspan="6"><h2>Breadboard</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Licht</td>
					<td colspan="3"><span data-ws="BasisTest_Light" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Pflanze an der Terrasse</td>
					<td colspan="3"><span data-ws="BasisTest_Moisture" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="3">Pflanze am Fenster</td>
					<td colspan="3"><span data-ws="WZ_PF_FE_Moisture" class="ps-input">undefined</span></td>
				</tr>
				<tr><td colspan="6"><h2>Test</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Shelly ForceMqttUpdate:</td>
					<td colspan="3"><span class="ps-button ForceMqttUpdate">anfordern</span></td>
				</tr>
				<!--tr>
					<td>BrowseMqtt:</td>
					<td><span class="ps-button setBrowseMqtt">anfordern</span></td>
				</tr-->
				<tr>
					<td colspan="3">getBrowseMqtt:</td>
					<td colspan="3"><span class="ps-button getBrowseMqtt">anfordern</span></td>
				</tr>
				<tr>
					<td colspan="3">getD1Mini's as JSON:</td>
					<td colspan="3"><span class="ps-button getD1Mini">anfordern</span></td>
				</tr>
				<tr>
					<td colspan="3">internal getShellyStatus:</td>
					<td colspan="3"><span class="ps-button getShellyStatus">anfordern</span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="ps-container">
		<table id="Energie">
			<tbody>
				<tr><td colspan="6"><h2>Signalstärke</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<?=uebersicht::getRSSI() ?>
			</tbody>
		</table>
	</div>
</div>

