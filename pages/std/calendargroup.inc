<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 21.05.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 570                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendargroup.inc 570 2024-03-13 18:22:21Z               $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
$database->query('SELECT [c].[id_calendar], [c].[id_dp], [c].[name], [dp].[name] AS [dpname], [cg].[name] AS [title]
		FROM [calendar] [c]
		INNER JOIN [dp] ON [c].[id_dp] = [dp].[id_dp]
		INNER JOIN [calendargroup] [cg] ON [cg].[id_calendargroup] = [c].[id_calendargroup]
		WHERE [c].[id_calendargroup] = '.std::gets('param1'));
if($database->hasRows() > 0) {
	echo '<div class="ps-hidden">';
	$point = array();
	$Titel ='';
	while($erg = $database->fetch()) {
		$point[$erg['id_calendar']] = $erg['dpname'];
		$Titel = $erg['title'];
		echo '<input type="ps-hidden" value="'.$erg['id_calendar'].'" data-type="" data-name="'.$erg['name'].'" />';
	}
	new \system\RegisterSignals($point);
	echo '</div>';

?>

<div id="calendargroup" data-group="<?=std::gets('param')?>">
	<a href="std.calendar.htm" class="ps-button">Zeitprogramm Übersicht</a>
	<div id="legende"></div>
	<h1>Zeitprogramme - <?=$Titel?></h1>
	<div id="fullcalendar"></div>
</div>
<?
} else {
	std::href('notfound');
}
?>
