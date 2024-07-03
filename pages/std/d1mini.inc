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
//# Revision     : $Rev:: 631                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1mini.inc 631 2024-06-29 12:29:38Z                      $ #
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
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->DHT->MaxCycleDHT ?>" /></td>
				</tr>
				<tr>
					<td>Temperature Correction:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->DHT->TemperatureCorrection ?> K" /></td>
				</tr>
				<tr>
					<td>Humidity Correction:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->DHT->HumidityCorrection ?> %rF" /></td>
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
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->LDR->MaxCycleLDR ?>" /></td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td><input type="text" class="ps-input" value="<?=($d1Mini->FreakaZoneDevice->LDR->useLDRAvg ? 'On' : 'Off') ?>" /></td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->LDR->LDRCorrection ?> lux" /></td>
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
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Light->MaxCycleLight ?>" /></td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td><input type="text" class="ps-input" value="<?=($d1Mini->FreakaZoneDevice->Light->useLightAvg ? 'On' : 'Off') ?>" /></td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Light->LightCorrection ?> lux" /></td>
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
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->BM->LDR->Threshold ?> lux" /></td>
				</tr>
				<tr>
					<td>Light To Turn On:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->BM->LDR->LightToTurnOn ?>" /></td>
				</tr>
		<? } ?>
			</table>
		</div>
	<? } ?>
	<? if($d1Mini->FreakaZoneDevice->useModul->FK) { ?>
		<div class="ps-container">
			<h3>FK</h3>
			<table summary="">
				<tr>
					<td>FK:</td>
					<td><span class="ps-input <?=wpa::GreyGreen ?>" data-ws="<?=$erg['name'] ?>_FK">undefined</span></td>
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
					<td colspan="3"><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Relais->Moisture->pumpActive ?> sec" /></td>
				</tr>
				<tr>
					<td colspan="3">pumpPause:</td>
					<td colspan="3"><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Relais->Moisture->pumpPause ?> min" /></td>
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
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Rain->MaxCycleRain ?>" /></td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td><input type="text" class="ps-input" value="<?=($d1Mini->FreakaZoneDevice->Rain->useRainAvg ? 'On' : 'Off') ?>" /></td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Rain->RainCorrection ?> l/min" /></td>
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
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Moisture->MaxCycleMoisture ?>" /></td>
				</tr>
				<tr>
					<td>use Avg:</td>
					<td><input type="text" class="ps-input" value="<?=($d1Mini->FreakaZoneDevice->Moisture->useMoistureAvg ? 'On' : 'Off') ?>" /></td>
				</tr>
				<tr>
					<td>Min Alarm:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Moisture->MoistureMin ?> %" /></td>
				</tr>
				<tr>
					<td>Dry:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Moisture->MoistureDry ?>" /></td>
				</tr>
				<tr>
					<td>Wet:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Moisture->MoistureWet ?>" /></td>
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
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Distance->MaxCycleDistance ?>" /></td>
				</tr>
				<tr>
					<td>Correction:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Distance->distanceCorrection ?> l" /></td>
				</tr>
				<tr>
					<td>max Volume:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Distance->maxVolume ?> l" /></td>
				</tr>
				<tr>
					<td>height:</td>
					<td><input type="text" class="ps-input" value="<?=$d1Mini->FreakaZoneDevice->Distance->height ?> cm" /></td>
				</tr>
			</table>
		</div>
	<? } ?>
	</div>
</div>
