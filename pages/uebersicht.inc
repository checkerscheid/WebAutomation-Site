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
//# Revision     : $Rev:: 658                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: uebersicht.inc 658 2024-07-07 22:13:04Z                  $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
use system\helper\security;
use system\helper\wpdatabase;
use system\std;

$useWS = true;
$useWeihnachten = false;
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
	'LI_BM_WZ_FE'		=> '_WZ_BM_LI_FE',
	'LI_BM_SZ'			=> '_SZ_BM_LI',
	'LI_BM_KU'			=> '_KU_BM_LI',
	'LI_BM_KU_ST'		=> '_KU_BM_LI_ST',
	'LI_BM_KU_KA'		=> '_KU_BM_LI_KA',
	'LI_BM_BU'			=> '_BU_BM_LI',
	'LI_BM_BU_FL'		=> '_BU_BM_LI_FL',
	'LI_BM_KZ'			=> '_KZ_BM_LI',
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
	'LI_BM_WM'			=> '_SY_WM',

	'LI_BM_WB_FE'		=> '_WB_BM_LI_FE',
	'LI_BM_WB_KA'		=> '_WB_BM_LI_KA',
	'LI_BM_WB_WB'		=> '_WB_BM_LI_WB',
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
if(!$useWS) {
	$points['Erdgeschoss_Power']			= 'Erdgeschoss_Power';
	$points['Erdgeschoss_ReactivePower']	= 'Erdgeschoss_ReactivePower';
	$points['Erdgeschoss_pf']				= 'Erdgeschoss_pf';
	$points['Erdgeschoss_Energy']			= 'Erdgeschoss_Energy';
	$points['Erdgeschoss_returnedEnergy']	= 'Erdgeschoss_returnedEnergy';
	$points['Erdgeschoss_Voltage']			= 'Erdgeschoss_Voltage';
}
//std::test_array($iplist);
foreach($zimmer as $kurz => $name) {
	if(!$useWS) {
		$points[$kurz . '_RT']			= '_' . $kurz . '_RT';
		$points[$kurz . '_RT_SW']		= '_' . $kurz . '_RT_SW';
	}
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
}
?>

