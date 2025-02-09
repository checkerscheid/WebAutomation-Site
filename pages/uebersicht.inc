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
//# Revision     : $Rev:: 716                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uebersicht.inc 716 2025-02-09 09:35:20Z                  $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
use system\Helper\security;
use system\Helper\wpdatabase;
use system\std;
use system\Helper\wpa;
require_once 'system/Helper/wpa.psys';

$useWeihnachten = true;
$showEnergy = false;
$showWindow = false;

$zimmer = array(
	'WZ'	=> 'Wohnzimmer',
	'SZ'	=> 'Schlafzimmer',
	'BU'	=> 'Büro',
	'KU'	=> 'Küche',
	'BA'	=> 'Bad',
	'KZ'	=> 'Kinderzimmer',
);

$points = array(
	'FK_FL'				=> '_BU_FK',
	'FK_FL_KE'			=> '_BU_KE_FK',
	'FK_WZ'				=> '_WZ_FK',
	'FK_WZ_TE'			=> '_WZ_FK_TE',
	'FK_SZ'				=> '_SZ_FK',
	'FK_KU'				=> '_KU_FK',
	'FK_KZli'			=> '_KZ_FK_LI',
	'FK_KZre'			=> '_KZ_FK_RE',
	'FK_BA'				=> '_BA_FK',

	'LI_BM_WZ'			=> '_WZ_BM_LI',
	'LI_BM_WZ_LL'		=> '_WZ_BM_LI_LL',
	'LI_BM_WZ_LS'		=> '_WZ_BM_LI_LS',
	'LI_BM_WZ_SL'		=> '_WZ_BM_LI_SL',
	'LI_BM_WZ_HZ'		=> '_WZ_BM_LI_HZ',
	'LI_BM_WZ_KA'		=> '_WZ_BM_LI_KA',
	'LI_BM_SZ'			=> '_SZ_BM_LI',
	'LI_BM_KU'			=> '_KU_BM_LI',
	'LI_BM_KU_ST'		=> '_KU_BM_LI_ST',
	'LI_BM_KU_KA'		=> '_KU_BM_LI_KA',
	'LI_BM_BU'			=> '_BU_BM_LI',
	'LI_BM_BU_FL'		=> '_BU_BM_LI_FL',
	'LI_BM_KZ'			=> '_KZ_BM_LI',
	'LI_BM_KZ_RGB'		=> '_KZ_BM_LI_RGB',
	'LI_BM_KZ_BE'		=> '_KZ_BM_LI_BE',
	'LI_BM_KZ_NL'		=> '_KZ_BM_LI_NL',
	'LI_BM_BA'			=> '_BA_BM_LI',
	'LI_BM_BA_SP'		=> '_BA_BM_LI_SP',
	'LI_BM_KE'			=> '_KE_BM_LI',
	'LI_BM_GA'			=> '_GA_BM_LI',
	'LI_BM_GA_BT'		=> '_GA_BM_LI_BT',
	'LI_BM_GA_TR'		=> '_GA_BM_LI_TR',
	'LI_BM_SS'			=> '_SY_SS',
	'LI_BM_WW'			=> '_SY_WW',
	'LI_BM_KS'			=> '_SY_KS',
	'LI_BM_EG_HZG_FB'	=> 'EG_HZG_FB',

	'LI_BM_WB_FE'		=> '_WB_BM_LI_FE',
	'LI_BM_WB_KA'		=> '_WB_BM_LI_KA',
	'LI_BM_WB_WB'		=> '_WB_BM_LI_WB',
	'LI_BM_WB_AU'		=> '_WB_BM_LI_AU',
	'LI_BM_SY_DI'		=> '_SY_BM_LI_DI',
	'DO_SS_Led'			=> '_DO_SS_Led',
	'SS_TA_Led'			=> '_SS_TA_Led',

	'LI_BM_MU_WLAN'		=> '_MU_BM_WLAN',

	//'LI_BM_AN_SD1'		=> '_AN_BM_LI_SD1',
	//'LI_BM_AN_SD2'		=> '_AN_BM_LI_SD2',

	'LI_GA_TR_Rest'		=> '_GA_LI_TR_Rest',

	'Wartung'			=> '_Wartung',
	'RandomNumeric'		=> 'RandomNumeric'
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
	'KU' => 4,
	'WZ' => 6,
	'SZ' => 5
);

