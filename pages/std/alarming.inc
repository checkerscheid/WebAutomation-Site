<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Matthias Kotulla                                                 #
//# Date         : 29.02.2016                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: alarming.inc 550 2023-12-25 03:02:54Z                    $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $system
 * @var Type $idgroups
 * @var Type $actualgroup
 */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'alarming'");
$headline = $database->fetch();
?>
<div id="assignment">
	<h1><?=$headline['name']?></h1>

	<div id="filter">
		<span>Suche:</span><input type="text" class="ps-input" id="filtertext" />
		<span class="ps-button filter">suchen</span>
		<span class="ps-button reset">zurücksetzen</span>
	</div>

	<hr />
	<div id="erg">
		<ul id="alarms">
<?
$groupnames = array();
$groupnames[5] = $system->nameAlarmGroup5();
$groupnames[4] = $system->nameAlarmGroup4();
$groupnames[3] = $system->nameAlarmGroup3();
$groupnames[2] = $system->nameAlarmGroup2();
$groupnames[1] = $system->nameAlarmGroup1();

$idgroups = array();
$actualgroup;
if($system->useAlarmGroup5()){
	$actualgroup = 5;
} else {
	$idgroups[5] = 'X';			//GRUPPE INAKTIV BZW UNBESTIMMT
	if($system->useAlarmGroup4()){
		$actualgroup = 4;
	} else {
		$idgroups[4] = 'X';
		if($system->useAlarmGroup3()){
			$actualgroup = 3;
		} else {
			$idgroups[3] = 'X';
			if($system->useAlarmGroup2()){
				$actualgroup = 2;
			} else {
				$idgroups[2] = 'X';
				if($system->useAlarmGroup1()){
					$actualgroup = 1;
				} else {
					$idgroups[1] = 'X';
					$actualgroup = 0;
				}
			}
		}
	}
}

for($i = $actualgroup; $i>=0; $i--){
	$idgroups[$i] = 'X';
}

//echo 'var groupid='.$groupid.'; var alarmgroup='.$topgroup.'; function getGroupid() { return groupid; }; function getAlarmgroup() { return alarmgroup; };';
if($actualgroup != 0){
	$database->query('SELECT DISTINCT
			[a].[id_alarmgroups'.$actualgroup.'] AS [id], [ag].[name]
		FROM [alarm] [a]
		INNER JOIN [alarmgroups'.$actualgroup.'] [ag] ON [ag].[id_alarmgroups'.$actualgroup.'] = [a].[id_alarmgroups'.$actualgroup.']
		ORDER BY [name]');
	while($erg = $database->fetch()) {
		echo '<li class="ps-tree-parent" data-actualgroup="'.$actualgroup.'" data-idgroup'.$actualgroup.'="'.$erg['id'].'" ';
			for($i = 5; $i>$actualgroup; $i--){
				echo 'data-idgroup'.$i.'="X"';
			}
			for($i = $actualgroup; $i>=0; $i--){
				echo 'data-idgroup'.$i.'="X"';
			}
		echo '>'.$erg['name'].'</li>';

		echo '<li><ul data-actualgroupalarms="'.$actualgroup.'" data-alarms="';

		for($i = 5; $i>$actualgroup; $i--){
			echo 'X';
		}

		echo $erg['id'];

		for($i = $actualgroup-1; $i>=0; $i--){
			echo 'X';
		}

		echo '"></ul></li>';
		//echo '<li><ul data-alarms="'.$topGroup.'"></ul></li>';
	}

	$database->query('SELECT DISTINCT
		[id_alarm] AS [id]
		FROM [alarm]
		WHERE [id_alarmgroups'.$actualgroup.'] IS NULL AND [id_alarmgroup] IS NOT NULL');
	if($erg = $database->fetch()) {
		echo '<li class="ps-tree-parent" data-actualgroup="'.$actualgroup.'" data-idgroup'.$actualgroup.'="NULL" ';
		for($i = 5; $i>$actualgroup; $i--){
			echo 'data-idgroup'.$i.'="X"';
		}
		for($i = $actualgroup; $i>=0; $i--){
			echo 'data-idgroup'.$i.'="X"';
		}
		echo '>'.$groupnames[$actualgroup].' nicht angegeben</li>';

		echo '<li><ul data-actualgroupalarms="'.$actualgroup.'" data-alarms="';

		for($i = 5; $i>$actualgroup; $i--){
			echo 'X';
		}

		echo 'NULL';

		for($i = $actualgroup-1; $i>=0; $i--){
			echo 'X';
		}

		echo '"></ul></li>';
		//echo '<li><ul data-alarms="'.$topGroup.'"></ul></li>';
	}
} else {
	$database->query('SELECT DISTINCT
		[a].[id_alarmgroup] AS [id], [ag].[name]
		FROM [alarm] [a] INNER JOIN [alarmgroup] [ag] ON [ag].[id_alarmgroup] = [a].[id_alarmgroup]
		ORDER BY [name]');
	while($erg = $database->fetch()) {
		echo '<li class="ps-tree-parent" data-actualgroup="'.$actualgroup.'" data-idgroup5="X" data-idgroup4="X" data-idgroup3="X" data-idgroup2="X" data-idgroup1="X" data-idgroup0="'.$erg['id'].'">'.$erg['name'].'</li>';
		echo '<li><ul data-actualgroupalarms="'.$actualgroup.'" data-alarms="XXXXX'.$erg['id'].'"></ul></li>';
	}
}

echo '<li class="ps-tree-parent" data-actualgroup="'.$actualgroup.'" data-idgroup5="NULL" data-idgroup4="NULL" data-idgroup3="NULL" data-idgroup2="NULL" data-idgroup1="NULL" data-idgroup0="NULL">inaktive Alarme</li>';
echo '<li><ul class="alarmsingroup" data-idgroup0="NULL" data-actualgroupalarms="'.$actualgroup.'" data-alarms="NULL"></ul></li>';

?>
		</ul>
	</div>
</div>
