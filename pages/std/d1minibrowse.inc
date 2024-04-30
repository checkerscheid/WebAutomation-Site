<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 03.04.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 594                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: d1minibrowse.inc 594 2024-04-29 17:52:07Z                $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'd1minibrowse'");
$headline = $database->fetch();

?>
<div id="d1minibrowse">
	<h1><?=$headline['name']?></h1>
	<div id="globalD1MiniCmd">
		<span class="ps-button startSearch">Start Search</span>
	</div>
	<div class="searchResult">
		<h3 class="foundNew"></h3>
		<div class="erg"></div>
		<pre class="wpDebugResult"></pre>
	</div>
</div>