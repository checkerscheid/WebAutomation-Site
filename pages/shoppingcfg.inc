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
//# Revision     : $Rev:: 718                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: shoppingcfg.inc 718 2025-02-11 05:57:26Z                 $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages;
use system\html;
use system\Helper\wpDatabase;
?>
<div id="shoppingcfg">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container page">
		<div class="newLists">
			
			<div class="ps-container" data-idList="0">
				<h4>Neue Liste:</h4>
				<div class="product-row">
					<input class="ps-input name" />
					<span class="ps-image-button ps-add"></span>
				</div>
			</div>
<?
	$sqlList = "SELECT [id_list], [name] FROM [shoppinglist]";
	$database->query($sqlList);
	while($ergList = $database->fetch()) {
?>
			<div class="ps-container" data-idList="<?=$ergList['id_list'] ?>">
				<h2><?=$ergList['name'] ?></h2>
				<div data-listentries="<?=$ergList['id_list'] ?>">

				</div>
			</div>
<?
	}
?>
		</div>
		<div class="ps-container">
			<h2>Gruppen</h2>
			<div class="newGroups">

			</div>
		</div>
		<div class="ps-container">
			<h2>Produkte</h2>
			<div class="newProducts">

			</div>
		</div>
	</div>
</div>
