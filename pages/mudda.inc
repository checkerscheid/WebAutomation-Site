<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.04.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 702                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mudda.inc 702 2024-10-18 23:16:21Z                       $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
use system\Helper\wpa;
use system\Helper\wpAnalogOut;
require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/wpAnalogOut.psys';
$points = array(
	'EG_HZG_FB' => 'EG_HZG_FB'
);
class mudda {
	private $headline;
	private $group;
	private $valve;
	private $temp;
	private $hum;
	public function __construct($headline, $group, $valve) {
		$this->headline = $headline;
		$this->group = $group;
		$this->valve = $valve;
	}
	public function setHum($hum) {
		$this->hum = $hum;
	}
	public function print() {
?>
		<tr>
			<td colspan="3">
				<span><?=$this->headline ?></span>
			</td>
		</tr>
		<tr>
			<td>
				<span class="ps-input" data-ws="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>_ReadedTemp">-</span>
				<span class="<?=wpa::indikatorTemp?>" data-ws="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>_ReadedTemp"><?=wpHTML_EMPTY ?></span>
			</td>
			<td>
				<span class="ps-input ps-param" data-ws="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>_SetPoint"
					 data-wswrite="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>_SetSetPoint"
					 data-popup="<?=$this->headline ?> Sollwert">-</span>
			</td>
			<td>
				<div class="handContainer">
					<span id="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>" class="ps-input pa-EinAus bedienbar <?=wpa::GreyGreen ?>"
						data-ws="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>"
						data-popup="<?=$this->headline ?>">-</span>
					<span class="hand pa-hide" data-ws="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>_HandError"><?=wpHTML_EMPTY ?></span>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<span class="ps-input" data-ws="<?=$this->hum ?>">-</span>
				<span class="<?=wpa::indikatorTemp?>" data-ws="<?=$this->hum ?>"><?=wpHTML_EMPTY ?></span>
			</td>
			<td>
			</td>
			<td>
			</td>
		</tr>
<?
	}
}
$kueche = new mudda('Küche', 1, 1);
$kueche->setHum('KU1_RU_Hum');

$wzmitte = new mudda('Wohnzimmer Mitte', 1, 2);
$wzmitte->setHum('WZ1_RU_Hum');

$wzfenster = new mudda('Wohnzimmer Fenster', 1, 3);
$wzfenster->setHum('WZ1_RU_Hum');

$wzkamin = new mudda('Wohnzimmer Kamin', 1, 4);
$wzkamin->setHum('WZ1_RU_Hum');

$essen = new mudda('Flur Essen', 2, 1);
$essen->setHum('FL1_ES_RU_Hum');

$bad = new mudda('Bad WC', 2, 2);
$bad->setHum('BA1_RU_Hum');

$eingang = new mudda('Flur Eingang', 2, 3);
$eingang->setHum('FL1_EI_RU_Hum');

$schlafzimmer = new wpAnalogOut('172.17.44.110', 'SZ1_VT');
$schlafzimmer->getStatus();
?>
<div id="mudda" class="page">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="ps-flex-container">
		<div class="ps-container">
			<table>
				<tbody>
					<tr>
						<td></td>
						<td><span>Temperatur</span></td>
						<td><span>Feuchte</span></td>
						<td><span>Regen</span></td>
					</tr>
					<tr>
						<td colspan="3"><hr /></td>
					</tr>
					<tr>
						<td><span>Wintergarten:</span></td>
						<td>
							<span class="ps-input" data-ws="_WG1_RT_SH" title="EG Wintergarten Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="_WG1_RT_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_WG1_RF_SH" title="EG Wintergarten Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="_WG1_RF_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td></td>
					</tr>
					<tr>
						<td><span>Schlafzimmer:</span></td>
						<td>
							<span class="ps-input" data-ws="_SZ1_RT_SH" title="EG Schlafzimmer Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="_SZ1_RT_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_SZ1_RF_SH" title="EG Schlafzimmer Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="_SZ1_RF_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td></td>
					</tr>
					<tr>
						<td><span>Flur OG:</span></td>
						<td>
							<span class="ps-input" data-ws="_FL2_RT_SH" title="OG Flur Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="_FL2_RT_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_FL2_RF_SH" title="OG Flur Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="_FL2_RF_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td></td>
					</tr>
					<tr>
						<td><span>Gartenhaus:</span></td>
						<td>
							<span class="ps-input" data-ws="GA1_FS_Temp" title="Gartenhaus Temperatur">-</span>
							<span class="<?=wpa::indikatorTempOut?>" data-ws="GA1_FS_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA1_FS_Hum" title="Gartenhaus Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="GA1_FS_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA1_FS_Vol" title="Gartenhaus Füllstand">-</span>
						</td>
					</tr>
					<tr>
						<td><span>Wetter:</span></td>
						<td>
							<span class="ps-input" data-ws="_GA_RT" title="Wetter Nord Temperatur">-</span>
							<span class="<?=wpa::indikatorTempOut?>" data-ws="_GA_RT"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA_WE_Sued_Hum" title="Wetter Süd Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="GA_WE_Sued_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA_WE_Ost_Rain" title="Wetter Ost Regen">-</span>
						</td>
					</tr>
					<tr>
						<td><span>Gaube:</span></td>
						<td></td>
						<td>
							<span class="ps-input" data-ws="GA2_WE_Gaube_Hum" title="Wetter Gaube Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="GA2_WE_Gaube_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA2_WE_Gaube_Rain" title="Wetter Gaube Regen">-</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div>
				<hr />
				<a href="std.weather.htm" class="ps-button forecast">Wettervorhersage</a>
				<a href="wetter.htm" class="ps-button"> Wetter</a>
				<span class="ps-button cleanMyTrends">Trends aufräumen</span>
			</div>
		</div>
		<div class="ps-container">
			<h2>Heizung</h2>
			<table summary="">
				<thead>
					<tr>
						<td><span>Heizung:</span></td>
						<td>
							<span class="ps-button <?=wpa::GreyGreen ?> ShellyDirect" data-ws="EG_HZG_FB">undefined</span>
						</td>
						<td>
							<span class="ps-input" data-ws="EG_HZG_FB_Power">undefined</span>
						</td>
					</tr>
					<tr><td colspan="3"><hr/></td></tr>
					<tr>
						<th>Messung</th>
						<th>Sollwert</th>
						<th>Ventil</th>
					</tr>
					<tr><td colspan="3"><hr/></td></tr>
				</thead>
				<tbody>
<?
	$kueche->print();
	$essen->print();
	$bad->print();
	$wzfenster->print();
	$wzmitte->print();
	$wzkamin->print();
	$eingang->print();
?>
				</tbody>
			</table>
		</div>
<?
$schlafzimmer->getHtml(false, 'Schlafzimmer', 'Fenster links', 'Fenster rechts');
?>
	</div>
	<div class="ps-container">
		<h2>Temperaturen</h2>
		<div id="ergTemp"></div>
	</div>
	<div class="ps-container">
		<h2>Feuchte</h2>
		<div id="ergHum"></div>
	</div>
</div>
