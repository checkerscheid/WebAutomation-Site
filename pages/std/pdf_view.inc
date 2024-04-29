<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pdf_view.inc 550 2023-12-25 03:02:54Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'pdf_uebersicht'");
$headline = $database->fetch();
$prev_h1 = array(
	'std.pdf_uebersicht' => $headline['name'],
);
$param1 = std::gets('param1');
$param2 = std::gets('param2');
if ($param2 != '') {
	$datei = 'pdf//'.$param1.'//'.$param2.'.pdf';
	$prev_h1['std.pdf_uebersicht.' . $param1] = $param1;
	$current_h1 = $param2;
} else {
	$datei = 'pdf//'.$param1.'.pdf';
	$current_h1 = $param1;
}
?>
<div id="page">
	<h1><?=\system\html::fillHeadline($current_h1, $prev_h1)?></h1>
	<div class="center">
		<iframe src="<?=$datei?>">
		</iframe>
	</div>
</div>