const WZ_NP = '172.17.80.99';
const WZ_LS_NP = '172.17.80.98';
const WZ_PF_TE = '172.17.80.106';
const WZ_KE = '172.17.80.97';
const KZ_NP = '172.17.80.169';
const KZ_KE = '172.17.80.164';
const KU_CwWw = '172.17.80.142';
const BU_RU = '172.17.80.125';
const FL_RU = '172.17.80.128';
const BU_NP = '172.17.80.122';
//std::test_array($iplist);
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

class uebersicht {
	private const debug = false;
	public static function taster($name, $kurz) {
		$return = '<tr>';
		$return .= '<td>'.$name.':</td>';
		$return .= '<td><span data-value="LI_'.$kurz.'" class="ps-input pa-Meldung" data-true="Ein" data-false="Aus">undefined</span></td>';
		$return .= '</tr>';
		return $return;
	}
	public static function tasterShelly($name, $kurz) {
		GLOBAL $points;
		$database = new wpDatabase();
		$sql = "SELECT [s].[ip], [s].[autooff], [s].[un], [s].[pw]
			FROM [shelly] [s]
			LEFT JOIN [rest] [r] ON [s].[id_shelly] = [r].[id_shelly]
			INNER JOIN [dp] ON [r].[id_onoff] = [dp].[id_dp]
			WHERE [dp].[name] = '".$points['LI_BM_'.$kurz]."'";
		if(self::debug) std::test_array($sql);
		$database->query($sql);
		$erg = $database->fetch();
		$return = '
			<tr' . ($erg['autooff'] > 0 ? ' class="ps-hastimer"' : '') . '>
				<td class="description">';
		if(substr($_SERVER['REMOTE_ADDR'], 0, 7) == '172.17.' || security::checkGroup(security::entwickler)) {
			$unpw = ($erg['un'] != '' && $erg['pw'] != '') ? $erg['un'] . ':' . $erg['pw'] . '@' : '';
			$return .= '<a href="http://'.$unpw.$erg['ip'].'" target="_blank">'.$name.'</a>:';
		} else {
			$return .= $name.':';
		}
		$return .= '
					<br />
					<span class="time_remain" data-remaintime="0"></span>
				</td>
				<td>
					<span data-value="LI_BM_'.$kurz.'" data-bm="LI_BM_'.$kurz.'" data-ip="'.$erg['ip'].'" data-autooff="'.$erg['autooff'].'" class="ps-button pa-Meldung ShellyDirect">undefined</span>
				</td>
			</tr>';
		return $return;
	}
	public static function tasterShellyDimmer($name, $kurz) {
		GLOBAL $points;
		$database = new wpDatabase();
		$sql = "SELECT [s].[ip], [s].[autooff], [s].[un], [s].[pw]
			FROM [shelly] [s]
			LEFT JOIN [rest] [r] ON [s].[id_shelly] = [r].[id_shelly]
			INNER JOIN [dp] ON [r].[id_onoff] = [dp].[id_dp]
			WHERE [dp].[name] = '".$points['LI_BM_'.$kurz]."'";
		if(self::debug) std::test_array($sql);
		$database->query($sql);
		$erg = $database->fetch();
		$return = '
			<tr' . ($erg['autooff'] > 0 ? ' class="ps-hastimer"' : '') . '>
				<td class="description">';
		if(substr($_SERVER['REMOTE_ADDR'], 0, 7) == '172.17.' || security::checkGroup(security::entwickler)) {
			$unpw = ($erg['un'] != '' && $erg['pw'] != '') ? $erg['un'] . ':' . $erg['pw'] . '@' : '';
			$return .= '<a href="http://'.$unpw.$erg['ip'].'" target="_blank">'.$name.'</a>:';
		} else {
			$return .= $name.':';
		}
		$return .= '
					<br />
					<span class="time_remain" data-remaintime="0"></span>
				</td>
				<td>
					<span data-value="LI_BM_'.$kurz.'" data-ip="'.$erg['ip'].'" data-autooff="'.$erg['autooff'].'" class="ps-button pa-Meldung ShellyDirect">undefined</span>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div class="shelly-dimmer" data-ip="'.$erg['ip'].'"></div>
				</td>
			</tr>';
		return $return;
	}
	public static function NeoPixel($ip, $name, $desc) {
		$return = '
			<tr>
				<td class="description">
					<a href="std.d1mini.' . $name . '.htm">' . $desc . '</a>
				</td>
				<td>
					<span class="ps-button setNeoPixelOff ' . wpa::GreyYellow . '" data-ws="' . $name . '_MaxPercent" data-ip="' . $ip . '"
						data-True="Ein" data-False="Aus">undefined</span>
				</td>
			</tr>
			<!--tr>
				<td colspan="2">
					<div class="brightness-slider" data-ws="' . $name . '_MaxPercent" data-ip="' . $ip . '"></div>
				</td>
			</tr-->';
		return $return;
	}
	public static function CwWwAuto($ip, $name, $desc) {
		$return = '
			<tr>
				<td class="description">
					<a href="std.d1mini.' . $name . '.htm">' . $desc . '</a>
				</td>
				<td>
					<span class="ps-button setCwWwOff ' . wpa::GreyYellow . '" data-ws="' . $name . '_MaxPercent" data-ip="' . $ip . '"
						data-True="Ein" data-False="Aus">undefined</span>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<span class="ps-input ' . wpa::GreenYellow . ' twoColumns" data-ws="' . $name . '_Manual">-</span>
				</td>
			</tr>
			<!--tr>
				<td colspan="2">
					<div class="brightness-slider" data-ws="' . $name . '_MaxPercent" data-ip="' . $ip . '"></div>
				</td>
			</tr-->';
		return $return;
	}
	public static function CwWw($ip, $name, $desc) {
		$return = '
			<tr>
				<td class="description">
					<a href="std.d1mini.' . $name . '.htm">' . $desc . '</a>
				</td>
				<td>
					<span class="ps-button setCwWwOff ' . wpa::GreyYellow . '" data-ws="' . $name . '_MaxPercent" data-ip="' . $ip . '"
						data-True="Ein" data-False="Aus">undefined</span>
				</td>
			</tr>';
		return $return;
	}
}
?>

