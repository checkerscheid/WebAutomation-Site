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
//# File-ID      : $Id:: pdf_uebersicht.inc 550 2023-12-25 03:02:54Z              $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'pdf_uebersicht'");
$headline = $database->fetch();
$current_h1 = $headline['name'];
$prev_h1 = array();

$param1 = std::gets('param1');

$pdf = '';
$Ueberordner = '';

if ( $param1 != '' ) {
	$ordner = scandir('pdf\\' .$param1);
	$current_h1 = '<a href="std.pdf_uebersicht.htm">' . $headline['name'] . '</a> &rArr; ' . $param1;
} else {
	$ordner = scandir('pdf');
}
?>
<div id="page">
	<h1><?=\system\html::fillHeadline($current_h1, $prev_h1)?></h1>
	<div class="center">
<?
		echo '<ul>';
if ($param1 != '') {
	foreach ($ordner as $datei ){
		if( $datei == '.' || $datei =='..' || $datei =='Thumbs.db')	{
		} else {
			if ( strpos($datei,'.pdf' ) > 0 || strpos($datei,'.PDF' ) > 0 ) {
					$pdf .= '
	<li class="file">
		<img src="images/tree/pdf_symbol.png" alt="" />
		<a href="std.pdf_view.'.$param1.'.'.substr($datei , 0,-4).'.htm">
			<span>'.$datei.'</span>
		</a>
	</li>';
			} else {
				$Ueberordner .= '
	<li class="folder">
		<img src="images/tree/pdf_symbol.png" alt="" />
		<a href="std.pdf_uebersicht.'.$datei.'.htm">
			<img src="images/tree/folder-close.png" alt="" />
			<span>'.$datei.'</span>
		</a>
	</li>';
			}
		}
	}
} else {
	foreach ($ordner as $datei ){
		if( $datei == '.' || $datei =='..' || $datei =='Thumbs.db') {
		} else {
			if ( strpos($datei,'.pdf' ) > 0  ) {
				$pdf .= '
	<li class="file">
		<img src="images/tree/pdf_symbol.png" alt="" />
		<a href="std.pdf_view.'.substr($datei , 0,-4).'.htm">
			<span>'.$datei.'</span>
		</a>
	</li>';
			} else {
				$Ueberordner .= '
	<li class="folder">
		<img src="images/tree/folder-close.png" alt="" />
		<a href="std.pdf_uebersicht.'.$datei.'.htm">
			<span>'.$datei.'</span>
		</a>
	</li>';
			}
		}
	}
}
		echo $Ueberordner;
		echo $pdf;
		echo '</ul>';
?>
	</div>
</div>
