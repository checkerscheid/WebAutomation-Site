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
//# File-ID      : $Id:: dpactive.inc 582 2024-04-10 06:45:45Z                    $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'dpactive'");
$headline = $database->fetch();
$database->query("SELECT [name], [order] FROM [usergroup]");
$usergroup[100] = 'niemand';
while($erg = $database->fetch()) {
	$usergroup[$erg['order']] = $erg['name'];
}
?>
<div id="dpactive">
	<h1><?=$headline['name']?></h1>
	<hr />
	<ul>
<?

	$database->query("SELECT
		[id_dpnamespace], [name], [description], ISNULL([usergroupwrite], 100) AS [usergroupwrite], ISNULL([usergroupwrite], -1) AS [fromns], [active]
		FROM [dpnamespace] ORDER BY [name]");
	while($erg = $database->fetch()) {
		$inheritted = 'default';
		if($erg['fromns'] != '-1') $inheritted = 'self';
		echo '
		<li class="dpgroups' . $erg['id_dpnamespace'] . '" data-dpnamespace="' . $erg['id_dpnamespace'] . '">
			<span class="ps-tree-parent dpnamespace" title="' . $erg['id_dpnamespace'] . '">
				<span class="boldfont">' . $erg['description'] . '</span><br />
				<span class="smallfont">' . $erg['name'] . '</span>
			</span>
			<div class="buttonContainer dpnamespacecontainer">
				<span class="ps-hover-noborder ps-image-button ps-add" title="neue Datenpunktgruppe anlegen">' . wpHTML_EMPTY . '</span>
				<span class="ps-hover-noborder ps-image-button ps-edit" data-writelevel="'.$erg['usergroupwrite'].'"
					data-writegroup="'.std::arrays($usergroup, $erg['usergroupwrite'], $erg['usergroupwrite']).' ('.$erg['usergroupwrite'].', '.$inheritted.')"
					title="Schreibrechte bearbeiten, aktuell: '.std::arrays($usergroup, $erg['usergroupwrite'], $erg['usergroupwrite']).' ('.$erg['usergroupwrite'].', '.$inheritted.')">'.wpHTML_EMPTY.'</span>
				<span class="ps-hover-noborder ps-image-button ps-refresh" title="Namespace umbenennen">' . wpHTML_EMPTY . '</span>
				<span class="ps-hover-noborder ps-image-button ps-delete" title="Namespace löschen">' . wpHTML_EMPTY . '</span>
			</div>
		</li>
		<li class="dpgroups dpgroups' . $erg['id_dpnamespace'] . '" data-dpgroups="' . $erg['id_dpnamespace'] . '"></li>
		<li class="dpgroups' . $erg['id_dpnamespace'] . '"><hr /></li>';
	}
?>
		<li class="newDpNamespace">
			<div class="ps-flex-container">
				<table class="ps-container">
					<tr>
						<th colspan="2">Neuer Datenpunktnamespace anlegen:</th>
					</tr>
					<tr>
						<td><label for="newDpNamespaceName">Name:</label></td>
						<td><input type="text" class="ps-input" id="newDpNamespaceName" placeholder="Name" /></td>
					</tr>
					<tr>
						<td><label for="newDpNamespaceDescription">Beschreibung:</label></td>
						<td><input type="text" class="ps-input" id="newDpNamespaceDescription" placeholder="Beschreibung" /></td>
					</tr>
					<tr>
						<td colspan="2" class="ps-tar"><span class="saveNewDpNamespace ps-button">speichern</span></td>
					</tr>
				</table>
			</div>
		</li>
	</ul>
</div>