<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.06.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 746                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1mini.inc 746 2025-06-28 14:59:52Z                      $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std, system\WebCom;
use system\Helper\wpa;
use system\Helper\wpNeoPixel;
use system\Helper\wpCwWw;
use system\Helper\wpClock;
use system\Helper\wpAnalogOut;
use system\Helper\wpUnderfloor;

require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/wpNeoPixel.psys';
require_once 'system/Helper/wpCwWw.psys';
require_once 'system/Helper/wpClock.psys';
require_once 'system/Helper/wpAnalogOut.psys';
require_once 'system/Helper/wpUnderfloor.psys';

$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'd1mini'");
$headline = $database->fetch();

$database->query("SELECT [id_d1mini], [name], [description], [ip], [mac] FROM [d1mini] WHERE [name] = '" . std::gets('param1'). "'");
$erg = $database->fetch();

$WebCom = new WebCom();
$res = $WebCom->send('getD1MiniStatus', $erg['ip']);
$d1Mini = \json_decode($res);
if(\json_last_error() != JSON_ERROR_NONE) {
	echo '<!-- Json Error: ' . \json_last_error_msg() . '-->';
	echo $res;
}
//std::test_array($d1Mini);


$points = array(
	'Online'		=> $erg['name'] . '_Online',
	'NewVersion'	=> $erg['name'] . '_NewVersion',
);
?>
<div id="d1mini">
	<h1><?=$headline['name']?> <?=$erg['name'] ?></h1>
	<h2><?=$erg['description'] ?></h2>
	<h3><?=($d1Mini->FreakaZoneDevice->Version ?? '--') ?></h3>
<?
$online = true;
if(!isset($d1Mini->FreakaZoneDevice)) {
	echo '<h1 class="ps-fontred">--- OFFLINE ---</h1>';
	$online = false;
}
?>
	<p id="storedIP" data-ip="<?=$erg['ip'] ?>">(<?=$erg['ip'] ?>, <?=$erg['mac'] ?>)</p>
	<div class="buttonContainer">
<?
if($online) {
?>
		<span class="ps-button SetCmd" data-cmd="ForceMqttUpdate" title="Force MQTT Update">Force MQTT Update</span>
		<span class="ps-button SetCmd" data-cmd="UpdateHTTP" title="Update">Update</span>
		<span class="ps-button SetCmd" data-cmd="RestartDevice" title="neu starten">neu starten</span>
		<span class="ps-button SetCmd" data-cmd="Blink" title="Blink">Blink</span>
<? } ?>
		<a class="ps-button" target="_blank" href="http://<?=$erg['ip'] ?>/print">Device Site</a>
	</div>
	<div class="progressContainer ps-hidden">
		<div class="ps-container">
			<div class="progressBg">
				<div class="progress">
					<span class="progressVal">0</span>
				</div>
			</div>
		</diV>
	</div>
	<div class="ps-flex-container page">
		<div class="ps-container">
			<table summary="">
				<tr>
					<td><span>newName:</span></td>
					<td><input class="ps-input newName" type="text" value="<?=$erg['name'] ?>" /></td>
					<? if($online) { ?>
					<td><span class="ps-button SetName">speichern</span></td>
					<? } ?>
				</tr>
				<tr>
					<td><span>newDescrption:</span></td>
					<td><input class="ps-input newDescrption" type="text" value="<?=$erg['description'] ?>" /></td>
					<? if($online) { ?>
					<td><span class="ps-button SetDescrption">speichern</span></td>
					<? } ?>
				</tr>
				<tr>
					<td colspan="3"><hr /></td>
				</tr>
				<tr>
					<td><span>updateChanel:</span></td>
					<td>
						<select class="ps-input newChanel">
