<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 22.07.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: scenecfg.inc 550 2023-12-25 03:02:54Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$sc = array();
$database->query("SELECT [id_scenegroup], [name] FROM [scenegroup]");
while($erg = $database->fetch()) $sc[$erg['id_scenegroup']] = $erg['name'];
$database->query("SELECT [id_scenegroup] FROM [calendar] WHERE [id_scenegroup] IS NOT NULL");
while($erg = $database->fetch()) if(isset($sc[$erg['id_scenegroup']])) unset($sc[$erg['id_scenegroup']]);
if(count($sc) > 0) {
	$sb = "INSERT INTO [calendar] ([name], [id_scenegroup], [active]) VALUES ";
	foreach($sc as $id => $name) {
		$sb .= "('" . $name . "', " . $id . ", 1), ";
	}
	$database->query(substr($sb, 0, -2));
}
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'scenecfg'");
$headline = $database->fetch();
?>
<div id="scenecfgcontainer">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="groups">Szenengruppen</span></li>
		<li><span class="ps-button" data-target="newscene">Szenen</span></li>
		<li><span class="ps-button" data-target="scene">Datenpunktzuordnung</span></li>
	</ul>
	<hr />
	<div id="scenecfg">
		<div id="erg">
		</div>
	</div>
</div>
