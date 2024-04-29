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
//# File-ID      : $Id:: scene.inc 550 2023-12-25 03:02:54Z                       $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'scene'");
$headline = $database->fetch();
$database->query('SELECT [g].[id_scenegroup], [g].[name]
		FROM [scenegroup] [g]
		ORDER BY [g].[name]');
?>
<div id="scene">
	<h1><?=$headline['name']?></h1>
	<ul>
<?
	while($erg = $database->fetch()) {
		echo '
		<li>
			<span  class="ps-tree-parent p-tree-parent-group"  data-group="'.$erg['id_scenegroup'].'">'.$erg['name'].'</span>
		</li>';
		echo '<li data-scenen="'.$erg['id_scenegroup'].'" class="p-tree-child p-tree-child-group"></li>';
	}
?>
		<li data-group="NULL" class="ps-tree-parent p-tree-parent-group">nicht gruppierte Szenen</li>
		<li data-scenen="NULL" class="p-tree-child p-tree-child-group"></li>
	</ul>
</div>
