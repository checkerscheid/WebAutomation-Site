<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.10.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 732                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: ughzg.inc 732 2025-04-03 16:39:02Z                       $ #
//#                                                                                 #
//###################################################################################
namespace pages;

use system\Helper\wpa;

require_once 'system/Helper/wpa.psys';

$zimmer = array(
	'WZ'	=> 'Wohnzimmer',
	'SZ'	=> 'Schlafzimmer',
	'BU'	=> 'Büro',
	'KU'	=> 'Küche',
	'BA'	=> 'Bad',
	'KZ'	=> 'Kinderzimmer',
);
$trendid = array(
	'BA' => 89,
	'BU' => 88,
	'KZ' => 90,
	'KU' => 21,
	'WZ' => 86,
	'SZ' => 87
);
$calid = array(
	'BA' => 1,
	'BU' => 2,
	'KZ' => 1024,
	'KZMAXVT' => 1052,
	'KU' => 4,
	'WZ' => 6,
	'SZ' => 5
);

foreach($zimmer as $kurz => $name) {
	if($kurz != 'KZ') {
		$points[$kurz . '_SM']			= '_' . $kurz . '_SM_HZG_Aus';
		$points[$kurz . '_FB']			= '_DO_' . $kurz . '_FB';
		$points[$kurz . '_FB_Hand']		= '_' . $kurz . '_FB_Hand';
		$points[$kurz . '_FB_HandWert']	= '_' . $kurz . '_FB_HandWert';
		$points[$kurz . '_FB_AutoWert']	= '_' . $kurz . '_FB_AutoWert';
	}
	if($kurz == 'KZ' || $kurz == 'KU' || $kurz == 'BA') {
		$points[$kurz . '_VT']			= '_' . $kurz . '_VT';
		$points[$kurz . '_VT_Hand']		= '_' . $kurz . '_VT_Hand';
		$points[$kurz . '_VT_HandWert']	= '_' . $kurz . '_VT_HandWert';
		$points[$kurz . '_VT_AutoWert']	= '_' . $kurz . '_VT_AutoWert';
	}
	$points[$kurz . '_ZP']				= ($kurz == 'KZ') ? '_' . $kurz . '_SW_Belegt' : '_' . $kurz . '_ZP';
	$points[$kurz . '_ZP_RM']			= '_' . $kurz . '_LED';
}
$points['KA_FB']			= '_DO_KA_FB';
$points['KA_FB_Hand']		= '_KA_FB_Hand';
$points['KA_FB_HandWert']	= '_KA_FB_HandWert';
$points['KA_FB_AutoWert']	= '_KA_FB_AutoWert';
$points['KZ_VT_MAX']		= '_KZ_VT_MAX';
?>
<div id="ughzg" class="page">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="ps-flex-container">
		<div class="ps-container">
			<h2>Heizung</h2>
			<table>
				<tbody>
					<tr>
						<td colspan="4"><hr /></td>
					</tr>
					<tr>
						<td><span>Temperatur</span></td>
						<td><span>Sollwert</span></td>
						<td><span>Ventil FB</span></td>
						<td><span>Ventil HZG</span></td>
					</tr>
					<tr>
						<td colspan="4"><hr /></td>
					</tr>
<?
foreach($zimmer as $kurz => $name) {
?>
					<tr>
						<td class="ps-taleft" colspan="4"><h4><?=$name?></h4></td>
					</tr>
					<tr>
						<td>
<?	if($kurz != 'KZ') { ?>
							<span class="ps-input" data-ws="_<?=$kurz?>_RT" data-sm="<?=$kurz?>_SM">-</span>
<? } else { ?>
							<span class="ps-input" data-ws="_<?=$kurz?>_RT">-</span>
<? } ?>
						</td>
						<td>
							<span class="ps-input ps-operable zp" data-ws="_<?=$kurz?>_RT_SW" data-bm="<?=$kurz?>_ZP_RM" data-zp="<?=$kurz?>_ZP" title="bm: ZP aktiv">-</span>
<? if($kurz == 'WZ') { ?>
							<br /><span class="ps-input ps-operable zp" data-ws="_KA_RT_SW" data-bm="<?=$kurz?>_ZP_RM" data-zp="<?=$kurz?>_ZP" title="bm: ZP aktiv">-</span>
<? } ?>
						</td>
						<td>
<?	if($kurz != 'KZ') { ?>
							<div class="handContainer">
								<span id="<?=$kurz?>_FB" class="ps-input pa-EinAus <?=wpa::GreyGreen?> bedienbar" data-ws="_DO_<?=$kurz?>_FB" data-popup="<?=$name?>">-</span>
								<span class="hand pa-hide" data-value="<?=$kurz?>_FB_Hand"></span>
							</div>
<? if($kurz == 'WZ') { ?>
							<div class="handContainer">
								<span id="KA_FB" class="ps-input pa-EinAus <?=wpa::GreyGreen ?> bedienbar" data-ws="_DO_KA_FB" data-popup="Kaminzimmer" title="Kaminzimmer">-</span>
								<span class="hand pa-hide" data-value="KA_FB_Hand"></span>
							</div>
<? } ?>
<? } else {?>
							<span id="KZ_VT_MAX" class="ps-input ps-param" data-ws="_KZ_VT_MAX" data-popup="Ventilstellung Maximalwert">-</span>
<? } ?>
						</td>
						<td>
<? if($kurz == 'KU' || $kurz == 'BA' || $kurz == 'KZ') { ?>
						<div class="handContainer">
							<span id="<?=$kurz?>_VT" class="ps-input pa-Analog bedienbar" data-value="<?=$kurz?>_VT" data-popup="<?=$name?>">-</span>
							<span class="hand pa-hide" data-value="<?=$kurz?>_VT_Hand"></span>
						</div>
<? } ?>
						</td>
					</tr>
<?
		$dpTemp = $kurz . '_RU_Temp';
		$dpHum = $kurz . '_RU_Hum';
		if($kurz == 'WZ' || $kurz == 'KZ') {
			$dpTemp = $kurz . '_HT3_Temp';
			$dpHum = $kurz . '_HT3_Hum';
		}
?>
					<tr>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="<?=$dpTemp ?>" title="UG <?=$name?> Temperatur">-</span>
								<span class="<?=wpa::indikatorTemp?>" data-ws="<?=$dpTemp ?>"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td>
							<div class="indiContainer">
								<span class="ps-input" data-ws="<?=$dpHum ?>" title="UG <?=$name?> Feuchte">-</span>
								<span class="<?=wpa::indikatorHum?>" data-ws="<?=$dpHum ?>"><?=wpHTML_EMPTY ?></span>
							</div>
						</td>
						<td colspan="2">
							<a href="std.trendview.<?=$trendid[$kurz] ?>.htm" class="ps-button ps-pluginbutton"><?=wpHTML_TREND ?></a>
							<a href="std.calendaredit.<?=$calid[$kurz] ?>.htm" class="ps-button ps-pluginbutton" title="Sollwert"><?=wpHTML_UHR ?></a>
<? if($kurz == 'KZ') { ?>
							<a href="std.calendaredit.<?=$calid[$kurz . 'MAXVT'] ?>.htm" class="ps-button ps-pluginbutton" title="Geräuchminimierung"><?=wpHTML_UHR ?></a>
<? } ?>
						</td>
					</tr>
<? } ?>
				</tbody>
			</table>
		</div>
	</div>
</div>
