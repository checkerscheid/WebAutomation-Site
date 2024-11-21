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
//# Revision     : $Rev:: 711                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shopping.inc 711 2024-11-21 13:09:32Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages;
use system\html;
?>
<div id="shopping">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container page">
		<div class="ps-container">
			<ul>
<?
	$list = '';
	$group = '';
	$database->query("SELECT
[sl].[id_list], [sl].[name] AS [list],
[sg].[id_group], [sg].[name] AS [group],
[sp].[id_product], [sp].[name] AS [product], [sgp].[ok]
FROM [shoppinglist] [sl]
INNER JOIN [shoppinglistgroup] [slg] ON [sl].[id_list] = [slg].[id_list]
INNER JOIN [shoppinggroup] [sg] ON [slg].[id_group] = [sg].[id_group]
INNER JOIN [shoppinggroupproduct] [sgp] ON [sg].[id_group] = [sgp].[id_group]
INNER JOIN [shoppingproduct] [sp] ON [sgp].[id_product] = [sp].[id_product]
ORDER BY [list], [group], [sgp].[ok], [product]");
	while($erg = $database->fetch()) {
		if($list != $erg['list']) {
			$list = $erg['list'];
			echo '<li class="list"><h2>' . $list . '</h2"></li>';
		}
		if($group != $erg['group']) {
			$group = $erg['group'];
			echo '<li><hr /></li><li class="group"><h3>' . $group . '</h3"></li>';
		}
?>
				<li class="group product">
					<span class="ps-checkbox<?=($erg['ok'] == 1 ? ' checked' : '')?>" data-idlist="<?=$erg['id_list'] ?>" data-idgroup="<?=$erg['id_group'] ?>" data-idproduct="<?=$erg['id_product'] ?>"><?=$erg['product'] ?></span>
				</li>
<?
	}
	$group = '';
	$database->query("SELECT
[sl].[id_list], [sl].[name] AS [list],
[sp].[id_product], [sp].[name] AS [product], [slp].[ok]
FROM [shoppinglist] [sl]
INNER JOIN [shoppinglistproduct] [slp] ON [sl].[id_list] = [slp].[id_list]
INNER JOIN [shoppingproduct] [sp] ON [slp].[id_product] = [sp].[id_product]");
	while($erg = $database->fetch()) {
		if($group != 'einzelne Produkte') {
			$group = 'einzelne Produkte';
			echo '<li><hr /></li>';
		}
?>
				<li class="product">
					<span class="ps-checkbox<?=($erg['ok'] == 1 ? ' checked' : '')?>" data-idlist="<?=$erg['id_list'] ?>" data-idproduct="<?=$erg['id_product'] ?>"><?=$erg['product'] ?></span>
				</li>
<?
	}
?>
			</ul>
		</div>
	</div>
</div>
