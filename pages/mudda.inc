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
//# Revision     : $Rev:: 646                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: mudda.inc 646 2024-07-06 18:12:08Z                       $ #
//#                                                                                 #
//###################################################################################
namespace pages;

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
						<span class="icon-indikator indikator-temp" data-wsindi="_WG1_RT_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_WG1_RF_SH" title="EG Wintergarten Feuchte">-</span>
						<span class="icon-indikator indikator-hum" data-wsindi="_WG1_RF_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td><span>Schlafzimmer:</span></td>
					<td>
						<span class="ps-input" data-ws="_SZ1_RT_SH" title="EG Schlafzimmer Temperatur">-</span>
						<span class="icon-indikator indikator-temp" data-wsindi="_SZ1_RT_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_SZ1_RF_SH" title="EG Schlafzimmer Feuchte">-</span>
						<span class="icon-indikator indikator-hum" data-wsindi="_SZ1_RF_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td><span>Flur OG:</span></td>
					<td>
						<span class="ps-input" data-ws="_FL2_RT_SH" title="OG Flur Temperatur">-</span>
						<span class="icon-indikator indikator-temp" data-wsindi="_FL2_RT_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_FL2_RF_SH" title="OG Flur Feuchte">-</span>
						<span class="icon-indikator indikator-hum" data-wsindi="_FL2_RF_SH"><?=wpHTML_EMPTY ?></span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td><span>Gartenhaus:</span></td>
					<td>
						<span class="ps-input" data-ws="_GA_RT_D1" title="Gartenhaus Temperatur">-</span>
						<span class="icon-indikator indikator-temp" data-wsindi="_GA_RT_D1"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_GA_RF_D1" title="Gartenhaus Feuchte">-</span>
						<span class="icon-indikator indikator-hum" data-wsindi="_GA_RF_D1"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_GA_FS_D1" title="Gartenhaus Füllstand">-</span>
					</td>
				</tr>
				<tr>
					<td><span>Wetter:</span></td>
					<td>
						<span class="ps-input" data-ws="_GA_RT" title="Wetter Süd Temperatur">-</span>
						<span class="icon-indikator indikator-temp" data-wsindi="_GA_RT"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_GA_Sued_RF_D1" title="Wetter Süd Feuchte">-</span>
						<span class="icon-indikator indikator-hum" data-wsindi="_GA_Sued_RF_D1"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_GA_Ost_RR_D1" title="Wetter Ost Regen">-</span>
					</td>
				</tr>
				<tr>
					<td><span>Gaube:</span></td>
					<td>
					</td>
					<td>
						<span class="ps-input" data-ws="_GA_Gaube_RF_D1" title="Wetter Süd Feuchte">-</span>
						<span class="icon-indikator indikator-hum" data-wsindi="_GA_Gaube_RF_D1"><?=wpHTML_EMPTY ?></span>
					</td>
					<td>
						<span class="ps-input" data-ws="_GA_Gaube_RR_D1" title="Wetter Gaube Regen">-</span>
					</td>
				</tr>
			</tbody>
		</table>
		<div>
			<hr />
			<a href="std.weather.htm" class="ps-button">Wettervorhersage</a>
		</div>
	</div>
	<div class="ps-container">
		<h2>Temperaturen</h2>
		<div id="ergTemp"></div>
	</div>
	<div class="trendlegendTemp"></div>
	<div class="ps-container">
		<h2>Feuchte</h2>
		<div id="ergHum"></div>
	</div>
	<div class="trendlegendHum"></div>
</div>
