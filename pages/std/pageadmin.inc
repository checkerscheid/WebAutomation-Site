<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 12.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: pageadmin.inc 582 2024-04-10 06:45:45Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\Helper\wpDatabase;
use system\Helper\security;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'pageadmin'");
$headline = $database->fetch();
$database->query('
		SELECT [wp].[id_webpages], [wp].[static], [wp].[name], [wp].[src], [wp].[inwork], [ug].[name] AS [groupname], [ug].[order] FROM [webpages] [wp]
		INNER JOIN [usergroup] [ug] ON [wp].[usergroupread] = [ug].[id_usergroup] ORDER BY [wp].[static], [wp].[name]');

function getUserGroupDropDown($current) {
	$database = new wpDatabase();
	$database->query('SELECT [id_usergroup], [name], [order], [static] FROM [usergroup] WHERE [order] <= '.$_SESSION[SESSION_ID]['LEVEL'].' ORDER BY [static] DESC, [order]');
	$returns = '<select class="ps-input order">';
	$isStatic = null;
	while($erg = $database->fetch()) {
		if($isStatic != $erg['static']) {
			if($erg['static'] == 1) {
				if(!is_null($isStatic)) $returns .= '</optgroup>';
				$returns .= '<optgroup label="vordefinierte Gruppen">';
			} else {
				if(!is_null($isStatic)) $returns .= '</optgroup>';
				$returns .= '<optgroup label="selbst definierte Gruppen">';
			}
			$isStatic = $erg['static'];
		}
		$returns .= '<option value="'.$erg['id_usergroup'].'"'.($erg['order'] == $current ? ' selected="selected"' : '').'>'.$erg['name'].' ('.$erg['order'].')</option>';
	}
	$returns .= '</optgroup></select>';
	return $returns;
}
?>

<div id="pageadmin">
	<h1><?=$headline['name']?></h1>
	<span class="ps-button allauf">alles aufklappen</span>
	<span class="ps-button allein">alles einklappen</span>
<?
	$storedFiles = array('.', '..', 'constant.inc');
	$tempStatic = '';
	$html = '';
	$first = true;
	while($erg = $database->fetch()) {
		if($first) {
			$tempStatic = $erg['static'];
			$first = false;
		}
		if($erg['static'] != $tempStatic) {
			$html .= '</div></div><hr />';
			$html .= '<div class="parentContainer">';
			$html .= '<h2 class="clickable">In der Datenbank enthaltene System Dateien:</h2>';
			$html .= '<hr /><div class="ps-flex-container closeable">';
			$tempStatic = $erg['static'];
		}
		$storedFiles[] = $erg['src'].'.inc';
		if($_SESSION[SESSION_ID]['LEVEL'] >= $erg['order']) {
			$html .= '<div data-id="' .  $erg['id_webpages']. '" class="ps-container">';
			$html .= '<h3 class="clickable'.($erg['name'] == $erg['src'] ? ' ps-red' : '').'">'.\system\html::getUebersichtPagename($erg['name']).'</h3>';
			$html .= '<div class="closeable closed">';
			$html .= '<p><span class="ps-description">Neuer Name:</span><input type="text" class="ps-input name" value="'.$erg['name'].'" /></p>';
			$html .= '<p><span class="ps-description">ben&ouml;tigte Sicherheitsgruppe:</span>'.getUserGroupDropDown($erg['order']).'</p>';
			$html .= '<p><span class="ps-description"></span><span class="inwork ps-checkbox'.($erg['inwork'] == 0 ? '' : ' checked').'">in Bearbeitung</span></p>';
			$html .= '<p><span class="ps-description">editierbar:</span>'.($erg['static'] == 0 ? 'ja' : 'nein').'</p>';
			$html .= '<p><span class="ps-description">Quelldatei:</span>'.$erg['src'].'.inc</p>';
			$html .= '<p class="ps-flright">';
			$html .= (file_exists('pages/' . $erg['src'].'.inc') ? '<a href="' . $erg['src'] . '.htm" class="ps-green">pages</a>' : '<span>pages</span>') . wpHTML_EMPTY . '-' . wpHTML_EMPTY;
			$html .= '<span class="' . (file_exists('script/' . $erg['src'].'.js') ? 'ps-green' : (file_exists('pages/' . $erg['src'].'.inc') ? 'ps-red' : '')) . '">script</span>' . wpHTML_EMPTY . '-' . wpHTML_EMPTY;
			$html .= '<span class="' . (file_exists('style/' . $erg['src'].'.css') ? 'ps-green' : (file_exists('pages/' . $erg['src'].'.inc') ? 'ps-red' : '')) . '">style</span>' . wpHTML_EMPTY . '-' . wpHTML_EMPTY;
			$html .= '<span class="' . (file_exists('request/' . $erg['src'].'.req') ? 'ps-green' : (file_exists('pages/' . $erg['src'].'.inc') ? 'ps-red' : '')) . '">request</span><br />';

			$html .= (stream_resolve_include_path('pages/std/' . $erg['src'].'.inc') ? '<a href="std.' . $erg['src'] . '.htm" class="ps-green">pages</a>' : '<span>pages</span>') . wpHTML_EMPTY . '-' . wpHTML_EMPTY;
			$html .= '<span class="' . (stream_resolve_include_path('script/std/' . $erg['src'].'.js') ? 'ps-green' : (stream_resolve_include_path('pages/std/' . $erg['src'].'.inc') ? 'ps-red' : '')) . '">script</span>' . wpHTML_EMPTY . '-' . wpHTML_EMPTY;
			$html .= '<span class="' . (stream_resolve_include_path('style/std/' . $erg['src'].'.css') ? 'ps-green' : (stream_resolve_include_path('pages/std/' . $erg['src'].'.inc') ? 'ps-red' : '')) . '">style</span>' . wpHTML_EMPTY . '-' . wpHTML_EMPTY;
			$html .= '<span class="' . (stream_resolve_include_path('request/std/' . $erg['src'].'.req') ? 'ps-green' : (stream_resolve_include_path('pages/std/' . $erg['src'].'.inc') ? 'ps-red' : '')) . '">request</span>';
			$html .= '</p>';
			$html .= '<p>';
			$html .= '<span class="ps-button updatepage">speichern</span>';
			if(!file_exists('pages/' . $erg['src'].'.inc') && !stream_resolve_include_path('pages/std/' . $erg['src'].'.inc')) {
				$html .= '<span class="ps-button deletepage" data-src="'.$erg['src'].'">löschen</span>';
			}
			$html .= '</p>';
			$html .= '</div>';
			$html .= '</div>';
		}
	}

	$groups = getUserGroupDropDown('');

	echo '<div class="parentContainer">';
	echo '<h2 class="clickable">Nicht in der Datenbank enthaltene Projekt Dateien:</h2>';
	echo '<hr /><div class="ps-flex-container closeable">';
	$files = scandir('pages');
	foreach($files as $file) {
		if(is_file('pages/'.$file) && !in_array($file, $storedFiles) && substr($file, -4) == '.inc') {
			echo '
			<div class="ps-container">
				<h3>'.$file.'</h3>
				<table summary="">
					<tbody>
						<tr>
							<td>Seitenname:</td>
							<td><input class="siteName ps-input" value="'.substr($file, 0, -4).'" /></td>
						</tr>
						<tr>
							<td>Benutzergruppe:</td>
							<td>'.$groups.'</td>
						</tr>
					</tbody>
				</table>
				<span class="ps-button addpage">hinzufügen</span></div>';
		}
	}
	echo '</div></div><hr />';
	echo '<div class="parentContainer">';
	echo '<h2 class="clickable">Nicht in der Datenbank enthaltene System Dateien:</h2>';
	echo '<hr /><div class="ps-flex-container closeable">';
	$files = array();
	foreach(explode(';', ini_get('include_path')) as $filepath) {
		if(is_dir($filepath  .'/pages/std')) {
			$files = scandir($filepath  .'/pages/std');
			foreach($files as $file) {
				if(is_file($filepath .'/pages/std/'.$file) && !in_array($file, $storedFiles) && substr($file, -4) == '.inc') {
					echo '
					<div class="ps-container">
						<h3>'.$file.'</h3>
						<table summary="">
							<tbody>
								<tr>
									<td>Seitenname:</td>
									<td><input class="siteName ps-input" value="'.substr($file, 0, -4).'" /></td>
								</tr>
								<tr>
									<td>Benutzergruppe:</td>
									<td>'.$groups.'</td>
								</tr>
							</tbody>
						</table>
						<span class="ps-button addpage">hinzufügen</span></div>';
				}
			}
		}
	}
	echo '</div></div><hr />';
	echo '<div class="parentContainer">';
	echo '<h2 class="clickable">In der Datenbank enthaltene Projekt Dateien:</h2>';
	echo '<hr /><div class="ps-flex-container closeable">';
	echo $html;
	echo '</div></div><hr />';

	if(security::checkLevel(security::entwickler)) {
?>
	<div class="ps-flex-container">
		<div class="ps-container">
			<h2>Neue leere Seite</h2>
			<table summary="">
				<tbody>
					<tr>
						<td><span>Dateiname:</span></td>
						<td><input id="newEmptysiteSrc" class="ps-input" /></td>
					</tr>
					<tr>
						<td><span>Seitenname:</span></td>
						<td><input id="newEmptysiteName" class="ps-input" /></td>
					</tr>
					<tr>
						<td><span>Benutzergruppe:</span></td>
						<td><?=$groups?></td>
					</tr>
				</tbody>
			</table>
			<span class="ps-button newEmptysite">Neue leere Seite generieren</span>
		</div>
		<div class="ps-container">
			<h2>Neue Übersichtsseite</h2>
			<table summary="">
				<tbody>
					<tr>
						<td><span>Dateiname:</span></td>
						<td><input id="newOverviewsiteSrc" class="ps-input" /></td>
					</tr>
					<tr>
						<td><span>Seitenname:</span></td>
						<td><input id="newOverviewsiteName" class="ps-input" /></td>
					</tr>
					<tr>
						<td><span>Benutzergruppe:</span></td>
						<td><?=$groups?></td>
					</tr>
				</tbody>
			</table>
			<span class="ps-button newOverviewsite">Neue Übersichtsseite generieren</span>
		</div>
	</div>
<?
	}
?>
</div>
