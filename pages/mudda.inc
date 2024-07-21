<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.04.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 681                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mudda.inc 681 2024-07-21 14:27:14Z                       $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\Helper\wpa;
require_once 'system/Helper/wpa.psys';

?>
<div id="mudda" class="page">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="ps-container">
		<table>
			<tbody>
				<tr>
					<td></td>
					<td><span>Temperatur</span></td>
					<td><span>Feuchte</span></td>
					<td><span>Regen</span></td>
				</tr>
				<tr>
					<td colspan="3"><hr /></td>
				</tr>
				<tr>
					<td><span>Wintergarten:</span></td>
					<td>
						<span class="ps-input" data-ws="_WG1_RT_SH" title="EG Wintergarten Temperatur">-</span>
						<span class="<?=wpa::indikatorTemp?>" data-ws="_WG1_RT_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_WG1_RF_SH" title="EG Wintergarten Feuchte">-</span>
						<span class="<?=wpa::indikatorHum?>" data-ws="_WG1_RF_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td><span>Schlafzimmer:</span></td>
					<td>
						<span class="ps-input" data-ws="_SZ1_RT_SH" title="EG Schlafzimmer Temperatur">-</span>
						<span class="<?=wpa::indikatorTemp?>" data-ws="_SZ1_RT_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_SZ1_RF_SH" title="EG Schlafzimmer Feuchte">-</span>
						<span class="<?=wpa::indikatorHum?>" data-ws="_SZ1_RF_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td><span>Flur OG:</span></td>
					<td>
						<span class="ps-input" data-ws="_FL2_RT_SH" title="OG Flur Temperatur">-</span>
						<span class="<?=wpa::indikatorTemp?>" data-ws="_FL2_RT_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_FL2_RF_SH" title="OG Flur Feuchte">-</span>
						<span class="<?=wpa::indikatorHum?>" data-ws="_FL2_RF_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td><span>Gartenhaus:</span></td>
					<td>
						<span class="ps-input" data-ws="GA1_FS_Temp" title="Gartenhaus Temperatur">-</span>
						<span class="<?=wpa::indikatorTempOut?>" data-ws="GA1_FS_Temp"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="GA1_FS_Hum" title="Gartenhaus Feuchte">-</span>
						<span class="<?=wpa::indikatorHum?>" data-ws="GA1_FS_Hum"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="GA1_FS_Vol" title="Gartenhaus Füllstand">-</span>
					</td>
				</tr>
				<tr>
					<td><span>Wetter:</span></td>
					<td>
						<span class="ps-input" data-ws="_GA_RT" title="Wetter Nord Temperatur">-</span>
						<span class="<?=wpa::indikatorTempOut?>" data-ws="_GA_RT"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="GA_WE_Sued_Hum" title="Wetter Süd Feuchte">-</span>
						<span class="<?=wpa::indikatorHum?>" data-ws="GA_WE_Sued_Hum"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="GA_WE_Ost_Rain" title="Wetter Ost Regen">-</span>
					</td>
				</tr>
				<tr>
					<td><span>Gaube:</span></td>
					<td>
					</td>
					<td>
						<span class="ps-input" data-ws="GA2_WE_Gaube_Hum" title="Wetter Gaube Feuchte">-</span>
						<span class="<?=wpa::indikatorHum?>" data-ws="GA2_WE_Gaube_Hum"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="GA2_WE_Gaube_Rain" title="Wetter Gaube Regen">-</span>
					</td>
				</tr>
			</tbody>
		</table>
		<div>
			<hr />
			<a href="std.weather.htm" class="ps-button forecast">Wettervorhersage</a>
			<a href="wetter.htm" class="ps-button"> Wetter</a>
		</div>
	</div>
	<div class="ps-container">
		<h2>Temperaturen</h2>
		<div id="ergTemp"></div>
	</div>
	<div class="ps-container">
		<h2>Feuchte</h2>
		<div id="ergHum"></div>
	</div>
</div>
