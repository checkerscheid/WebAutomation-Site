<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 15.12.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: templategen.inc 550 2023-12-25 03:02:54Z                 $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query('SELECT [id_templategroup], [name] FROM [templategroup] ORDER BY [name]');

?>
<div id="templategen">
	<div id="containerleft">
		<h1>Templates</h1>
		<hr />
		<ul>
<?
	while($erg = $database->fetch()) {
		echo '<li data-group="'.$erg['id_templategroup'].'" class="ps-tree-parent">'.$erg['name'].'</li>';
		echo '<li data-templates="'.$erg['id_templategroup'].'" class="p-tree-child"></li>';
	}
?>
			<li data-group="NULL" class="ps-tree-parent">nitcht gruppierte Templates</li>
			<li data-templates="NULL" class="p-tree-child"></li>
		</ul>
	</div>
	<div id="containerright">
		<h1>Einstellungen</h1>
		<div class="containercontent">
		</div>
	</div>
	<div id="containertemplate">
		<h1>center</h1>
		<div class="containercontent">
		</div>
	</div>
</div>
