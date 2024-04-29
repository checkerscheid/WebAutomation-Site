<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 27.11.2017                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendartemplate.inc 552 2024-01-06 13:56:24Z            $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $points
 */
namespace pages\std;
use system\std;
$database->query('SELECT [dp].[name] AS [DP], [c].[name]
	FROM [calendar] [c]
	LEFT JOIN [opcdatapoint] [dp] ON [c].[id_opcdatapoint] = [dp].[id_opcdatapoint]
	WHERE [c].[id_calendar] = ' . std::gets('param1'));
$erg = $database->fetch();
$points = array(
	'DP' => $erg['DP']
);
?>
<div id="calendartemplatecontainer">
	<h1>Ereignisvorlagen verwalten (<?=$erg['name']?>)</h1>
	<ul id="submenu">
		<li><span class="ps-button" data-target="newtemplate">Neue Ereignisvorlagen</span></li>
		<li><span class="ps-button" data-target="templates">Ereignisvorlagen bearbeiten</span></li>
	</ul>
	<hr />
	<div id="calendartemplate">
		<div id="erg">
		</div>
	</div>
</div>
