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
//# File-ID      : $Id:: calendarscene.inc 550 2023-12-25 03:02:54Z               $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'calendarscene'");
$headline = $database->fetch();
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
$database->query('SELECT [g].[id_scenegroup], [g].[name], [c].[id_calendar]
		FROM [scenegroup] [g]
		LEFT OUTER JOIN [calendar] [c] ON [c].[id_scenegroup] = [g].[id_scenegroup]
		ORDER BY [g].[name]');
?>
<div id="calendarscene">
	<h1><?=$headline['name']?></h1>
	<ul>
<?
	while($erg = $database->fetch()) {
		echo '
		<li>
			<span  class="ps-tree-parent p-tree-parent-group"  data-group="'.$erg['id_scenegroup'].'">'.$erg['name'].'</span>';
		$id = $erg['id_calendar'];
		$text = 'Szenen Zeitprogramm öffnen';
		echo '
			<a class="ps-button" href="std.calendaredit.'.$id.'.htm">'.$text.'</a>
			<!--span class="ps-button gsync" data-calendar="'.$id.'">mit google verknüpfen</a-->';
		echo '
		</li>';
		echo '<li data-scenen="'.$erg['id_scenegroup'].'" class="p-tree-child p-tree-child-group"></li>';
	}
?>
		<li data-group="NULL" class="ps-tree-parent p-tree-parent-group">nicht gruppierte Szenen</li>
		<li data-scenen="NULL" class="p-tree-child p-tree-child-group"></li>
	</ul>
</div>
