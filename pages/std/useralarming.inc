<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 29.03.2016                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 638                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: useralarming.inc 638 2024-07-04 14:41:27Z                $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $system
 */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'useralarming'");
$headline = $database->fetch();
$database->query("SELECT [id_email] FROM [user] WHERE [login] ='".$_SESSION[SESSION_ID]['USER']."'");
while($erg = $database->fetch()) { $contact = $erg['id_email']; }

if($contact == 0){
	echo 'Ihrem Benutzerkonto wurde noch kein Alarmierungsteilnehmer zugeordnet.';
	//Verlinkung zur Accountverwaltung?
} else {
	if($system->useAlarmingmodule()){
		$database->query('SELECT [ag].[id_alarmgroup], [ag].[name]
						FROM [email] [e]
						INNER JOIN [escalationgroupmember] [egm] ON [egm].[id_email] = [e].[id_email]
						INNER JOIN [escalationgroup] [eg] ON [eg].[id_escalationgroup] = [egm].[id_escalationgroup]
						INNER JOIN [alarmtoescalation] [ae] ON [ae].[id_escalationgroup] = [eg].[id_escalationgroup]
						INNER JOIN [alarm] [a] ON [a].[id_alarm] = [ae].[id_alarm]
						INNER JOIN [alarmgroup] [ag] ON [ag].[id_alarmgroup] = [a].[id_alarmgroup]
						WHERE [e].[id_email] = '.$contact.'
						ORDER BY [ag].[name]');
	} else {
		$database->query('SELECT [ag].[id_alarmgroup], [ag].[name]
						FROM [email] [e]
						INNER JOIN [alarmtoemail] [ae] ON [ae].[id_email] = [e].[id_email]
						INNER JOIN [alarm] [a] ON [a].[id_alarm] = [ae].[id_alarm]
						INNER JOIN [alarmgroup] [ag] ON [ag].[id_alarmgroup] = [a].[id_alarmgroup]
						WHERE [e].[id_email] = '.$contact.'
						ORDER BY [ag].[name]');
	}

	$alarmgroups = array();
	while($erg = $database->fetch()){
		$alarmgroups[$erg['id_alarmgroup']] = $erg['name'];
	}

	echo '<div id="useralarms">
	<h1>'.$headline['name'].'</h1>
	<hr />
	<div id="erg">
	<ul id="alarms">';

	foreach($alarmgroups as $id => $name){
		echo '<li class="ps-tree-parent" data-group="'.$id.'">'.$name.'</li>';
		echo '<li data-alarms="'.$id.'"></li>';
	}

	echo '
			</ul>
		</div>
	</div>';
}
?>