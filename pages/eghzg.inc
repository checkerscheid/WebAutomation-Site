<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 30.09.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 732                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: eghzg.inc 732 2025-04-03 16:39:02Z                       $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\Helper\wpa;
require_once 'system/Helper/wpa.psys';
class eghzg {
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
	public function setTemp($temp) {
		$this->temp = $temp;
	}
	public function setHum($hum) {
		$this->hum = $hum;
	}
	public function print() {
?>
		<div class="ps-container">
			<table summary="">
				<tbody>
					<tr>
						<td colspan="3">
							<h2><?=$this->headline ?></h2>
						</td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="<?=$this->temp ?>">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="<?=$this->temp ?>"><?=wpHTML_EMPTY ?></span>
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
				</tbody>
			</table>
		</div>
<?
	}
}
$kueche = new eghzg('Küche', 1, 1);
$kueche->setTemp('KU1_RU_Temp');
$kueche->setHum('KU1_RU_Hum');

$wzmitte = new eghzg('Wohnzimmer Mitte', 1, 2);
$wzmitte->setTemp('WZ1_RU_Temp');
$wzmitte->setHum('WZ1_RU_Hum');

$wzfenster = new eghzg('Wohnzimmer Fenster', 1, 3);
$wzfenster->setTemp('WZ1_RU_Temp');
$wzfenster->setHum('WZ1_RU_Hum');

$wzkamin = new eghzg('Wohnzimmer Kamin', 1, 4);
$wzkamin->setTemp('WZ1_RU_Temp');
$wzkamin->setHum('WZ1_RU_Hum');

$essen = new eghzg('Flur Essen', 2, 1);
$essen->setTemp('ES1_RU_Temp');
$essen->setHum('ES1_RU_Hum');

$bad = new eghzg('Bad WC', 2, 2);
$bad->setTemp('BA1_RU_Temp');
$bad->setHum('BA1_RU_Hum');

$eingang = new eghzg('Flur Eingang', 2, 3);
$eingang->setTemp('FL1_RU_Temp');
$eingang->setHum('FL1_RU_Hum');
?>
<div id="eghzg" class="page">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="ps-flex-container">
<?
	$kueche->print();
	$wzmitte->print();
	$wzfenster->print();
	$wzkamin->print();
	$essen->print();
	$bad->print();
	$eingang->print();
?>
	</div>
</div>
