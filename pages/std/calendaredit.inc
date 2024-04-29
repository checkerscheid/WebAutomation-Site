<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 09.05.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 570                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendaredit.inc 570 2024-03-13 18:22:21Z                $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use \system\std;
$database->query('SELECT TOP 1 [c].[name], [dp].[name] AS [dpname], [c].[id_scenegroup], [gs].[id_gsync]
	FROM [calendar] [c]
	LEFT JOIN [dp] ON [c].[id_dp] = [dp].[id_dp]
	LEFT JOIN [gsync] [gs] ON [c].[id_calendar] = [gs].[id_calendar]
	WHERE [c].[id_calendar] = ' . std::gets('param1'));
$name = $database->fetch();
if($name['dpname'] != '') {
	$points[$name['dpname']] = $name['dpname'];
	$points[$name['dpname'].'_SB'] = $name['dpname'];
	$points[$name['dpname'].'_BM'] = $name['dpname'];
}
?>
<div id="calendar" data-gsync="<?=$name['id_gsync']?>">
	<h1 <?=($name['dpname'] != '') ? 'title="'.$name['dpname'].'" data-cal-is-scene="false"' : 'data-cal-is-scene="true"' ?>>Kalender (<?=$name['name']?>)</h1>
	<div id="calendartemplates">
		<div>
			<h3>Ereignisvorlagen</h3>
			<ul>
<?
	$database->query('SELECT [id_calendartemplate], [summary] FROM [calendartemplate] WHERE [id_calendar] = ' . std::gets('param1') . ' ORDER BY [summary]');
	while($erg = $database->fetch()) {
		echo '<li data-id="' . $erg['id_calendartemplate'] . '" class="draggable">' . $erg['summary'] . '</li>';
	}
?>
			</ul>
			<a class="ps-navi-button" href="std.calendartemplate.<?=std::gets('param1')?>.htm">Ereignisvorlagen verwalten</a>
		</div>
		<hr />
		<div>
			<h3>Feiertags- / Ereignisimport</h3>
			<a class="ps-navi-button" id="calendarimport" data-calendarid="<?=std::gets("param1")?>">Calendar importieren</a>
		</div>
		<hr />
		<div id="aktvalue">
		<? if($name['dpname'] != '') { ?>
			<span>aktueller Wert:</span><br />
			<span class="ps-input ps-operable" data-value="<?=$name['dpname']?>">-</span>
		<? } else { ?>
			<span class="ps-navi-button" data-scene="<?=$name['id_scenegroup']?>">Szene schalten</span>
		<? } ?>
		</div>
	</div>
	<div id="fullcalendar">
	</div>
</div>

