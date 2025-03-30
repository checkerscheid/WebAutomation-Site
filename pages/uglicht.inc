<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 30.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 730                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uglicht.inc 730 2025-03-30 13:24:07Z                     $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
use system\Helper\wpdatabase;
use system\Helper\wpa;

require_once 'system/Helper/wpa.psys';

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
const BU_KE = '172.17.80.129';

$points = array(
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
	'LI_BM_SY_DI'		=> '_SY_BM_LI_DI'
);

class uglicht {
	private const debug = false;
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
<div id="uglicht" class="page">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container">
		<div class="ps-container">
			<h2>Wohnzimmer</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uglicht::NeoPixel(WZ_NP, 'WZ_NP', 'Wohnzimmer NeoPixel')?>
					<?=uglicht::tasterShellyDimmer('Wohnzimmer <br class="showonportrait" />Lautsprecher', 'WZ_LS')?>
					<?=uglicht::NeoPixel(WZ_LS_NP, 'WZ_LS_NP', 'Lautsprecher Farbe')?>
					<?=uglicht::NeoPixel(WZ_PF_TE, 'WZ_PF_TE', 'RGB Pflanze')?>
					<?=uglicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Herz', 'WZ_HZ')?>
					<?=uglicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Stehlampe', 'WZ_SL')?>
					<?=uglicht::tasterShellyDimmer('Kamin', 'WZ_KA')?>
					<?=uglicht::tasterShellyDimmer('Wohnzimmer', 'WZ')?>
					<?=uglicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Lichtleiste', 'WZ_LL')?>
					<?=uglicht::CwWw(WZ_KE, 'WZ_KE', 'Wohnzimmer Event Lichterkette')?>
				</tbody>
			</table>
		</div>
		<div class="ps-container">
			<h2>Schlafzimmer</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uglicht::tasterShellyDimmer('Schlafzimmer', 'SZ')?>
				</tbody>
			</table>
		</div>
		<div class="ps-container">
			<h2>Büro</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uglicht::NeoPixel(BU_NP, 'BU_NP', 'Büro / Flur NeoPixel')?>
					<?=uglicht::tasterShellyDimmer('Büro', 'BU')?>
					<tr>
						<td colspan="2"><span class="ps-input twoColumns <?=wpa::GreenYellow ?>" data-ws="BU_RU_Manual">undefined</span></td>
					</tr>
					<tr>
						<td class="ps-tal"><span class="ps-button RU_Auto" data-ip="<?=BU_RU ?>" data-lichtip="172.17.80.120">Auto</span></td>
						<td class="ps-tar"><span class="ps-button RU_Manual" data-ip="<?=BU_RU ?>" data-lichtip="172.17.80.120">Manual</span></td>
					</tr>
					<?=uglicht::CwWw(BU_KE, 'BU_KE', 'Büro Event Lichterkette')?>
				</tbody>
			</table>
		</div>
		<div class="ps-container">
			<h2>Küche</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uglicht::tasterShelly('Küche', 'KU')?>
					<?=uglicht::CwWwAuto(KU_CwWw, 'KU_CwWw', 'Küche White-LED')?>
					<?=uglicht::tasterShelly('Küche <br class="showonportrait" />Strahler', 'KU_ST')?>
					<?=uglicht::tasterShelly('Küche <br class="showonportrait" />Kaffee', 'KU_KA')?>
				</tbody>
			</table>
		</div>
		<div class="ps-container">
			<h2>Schlafzimmer</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uglicht::tasterShellyDimmer('Flur', 'BU_FL')?>
					<tr>
						<td colspan="2"><span class="ps-input twoColumns <?=wpa::GreenYellow ?>" data-ws="FL_RU_Manual">undefined</span></td>
					</tr>
					<tr>
						<td class="ps-tal"><span class="ps-button RU_Auto" data-ip="<?=FL_RU ?>">Auto</span></td>
						<td class="ps-tar"><span class="ps-button RU_Manual" data-ip="<?=FL_RU ?>">Manual</span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="ps-container">
			<h2>Bad</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uglicht::tasterShellyDimmer('Bad', 'BA')?>
					<?=uglicht::tasterShelly('Bad <br class="showonportrait" />Spiegelschrank', 'BA_SP')?>
					<tr><td colspan="2"><a class="ps-button twoColumns" href="std.d1mini.BA_Lue.htm"> Bad Lüfter</a></td></tr>
				</tbody>
			</table>
		</div>
		<div class="ps-container">
			<h2>Kinderzimmer</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uglicht::NeoPixel(KZ_NP, 'KZ_NP', 'Kinderzimmer NeoPixel')?>
					<?=uglicht::tasterShelly('Kinderzimmer', 'KZ')?>
					<?=uglicht::CwWw(KZ_KE, 'KZ_KE', 'Kinderzimmer Lichterkette')?>
					<?=uglicht::tasterShelly('Bilderrahmen', 'KZ_RGB')?>
					<?=uglicht::tasterShelly('Kinderzimmer <br class="showonportrait" />Bett', 'KZ_BE')?>
					<?=uglicht::tasterShelly('Kinderzimmer <br class="showonportrait" />Nachtlicht', 'KZ_NL')?>
				</tbody>
			</table>
		</div>
	</div>
</div>