<div id="uebersicht" class="page">
	<h3 class="pa-hide ps-tacenter ps-roundborder ps-shadow wartungmeldung" data-value="Wartung">Wartung aktiv</h3>
	<div class="ps-flex-container">
		<div class="ps-container">
			<h2>Licht</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><span class="ps-button twoColumns AllesAus"> Alles aus</span></td></tr>
					<tr><td colspan="2"><hr /></td></tr>
					<tr><td colspan="2"><span class="ps-button twoColumns wz-gemuetlich">Couch</span></td></tr>
					<?=uebersicht::NeoPixel(WZ_NP, 'WZ_NP', 'Wohnzimmer NeoPixel')?>
					<?=uebersicht::tasterShellyDimmer('Wohnzimmer <br class="showonportrait" />Lautsprecher', 'WZ_LS')?>
					<?=uebersicht::NeoPixel(WZ_LS_NP, 'WZ_LS_NP', 'Lautsprecher Farbe')?>
					<?=uebersicht::NeoPixel(WZ_PF_TE, 'WZ_PF_TE', 'RGB Pflanze')?>
					<?=uebersicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Herz', 'WZ_HZ')?>
					<?=uebersicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Stehlampe', 'WZ_SL')?>
					<?=uebersicht::tasterShellyDimmer('Kamin', 'WZ_KA')?>
					<?=uebersicht::tasterShellyDimmer('Wohnzimmer', 'WZ')?>
					<?=uebersicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Lichtleiste', 'WZ_LL')?>
					<?=uebersicht::CwWw(WZ_KE, 'WZ_KE', 'Wohnzimmer Event Lichterkette')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Schlafzimmer', 'SZ')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::NeoPixel(BU_NP, 'BU_NP', 'Büro / Flur NeoPixel')?>
					<?=uebersicht::tasterShellyDimmer('Büro', 'BU')?>
					<tr>
						<td colspan="2"><span class="ps-input twoColumns <?=wpa::GreenYellow ?>" data-ws="BU_RU_Manual">undefined</span></td>
					</tr>
					<tr>
						<td class="ps-tal"><span class="ps-button RU_Auto" data-ip="<?=BU_RU ?>" data-lichtip="172.17.80.120">Auto</span></td>
						<td class="ps-tar"><span class="ps-button RU_Manual" data-ip="<?=BU_RU ?>" data-lichtip="172.17.80.120">Manual</span></td>
					</tr>
					<?=uebersicht::CwWw(WZ_KE, 'BU_KE', 'Büro Event Lichterkette')?>
				</tbody>
			</table>
		</div>

		<div class="ps-container">
			<h2>Licht</h2>
			<table>
				<tbody>
					<?=uebersicht::tasterShelly('Küche', 'KU')?>
					<?=uebersicht::CwWwAuto(KU_CwWw, 'KU_CwWw', 'Küche White-LED')?>
					<?=uebersicht::tasterShelly('Küche <br class="showonportrait" />Strahler', 'KU_ST')?>
					<?=uebersicht::tasterShelly('Küche <br class="showonportrait" />Kaffee', 'KU_KA')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Flur', 'BU_FL')?>
					<tr>
						<td colspan="2"><span class="ps-input twoColumns <?=wpa::GreenYellow ?>" data-ws="FL_RU_Manual">undefined</span></td>
					</tr>
					<tr>
						<td class="ps-tal"><span class="ps-button RU_Auto" data-ip="<?=FL_RU ?>">Auto</span></td>
						<td class="ps-tar"><span class="ps-button RU_Manual" data-ip="<?=FL_RU ?>">Manual</span></td>
					</tr>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Bad', 'BA')?>
					<?=uebersicht::tasterShelly('Bad <br class="showonportrait" />Spiegelschrank', 'BA_SP')?>
					<tr><td colspan="2"><a class="ps-button twoColumns" href="std.d1mini.BA_Lue.htm"> Bad Lüfter</a></td></tr>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::NeoPixel(KZ_NP, 'KZ_NP', 'Kinderzimmer NeoPixel')?>
					<?=uebersicht::tasterShelly('Kinderzimmer', 'KZ')?>
					<?=uebersicht::CwWw(KZ_KE, 'KZ_KE', 'Kinderzimmer Lichterkette')?>
					<?=uebersicht::tasterShelly('Bilderrahmen', 'KZ_RGB')?>
					<?=uebersicht::tasterShelly('Kinderzimmer <br class="showonportrait" />Bett', 'KZ_BE')?>
					<?=uebersicht::tasterShelly('Kinderzimmer <br class="showonportrait" />Nachtlicht', 'KZ_NL')?>
				</tbody>
			</table>
		</div>

		<div class="ps-container">
			<h2><?=($useWeihnachten ? 'Weihnachten' : 'Licht')?></h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<? if($useWeihnachten) { ?>
					<?=uebersicht::tasterShelly('Fenster', 'WB_FE')?>
					<?=uebersicht::tasterShelly('Kamin', 'WB_KA')?>
					<?=uebersicht::tasterShelly('Aussen', 'WB_AU')?>
					<?=uebersicht::tasterShelly('Weihnachtsbaum', 'WB_WB')?>
					<? } ?>
					<?=uebersicht::tasterShelly('Testboard', 'SY_DI')?>
					<!--tr>
						<td colspan="2"><span class="ps-button wz-feuer">set Feuerfarbe</span></td>
					</tr-->
					<? if($useWeihnachten) { ?>
					<tr>
						<td><span class="ps-button wz-wn-an">Alles an</span></td>
						<td><span class="ps-button wz-wn-aus">Alles aus</span></td>
					</tr>
					<? } ?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('Keller', 'KE')?>
					<?=uebersicht::tasterShelly('Garten', 'GA')?>
					<?=uebersicht::tasterShelly('Garten <br class="showonportrait" />Blumentöpfe', 'GA_BT')?>
					<tr>
						<td class="description">Schaltschrank LED:</td>
						<td><span class="ps-button pa-Meldung clicklicht" data-value="DO_SS_Led" data-bm="DO_SS_Led" data-taster="SS_TA_Led">undefined</span></td>
					</tr>
					<tr>
						<td></td>
						<td><span class="ps-input" data-ws="_SS_RT">undefined</span></td>
					</tr>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('Schaltschrank', 'SS')?>
					<?=uebersicht::tasterShelly('Warmwasser', 'WW')?>
					<?=uebersicht::tasterShelly('Kühlschrank', 'KS')?>
					<? /*=uebersicht::taster('Garten <br class="showonportrait" />Töpfe', 'GA_BT')*/?>
					<tr><td colspan="2"><hr /></td></tr>
					<tr><td colspan="2"><h2>Mudda</h2></td></tr>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('Heizung', 'EG_HZG_FB')?>
					<!--<?=uebersicht::tasterShelly('WLAN', 'MU_WLAN')?>-->
					<? /* ?>
					<tr><td colspan="2"><h2>Anette</h2></td></tr>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('Steckdose oben', 'AN_SD1')?>
					<?=uebersicht::tasterShelly('Steckdose unten', 'AN_SD2')?>
					<? */ ?>
					<tr>
						<td colspan="2"><span class="ps-button twoColumns RenewShellyState">RenwShellyState</span></td>
					</tr>
				</tbody>
			</table>
		</div>
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
							<a href="std.calendaredit.<?=$calid[$kurz] ?>.htm" class="ps-button ps-pluginbutton"><?=wpHTML_UHR ?></a>
						</td>
					</tr>
