<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 15.05.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 673                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: trendcfg.inc 673 2024-07-12 13:22:12Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\Helper\wpConvert;
use system\Helper\security;
use system\wpInit;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'trendcfg'");
$headline = $database->fetch();
?>
<div id="trendcfgcontainer">
	<h1><?=$headline['name']?></h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="groups">Trendgruppen</span></li>
		<li><span class="ps-button" data-target="newelem">Neuen Trend anlegen</span></li>
		<li><span class="ps-button" data-target="editelem">Trends</span></li>
	</ul>
	<hr />
	<div id="trendcfg">
		<div id="erg">
		</div>
	</div>
<? if(security::checkGroup(security::entwickler) && wpInit::$wpDebug) { ?>
	<div>
		<hr />
		<div id="TrendInfo">
			<h1>Trendinfo's</h1>
			<table id="trendinfotable" class="stripe hover">
				<thead>
					<tr>
						<th>Trendname</th>
						<th>erster Eintrag</th>
						<th>letzter Eintrag</th>
						<th>Anzahl</th>
					</tr>
				</thead>
				<tbody>
<?
$sql = "SELECT [v].[id_trend], [t].[name], MIN([v].[time]) AS [min], MAX([v].[time]) AS [max], COUNT([v].[id_trend]) AS [count]
	FROM [trendvalue] [v]
	INNER JOIN [trend] [t] ON [t].[id_trend] = [v].[id_trend]
	GROUP BY [v].[id_trend], [t].[name]";
$database->query($sql);

while($erg = $database->fetch()) {
	echo '<tr>';
	echo '<td title="'.$erg['id_trend'].'">'.$erg['name'].'</td>';
	echo '<td>'.wpConvert::getdeDateTimeFromDB($erg['min']).'</td>';
	echo '<td>'.wpConvert::getdeDateTimeFromDB($erg['max']).'</td>';
	echo '<td>'.$erg['count'].'</td>';
	echo '</tr>';
}
?>
				</tbody>
			</table>
		</div>
	</div>
<? } ?>
</div>