<div id="uebersicht" class="page">
	<h3 class="pa-hide ps-tacenter ps-roundborder ps-shadow wartungmeldung" data-value="Wartung">Wartung aktiv</h3>
	<div class="ps-flex-container">
		<div class="ps-container ps-flex-item">
			<h2>Licht</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Wohnzimmer <br class="showonportrait" />Lautsprecher', 'WZ_LS')?>
					<?=uebersicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Herz', 'WZ_HZ')?>
					<?=uebersicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Stehlampe', 'WZ_SL')?>
					<?=uebersicht::tasterShellyDimmer('Kamin', 'WZ_KA')?>
					<?=uebersicht::tasterShellyDimmer('Wohnzimmer', 'WZ')?>
					<?=uebersicht::tasterShelly('Wohnzimmer <br class="showonportrait" />Lichtleiste', 'WZ_LL')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Schlafzimmer', 'SZ')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Büro', 'BU')?>
				</tbody>
			</table>
		</div>

		<div class="ps-container ps-flex-item">
			<h2>Licht</h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('Küche', 'KU')?>
					<?=uebersicht::tasterShelly('Küche <br class="showonportrait" />Strahler', 'KU_ST')?>
					<?=uebersicht::tasterShelly('Küche <br class="showonportrait" />Kaffee', 'KU_KA')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Flur', 'BU_FL')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShellyDimmer('Bad', 'BA')?>
					<?=uebersicht::tasterShelly('Bad <br class="showonportrait" />Spiegelschrank', 'BA_SP')?>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('Kinderzimmer', 'KZ')?>
					<?=uebersicht::tasterShelly('Kinderzimmer <br class="showonportrait" />Bett', 'KZ_BE')?>
					<?=uebersicht::tasterShelly('Kinderzimmer <br class="showonportrait" />Nachtlicht', 'KZ_NL')?>
					<tr><td colspan="2"><hr /></td></tr>
					<tr><td colspan="2"><span class="ps-button wz-gemuetlich">Couch</span></td></tr>
				</tbody>
			</table>
		</div>

		<div class="ps-container ps-flex-item">
			<h2><?=($useWeihnachten ? 'Weihnachten' : 'Licht')?></h2>
			<table>
				<tbody>
					<tr><td colspan="2"><hr /></td></tr>
					<? if($useWeihnachten) { ?>
					<?=uebersicht::tasterShelly('Fenster', 'WB_FE')?>
					<?=uebersicht::tasterShelly('Kamin', 'WB_KA')?>
					<?=uebersicht::tasterShelly('Weihnachtsbaum', 'WB_WB')?>
					<? } ?>
					<?=uebersicht::tasterShelly('Testboard', 'SY_DI')?>
					<?=uebersicht::tasterShelly('Feuer', 'WZ_FE')?>
					<tr>
						<td colspan="2"><span class="ps-button wz-feuer">set Feuerfarbe</span></td>
					</tr>
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
					<?=uebersicht::tasterShelly('Waschmaschine', 'WM')?>
					<? /*=uebersicht::taster('Garten <br class="showonportrait" />Töpfe', 'GA_BT')*/?>
					<tr><td colspan="2"><hr /></td></tr>
					<tr><td colspan="2"><h2>Mudda</h2></td></tr>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('WLAN', 'MU_WLAN')?>
					<? /* ?>
					<tr><td colspan="2"><h2>Anette</h2></td></tr>
					<tr><td colspan="2"><hr /></td></tr>
					<?=uebersicht::tasterShelly('Steckdose oben', 'AN_SD1')?>
					<?=uebersicht::tasterShelly('Steckdose unten', 'AN_SD2')?>
					<? */ ?>
				</tbody>
			</table>
		</div>
		<div class="ps-container ps-flex-item ps-zimmer-info">
			<h2>Heizung</h2>
			<table>
				<tbody>
					<tr>
						<td colspan="4"><hr /></td>
					</tr>
					<tr>
						<td>Temperatur</td>
						<td>Sollwert</td>
						<td>Ventil FB</td>
						<td>Ventil HZG</td>
					</tr>
					<tr>
						<td colspan="4"><hr /></td>
					</tr>
