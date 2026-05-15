<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.11.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 752                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shopping.inc 752 2026-01-15 08:48:48Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages;
use system\html;
use system\std;
use system\Helper\wpDatabase;
?>
<div id="shopping">
	<h1><? html::getPageHeadline();?></h1>
	<div class="page">
<?
$id = std::gets('param1');
if($id == "") {
	$id = 1;
}
$sqlList = "SELECT [id_list], [name] FROM [shoppinglist] WHERE [id_list] = " . $id;
$database->query($sqlList);
while($ergList = $database->fetch()) {

	$databaseProduct = new wpDatabase();
	$sql = "SELECT 
    [sp].[id_product],
    [sp].[name] AS [product],
    [slp].[ok],
    COUNT(*) OVER() AS total_count,
    SUM(CASE WHEN [slp].[ok] = 1 THEN 1 ELSE 0 END) OVER() AS shopped_count
FROM [shoppinglistproduct] [slp]
INNER JOIN [shoppingproduct] [sp] ON [slp].[id_product] = [sp].[id_product]
WHERE [slp].[id_list] = " . $ergList['id_list'] . "
ORDER BY [product]";
	$databaseProduct->query($sql);
	$firstRow = $databaseProduct->fetch();
	$countProduct = $firstRow['total_count'];
	$countShopped = $firstRow['shopped_count'];
	$databaseProduct->pointer_reset();
?>
		<div data-idList="<?=$ergList['id_list'] ?>"<?=($sdata->SHOPPED == 'true' && $countProduct == $countShopped ? ' class="ps-hidden"' : '')?>>
			<!-- <?=$countProduct?> <?=$countShopped?> -->
			<div class="ps-tacenter">
				<h2><?=$ergList['name'] ?></h2>
				<span class="ps-checkbox gekaufte<?=($sdata->SHOPPED == 'true' ? ' checked' : '')?>" data-idList="<?=$ergList['id_list'] ?>">gekaufte ausblenden</span>
			</div>
			<div class="ps-flex-container">
				<ul class="ps-container ulProducts">
<?
	while($erg = $databaseProduct->fetch()) {
?>
					<li class="product liproduct<?=($sdata->SHOPPED == 'true' && $erg['ok'] == 1 ? ' ps-hidden' : '')?>">
						<span class="ps-checkbox<?=($erg['ok'] == 1 ? ' checked' : '')?>" data-idList="<?=$ergList['id_list'] ?>" data-idProduct="<?=$erg['id_product'] ?>"><?=$erg['product'] ?></span>
					</li>
<?
	}
?>
				</ul>
<?
	$databaseList = new wpDatabase();
	$sql = "SELECT 
    [sg].[id_group],
    [sg].[name] AS [group],
    [sp].[id_product],
    [sp].[name] AS [product],
    [sgp].[ok],
    COUNT(*) OVER(PARTITION BY [sg].[id_group]) AS total_count,
    SUM(CASE WHEN [sgp].[ok] = 1 THEN 1 ELSE 0 END) OVER(PARTITION BY [sg].[id_group]) AS shopped_count
FROM [shoppinglistgroup] [slg]
INNER JOIN [shoppinggroup] [sg] ON [slg].[id_group] = [sg].[id_group]
INNER JOIN [shoppinggroupproduct] [sgp] ON [sg].[id_group] = [sgp].[id_group]
INNER JOIN [shoppingproduct] [sp] ON [sgp].[id_product] = [sp].[id_product]
WHERE [slg].[id_list] = " . $ergList['id_list'] . "
ORDER BY [group], [sgp].[ok], [product]";
	$showTitle = "";
	$databaseList->query($sql);

	while($erg = $databaseList->fetch()) {
		$countProduct = $erg['total_count'];
		$countShopped = $erg['shopped_count'];
		if($showTitle != $erg['group']) {
			if($showTitle != "") {
?>
				</ul>
<?
			}
			$showTitle = $erg['group'];
?>
				<ul class="ps-container ulGroups<?=($sdata->SHOPPED == 'true' && $countProduct == $countShopped ? ' ps-hidden' : '')?>">
					<!-- <?=$countProduct?> <?=$countShopped?> -->
					<li class="groupname">
						<h3><?=$erg['group'] ?></h3>
					</li>
<?
		}
?>
					<li class="groupproduct liproduct<?=($sdata->SHOPPED == 'true' && $erg['ok'] == 1 ? ' ps-hidden' : '')?>">
						<span class="ps-checkbox<?=($erg['ok'] == 1 ? ' checked' : '')?>" data-idList="<?=$ergList['id_list'] ?>" data-idGroup="<?=$erg['id_group'] ?>" data-idProduct="<?=$erg['id_product'] ?>"><?=$erg['product'] ?></span>
					</li>
<?
	}
?>
				</ul>
			</div>
		</div>
<?
}
?>
	</div>
</div>
