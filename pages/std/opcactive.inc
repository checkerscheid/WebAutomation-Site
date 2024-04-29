<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: opcactive.inc 582 2024-04-10 06:45:45Z                   $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'opcactive'");
$headline = $database->fetch();
$points = array();
$masterul = '';
if(std::gets('param1') != '') {
	$database->query('SELECT [s].[id_opcserver], [g].[id_opcgroup] FROM [opcdatapoint] [d]
		INNER JOIN [opcgroup] [g] ON [d].[id_opcgroup] = [g].[id_opcgroup]
		INNER JOIN [opcserver] [s] ON [g].[id_opcserver] = [s].[id_opcserver]
		WHERE [d].[id_opcdatapoint] = ' . std::gets('param1'));
	if($database->hasRows() > 0) {
		$toDatapoint = $database->fetch();
		$masterul = ' id="masterul" data-serverid="'.$toDatapoint['id_opcserver'].'" data-groupid="'.$toDatapoint['id_opcgroup'].'"';
	}
}
$database->query('SELECT [id_opcserver], [name], [progid], [active] FROM [opcserver] ORDER BY [progid]');
?>

<div id="opcactive">
	<h1 id="h1"><?=$headline['name']?></h1>
	<hr />
	<div>
		Aktualisierungsgeschwindigkeit:
		<select class="ps-input speed">
			<option value="1000">1 s</option>
			<option value="3000">3 s</option>
			<option value="5000">5 s</option>
			<option value="10000" selected="selected">10 s</option>
			<option value="30000">30 s</option>
			<option value="60000">60 s</option>
		</select>
		<hr />
	</div>
	<ul<?=$masterul?>>
<?
	while($erg = $database->fetch()) {
		echo '<li data-server="'.$erg['id_opcserver'].'">';
		if($erg['active'] == '1') {
			echo '<span class="ps-tree-parent">'.$erg['name'].'</span>';
			echo '<span class="p-dpbutton p-dpdelete ps-hover-noborder p-displayright deleteserver" title="OPC Server löschen">'.wpHTML_EMPTY.'</span>';
			echo '<span class="p-dpbutton p-dprefresh ps-hover-noborder p-displayright renameserver" title="OPC Server umbenennen">'.wpHTML_EMPTY.'</span>';
			echo '<span class="p-dpbutton p-dpinfo ps-hover-noborder p-displayright infoserver" title="OPC Server Informationen">'.wpHTML_EMPTY.'</span>';
			echo '<span class="p-dpbutton p-dpadd ps-hover-noborder p-displayright addgroup" title="OPC Gruppe einfügen">'.wpHTML_EMPTY.'</span>';
			echo '</li>';
			echo '<li data-groups="'.$erg['id_opcserver'].'"></li>';
		} else {
			echo '<span class="ps-tree-disabled" title="OPC Server deaktiviert">'.$erg['name'].'</span>';
			echo '<span class="p-dpbutton p-dpdelete ps-hover-noborder p-displayright deleteserver" title="OPC Server löschen">'.wpHTML_EMPTY.'</span>';
			echo '<span class="p-dpbutton p-dprefresh ps-hover-noborder p-displayright renameserver" title="OPC Server umbenennen">'.wpHTML_EMPTY.'</span>';
			echo '<span class="p-dpbutton p-dpedit-inactive p-displayright" title="Schreibrechte bearbeiten nicht m&ouml;glich">'.wpHTML_EMPTY.'</span>';
			echo '<span class="p-dpbutton p-dpinfo-inactive p-displayright" title="OPC Server Informationen nicht m&ouml;glich">'.wpHTML_EMPTY.'</span>';
			echo '</li>';
		}
		echo '<li><hr /></li>';
	}
?>
	</ul>
</div>