<?
$updateChanel = array (
	99 => 'clean',
	0 => 'firmware',
	1 => 'light',
	2 => 'io',
	3 => 'heating',
	4 => 'rfid'
);
foreach($updateChanel as $key => $value) {
	echo '<option value="' . $key . '"' . (($d1Mini->FreakaZoneDevice->UpdateChanel ?? '') == $value ? ' selected="selected"' : '') . '>' . $value . '</option>';
}
?>
						</select>
					</td>
					<? if($online) { ?>
					<td><span class="ps-button SetChanel">speichern</span></td>
					<? } ?>
				</tr>
				<tr>
					<td><span>Last Boot Reason</span></td>
					<td><span class="ps-input" title="<?=($d1Mini->FreakaZoneDevice->RestartReason ?? '&#129668;') ?>"><?=($d1Mini->FreakaZoneDevice->RestartReason ?? '&#129668;') ?></span></td>
					<? if($online) { ?>
					<td></td>
					<? } ?>
				</tr>
				<tr>
					<td><span>Boot Counter</span></td>
					<td><span class="ps-input"><?=($d1Mini->FreakaZoneDevice->BootCounter ?? '&#8734;') ?></span></td>
					<? if($online) { ?>
					<td class="buttonContainer"><span class="ps-button SetCmd" data-cmd="ResetBootCounter">reset</span></td>
					<? } ?>
				</tr>
				<tr>
					<td><span>Online Since</span></td>
					<td><span><?=$d1Mini->FreakaZoneDevice->OnSince ?? '--' ?></span></td>
					<? if($online) { ?>
					<td></td>
					<? } ?>
				</tr>
				<tr>
					<td><span>Online Duration</span></td>
					<td><span><?=$d1Mini->FreakaZoneDevice->OnDuration ?? '--' ?></span></td>
					<? if($online) { ?>
					<td></td>
					<? } ?>
				</tr>
				<tr>
					<td><span>WiFi Since</span></td>
					<td><span><?=$d1Mini->FreakaZoneDevice->WiFiSince ?? '--' ?></span></td>
					<? if($online) { ?>
					<td></td>
					<? } ?>
				</tr>
				<tr>
					<td><span>MQTT Since</span></td>
					<td><span><?=$d1Mini->FreakaZoneDevice->MQTTSince ?? '--' ?></span></td>
					<? if($online) { ?>
					<td></td>
					<? } ?>
				</tr>
			</table>
		</div>
	<? if(($d1Mini->FreakaZoneDevice->useModul->DHT11 ?? false) ||
			($d1Mini->FreakaZoneDevice->useModul->DHT22 ?? false)) {
			$points['ERROR_HT'] = $erg['name'] . '_ERROR_HT';
	?>
		<div class="ps-container">
			<h3>DHT</h3>
			<table summary="">
				<tr>
					<td>Temperature:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_Temp">undefined</span></td>
				</tr>
				<tr>
					<td>Humidity:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_Hum">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/DHT/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->DHT->CalcCycle ?> ms
						</span>
					</td>
				</tr>
				<tr>
					<td>Temperature Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/DHT/Correction/Temperature"
							data-unit="K">
							<?=$d1Mini->FreakaZoneDevice->DHT->TemperatureCorrection ?> K
						</span>
					</td>
				</tr>
				<tr>
					<td>Humidity Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/DHT/Correction/Humidity"
							data-unit="%rF">
							<?=$d1Mini->FreakaZoneDevice->DHT->HumidityCorrection ?> %rF
						</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->LDR ?? false) {
		$points['ERROR_LDR'] = $erg['name'] . '_ERROR_LDR';
	?>
		<div class="ps-container">
			<h3>LDR</h3>
			<table summary="">
				<tr>
					<td>LDR:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_LDR">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/LDR/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->LDR->CalcCycle ?> ms
						</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-topic="<?=$erg['name'] ?>/settings/LDR/useAvg"
							data-unit="0:Off;1:On;">
							<?=($d1Mini->FreakaZoneDevice->LDR->useAvg ? 'On' : 'Off') ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/LDR/Correction"
							data-unit="lux">
							<?=$d1Mini->FreakaZoneDevice->LDR->Correction ?> lux
						</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Light ?? false) {
		$points['ERROR_Licht'] = $erg['name'] . '_ERROR_Licht';
	?>
		<div class="ps-container">
			<h3>Light</h3>
			<table summary="">
				<tr>
					<td>Light:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_Light">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Light/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Light->CalcCycle ?> ms
						</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-topic="<?=$erg['name'] ?>/settings/Light/useAvg"
							data-unit="0:Off;1:On;">
							<?=($d1Mini->FreakaZoneDevice->Light->useAvg ? 'On' : 'Off') ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Light/Correction"
							data-unit="lux">
							<?=$d1Mini->FreakaZoneDevice->Light->Correction ?> lux
						</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->BM ?? false) { ?>
		<div class="ps-container">
			<h3>BM</h3>
			<table summary="">
				<tr>
					<td>BM:</td>
					<td><span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_BM">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
		<? if($d1Mini->FreakaZoneDevice->useModul->LDR ?? false) { ?>
				<tr>
					<td colspan="2"><h3>LDR</h3></td>
				</tr>
				<tr>
					<td>Threshold:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/BM/Threshold"
							data-unit="lux">
							<?=$d1Mini->FreakaZoneDevice->BM->LDR->Threshold ?> lux
						</span>
					</td>
				</tr>
				<tr>
					<td>Light To Turn On:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/BM/LightToTurnOn">
							<?=$d1Mini->FreakaZoneDevice->BM->LDR->LightToTurnOn ?>
						</span>
					</td>
				</tr>
		<? } ?>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Window ?? false) { ?>
		<div class="ps-container">
			<h3>Fenster</h3>
			<table summary="">
				<tr>
					<td>Fensterkontakt:</td>
					<td><span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_Window">undefined</span></td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Window2 ?? false) { ?>
		<div class="ps-container">
			<h3>Fenster 2</h3>
			<table summary="">
				<tr>
					<td>Fensterkontakt:</td>
					<td><span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_Window2">undefined</span></td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Window3 ?? false) { ?>
		<div class="ps-container">
			<h3>Fenster3</h3>
			<table summary="">
				<tr>
					<td>Fensterkontakt:</td>
					<td><span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_Window3">undefined</span></td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Weight ?? false) {
		$points['ERROR_Weight'] = $erg['name'] . '_ERROR_Weight';
	?>
		<div class="ps-container">
			<h3>Weight</h3>
			<table summary="">
				<tr>
					<td>Weight:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_Weight">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Weight/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Weight->CalcCycle ?> ms
						</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-topic="<?=$erg['name'] ?>/settings/Weight/useAvg"
							data-unit="0:Off;1:On;">
							<?=($d1Mini->FreakaZoneDevice->Weight->useAvg ? 'On' : 'Off') ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Tare:</td>
					<td>
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Weight/SetTare" data-write="1">Tare</span>
					</td>
				</tr>
				<tr>
					<td>Tare 1 kg:</td>
					<td>
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Weight/Set1kg" data-write="1">Tare 1 kg</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
<?
if($d1Mini->FreakaZoneDevice->useModul->NeoPixel ?? false) {
	$neoPixel = new wpNeoPixel($erg['ip'], $erg['name']);
	$neoPixel->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$neoPixel->getColorPicker();
	$neoPixel->getColorScenen();
}
if($d1Mini->FreakaZoneDevice->useModul->CwWw ?? false) {
	$cwww = new wpCwWw($erg['ip'], $erg['name']);
	$cwww->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$cwww->getColorPicker();
}
if($d1Mini->FreakaZoneDevice->useModul->Clock ?? false) {
	$clock = new wpClock($erg['ip'], $erg['name']);
	$clock->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$clock->getHtml();
}
if(($d1Mini->FreakaZoneDevice->useModul->AnalogOut ?? false) &&
	(!$d1Mini->FreakaZoneDevice->useModul->NeoPixel ?? false) &&
	(!$d1Mini->FreakaZoneDevice->useModul->CwWw ?? false)) {
	$points['AnalogOutHandError'] = $erg['name'] . '_AnalogOutHandError';
	$analogOut = new wpAnalogOut($erg['ip'], $erg['name']);
	$analogOut->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$analogOut->getHtml(true);
}
if(($d1Mini->FreakaZoneDevice->useModul->AnalogOut2 ?? false) &&
	(!$d1Mini->FreakaZoneDevice->useModul->NeoPixel ?? false) &&
	(!$d1Mini->FreakaZoneDevice->useModul->CwWw ?? false)) {
	$points['AnalogOut2HandError'] = $erg['name'] . '_AnalogOut2HandError';
?>
		<div class="ps-container">
			<h3>AnalogOut2</h3>
			<table summary="">
				<tr>
					<td colspan="3">Analog Output 2:</td>
					<td colspan="3">
						<span class="ps-input" data-ws="<?=$erg['name'] ?>_AnalogOut2">undefined</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Modus:</td>
					<td colspan="3">
						<span class="ps-input <?=wpa::GreenYellow ?>" data-ws="<?=$erg['name'] ?>_AnalogOut2HandError">undefined</span>
					</td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Automatikwert:</td>
					<td colspan="3">
						<span class="ps-input" data-ws="<?=$erg['name'] ?>_AnalogOut2Auto">undefined</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Handwert:</td>
					<td colspan="3">
						<span class="ps-input" data-ws="<?=$erg['name'] ?>_AnalogOut2Hand">undefined</span>
					</td>
				</tr>
				<tr>
					<td colspan="6"><h3>Bedienung</h3></td>
				</tr>
				<tr>
					<td colspan="2">
						Hand / Auto
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/AnalogOut2/SetHand" data-write="0">Automatik</span>
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/AnalogOut2/SetHand" data-write="1">Hand</span>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						Handwert
					</td>
					<td colspan="4"></td>
				</tr>
				<tr>
					<td colspan="6">
						<div class="topic-slider" data-ws="<?=$erg['name'] ?>_AnalogOut2Hand" data-topic="<?=$erg['name'] ?>/settings/AnalogOut2/SetHandValue"></div>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Underfloor1 ?? false) { ?>
<?
	$underfloor1 = new wpUnderfloor($erg['ip'], $erg['name'], 1);
	$underfloor1->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$underfloor1->getUnderfloor();
	$points['Underfloor1_HandError'] = $erg['name'] . '_Underfloor1_HandError';
?>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Underfloor2 ?? false) { ?>
<?
	$underfloor2 = new wpUnderfloor($erg['ip'], $erg['name'], 2);
	$underfloor2->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$underfloor2->getUnderfloor();
	$points['Underfloor2_HandError'] = $erg['name'] . '_Underfloor2_HandError';
?>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Underfloor3 ?? false) { ?>
<?
	$underfloor3 = new wpUnderfloor($erg['ip'], $erg['name'], 3);
	$underfloor3->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$underfloor3->getUnderfloor();
	$points['Underfloor3_HandError'] = $erg['name'] . '_Underfloor3_HandError';
?>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Underfloor4 ?? false) { ?>
<?
	$underfloor4 = new wpUnderfloor($erg['ip'], $erg['name'], 4);
	$underfloor4->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$underfloor4->getUnderfloor();
	$points['Underfloor4_HandError'] = $erg['name'] . '_Underfloor4_HandError';
?>
	<? } ?>
	<? if(($d1Mini->FreakaZoneDevice->useModul->Relais ?? false) ||
		($d1Mini->FreakaZoneDevice->useModul->RelaisShield ?? false)) {
			$points['PumpeHandError'] = $erg['name'] . '_PumpeHandError';
	?>
		<div class="ps-container">
			<h3>Relais</h3>
			<table summary="">
				<tr>
					<td colspan="3">Pumpe Output:</td>
					<td colspan="3">
						<span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_Pumpe">undefined</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Modus:</td>
					<td colspan="3">
						<span class="ps-input <?=wpa::GreenYellow ?>" data-ws="<?=$erg['name'] ?>_PumpeHandError">undefined</span>
					</td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Automatikwert:</td>
					<td colspan="3">
						<span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_PumpeAuto">undefined</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Handwert:</td>
					<td colspan="3">
						<span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_PumpeHand">undefined</span>
					</td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="6"><h3>Bedienung</h3></td>
				</tr>
				<tr>
					<td colspan="2">
						Hand / Auto
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Relais/SetHand" data-write="0">Automatik</span>
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Relais/SetHand" data-write="1">Hand</span>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						Handwert
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Relais/SetHandValue" data-write="0">Aus</span>
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Relais/SetHandValue" data-write="1">Ein</span>
					</td>
				</tr>
	<? if($d1Mini->FreakaZoneDevice->useModul->Moisture ?? false) {
		$points['WaterEmpty'] = $erg['name'] . '_WaterEmpty';
	?>
				<tr>
					<td colspan="6"><h3>Moisture</h3></td>
				</tr>
				<tr>
					<td colspan="3">waterEmpty:</td>
					<td colspan="3"><span class="ps-input <?=wpa::GreenYellow ?>" data-ws="<?=$erg['name'] ?>_WaterEmpty">undefined</span></td>
				</tr>
				<tr>
					<td colspan="2">
						set Water
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Relais/SetWaterEmpty" data-write="1">Empty</span>
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Relais/SetWaterEmpty" data-write="0">Full</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">pumpActive:</td>
					<td colspan="3">
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Relais/PumpActive"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Relais->Moisture->pumpActive ?> sec</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">pumpPause:</td>
					<td colspan="3">
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Relais/PumpPause"
							data-unit="min">
							<?=$d1Mini->FreakaZoneDevice->Relais->Moisture->pumpPause ?> min</span>
					</td>
				</tr>
	<? } ?>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">pumpTest:</td>
					<td colspan="3">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/Relais/StartPumpTest" data-write="1">Ein</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Rain ?? false) {
		$points['ERROR_Rain'] = $erg['name'] . '_ERROR_Rain';
	?>
		<div class="ps-container">
			<h3>Rain</h3>
			<table summary="">
				<tr>
					<td>Rain:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_Rain">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Rain/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Rain->CalcCycle ?> ms</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-topic="<?=$erg['name'] ?>/settings/Rain/useAvg"
							data-unit="0:Off;1:On;">
							<?=($d1Mini->FreakaZoneDevice->Rain->useAvg ? 'On' : 'Off') ?></span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Rain/Correction"
							data-unit="lux">
							<?=$d1Mini->FreakaZoneDevice->Rain->Correction ?> lux</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Moisture ?? false) {
		$points['ERROR_Moisture'] = $erg['name'] . '_ERROR_Moisture';
		$points['ERROR_MoistureMin'] = $erg['name'] . '_ERROR_MoistureMin';
	?>
		<div class="ps-container">
			<h3>Moisture</h3>
			<table summary="">
				<tr>
					<td>Moisture:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_Moisture">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Moisture->CalcCycle ?> ms
						</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-unit="0:Off;1:On;"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/useAvg">
							<?=($d1Mini->FreakaZoneDevice->Moisture->useAvg ? 'On' : 'Off') ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Min Alarm:</td>
					<td>
						<span class="ps-input ps-param"
							data-unit="%"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/Min">
							<?=$d1Mini->FreakaZoneDevice->Moisture->Min ?> %
						</span>
					</td>
				</tr>
				<tr>
					<td>Dry:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/Dry">
							<?=$d1Mini->FreakaZoneDevice->Moisture->Dry ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Wet:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/Wet">
							<?=$d1Mini->FreakaZoneDevice->Moisture->Wet ?></span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Distance ?? false) {
		$points['ERROR_Distance'] = $erg['name'] . '_ERROR_Distance';
	?>
		<div class="ps-container">
			<h3>Distance</h3>
			<table summary="">
				<tr>
					<td>Volume:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_Vol">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Distance/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Distance->CalcCycle ?> ms
						</span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-unit="l"
							data-topic="<?=$erg['name'] ?>/settings/Distance/correction">
							<?=$d1Mini->FreakaZoneDevice->Distance->Correction ?> l
						</span>
					</td>
				</tr>
				<tr>
					<td>max Volume:</td>
					<td>
						<span class="ps-input ps-param"
							data-unit="l"
							data-topic="<?=$erg['name'] ?>/settings/Distance/maxVolume">
							<?=$d1Mini->FreakaZoneDevice->Distance->maxVolume ?> l
						</span>
					</td>
				</tr>
				<tr>
					<td>height:</td>
					<td>
						<span class="ps-input ps-param"
							data-unit="cm"
							data-topic="<?=$erg['name'] ?>/settings/Distance/Height">
							<?=$d1Mini->FreakaZoneDevice->Distance->height ?> cm
						</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->ImpulseCounter ?? false) { ?>
		<div class="ps-container">
			<h3>ImpulseCounter</h3>
			<table summary="">
				<tr>
					<td>KWh:</td>
					<td><span class="ps-input" data-ws="<?=$erg['name'] ?>_KWh">undefined</span></td>
				</tr>
				<tr>
					<td>set KWh:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/ImpulseCounter/SetKWh"
							data-ws="<?=$erg['name'] ?>_KWh"
							data-unit="KWh">undefined
						</span>
					</td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
				<tr>
					<td>Max Cycle:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/ImpulseCounter/CalcCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->ImpulseCounter->CalcCycle ?> ms
						</span>
					</td>
				</tr>
				<tr>
					<td>Silver:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/ImpulseCounter/Silver">
							<?=$d1Mini->FreakaZoneDevice->ImpulseCounter->Silver ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Red:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/ImpulseCounter/Red">
							<?=$d1Mini->FreakaZoneDevice->ImpulseCounter->Red ?></span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	</div>
	<div class="ps-container logContainer ps-hidden">
		<h3>Log</h3>
		<pre class="d1MiniLog">

		</pre>
	</div>
</div>
