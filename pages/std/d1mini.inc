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
//# Revision     : $Rev:: 677                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1mini.inc 677 2024-07-15 13:51:59Z                      $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std, system\WebCom;
use system\Helper\wpa;

require_once 'system/Helper/wpa.psys';

$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'd1mini'");
$headline = $database->fetch();

$database->query("SELECT [id_d1mini], [name], [description], [ip], [mac] FROM [d1mini] WHERE [name] = '" . std::gets('param1'). "'");
$erg = $database->fetch();

$WebCom = new WebCom();
$d1Mini = \json_decode($WebCom->send('getD1MiniStatus', $erg['ip']));
?>
<div id="d1mini">
	<h1><?=$headline['name']?> <?=$erg['name'] ?></h1>
	<h2><?=$erg['description'] ?></h2>
	<p>(<?=$erg['ip'] ?>, <?=$erg['mac'] ?>)</p>
	<div class="buttonContainer">
		<span class="ps-button SetCmd" data-ip="<?=$erg['ip'] ?>" data-cmd="ForceMqttUpdate" title="Force MQTT Update">Force MQTT Update</span>
		<span class="ps-button SetCmd" data-ip="<?=$erg['ip'] ?>" data-cmd="UpdateHTTP" title="Setup Http">Setup Http</span>
		<span class="ps-button SetCmd" data-ip="<?=$erg['ip'] ?>" data-cmd="RestartDevice" title="neu starten">neu starten</span>
	</div>
	<div class="ps-flex-container page">
	<? if($d1Mini->FreakaZoneDevice->useModul->DHT11 ||
			$d1Mini->FreakaZoneDevice->useModul->DHT22) { ?>
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
							data-topic="<?=$erg['name'] ?>/settings/DHT/maxCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->DHT->MaxCycleDHT ?> sec
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
	<? if($d1Mini->FreakaZoneDevice->useModul->LDR) { ?>
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
							data-topic="<?=$erg['name'] ?>/settings/LDR/maxCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->LDR->MaxCycleLDR ?> sec
						</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-topic="<?=$erg['name'] ?>/settings/LDR/useAvg"
							data-unit="0:Off;1:On;">
							<?=($d1Mini->FreakaZoneDevice->LDR->useLDRAvg ? 'On' : 'Off') ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/LDR/Correction"
							data-unit="lux">
							<?=$d1Mini->FreakaZoneDevice->LDR->LDRCorrection ?> lux
						</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Light) { ?>
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
							data-topic="<?=$erg['name'] ?>/settings/Light/maxCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Light->MaxCycleLight ?> sec
						</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-topic="<?=$erg['name'] ?>/settings/Light/useAvg"
							data-unit="0:Off;1:On;">
							<?=($d1Mini->FreakaZoneDevice->Light->useLightAvg ? 'On' : 'Off') ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Light/Correction"
							data-unit="lux">
							<?=$d1Mini->FreakaZoneDevice->Light->LightCorrection ?> lux
						</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->BM) { ?>
		<div class="ps-container">
			<h3>BM</h3>
			<table summary="">
				<tr>
					<td>BM:</td>
					<td><span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_BM">undefined</span></td>
				</tr>
				<tr><td colspan="2"><hr /></td></tr>
		<? if($d1Mini->FreakaZoneDevice->useModul->LDR) { ?>
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
	<? if($d1Mini->FreakaZoneDevice->useModul->Window) { ?>
		<div class="ps-container">
			<h3>Fenster</h3>
			<table summary="">
				<tr>
					<td>Fensterkontakt:</td>
					<td><span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_FK">undefined</span></td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->AnalogOut) { ?>
		<div class="ps-container">
			<h3>AnalogOut</h3>
			<table summary="">
				<tr>
					<td colspan="3">Analog Output:</td>
					<td colspan="3">
						<span class="ps-input" data-ws="<?=$erg['name'] ?>_AnalogOut">undefined</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Modus:</td>
					<td colspan="3">
						<span class="ps-input <?=wpa::GreenYellow ?>" data-ws="<?=$erg['name'] ?>_AnalogOutHandError">undefined</span>
					</td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3">Automatikwert:</td>
					<td colspan="3">
						<span class="ps-input" data-ws="<?=$erg['name'] ?>_AnalogOutAuto">undefined</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Handwert:</td>
					<td colspan="3">
						<span class="ps-input" data-ws="<?=$erg['name'] ?>_AnalogOutHand">undefined</span>
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
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/AnalogOut/SetHand" data-write="0">Automatik</span>
					</td>
					<td colspan="2">
						<span class="ps-button writeTopic" data-topic="<?=$erg['name'] ?>/settings/AnalogOut/SetHand" data-write="1">Hand</span>
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
						<div class="topic-slider" data-ws="<?=$erg['name'] ?>_AnalogOutHand" data-topic="<?=$erg['name'] ?>/settings/AnalogOut/SetHandValue"></div>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Relais ||
			$d1Mini->FreakaZoneDevice->useModul->RelaisShield) { ?>
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
	<? if($d1Mini->FreakaZoneDevice->useModul->Moisture) { ?>
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
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Rain) { ?>
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
							data-topic="<?=$erg['name'] ?>/settings/Rain/maxCycle"
							data-unit="sec">
							<?=$d1Mini->FreakaZoneDevice->Rain->MaxCycleRain ?> sec</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-topic="<?=$erg['name'] ?>/settings/Rain/useAvg"
							data-unit="0:Off;1:On;">
							<?=($d1Mini->FreakaZoneDevice->Rain->useRainAvg ? 'On' : 'Off') ?></span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Rain/Correction"
							data-unit="lux">
							<?=$d1Mini->FreakaZoneDevice->Rain->RainCorrection ?> lux</span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Moisture) { ?>
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
							data-topic="<?=$erg['name'] ?>/settings/Moisture/maxCycle">
							<?=$d1Mini->FreakaZoneDevice->Moisture->MaxCycleMoisture ?> sec
						</span>
					</td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td>
						<span class="ps-input ps-parambool"
							data-unit="0:Off;1:On;"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/useAvg">
							<?=($d1Mini->FreakaZoneDevice->Moisture->useMoistureAvg ? 'On' : 'Off') ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Min Alarm:</td>
					<td>
						<span class="ps-input ps-param"
							data-unit="%"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/Min">
							<?=$d1Mini->FreakaZoneDevice->Moisture->MoistureMin ?> %
						</span>
					</td>
				</tr>
				<tr>
					<td>Dry:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/Dry">
							<?=$d1Mini->FreakaZoneDevice->Moisture->MoistureDry ?>
						</span>
					</td>
				</tr>
				<tr>
					<td>Wet:</td>
					<td>
						<span class="ps-input ps-param"
							data-topic="<?=$erg['name'] ?>/settings/Moisture/Wet">
							<?=$d1Mini->FreakaZoneDevice->Moisture->MoistureWet ?></span>
					</td>
				</tr>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->Distance) { ?>
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
							data-unit="sec"
							data-topic="<?=$erg['name'] ?>/settings/Distance/maxCycle">
							<?=$d1Mini->FreakaZoneDevice->Distance->MaxCycleDistance ?> sec
						</span>
					</td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td>
						<span class="ps-input ps-param"
							data-unit="l"
							data-topic="<?=$erg['name'] ?>/settings/Distance/correction">
							<?=$d1Mini->FreakaZoneDevice->Distance->distanceCorrection ?> l
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
	</div>
</div>
