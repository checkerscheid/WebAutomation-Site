<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 04.11.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 753                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wasseralarm.inc 753 2026-01-15 08:49:45Z                 $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;

$points = array(
	'LI_BM_WW'			=> '_SY_WW',
);
?>
<div id="wasseralarm" class="page">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container">
		<div class="ps-container">
			<table>
				<tbody>
					<tr>
						<td class="description">
							<a href="http://172.17.80.148" target="_blank">Warmwasser</a>:
						</td>
						<td>
							<span data-value="LI_BM_WW" data-bm="LI_BM_WW" data-ip="172.17.80.148" class="ps-button pa-Meldung ShellyDirect">undefined</span>
						</td>
					</tr>
					<tr>
						<td><a href="std.trendview.1174.1.htm" class="ps-button ps-pluginbutton">&#128200;</a></td>
						<td><span data-ws="SY_WW_Power" class="ps-input pa-playalarmsound">undefined</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
