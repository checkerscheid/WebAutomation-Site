<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 27.07.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 696                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia.inc 696 2024-10-06 19:11:29Z                         $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
*/
namespace pages;
use system\std;
use system\WebCom;
use system\html;
use system\Helper\wpa;
use system\Helper\wpDatabase;
use system\Helper\security;
use system\Helper\wpNeoPixel;
use system\Helper\wpRGB;

require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/wpNeoPixel.psys';
require_once 'system/Helper/wpRGB.psys';

$database->query("SELECT [id_d1mini], [name], [description], [ip], [mac] FROM [d1mini] WHERE [name] = 'KZ_NP'");
$erg = $database->fetch();

$WebCom = new WebCom();
$d1Mini = \json_decode($WebCom->send('getD1MiniStatus', $erg['ip']));

$points = array(
	'KZ_VT'				=> '_KZ_VT',
	'KZ_VT_Hand'		=> '_KZ_VT_Hand',
	'KZ_VT_HandWert'	=> '_KZ_VT_HandWert',
	'KZ_VT_AutoWert'	=> '_KZ_VT_AutoWert',
	'KZ_ZP'				=> '_KZ_SW_Belegt',
	'KZ_ZP_RM'			=> '_KZ_LED',
	'LI_BM_KZ'			=> '_KZ_BM_LI',
	'LI_BM_KZ_BE'		=> '_KZ_BM_LI_BE',
	'LI_BM_KZ_NL'		=> '_KZ_BM_LI_NL',
);

?>
<div id="pia">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container page">
<?
	$neoPixel = new wpNeoPixel($erg['ip'], $erg['name']);
	$neoPixel->getStatusFromJson($d1Mini->FreakaZoneDevice);
	$neoPixel->getColorPicker();
	$neoPixel->getColorScenen();
?>
<?
	$rgb = new wpRGB('172.17.80.163', 'shellies/RGBW2');
	$rgb->getColorPicker();
?>
		<div class="ps-container">
			<table summary="">
				<tr>
					<th colspan="6">Licht</th>
				</tr>
				<?=pia::tasterShelly('Kinderzimmer', 'KZ')?>
				<?=pia::tasterShelly('Kinderzimmer <br class="showonportrait" />Bett', 'KZ_BE')?>
				<?=pia::tasterShelly('Kinderzimmer <br class="showonportrait" />Nachtlicht', 'KZ_NL')?>
				<tr>
					<td colspan="6"><hr /></td>
				</tr>
				<tr>
					<th colspan="6">Raumwohl</th>
				</tr>
				<tr>
					<td colspan="6"><hr /></td>
				</tr>
				<tr>
					<td colspan="2">Schreibtisch</td>
					<td colspan="2">
						<div class="indikatoContainer">
							<span class="ps-input" data-ws="KZ_HT3_Temp">-</span>
							<span class="<?=wpa::indikatorTemp?>" data-ws="KZ_HT3_Temp"><?=wpHTML_EMPTY?></span>
						</div>
					</td>
					<td colspan="2">
						<div class="indikatoContainer">
							<span class="ps-input" data-ws="KZ_HT3_Hum">-</span>
							<span class="<?=wpa::indikatorHum?>" data-ws="KZ_HT3_Hum"><?=wpHTML_EMPTY?></span>
						</div>
					</td>
				</tr>
				<tr>
					<th colspan="6">Pflanzen</th>
				</tr>
				<tr>
					<td colspan="6"><hr /></td>
				</tr>
				<tr>
					<td colspan="3">Pflanzi</td>
					<td colspan="3">
						<div class="indikatoContainer">
							<span data-ws="KZ_PF_PF_Moisture" class="ps-input">undefined</span>
							<span data-ws="KZ_PF_PF_Moisture" class="<?=wpa::indikatorPfl?>"><?=wpHTML_EMPTY?></span>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="3">Buschi</td>
					<td colspan="3">
						<div class="indikatoContainer">
							<span data-ws="KZ_PF_BU_Moisture" class="ps-input">undefined</span>
							<span data-ws="KZ_PF_BU_Moisture" class="<?=wpa::indikatorPfl?>"><?=wpHTML_EMPTY?></span>
						</div>
					</td>
				</tr>
				<tr>
					<th colspan="6">Heizung</th>
				</tr>
				<tr>
					<td colspan="6"><hr /></td>
				</tr>
				<tr>
					<td colspan="3">Temperatur</td>
					<td colspan="3">
						<span class="ps-input" data-ws="_KZ_RT">-</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Sollwert</td>
					<td colspan="3">
						<span class="ps-input ps-operable zp" data-ws="_KZ_RT_SW" data-bm="KZ_ZP_RM" data-zp="KZ_ZP" title="bm: ZP aktiv">-</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">Ventil Heizung</td>
					<td colspan="3">
						<div class="handContainer">
							<span id="KZ_VT" class="ps-input pa-Analog bedienbar" data-value="KZ_VT" data-popup="Ventil Heizung">-</span>
							<span class="hand pa-hide" data-value="KZ_VT_Hand"></span>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<p id="storedIP" data-ip="<?=$erg['ip'] ?>">(<?=$erg['ip'] ?>, <?=$erg['mac'] ?>)</p>
</div>
<?
class pia {
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
				<td class="description" colspan="3">';
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
				<td colspan="3">
					<span data-value="LI_BM_'.$kurz.'" data-bm="LI_BM_'.$kurz.'" data-ip="'.$erg['ip'].'" data-autooff="'.$erg['autooff'].'" class="ps-button pa-Meldung ShellyDirect">undefined</span>
				</td>
			</tr>';
		return $return;
	}
}
?>
