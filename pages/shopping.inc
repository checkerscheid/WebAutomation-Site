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
//# Revision     : $Rev:: 715                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shopping.inc 715 2025-01-29 18:35:26Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages;
use system\html;
use system\Helper\wpDatabase;
?>
<div id="shopping">
	<h1><? html::getPageHeadline();?></h1>
	<div class="page">
<?
$sqlList = "SELECT [id_list], [name] FROM [shoppinglist]";
$database->query($sqlList);
while($ergList = $database->fetch()) {
?>
		<div data-idList="<?=$ergList['id_list'] ?>">
			<div class="ps-tacenter">
				<h2><?=$ergList['name'] ?></h2>
				<span class="ps-checkbox gekaufte" data-idList="<?=$ergList['id_list'] ?>">gekaufte ausblenden</span>
			</div>
			<div class="ps-flex-container">
				<ul class="ps-container ulProducts">
<?
	$databaseProduct = new wpDatabase();
	$sql = "SELECT
[sp].[id_product], [sp].[name] AS [product], [slp].[ok]
FROM [shoppinglistproduct] [slp]
INNER JOIN [shoppingproduct] [sp] ON [slp].[id_product] = [sp].[id_product]
WHERE [slp].[id_list] = " . $ergList['id_list'] . "
ORDER BY [product]";
	$databaseProduct->query($sql);
	while($erg = $databaseProduct->fetch()) {
?>
					<li class="product liproduct">
						<span class="ps-checkbox<?=($erg['ok'] == 1 ? ' checked' : '')?>" data-idList="<?=$ergList['id_list'] ?>" data-idProduct="<?=$erg['id_product'] ?>"><?=$erg['product'] ?></span>
					</li>
<?
	}
?>
				</ul>
<?
	$databaseList = new wpDatabase();
	$sql = "SELECT
[sg].[id_group], [sg].[name] AS [group],
[sp].[id_product], [sp].[name] AS [product], [sgp].[ok]
FROM [shoppinglistgroup] [slg]
INNER JOIN [shoppinggroup] [sg] ON [slg].[id_group] = [sg].[id_group]
INNER JOIN [shoppinggroupproduct] [sgp] ON [sg].[id_group] = [sgp].[id_group]
INNER JOIN [shoppingproduct] [sp] ON [sgp].[id_product] = [sp].[id_product]
WHERE [slg].[id_list] = " . $ergList['id_list'] . "
ORDER BY [group], [sgp].[ok], [product]";
	$showTitle = "";
	$databaseList->query($sql);
	while($erg = $databaseList->fetch()) {
		if($showTitle != $erg['group']) {
			if($showTitle != "") {
?>
				</ul>
<?
			}
			$showTitle = $erg['group'];
?>
				<ul class="ps-container ulGroups">
					<li class="groupname">
						<h3><?=$erg['group'] ?></h3">
					</li>
<?
		}
?>
					<li class="groupproduct liproduct">
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
