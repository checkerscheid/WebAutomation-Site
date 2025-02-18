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
//# Revision     : $Rev:: 722                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: overview_parameter.inc 722 2025-02-18 19:42:31Z          $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
/** @var Type $sdata */
namespace pages;
$points = array(
	'Sommer'		=> 'Sommerbetrieb',
	'RT_Frost'		=> '_RT_Frost',
	'RT_SW_Frost'	=> '_RT_SW_Frost',
	'VT_max_Frost'	=> '_VT_max_Frost',
	'GA_LI_TR_Time'	=> '_GA_LI_TR_Time',
	'SM_HZG_Hyst'	=> '_RT_SM_HZG_Hyst',
	'SonneScheint'	=> '_SonneScheint'
);
?>

<div id="uebersicht_parameter" class="ps-flex-container">
	<div class="ps-container ps-flex-item">
		<h3>Systemmodus</h3>
		<table>
			<tbody>
				<tr>
					<td>Betriebszustand Heizung:</td>
					<td><span data-value="Sommer" data-popup="Betriebszustand Heizung" id="Sommer" class="ps-input pa-EinAus ps-parambool">undefined</span></td>
				</tr>
				<tr>
					<td>Darstellung ändern:</td>
					<td><span class="ps-button darkmode"><?=($sdata->Whitemode ? 'Darkmode' : 'Whitemode')?></span>
				</tr>
				<tr>
					<td colspan="2"><hr /></td>
				</tr>
				<tr>
					<td>Sonne:</td>
					<td><span data-value="SonneScheint" class="ps-input pa-EinAus" data-True="scheint" data-False="untergegangen">undefined</span></td>
				</tr>
				<tr>
					<td>Insert Dummy</td>
					<td><span class="ps-button insertDummy">InsertDummy</span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="ps-container ps-flex-item">
		<h3>Gefrierwarnung</h3>
		<table>
			<tbody>
				<tr>
					<td>Gefrierwarnung bei unter:</td>
					<td><span data-ws="_RT_Frost" data-popup="Gefrierwarnung bei unter" id="RT_Frost" class="ps-input ps-param">undefined</span></td>
				</tr>
				<tr>
					<td>Raumtemperatursollwert bei Gefrierwarnung:</td>
					<td><span data-ws="_RT_SW_Frost" data-popup="maximale Ventilstellung bei Gefrierwarnung" id="RT_SW_Frost" class="ps-input ps-param">undefined</span></td>
				</tr>
				<tr>
					<td>maximale Ventilstellung bei Gefrierwarnung:</td>
					<td><span data-ws="_VT_max_Frost" data-popup="maximale Ventilstellung bei Gefrierwarnung" id="VT_max_Frost" class="ps-input ps-param">undefined</span></td>
				</tr>
				<tr>
					<td>Temperaturdifferenz SW / IST für HZG Störung:</td>
					<td><span data-ws="_RT_SM_HZG_Hyst" data-popup="Temperaturdifferenz SW / IST für HZG Störung" id="SM_HZG_Hyst" class="ps-input ps-param">undefined</span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="ps-container ps-flex-item">
		<table>
			<thead>
				<tr>
					<th colspan="2"><h3>Treppe Außen</h3></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Zeitschalter Treppenlicht:</td>
					<td><span data-ws="_GA_LI_TR_Time" data-popup="Zeitschalter Treppenlicht" id="GA_LI_TR_Time" class="ps-input ps-param">undefined</span></td>
				</tr>
			</tbody>
		</table>

		<table>
			<thead>
				<tr>
					<th colspan="6"><h3>Wohnzimmer Weihnachten</h3></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="3">
						<span class="ps-button set-wz" title="morgens an, abends an">aktivieren</span>
					</td>
					<td colspan="3">
						<span class="ps-button unset-wz" title="Wohnzimmer aus">deaktivieren</span>
					</td>
				</tr>
			</tbody>
			<thead>
				<tr>
					<th colspan="6"><h3>Weihnachtsbaum</h3></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="3">
						<span class="ps-button set-wb" title="Weihnachtsbaum: morgens an, abends an">aktivieren</span>
					</td>
					<td colspan="3">
						<span class="ps-button unset-wb" title="Weihnachtsbaum aus">deaktivieren</span>
					</td>
				</tr>
			</tbody>
			<thead>
				<tr>
					<th colspan="6"><h3>Weihnachten Pia</h3></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="2">
						<span class="ps-button pia-wn" title="Pia: morgens und abends an">Morgens und Abends an</span>
					</td>
					<td colspan="2">
						<span class="ps-button pia-we" title="Pia: Wochenende">Wochenende</span>
					</td>
					<td colspan="2">
						<span class="ps-button pia-wnwe" title="Pia: Nachts an">ganze Nacht an</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
