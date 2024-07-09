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
//# Revision     : $Rev:: 665                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: betriebsstunden.inc 665 2024-07-09 22:56:49Z             $ #
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
	<div class="ps-flex-container">

<?
	foreach($lichter as $dp => $name) {
		$points += array(
			$dp.'_Sekunden'			=> $dp.'_Sekunden',
			$dp.'_Ruecksetzen'		=> $dp.'_Ruecksetzen',
		);
?>
		<div class="ps-container">
			<span class="description"><?=$name?></span><br />
			<span data-value="<?=$dp?>_Sekunden"></span>
			<span class="ps-button" data-point="<?=$dp?>_Ruecksetzen" data-write="1">Rücksetzen</span>
		</div>
<?
	}
?>
	</div>
</div>
