<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.06.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 690                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1mini.inc 690 2024-08-02 00:24:56Z                      $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\Helper\wpRGB;

require_once 'system/Helper/wpa.psys';
require_once 'system/Helper/wpRGB.psys';

$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'd1mini'");
$headline = $database->fetch();

// $database->query("SELECT [id_d1mini], [name], [description], [ip], [mac] FROM [d1mini] WHERE [name] = '" . std::gets('param1'). "'");
// $erg = $database->fetch();
$erg = array(
	'ip' => '172.17.80.97',
	'name' => 'KZ_Border',
	'description' => 'Kinderzimmer Bilderrahmen'
);

// $WebCom = new WebCom();
// $d1Mini = \json_decode($WebCom->send('getD1MiniStatus', $erg['ip']));
//std::test_array($d1Mini);
?>
<div id="shelly">
	<h1><?=$headline['name']?> <?=$erg['name'] ?></h1>
	<h2><?=$erg['description'] ?></h2>
	<p id="storedIP" data-ip="<?=$erg['ip'] ?>">(<?=$erg['ip'] ?>)</p>
	<div class="buttonContainer">
		<a class="ps-button" target="_blank" href="http://<?=$erg['ip'] ?>">Device Site</a>
	</div>
	<div class="ps-flex-container page">
<?

	$rgb = new wpRGB('172.17.80.97', 'shellies/RGBW2');
	$rgb->getColorPicker();
?>
	</div>
</div>
