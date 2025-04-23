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
//# Revision     : $Rev:: 731                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: overview.inc 731 2025-04-03 16:37:32Z                  $ #
//#                                                                                 #
//###################################################################################
/**
 * @var Type $points
 */
namespace pages;
use system\Helper\wpa;
use system\Helper\shelly;
require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/shelly.psys';
$points = array(
	'Sommer'	=> 'Sommerbetrieb',
	'num1'		=> 'storage_numeric_reg01',
	'num2'		=> 'storage_numeric_reg02',
	'random'	=> 'numeric_random_int32'
);
class overview {
	private static $Licht = array(
		'BA_SP'			=> 'Bad Spiegelbeleuchtung',
		'KZ_BE'			=> 'Kinderzimmer Bett',
		'Testboard'		=> 'Testboard',
		'GA_BT'			=> 'Blumentöpfe'
	);
	private static $SystemRelay = array(
		'SY_SS'			=> 'Schaltschrank',
		'SY_WW'			=> 'Warmwasser',
		'SY_KS'			=> 'Kühlschrank'
	);
	private static $HT = array(
		'UG' => array(
			'WZ_HT3'		=> 'Wohnzimmer',
			//'WZ_PF_FE'		=> 'Pflanze am Fenster',
			'SZ_RU'			=> 'Schlafzimmer',
			'BU_RU'			=> 'Büro',
			'KU_RU'			=> 'Küche',
			'FL_RU'			=> 'Flur',
			'BA_RU'			=> 'Bad',
			'KZ_HT3'		=> 'Kinderzimmer',
			'WZ_PF_FE'		=> 'Wohnzimmer Pflanze',
			'BA_Lue'		=> 'Bad Lüfter',
			'KE'			=> 'Keller'),
		'Wetterstation' => array(
			'GA_WE_Ost'		=> 'Ost',
			'GA_WE_Sued'	=> 'Süd',
			'GA2_WE_Gaube'	=> 'Gaube'),
		'EG' => array(
			'WG1_HTp'		=> 'EG Wintergarten',
			'SZ1_HT'		=> 'EG Schlafzimmer',
			'GA1_FS'		=> 'EG Gartenhaus'),
		'OG' => array(
			'FL2_HT'		=> 'OG Flur')
	);
	private static $Pflanze;
	public static function setPflanze() {
		self::$Pflanze = array(
			'WZ_PF_TI' => new cPflanze('Pflanze auf\'m Tisch', '172.17.80.107', 98),
			'WZ_PF_TE' => new cPflanze('Pflanze zur Terrasse', '172.17.80.106', 75),
			'WZ_PF_FE' => new cPflanze('Pflanze am Fenster in der Ecke', '172.17.80.102', 71),
			'WZ_PF_FE_LI' => new cPflanze('Pflanze am Fenster, links', '172.17.80.103', 72),
			'WZ_PF_FE_RE1' => new cPflanze('Pflanze am Fenster, 1. rechts', '172.17.80.104', 73),
			'WZ_PF_FE_RE2' => new cPflanze('Pflanze am Fenster, 2. rechts', '172.17.80.105', 74),
			'Melonie' => new cPflanze('Melonie', '172.17.80.109', 97),
			'KZ_PF_PF' => new cPflanze('Pflanzi', '172.17.80.168', 93),
			'KZ_PF_BE' => new cPflanze('Bee(r)ti', '172.17.80.167', 92)
		);
	}
	public static function getD1HT() {
		$returns = '';
		foreach(overview::$HT as $groupname => $group) {
			$returns .= '
				<tr>
					<td colspan="6"><h4>' . $groupname . '</h4></td>
				</tr>';
			foreach($group as $dp => $name) {
				$returns .= '
					<tr>
						<td class="ps-taleft" colspan="2">' . $name . ':</td>
						<td colspan="2">
							<span data-ws="' . $dp . '_Temp" class="ps-input">undefined</span>
							<span data-ws="' . $dp . '_Temp" class="' . wpa::indikatorTemp . '">' . wpHTML_EMPTY . '</span>
						</td>
						<td colspan="2">
							<span data-ws="' . $dp . '_Hum" class="ps-input">undefined</span>
							<span data-ws="' . $dp . '_Hum" class="' . wpa::indikatorHum . '">' . wpHTML_EMPTY . '</span>
						</td>
					</tr>';
			}
		}
		return $returns;
	}
	public static function getLicht() {
		$returns = '';
		foreach(overview::$Licht as $dp => $name) {
			$returns .= '
				<tr>
					<td class="ps-taleft" colspan="3">' . $name . ':</td>
					<td colspan="3"><span data-ws="' . $dp . '" class="ps-input ' . wpa::GreyYellow . '">undefined</span></td>
				</tr>';
		}
		foreach(overview::$SystemRelay as $dp => $name) {
			$returns .= '
				<tr>
					<td class="ps-taleft" colspan="3">' . $name . ':</td>
					<td colspan="3"><span data-ws="' . $dp . '" class="ps-input ' . wpa::RedGreen . '">undefined</span></td>
				</tr>';
		}
		return $returns;
	}
	public static function getPflanze() {
		$returns = '';
		foreach(overview::$Pflanze as $name => $p) {
			$returns .= '
				<tr>
					<!--td colspan="2"><a href="http://' . $p->getIpAddress() . '/print" target="_blank">' . $p->getDescription() . '</a></td-->
					<td class="ps-taleft" coslpan="2"><a href="std.d1mini.' . $name . '.htm">' . $p->getDescription() . '</a></td>
					<td colspan="2">
						<div class="indiContainer">
							<span data-ws="' . $name . '_Moisture" class="ps-input">undefined</span>
							<span data-ws="' . $name . '_Moisture" class="' . wpa::indikatorPfl . '">' . wpHTML_EMPTY . '</span>
							<span data-ws="' . $name . '_PumpeHandError" class="wpa-hand pa-hide">' . wpHTML_EMPTY . '</span>
						</div>
					</td>
					<td colspan="2">
						' . $p->getTrendButton() . '
					</td>
				</tr>';
		}
		return $returns;
	}
	public static function getPower() {
		$returns = '';
		$all = overview::$Licht + overview::$SystemRelay;
		foreach($all as $dp => $name) {
			$returns .= '
				<tr>
					<td class="ps-taleft" colspan="3">' . $name . ':</td>
					<td colspan="3"><span data-ws="' . $dp . '_Power" class="ps-input">undefined</span></td>
				</tr>';
		}
		return $returns;
	}
	public static function getD1Mini() {
		GLOBAL $database;
		$returns = '';
		$database->query("SELECT [name], [description], [ip], [active] FROM [d1mini] ORDER BY [name]");
		while($erg = $database->fetch()) {
			$returns .= '
				<tr>
					<!--td colspan="2"><a href="http://' . $erg['ip'] . '/print" target="_blank">' . $erg['description'] . '</a>:</td-->
					<td class="ps-taleft" colspan="2"><a href="std.d1mini.' . $erg['name'] . '.htm">' . $erg['description'] . '</a>:</td>
					<td colspan="2"><span data-ws="' . $erg['name']. '_Rssi" class="' . wpa::rssi . '">-</span></td>
					<td colspan="2">';
			if($erg['active'] == 1) {
				$returns .= '
						<span data-ws="' . $erg['name'] . '_Online" class="ps-input ' . wpa::GreenRed . '">-</span>';
			} else {
				$returns .= '
						<span class="ps-input">deactivated</span>';;
			}
			$returns .= '
					</td>
				</tr>';
		}
		return $returns;
	}
	public static function getShelly() {
		GLOBAL $database;
		$returns = '';
		$database->query("SELECT [mqtt_id], [type], [name] FROM [shelly] WHERE [mqtt_id] IS NOT NULL ORDER BY [name]");
		while($erg = $database->fetch()) {
			if(shelly::isGen2($erg['type'])) {
				$returns .= '
					<tr>
						<td class="ps-taleft" colspan="2">' . $erg['name'] . ':</td>
						<td colspan="2"><span data-ws="' . $erg['mqtt_id']. '_Rssi" class="' . wpa::rssi . '">-</span></td>
						<td colspan="2"></td>
					</tr>';
			}
		}
		return $returns;
	}
}
class cPflanze {
	private $name, $description, $ipAddress, $trendid;
	public function __construct($description, $ipAddress, $trendid) {
		$this->description = $description;
		$this->ipAddress = $ipAddress;
		$this->trendid = $trendid;
	}
	public function setName($name) {
		$this->name = $name;
	}
	public function getName() {
		return $this->name;
	}
	public function getDescription() {
		return $this->description;
	}
	public function getIpAddress() {
		return $this->ipAddress;
	}
	public function getTrendId() {
		return $this->trendid;
	}
	public function getTrendButton() {
		return '<a href="std.trendview.' . $this->trendid . '.htm" class="ps-button ps-pluginbutton">' . wpHTML_TREND . '</a>';
	}
}
overview::setPflanze();
?>
<div id="uebersicht" class="ps-flex-container page">
	<div class="ps-container">
		<table id="LichtEnergie">
			<tbody>
				<tr><td colspan="6"><h2>Licht / Relais</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<?=overview::getLicht() ?>
				<tr><td colspan="6"><a class="ps-button" href="std.d1mini.WZ_NP.htm">Wohnzimmer Lichtleiste</a></td></tr>
				<tr><td colspan="6"><a class="ps-button" href="std.d1mini.WZ_LS_NP.htm">Wohnzimmer Lautsprecher</a></td></tr>
				<tr><td colspan="6"><a class="ps-button" href="std.d1mini.WZ_PF_TE.htm">Wohnzimmer Pflanze</a></td></tr>
				<tr><td colspan="6"><a class="ps-button" href="std.d1mini.KZ_NP.htm">Kinderzimmer NeoPixel</a></td></tr>
				<tr><td colspan="6"><a class="ps-button" href="std.d1mini.BA_Lue.htm">Bad Lüfter</a></td></tr>
				<tr><td colspan="6"><a class="ps-button" href="std.d1mini.UG_EMeter.htm">Elektrozähler</a></td></tr>
				<tr><td colspan="6"><h2>Energie</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<?=overview::getPower() ?>
				<tr><td colspan="6"><h2>Energiezähler</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="2"></td>
					<td colspan="2">Hauptzähler</td>
					<td colspan="2">Server</td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Leistung:</td>
					<td colspan="2"><span data-ws="SY_EZ_power" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="SY_SRV_power" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Blindleistung:</td>
					<td colspan="2"><span data-ws="SY_EZ_reactive_power" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="SY_SRV_reactive_power" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">cos &phi;:</td>
					<td colspan="2"><span data-ws="SY_EZ_pf" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="SY_SRV_pf" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Energie:</td>
					<td colspan="2"><span data-ws="SY_EZ_energy" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="SY_SRV_energy" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">erzeugte Energie:</td>
					<td colspan="2"><span data-ws="SY_EZ_returned_energy" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="SY_SRV_returned_energy" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Spannung:</td>
					<td colspan="2"><span data-ws="SY_EZ_voltage" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="SY_SRV_voltage" class="ps-input">undefined</span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="ps-container">
		<table id="Sensoren">
			<tbody>
				<tr><td colspan="6"><h2>Sensoren</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<?=overview::getD1HT() ?>
				<tr><td colspan="6"><h2>Wetterstation</h2></td></tr>
				<tr>
					<td colspan="2"></td>
					<td colspan="2"><h2>Licht</h2></td>
					<td colspan="2"><h2>Regen</h2></td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td class="ps-taleft" colspan="2">Osten:</td>
					<td colspan="2"><span data-ws="GA_WE_Ost_Light" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="GA_WE_Ost_Rain" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Süden:</td>
					<td colspan="2"><span data-ws="GA_WE_Sued_Light" class="ps-input">undefined</span></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Gaube:</td>
					<td colspan="2"></td>
					<td colspan="2"><span data-ws="GA2_WE_Gaube_Rain" class="ps-input">undefined</span></td>
				</tr>
				<!--tr>
					<td colspan="2">Innen:</td>
					<td colspan="2"><span data-ws="BasisTest_Light" class="ps-input">undefined</span></td>
					<td colspan="2"></td>
				</tr-->
				<tr><td colspan="6"><h2>Wetter</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td class="ps-taleft" colspan="3">Sonne:</td>
					<td colspan="3"><span data-ws="Sonne" class="ps-input <?=wpa::BlueYellow ?>">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="3">Aufgang:</td>
					<td colspan="3"><span data-ws="Sonnenaufgang" class="ps-input <?=wpa::formattime ?>">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="3">Untergang:</td>
					<td colspan="3"><span data-ws="Sonnenuntergang" class="ps-input <?=wpa::formattime ?>">undefined</span></td>
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
					<td class="ps-taleft" colspan="3">Füllstand:</td>
					<td colspan="3"><span data-ws="GA1_FS_Vol" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="3">Füllstand Höhe (RAW):</td>
					<td colspan="3"><span data-ws="GA1_FS_Raw" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="3">Füllstand Höhe (AVG):</td>
					<td colspan="3"><span data-ws="GA1_FS_Avg" class="ps-input">undefined</span></td>
				</tr>
				<tr>
					<td colspan="2"></td>
					<td colspan="2"><h2>Licht</h2></td>
					<td colspan="2"><h2>BM</h2></td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td class="ps-taleft" colspan="2">Büro:</td>
					<td colspan="2"><span data-ws="BU_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="BU_RU_BM" class="ps-input <?=wpa::GreyGreen ?>">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Küche:</td>
					<td colspan="2"><span data-ws="KU_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="KU_RU_BM" class="ps-input <?=wpa::GreyGreen ?>">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Flur:</td>
					<td colspan="2"><span data-ws="FL_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="FL_RU_BM" class="ps-input <?=wpa::GreyGreen ?>">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Bad:</td>
					<td colspan="2"><span data-ws="BA_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"><span data-ws="BA_RU_BM" class="ps-input <?=wpa::GreyGreen ?>">undefined</span></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Schlafzimmer:</td>
					<td colspan="2"><span data-ws="SZ_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Kinderzimmer:</td>
					<td colspan="2"><span data-ws="KZ_RU_LDR" class="ps-input">undefined</span></td>
					<td colspan="2"></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="ps-container">
		<table id="SensorenII">
			<tbody>
				<tr><td colspan="6"><h2>Pflanzen</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td class="ps-taleft" colspan="3">Referenztemperatur</td>
					<td colspan="3">
						<span data-ws="WZ_PF_FE_Temp" class="ps-input">undefined</span>
						<span data-ws="WZ_PF_FE_Temp" class="<?=wpa::indikatorTemp?>"><?=wpHTML_EMPTY?></span>
					</td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="3">Referenzfeuchte</td>
					<td colspan="3">
						<span data-ws="WZ_PF_FE_Hum" class="ps-input">undefined</span>
						<span data-ws="WZ_PF_FE_Hum" class="<?=wpa::indikatorHum?>"><?=wpHTML_EMPTY?></span>
					</td>
				</tr>
				<tr>
					<td class="ps-taleft" colspan="2">Wassergewicht</td>
					<td colspan="2">
						<span data-ws="WZ_PF_FE_LI_Weight" class="ps-input">undefined</span>
					</td>
					<td colspan="2">
						<a href="std.trendview.108.htm" class="ps-button ps-pluginbutton"><?= wpHTML_TREND ?></a>
					</td>
				</tr>
				<?=overview::getPflanze() ?>
				<!--tr><td colspan="6"><h2>Test</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Shelly ForceMqttUpdate:</td>
					<td colspan="3"><span class="ps-button ForceMqttUpdate">anfordern</span></td>
				</tr>
				<tr>
					<td>BrowseMqtt:</td>
					<td><span class="ps-button setBrowseMqtt">anfordern</span></td>
				</tr>
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
				</tr-->
			</tbody>
		</table>
	</div>
	<div class="ps-container">
		<table id="Energie">
			<tbody>
				<tr><td colspan="6"><h2>Signalstärke D1 Mini</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<?=overview::getD1Mini() ?>
				<tr><td colspan="6"><h2>Signalstärke Shelly</h2></td></tr>
				<tr><td colspan="6"><hr /></td></tr>
				<?=overview::getShelly() ?>
			</tbody>
		</table>
	</div>
</div>