<?
foreach($zimmer as $kurz => $name) {
	$SH = $kurz == 'WZ' || $kurz == 'KZ' ? 'SH' : 'D1';
?>
					<tr>
						<td colspan="4"><span><?=$name?></span></td>
					</tr>
					<tr>
						<td>
<?	if($kurz != 'KZ') { ?>
							<span class="ps-input" <?=($useWS ? 'data-ws' : 'data-value') . '="' . ($useWS ? '_' : '') . $kurz . '_RT"'?> data-sm="<?=$kurz?>_SM">-</span>
<? } else { ?>
							<span class="ps-input" <?=($useWS ? 'data-ws' : 'data-value') . '="' . ($useWS ? '_' : '') . $kurz . '_RT"'?>>-</span>
<? } ?>
						</td>
						<td><span class="ps-input ps-operable zp" <?=($useWS ? 'data-ws' : 'data-value') . '="' . ($useWS ? '_' : '') . $kurz . '_RT_SW"'?> data-bm="<?=$kurz?>_ZP_RM" data-zp="<?=$kurz?>_ZP" title="bm: ZP aktiv">-</span></td>
						<td>
<?	if($kurz != 'KZ') { ?>
						<span id="<?=$kurz?>_FB" class="ps-input pa-EinAus bedienbar" <?='data-' . ($useWS ? 'ws' : 'value') . '="' . ($useWS ? '_DO_' : '') . $kurz . '_FB"'?> data-popup="<?=$name?>">-</span><span class="hand pa-hide" data-value="<?=$kurz?>_FB_Hand"></span>
						<?=($kurz == 'WZ') ? '<br /><span id="KA_FB" class="ps-input pa-EinAus bedienbar" data-' . ($useWS ? 'ws' : 'value') . '="' . ($useWS ? '_DO_' : '') . 'KA_FB" data-popup="Kaminzimmer" title="Kaminzimmer">-</span><span class="hand pa-hide" data-value="KA_FB_Hand"></span>' : '' ?>
<? } else {?>
						<span id="KZ_VT_MAX" class="ps-input ps-param" <?='data-' . ($useWS ? 'ws' : 'value') . '="' . ($useWS ? '_' : '') . 'KZ_VT_MAX"'?> data-popup="Ventilstellung Maximalwert">-</span>
<? } ?>
						</td>
						<td>
<? if($kurz == 'KU' || $kurz == 'BA' || $kurz == 'KZ') { ?>
						<span id="<?=$kurz?>_VT" class="ps-input pa-Analog bedienbar" data-value="<?=$kurz?>_VT" data-popup="<?=$name?>">-</span><span class="hand pa-hide" data-value="<?=$kurz?>_VT_Hand"></span>
<? } ?>
						</td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="_<?=$kurz?>_RT_<?=$SH ?>" title="UG <?=$name?> Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_<?=$kurz?>_RT_<?=$SH ?>"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_<?=$kurz?>_RF_<?=$SH ?>" title="UG <?=$name?> Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_<?=$kurz?>_RF_<?=$SH ?>"><?=wpHTML_EMPTY ?></span>
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
						<td>
							<span class="ps-input" data-ws="_KE_RT_SH" title="Keller Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_KE_RT_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_KE_RF_SH" title="Keller Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_KE_RF_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_WG1_RT_SH" title="EG Wintergarten Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_WG1_RT_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_WG1_RF_SH" title="EG Wintergarten Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_WG1_RF_SH"><?=wpHTML_EMPTY ?></span>
						</td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="_GA_Ost_RT_D1" title="Wetterstation Ost Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_GA_Ost_RT_D1"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_GA_Ost_RF_D1" title="Wetterstation Ost Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_GA_Ost_RF_D1"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_SZ1_RT_SH" title="EG Schlafzimmer Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_SZ1_RT_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_SZ1_RF_SH" title="EG Schlafzimmer Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_SZ1_RF_SH"><?=wpHTML_EMPTY ?></span>
						</td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="_GA_Sued_RT_D1" title="Wetterstation Süd Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_GA_Sued_RT_D1"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_GA_Sued_RF_D1" title="Wetterstation Süd Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_GA_Sued_RF_D1"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_FL2_RT_SH" title="OG Flur Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_FL2_RT_SH"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_FL2_RF_SH" title="OG Flur Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_FL2_RF_SH"><?=wpHTML_EMPTY ?></span>
						</td>
					</tr>
					<tr>
						<td>
							<span class="ps-input" data-ws="_GA_RT_D1" title="Gartenhaus Temperatur">-</span>
							<span class="icon-indikator indikator-temp" data-wsindi="_GA_RT_D1"><?=wpHTML_EMPTY ?></span>
						</td>
						<td>
							<span class="ps-input" data-ws="_GA_RF_D1" title="Gartenhaus Feuchte">-</span>
							<span class="icon-indikator indikator-hum" data-wsindi="_GA_RF_D1"><?=wpHTML_EMPTY ?></span>
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
						<td><span <?='data-' . ($useWS ? 'ws' : 'value') . '="Erdgeschoss_Power"'?> class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Blindleistung:</td>
						<td><span <?='data-' . ($useWS ? 'ws' : 'value') . '="Erdgeschoss_ReactivePower"'?> class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>cos &phi;:</td>
						<td><span <?='data-' . ($useWS ? 'ws' : 'value') . '="Erdgeschoss_pf"'?> class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Energie:</td>
						<td><span <?='data-' . ($useWS ? 'ws' : 'value') . '="Erdgeschoss_Energy"'?> class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>erzeugte Energie:</td>
						<td><span <?='data-' . ($useWS ? 'ws' : 'value') . '="Erdgeschoss_returnedEnergy"'?> class="ps-input">undefined</span></td>
					</tr>
					<tr>
						<td>Spannung:</td>
						<td><span <?='data-' . ($useWS ? 'ws' : 'value') . '="Erdgeschoss_Voltage"'?> class="ps-input">undefined</span></td>
					</tr>
				</tbody>
			</table>
		</div>
<? } ?>
	</div>
</div>