<? } ?>
					<tr>
						<td colspan="4"><hr /></td>
					</tr>
					<tr>
						<td colspan="2"><span>Untergeschoss</span></td>
						<td colspan="2"><span>Mudda</span></td>
					</tr>
					<tr>
						<td colspan="4"><hr /></td>
					</tr>
					<tr>
						<td class="ps-taleft" colspan="2"><span>Keller</span></td>
						<td class="ps-taleft" colspan="2"><span>Wintergarten</span></td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="KE_Temp" title="Keller Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="KE_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="KE_Hum" title="Keller Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="KE_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="WG1_HTp_Temp" title="EG Wintergarten Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="WG1_HTp_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="WG1_HTp_Hum" title="EG Wintergarten Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="WG1_HTp_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
					</tr>
					<tr>
						<td class="ps-taleft" colspan="2"><span>Wetterstation Ost</span></td>
						<td class="ps-taleft" colspan="2"><span>Schlafzimmer</span></td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="GA_WE_Ost_Temp" title="Wetterstation Ost Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="GA_WE_Ost_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA_WE_Ost_Hum" title="Wetterstation Ost Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="GA_WE_Ost_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="SZ1_HT_Temp" title="EG Schlafzimmer Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="SZ1_HT_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="SZ1_HT_Hum" title="EG Schlafzimmer Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="SZ1_HT_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
					</tr>
					<tr>
						<td class="ps-taleft" colspan="2"><span>Wetterstation Süd</span></td>
						<td class="ps-taleft" colspan="2"><span>OG Flur</span></td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="GA_WE_Sued_Temp" title="Wetterstation Süd Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="GA_WE_Sued_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA_WE_Sued_Hum" title="Wetterstation Süd Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="GA_WE_Sued_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="FL2_HT_Temp" title="OG Flur Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="FL2_HT_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="FL2_HT_Hum" title="OG Flur Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="FL2_HT_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
					</tr>
					<tr>
						<td class="ps-taleft" colspan="2"><span>Gartenhaus</span></td>
						<td class="ps-taleft" colspan="2"><span></span></td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="GA1_FS_Temp" title="Gartenhaus Temperatur">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="GA1_FS_Temp"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="GA1_FS_Hum" title="Gartenhaus Feuchte">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="GA1_FS_Hum"><?=wpHTML_EMPTY ?></span>
						</td>
						<td colspan="2">
						</td>
				</tbody>
			</table>
		</div>
