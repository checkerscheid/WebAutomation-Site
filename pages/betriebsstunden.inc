<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 30.06.2021                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 572                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: betriebsstunden.inc 572 2024-03-20 06:52:42Z             $ #
//#                                                                                 #
//###################################################################################
/** @var Type $points */
namespace pages;
$lichter = array(
	'_WZ_LI_LS'		=> 'Wohnzimmer Lautsprecherlicht',
	'_WZ_LI_SL'		=> 'Wohnzimmer Stehlampe',
	'_WZ_LI_HZ'		=> 'Wohnzimmer Herz',
	'_WZ_LI_KA'		=> 'Wohnzimmer Kamin',
	'_WZ_LI'		=> 'Wohnzimmer Licht',
	'_WZ_LI_LL'		=> 'Wohnzimmer Lichtleiste',

	'_SZ_LI'		=> 'Schlafzimmer Licht',

	'_BU_LI'		=> 'Büro Licht',

	'_KU_LI'		=> 'Küche Licht',
	'_KU_LI_ST'		=> 'Küche Strahler',
	'_KU_LI_KA'		=> 'Küche Kaffee',

	'_BU_LI_FL'		=> 'Flur Licht',

	'_BA_LI'		=> 'Bad Licht',
	'_BA_LI_SP'		=> 'Bad Spiegel',

	'_KZ_LI'		=> 'Kinderzimmer Licht',
	'_KZ_LI_BE'		=> 'Kinderzimmer Bett',
	'_WB_LI_KZ'		=> 'Kinderzimmer Fenster',

	'_GA_LI'		=> 'Garten Licht',
	'_GA_LI_BT'		=> 'Garten Blumentöpfe',

	'_WB_LI_FE'		=> 'Weihnachten Fenster',
	'_WB_LI_KA'		=> 'Weihnachten Kamin',
	'_WB_LI_WB'		=> 'Weihnachtsbaum',
	'_SY_LI_DI'		=> 'Discolicht',
);
$points = array();
?>
<div id="betriebsstunden">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="center">
		<table summary="">
			<thead>
				<tr>
					<th>Licht</th>
					<th>Betriebsstunden</th>
					<th>Rücksetzen</th>
				</tr>
			</thead>
			<tbody>
<?
	foreach($lichter as $dp => $name) {
		$points += array(
			$dp.'_Sekunden'			=> $dp.'_Sekunden',
			$dp.'_Ruecksetzen'		=> $dp.'_Ruecksetzen',
		);
?>
				<tr>
					<td><span class="description"><?=$name?></span></td>
					<td class="ps-tacenter">
						<span data-value="<?=$dp?>_Sekunden"></span>
					</td>
					<td><span class="ps-button" data-point="<?=$dp?>_Ruecksetzen" data-write="1">Rücksetzen</span></td>
				</tr>
<?
	}
?>
			</tbody>
		</table>
	</div>
</div>
