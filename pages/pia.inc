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
//# Revision     : $Rev:: 719                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pia.inc 719 2025-02-13 12:27:37Z                         $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
*/
namespace pages;
use system\std;
use system\html;
use system\Helper\wpa;
use system\Helper\wpDatabase;
use system\Helper\security;
use system\Helper\wpNeoPixel;
use system\Helper\wpCwWw;
use system\Helper\wpRGB;

require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/wpNeoPixel.psys';
require_once 'system/Helper/wpCwWw.psys';
require_once 'system/Helper/wpRGB.psys';

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
		<div class="ps-container">
			<table summary="">
				<tr>
					<td colspan="6">
						<h3>Licht</h3>
						<hr />
						<span class="ps-button AllesAus">Alles Aus</span>
						<span class="ps-button AllesSchlafen">Schlafen</span>
					</td>
				</tr>
				<?=pia::tasterShelly('Kinderzimmer', 'KZ')?>
				<?=pia::tasterShelly('Kinderzimmer <br class="showonportrait" />Bett', 'KZ_BE')?>
				<?=pia::tasterShelly('Kinderzimmer <br class="showonportrait" />Nachtlicht', 'KZ_NL')?>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<td colspan="3"><span>TV</span></td>
					<td colspan="3"><a href="tvremote.kinderzimmer.htm" class="ps-button">Fernbedienung</a></td>
				</tr>
				<tr>
					<td colspan="6">
						<div>
							<hr />
							<h3>Sleeptimer für alle:</h3>
							<div class="ps-flex-container AllSleep">
								<div>
									<span class="ps-input AllSleepHour">0</span> <span class="AllSleepUnit">h</span>
									<div class="AllSleepSlider AllSleepHourSlider"></div>
								</div>
								<div>
									<span class="ps-input AllSleepMinute">0</span> <span class="AllSleepUnit">min</span>
									<div class="AllSleepSlider AllSleepMinuteSlider"></div>
								</div>
							</div>
							<span class="ps-button setAllSleep">set</span>
						</div>
					</td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<th colspan="6"><span>Raumwohl</span></th>
				</tr>
				<tr>
					<td colspan="2"><span>Schreibtisch</span></td>
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
					<td colspan="2"><span>Licht</span></td>
					<td colspan="2">
						<span class="ps-input" data-ws="KZ_RU_LDR">-</span>
					</td>
					<td colspan="2">
						<a href="std.trendview.1254.1.htm" class="ps-button ps-pluginbutton"><?=wpHTML_TREND ?></a>
					</td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<th colspan="6"><span>Pflanzen</span></th>
				</tr>
				<tr>
					<td colspan="2"><span>Pflanzi</span></td>
					<td colspan="2">
						<div class="indikatoContainer">
							<span data-ws="KZ_PF_PF_Moisture" class="ps-input">undefined</span>
							<span data-ws="KZ_PF_PF_Moisture" class="<?=wpa::indikatorPfl?>"><?=wpHTML_EMPTY?></span>
						</div>
					</td>
					<td colspan="2">
						<a href="std.trendview.93.htm" class="ps-button ps-pluginbutton"><?=wpHTML_TREND ?></a>
					</td>
				</tr>
				<tr>
					<td colspan="2"><span>Buschi</span></td>
					<td colspan="2">
						<div class="indikatoContainer">
							<span data-ws="KZ_PF_BU_Moisture" class="ps-input">undefined</span>
							<span data-ws="KZ_PF_BU_Moisture" class="<?=wpa::indikatorPfl?>"><?=wpHTML_EMPTY?></span>
						</div>
					</td>
					<td colspan="2">
						<a href="std.trendview.92.htm" class="ps-button ps-pluginbutton"><?=wpHTML_TREND ?></a>
					</td>
				</tr>
				<tr><td colspan="6"><hr /></td></tr>
				<tr>
					<th colspan="6"><span>Heizung</span></th>
				</tr>
				<tr>
					<td colspan="3"><span>Temperatur</span></td>
					<td colspan="3">
						<span class="ps-input" data-ws="_KZ_RT">-</span>
					</td>
				</tr>
				<tr>
					<td colspan="3"><span>Sollwert</span></td>
					<td colspan="3">
						<span class="ps-input ps-operable zp" data-ws="_KZ_RT_SW" data-bm="KZ_ZP_RM" data-zp="KZ_ZP" title="bm: ZP aktiv">-</span>
					</td>
				</tr>
				<tr>
					<td colspan="3"><span>Ventil Heizung</span></td>
					<td colspan="3">
						<div class="handContainer">
							<span id="KZ_VT" class="ps-input pa-Analog bedienbar" data-value="KZ_VT" data-popup="Ventil Heizung">-</span>
							<span class="hand pa-hide" data-value="KZ_VT_Hand"></span>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="6">
						<a href="std.trendview.90.htm" class="ps-button ps-pluginbutton"><?=wpHTML_TREND ?></a>
						<a href="std.calendaredit.1024.htm" class="ps-button ps-pluginbutton" title="Sollwert"><?=wpHTML_UHR ?></a>
						<a href="std.calendaredit.1052.htm" class="ps-button ps-pluginbutton" title="Geräuchminimierung"><?=wpHTML_UHR ?></a>
					</td>
				</tr>
			</table>
		</div>
<?
	$neoPixel = new wpNeoPixel('172.17.80.169', 'KZ_NP');
	$neoPixel->getStatus();
	$neoPixel->getColorPicker('Lichtleiste');
	$neoPixel->getColorScenen('Lichtleiste');
?>
<?
	$cwww = new wpCwWw('172.17.80.164', 'KZ_KE');
	$cwww->getStatus();
	$cwww->getColorPicker('Halloween', 'schwebende Geister', 'Fensterschnee');
?>
<?
	$rgb = new wpRGB('172.17.80.163', 'shellies/RGBW2');
	$rgb->getColorPicker('Bilderrahmen');
?>
	</div>
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