<? if($showWindow) { ?>
		<div class="ps-container">
			<h2>Fenster</h2>
			<table id="Fensterkontakt">
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<tr>
						<td>Haustür:</td>
						<td><span data-value="FK_FL" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr>
						<td>Kellertür:</td>
						<td><span data-value="FK_FL_KE" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr><td colspan="2"><hr /></td></tr>
					<tr>
						<td>Wohnzimmer:</td>
						<td><span data-value="FK_WZ" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr>
						<td>Terrassentür:</td>
						<td><span data-value="FK_WZ_TE" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr><td colspan="2"><hr /></td></tr>
					<tr>
						<td>Schlafzimmer:</td>
						<td><span data-value="FK_SZ" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr><td colspan="2"><hr /></td></tr>
					<tr>
						<td>Küche:</td>
						<td><span data-value="FK_KU" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr><td colspan="2"><hr /></td></tr>
					<tr>
						<td>Kinderzimmer links:</td>
						<td><span data-value="FK_KZli" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr>
						<td>Kinderzimmer rechts:</td>
						<td><span data-value="FK_KZre" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
					<tr><td colspan="2"><hr /></td></tr>
					<tr>
						<td>Bad:</td>
						<td><span data-value="FK_BA" class="ps-input pa-Meldung">undefined</span></td>
					</tr>
				</tbody>
			</table>
		</div>
<? } ?>
<? if($showEnergy) { ?>
		<div class="ps-container">
			<h2>Energie</h2>
			<table id="energie">
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<tr>
						<td>Leistung:</td>
						<td><span data-ws="Erdgeschoss_Power" class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Blindleistung:</td>
						<td><span data-ws="Erdgeschoss_ReactivePower" class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>cos &phi;:</td>
						<td><span data-ws="Erdgeschoss_pf" class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Energie:</td>
						<td><span data-ws="Erdgeschoss_Energy" class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>erzeugte Energie:</td>
						<td><span data-ws="Erdgeschoss_returnedEnergy" class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Spannung:</td>
						<td><span data-ws="Erdgeschoss_Voltage" class="ps-input">undefined</span></td>
					</tr>
				</tbody>
			</table>
		</div>
<? } ?>
	</div>
</div>

