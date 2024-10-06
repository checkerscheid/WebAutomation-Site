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
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pageadmin.req 550 2023-12-25 03:02:54Z                   $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
use system\Helper\wpa;

require_once 'system/Helper/wpa.psys';

const WZ_NP = '172.17.80.99';
const WZ_LS_NP = '172.17.80.98';
const WZ_PF_TE = '172.17.80.106';
const KZ_NP = '172.17.80.169';

class uglicht {
	private const debug = false;
	public static function NeoPixel($ip, $name, $desc) {
		$return = '
			<tr>
				<td class="description">
					<a href="std.d1mini.' . $name . '.htm">' . $desc . '</a>
				</td>
				<td>
					<span class="ps-button setNeoPixelOff ' . wpa::GreyYellow . '" data-ws="' . $name . '_Brightness" data-ip="' . $ip . '"
						data-True="Ein" data-False="Aus">undefined</span>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div class="brightness-slider" data-ws="' . $name . '_Brightness" data-ip="' . $ip . '"></div>
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
					<?=uglicht::NeoPixel(WZ_LS_NP, 'WZ_LS_NP', 'Lautsprecher Farbe')?>
					<?=uglicht::NeoPixel(WZ_PF_TE, 'WZ_PF_TE', 'RGB Pflanze')?>
				</tbody>
			</table>
		</div>
		<div class="ps-container">
			<h2>Schlafzimmer</h2>
		</div>
	</div>
</div>
