<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 30.12.2020                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: navigation.inc 550 2023-12-25 03:02:54Z                  $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = '" . std::gets('src') . "'");
$headline = $database->fetch();

// Delete Parent Webpages dosn't exists
$database->query("UPDATE [webpages] SET [position] = NULL WHERE [id_parent_webpage] IS NULL;
UPDATE [webpages] SET [id_parent_webpage] = NULL, [position] = NULL WHERE [id_webpages] IN (
SELECT [wp1].[id_webpages]
FROM [webpages] [wp1] LEFT JOIN [webpages] [wp2] ON [wp1].[id_parent_webpage] = [wp2].[id_webpages]
WHERE [wp1].[id_parent_webpage] IS NOT NULL AND [wp1].[id_parent_webpage] <> 0 AND [wp2].[src] IS NULL
)");

function getNavigationTree($id, $id_parentpage) {
	global $navitems;
	if(count(std::arrays($navitems, $id, array())) > 0) {
		echo '
				<li>
					<span class="id_webpage" data-id="' . $navitems[$id_parentpage][$id]['id'] . '" title="' . $navitems[$id_parentpage][$id]['id'] . '"><span class="ps-bold">' . \system\html::getUebersichtPagename($navitems[$id_parentpage][$id]['name']) . '</span> <span class="ps-smallfont">(' . $navitems[$id_parentpage][$id]['src'] . ')</span></span>
					<span class="deletethis" data-id="' . $navitems[$id_parentpage][$id]['id'] . '">X</span>
					<span class="clapthisin">-</span>
					<ul class="sortable connectedSortable" data-parentid="' . $id . '">
';
		foreach($navitems[$id] as $navitemid => $navitempageinfo) {
			getNavigationTree($navitemid, $id);
			$navitempageinfo;
		}
		echo '
					</ul>
				</li>
';
	} else {
		echo '
				<li>
					<span class="id_webpage" data-id="' . $navitems[$id_parentpage][$id]['id'] . '" title="' . $navitems[$id_parentpage][$id]['id'] . '"><span class="ps-bold">' . \system\html::getUebersichtPagename($navitems[$id_parentpage][$id]['name']) . '</span> <span class="ps-smallfont">(' . $navitems[$id_parentpage][$id]['src'] . ')</span></span>
					<span class="deletethis" data-id="' . $navitems[$id_parentpage][$id]['id'] . '">X</span>
					<ul class="sortable connectedSortable empty" data-parentid="' . $id . '">
					</ul>
				</li>';
	}
}
?>
<div id="navigation">
	<h1><?=$headline['name']?></h1>
	<div class="ps-flex-container">
		<div class="ps-container ps-flex-element">
			<h2>vorhandene Struktur</h2>
			<div class="scrollbar">
				<ul id="sortedtMenuList">
<?
// vorhandene Strucktur
$navitems = array();
$database->query("SELECT [id_webpages], [id_parent_webpage], [src], [name] FROM [webpages] WHERE [static] = 'False' AND [src] NOT LIKE '%parameter' ORDER BY [position]");
$startpage_id = 0;
while ($startpage = $database->fetch()) {
	if($startpage['id_parent_webpage'] == 0) $startpage_id = $startpage['id_webpages'];
	$navitems[$startpage['id_parent_webpage']][$startpage['id_webpages']]['id'] = $startpage['id_webpages'];
	$navitems[$startpage['id_parent_webpage']][$startpage['id_webpages']]['src'] = $startpage['src'];
	$navitems[$startpage['id_parent_webpage']][$startpage['id_webpages']]['name'] = $startpage['name'];
}
//std::test_array($navitems);
?>
					<li>
						<span title="<?=$navitems[0][$startpage_id]['id']?>"><span class="ps-bold"><?=\system\html::getUebersichtPagename($navitems[0][$startpage_id]['name'])?></span> <span class="ps-smallfont">(<?=$navitems[0][$startpage_id]['src']?>, Startseite)</span></span>
						<ul class="sortable connectedSortable" data-parentid="<?=$startpage_id?>">
<?
if(std::arrays($navitems, $startpage_id) != '') {
	foreach($navitems[$startpage_id] as $source_id => $pageinfo) {
		getNavigationTree($source_id, $startpage_id);
		$pageinfo;
	}
}
?>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="ps-container ps-flex-element">
			<h2>Seiten noch nicht im Menü</h2>
			<div class="scrollbar">
				<ul id="availableSites" class="sortable">
<?
// noch nicht im Menü
$database->query("SELECT [id_webpages], [id_parent_webpage], [src], [name] FROM [webpages] WHERE [static] = 'False' AND [src] NOT LIKE '%parameter' AND [id_parent_webpage] IS NULL");
while($erg = $database->fetch()) {
?>
					<li>
						<span class="id_webpage" data-id="<?=$erg['id_webpages']?>" title="<?=$erg['id_webpages']?>"><span class="ps-bold"><?=\system\html::getUebersichtPagename($erg['name'])?></span> <span class="ps-smallfont">(<?=$erg['src']?>)</span></span>
						<ul class="sortable connectedSortable" data-parentid="<?=$erg['id_parent_webpage']?>">
						</ul>
					</li>
<?
}
?>
				</ul>
			</div>
		</div>
	</div>
</div>
