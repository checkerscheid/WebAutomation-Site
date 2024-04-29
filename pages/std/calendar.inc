<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 10.01.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendar.inc 550 2023-12-25 03:02:54Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'calendar'");
$headline = $database->fetch();
$database->query('SELECT [id_calendargroup], [name] FROM [calendargroup] ORDER BY [name]');

?>
<div id="calendar">
	<h1><?=$headline['name']?></h1>
	<ul>
<?
	while($erg = $database->fetch()) {
		echo '<li data-group="'.$erg['id_calendargroup'].'" class="ps-tree-parent">'.$erg['name'].'</li>';
		echo '<li data-calendars="'.$erg['id_calendargroup'].'" class="p-tree-child"></li>';
	}
?>
		<li data-group="NULL" class="ps-tree-parent">nicht gruppierte Zeitprogramme</li>
		<li data-calendars="NULL" class="p-tree-child"></li>
	</ul>
</div>
