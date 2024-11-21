<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 709                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: trendselect.inc 709 2024-11-21 13:08:04Z                 $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\Helper\security;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'trendselect'");
$headline = $database->fetch();
$database->query('SELECT [id_trendgroup], [name] FROM [trendgroup] ORDER BY [name]');

?>
<div id="trendcontainer">
	<h1><?=$headline['name']?></h1>
	<span class="ps-button ps-hidden inactive" id="zoomout">Zoom entfernen</span>
	<span class="ps-button ps-hidden trendshow">Neu laden</span>
	<span class="ps-button ps-hidden autoloadtrenddata">Automatisch Neuladen <span class="autoloadtrenddataseconds"></span></span>
	<div id="erg">
	</div>
</div>
<div id="trendselect">
	<div id="trendformat">
		<div id="trendconfig">
			<h2>aktuelle Trendkonfiguration</h2>
			<hr />
			<span class="description ps-checkbox p-checkboxgroup checked" data-checkboxgroup="trendtimerange" data-choosen="timerange">Zeitraum</span><br />
			<span class="description">wählen:</span>
			<select class="ps-input timerange">
				<option value="last1Hours">Die letzte Stunde</option>
				<option value="last2Hours">Die letzten 2 Stunden</option>
				<option value="last3Hours">Die letzten 3 Stunden</option>
				<option value="last6Hours">Die letzten 6 Stunden</option>
				<option value="last12Hours">Die letzten 12 Stunden</option>
				<option value="last24Hours" selected="selected">Der letzte Tag</option>
				<option value="last2days">Die letzten 2 Tage</option>
				<option value="last3days">Die letzten 3 Tage</option>
				<option value="last7days">Die letzte Woche</option>
				<option value="last14days">Die letzten 2 Wochen</option>
				<option value="last30days">Die letzten 30 Tage</option>
			</select>
			<hr />
			<span class="description ps-checkbox p-checkboxgroup" data-checkboxgroup="trendtimerange" data-choosen="fromto">Zeitbereich:</span><br />
			<span class="description">von:</span><input type="text" class="ps-input timefrom" /><br />
			<span class="description">bis:</span><input type="text" class="ps-input timeto" />
			<hr />
			<span class="description ps-checkbox p-checkboxgroup" data-checkboxgroup="trendtimerange" data-choosen="trendday">Tag</span><br />
			<span class="description">Datum:</span><input type="text" class="ps-input trendday" />
			<hr />
			<div id="choosentrend">
			</div>
			<hr />
			<span class="ps-button trendshow">Trend anzeigen</span><br />
			<span class="ps-checkbox trendminmax checked">Axengrenzwerte aus Aufzeichnung</span><br />
			<span class="ps-checkbox trendonly1Axes">skaliert auf die größten Grenzwerte</span>
			<hr />
			<span class="description">Konfigurationsname:</span>
			<input type="text" class="ps-input trendsavename" />
			<? if(security::checkGroup(security::administrator)) { ?>
			<span class="ps-button trendsaveadmin">Trend für alle Benutzer speichern</span>
			<? } ?>
			<span class="ps-button trendsaveuser">Trend <?=((security::checkGroup(security::administrator)) ? 'für angemeldeten Benutzer ' : '')?>speichern</span>
			<hr />
		</div>
	</div>
	<div id="trendusercfg" class="ps-loading">
	</div>
	<div id="trendlegendcontainer">
		<span class="selectedtime"></span>
		<div id="trendlegend">
		</div>
	</div>
	<div id="trendexists">
		<h2>verfügbare Trends</h2>
		<hr />
		<ul>
<?
	while($erg = $database->fetch()) {
		echo '<li data-group="'.$erg['id_trendgroup'].'" class="ps-tree-parent">'.$erg['name'].'</li>';
		echo '<li data-trends="'.$erg['id_trendgroup'].'" class="p-tree-child"></li>';
	}
?>
			<li data-group="NULL" class="ps-tree-parent">nicht gruppierte Trends</li>
			<li data-trends="NULL" class="p-tree-child"></li>
		</ul>
		<!--ul>
<?
$group = '';
$first = true;
while($erg = $database->fetch()) {
	if($group != $erg['groupname']) {
		if($first) {
			$first = false;
		} else {
			echo '</ul></li>'."\n";
		}
		$group = $erg['groupname'];
		echo '<li><ul><li class="ps-tree-parent">'.$group.'</li>'."\n";
	}
	echo '<li><div class="trend">'.$erg['trendname'].'<span class="ps-button ps-green" data-trend="'.$erg['id_trend'].'">&rarr;</span><div class="clearboth"></div></div></li>'."\n";
}
if(!$first) echo '</ul></li>'."\n";
?>
		</ul-->
	</div>
</div>
