<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.12.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 714                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: samsungtv.inc 714 2024-12-14 16:27:22Z                   $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;

$tvs = array(
	'wohnzimmer', 'schlafzimmer', 'kinderzimmer'
);
$buttons = array (
	'On',
	'Off',
	'Return',
	'OK',
	'Up',
	'Right',
	'Down',
	'Left',
	'VolumeUp',
	'VolumeDown',
	'Netflix',
	'Disney',
	'YouTube'
);

?>
<div id="samsungtv" class="page">
	<h1><? html::getPageHeadline();?></h1>
	<div class="center">
		<select class="ps-input selectedtv">
			<?
			foreach($tvs as $tv) {
				echo '<option value="' . $tv . '">' . $tv . '</option>';
			}
			?>
		</select>
		<?
		foreach($buttons as $button) {
			echo '<span class="ps-button sendremote">' . $button . '</span>';
		}
		?>
	</div>
</div>
