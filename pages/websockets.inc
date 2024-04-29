<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.06.2021                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: websockets.inc 552 2024-01-06 13:56:24Z                  $ #
//#                                                                                 #
//###################################################################################
namespace pages;
?>
<div class="page">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="center">
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
</div>
