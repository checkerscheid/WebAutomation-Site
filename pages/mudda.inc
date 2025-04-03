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
//# Revision     : $Rev:: 731                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mudda.inc 731 2025-04-03 16:37:32Z                       $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
use system\Helper\wpa;
use system\Helper\security;
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
	private $isRealTemp = false;
	private $realTemp;
	private $isHum = false;
	private $hum;
	private $trendid;
	private $calid;
	public function __construct($headline, $group, $valve, $trendid, $calid) {
		$this->headline = $headline;
		$this->group = $group;
		$this->valve = $valve;
		$this->trendid = $trendid;
		$this->calid = $calid;
	}
	public function setTemp($temp) {
		$this->isRealTemp = true;
		$this->realTemp = $temp;
	}
	public function setHum($hum) {
		$this->isHum = true;
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
				<div class="indiContainer">
					<span class="ps-input" data-ws="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>_ReadedTemp">-</span>
					<span class="<?=wpa::indikatorTemp?>" data-ws="EG_HZG_VTG<?=$this->group ?>_Underfloor<?=$this->valve ?>_ReadedTemp"><?=wpHTML_EMPTY ?></span>
				</div>
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
				<? if($this->isRealTemp) { ?>
				<div class="indiContainer">
					<span class="ps-input" data-ws="<?=$this->realTemp ?>">-</span>
					<span class="<?=wpa::indikatorTemp?>" data-ws="<?=$this->realTemp ?>"><?=wpHTML_EMPTY ?></span>
				</div>
				<? } ?>
			</td>
			<td>
				<? if($this->isHum) { ?>
				<div class="indiContainer">
					<span class="ps-input" data-ws="<?=$this->hum ?>">-</span>
					<span class="<?=wpa::indikatorHum?>" data-ws="<?=$this->hum ?>"><?=wpHTML_EMPTY ?></span>
				</div>
				<? } ?>
			</td>
			<td>
				<a href="std.trendview.<?=$this->trendid ?>.htm" class="ps-button ps-pluginbutton"><?=wpHTML_TREND ?></a>
				<a href="std.calendaredit.<?=$this->calid ?>.htm" class="ps-button ps-pluginbutton"><?=wpHTML_UHR ?></a>
			</td>
		</tr>
<?
	}
}
$kueche = new mudda('Küche', 1, 1, 81, 1037);
$kueche->setHum('KU1_RU_Hum');
if(security::checkGroup(security::entwickler)) $kueche->setTemp('KU1_RU_Temp');

$wzmitte = new mudda('Wohnzimmer Mitte', 1, 2, 84, 1038);
$wzmitte->setHum('WZ1_RU_Hum');
if(security::checkGroup(security::entwickler)) $wzmitte->setTemp('WZ1_RU_Temp');

$wzfenster = new mudda('Wohnzimmer Fenster', 1, 3, 82, 1039);
$wzfenster->setHum('WZ1_RU_Hum');
if(security::checkGroup(security::entwickler)) $wzfenster->setTemp('WZ1_RU_Temp');

$wzkamin = new mudda('Wohnzimmer Kamin', 1, 4, 83, 1040);
$wzkamin->setHum('WZ1_RU_Hum');
if(security::checkGroup(security::entwickler)) $wzkamin->setTemp('WZ1_RU_Temp');

$essen = new mudda('Flur Essen', 2, 1, 78, 1041);
$essen->setHum('FL1_ES_RU_Hum');
if(security::checkGroup(security::entwickler)) $essen->setTemp('FL1_ES_RU_Temp');

$bad = new mudda('Bad WC', 2, 2, 79, 1042);
$bad->setHum('BA1_RU_Hum');
if(security::checkGroup(security::entwickler)) $bad->setTemp('BA1_RU_Temp');

$eingang = new mudda('Flur Eingang', 2, 3, 80, 1043);
$eingang->setHum('FL1_EI_RU_Hum');
if(security::checkGroup(security::entwickler)) $eingang->setTemp('FL1_EI_RU_Temp');

$schlafzimmer = new wpAnalogOut('172.17.44.110', 'SZ1_VT', 85, 1051);
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
							<div class="indiContainer">
								<span class="ps-input" data-ws="WG1_HTp_Temp" title="EG Wintergarten Temperatur">-</span>
								<span class="<?=wpa::indikatorTemp?>" data-ws="WG1_HTp_Temp"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="WG1_HTp_Hum" title="EG Wintergarten Feuchte">-</span>
								<span class="<?=wpa::indikatorHum?>" data-ws="WG1_HTp_Hum"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td></td>
					</tr>
					<tr>
						<td><span>Schlafzimmer:</span></td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="SZ1_HT_Temp" title="EG Schlafzimmer Temperatur">-</span>
								<span class="<?=wpa::indikatorTemp?>" data-ws="SZ1_HT_Temp"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="SZ1_HT_Hum" title="EG Schlafzimmer Feuchte">-</span>
								<span class="<?=wpa::indikatorHum?>" data-ws="SZ1_HT_Hum"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td></td>
					</tr>
					<tr>
						<td><span>Flur OG:</span></td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="FL2_HT_Temp" title="OG Flur Temperatur">-</span>
								<span class="<?=wpa::indikatorTemp?>" data-ws="FL2_HT_Temp"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="FL2_HT_Hum" title="OG Flur Feuchte">-</span>
								<span class="<?=wpa::indikatorHum?>" data-ws="FL2_HT_Hum"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td></td>
					</tr>
					<tr>
						<td><span>Gartenhaus:</span></td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="GA1_FS_Temp" title="Gartenhaus Temperatur">-</span>
								<span class="<?=wpa::indikatorTempOut?>" data-ws="GA1_FS_Temp"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="GA1_FS_Hum" title="Gartenhaus Feuchte">-</span>
								<span class="<?=wpa::indikatorHum?>" data-ws="GA1_FS_Hum"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<span class="ps-input" data-ws="GA1_FS_Vol" title="Gartenhaus Füllstand">-</span>
						</td>
					</tr>
					<tr>
						<td><span>Wetter:</span></td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="_GA_RT" title="Wetter Nord Temperatur">-</span>
								<span class="<?=wpa::indikatorTempOut?>" data-ws="_GA_RT"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="GA_WE_Sued_Hum" title="Wetter Süd Feuchte">-</span>
								<span class="<?=wpa::indikatorHum?>" data-ws="GA_WE_Sued_Hum"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<span class="ps-input" data-ws="GA_WE_Ost_Rain" title="Wetter Ost Regen">-</span>
						</td>
					</tr>
					<tr>
						<td><span>Gaube:</span></td>
						<td></td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="GA2_WE_Gaube_Hum" title="Wetter Gaube Feuchte">-</span>
								<span class="<?=wpa::indikatorHum?>" data-ws="GA2_WE_Gaube_Hum"><?=wpHTML_EMPTY ?></span>
							</div>
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
				<a href="wetter.htm" class="ps-button">Wetter</a>
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
							<span class="ps-button <?=wpa::YellowGreen ?> ShellyDirect" data-ws="EG_HZG_FB">undefined</span>
						</td>
						<td>
							<span class="ps-input" data-ws="EG_HZG_FB_Power">undefined</span>
						</td>
					</tr>
					<tr><td colspan="3"><hr/></td></tr>
					<tr>
						<th><span>Messung</span></th>
						<th><span>Sollwert</span></th>
						<th><span>Ventil</span></th>
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
$schlafzimmer->getHtml(security::checkGroup(security::administrator), 'Schlafzimmer', 'Fenster links', 'Fenster rechts');
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
