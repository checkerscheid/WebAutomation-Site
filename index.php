<?
header('Content-Type: text/html; charset=utf-8');
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 696                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: index.php 696 2024-10-06 19:11:29Z                       $ #
//#                                                                                 #
//###################################################################################
/** @var array $points */
use system\wpInit;
use system\std;
use system\html;
use system\RegisterSignals;
use system\Helper\security;
use system\Helper\wpDatabase;
use system\Helper\wpConvert;
$st = microtime(true);
$sdata = null; // redefined in system.psys
require_once 'system/Helper/security.psys';
require_once 'system/Helper/wpDatabase.psys';
require_once 'system/Helper/wpConvert.psys';
require_once 'system/Helper/wpItem.psys';
require_once 'system/wpInit.psys';
require_once 'system/system.psys';

$database = new wpDatabase();
$system = new std();
//$webcom = new WebCom();

if(std::gets('param1') == 'forbidden') header("HTTP/1.0 403 Forbidden");

security::cookieLogin();
if(std::gets('src') != 'login' && !security::logedin()) {
	security::AutoLogon();
}
security::setAutoLogOff();

$system->checkSrc(std::gets('src'), std::gets('path'));

$calendarversion = substr($system->getSrc(), 0, strlen('calendar')) == 'calendar' ? '3.7.0' : '2.3.2';

security::checkPageLevel($system->getSrc());

if(!isset($sdata->TOUCH)) $sdata->TOUCH = 0;
if(!isset($sdata->MARK)) $sdata->MARK = 0;
if(!isset($sdata->Whitemode)) $sdata->Whitemode = 0;
if($system->getSrc() != 'notfound') {
	$sdata->ERRORPOINTS = array();
	$sdata->REGPOINTS = array();
	$sdata->POINTS = array();
}
unset($_SESSION[SESSION_ID]['ActiveAlarms']);
?>
<!DOCTYPE html>
<html id="html"<?=($sdata->Whitemode ? '' : ' class="black"')?>>
<head>
	<title>WebAutomation [<?=$system->getFullSrc()?>]</title>
	<meta charset="utf-8" />
	<meta name="author" content="Christian Scheid" />
	<!--meta name="viewport" content="width=800" /-->
	<meta name="viewport" content="width=device-width, initial-scale=1, min-width=800" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<!--link rel="stylesheet" type="text/css" href="library/jquery-ui-1.10.3.min.css" /-->
	<link rel="stylesheet" type="text/css" href="library/jquery-ui-1.10.4.schwarz.min.css" />
	<link rel="stylesheet" type="text/css" href="library/jquery.dataTables-1.10.0.min.css" />
	<link rel="stylesheet" type="text/css" href="library/fullcalendar-<?=$calendarversion?>.min.css" />
	<link rel="stylesheet" type="text/css" href="<?=$system->getLinkedSrc()?>.css" />
	<script type="text/javascript" src="library/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="library/jquery-ui-1.10.3.min.js"></script>
	<script type="text/javascript" src="library/jquery-ui-touch-punch-0.2.3.js"></script>
	<script type="text/javascript" src="library/jquery.dataTables-1.10.0.min.js"></script>
	<script type="text/javascript" src="library/jquery.flot.min.js"></script>
	<script type="text/javascript" src="library/jquery.flot.time.min.js"></script>
	<script type="text/javascript" src="library/jquery.flot.selection.min.js"></script>
	<script type="text/javascript" src="library/jquery.flot.crosshair.min.js"></script>
	<script type="text/javascript" src="library/jquery.flot.fillbetween.min.js"></script>
	<script type="text/javascript" src="library/jquery.flot.pie.min.js"></script>
	<script type="text/javascript" src="library/date.js"></script>
	<script type="text/javascript" src="library/moment.min.js"></script>
	<script type="text/javascript" src="library/fullcalendar-<?=$calendarversion?>.min.js"></script>
	<script type="text/javascript" src="<?=$system->getLinkedSrc()?>.js"></script>
	<link rel="icon" type="image/vnd.microsoft.icon" href="favicon.ico" />
	<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="favicon.ico" />
</head>
<body class="<?=(isset($sdata->TOUCH) && $sdata->TOUCH == '1' ? 'touch' : '')?> <?=(isset($sdata->MARK) && $sdata->MARK == '1' ? '' : 'nomark')?>">
	<audio src="system/S_Opener.mp3" id="alarmsound"></audio>
	<div id="contentAll">
		<div id="content">
			<? if(security::checkGroup(security::entwickler)) { ?>
			<div class="checkPosition">
				<div class="redHorizontal ps-hidethiswrong">
					<div class="positionCheckDiv"><p>0 px</p></div>
				</div>
				<div class="redVertical ps-hidethiswrong">
					<div class="positionCheckDiv"><p>0 px</p></div>
				</div>
			</div>
			<div class="lastidCheckDiv"></div>
			<? } ?>
			<div id="header">
				<div class="Balken_links"></div>
				<div class="Balken_rechts"></div>
				<div class="Balken">
					<div class="wpBalken">
<?
	$ip = std::arrays($_SERVER, 'REMOTE_ADDR');
	$hostname = (wpInit::$useDns) ? gethostbyaddr($ip) : $ip;
	$database->query('
		INSERT INTO [visitors] ([id_user], [ip], [host], [page], [datetime]) VALUES
		(' . security::getIdFromUser() . ', \'' . $ip . '\', \'' . $hostname. '\', \'' . $system->getFullSrc() . '\', \'' . wpConvert::getDateTime() . '\')
	');
?>
						<?=html::getSystemMenu($system->getSrc())?>
					</div>
				</div>
			</div>
			<div class="pagemenu">
				<div class="pagemenuleft"></div>
				<div class="pagemenuright"></div>
				<div class="pagemenucontent">
					<?=html::getMenu($system->getSrc())?>
				</div>
			</div>
			<div class="pagecontent">
<?
$points = null;
include('pages/'.$system->getFullSrc().'.inc');
$newpointarray = array();
if(isset($points) && count($points) > 0) {
	$newpointarray = $newpointarray + $points;
}
if(count(wpInit::$stdpoints) > 0) {
	$newpointarray = $newpointarray + wpInit::$stdpoints;
}
new RegisterSignals($newpointarray);

if(security::checkGroup(security::entwickler) && wpInit::$SetAlarmLink) {
	$SetAlarmLinkWhere = array();
	foreach(std::arrays($_SESSION[SESSION_ID], 'POINTS', array()) as $name) {
		$SetAlarmLinkWhere[] = " [d].[name] = '" . $name->name . "'";
	}
	if(is_array($SetAlarmLinkWhere)) {
		$s_where = implode(' OR', $SetAlarmLinkWhere);
		$sql = "UPDATE [alarm] SET [link] = '".substr($_SERVER['REQUEST_URI'],1)."' WHERE [link] IS NULL AND [id_alarm] IN (SELECT [a].[id_alarm] FROM [opcdatapoint] [d] INNER JOIN [alarm] [a] ON [d].[id_opcdatapoint] = [a].[id_opcdatapoint] WHERE" . $s_where . ")";
		//echo $sql;
		$database->query($sql);
	}
}
?>
				<div id="presession">
<?
if(security::checkGroup(security::entwickler)) {
	if(wpInit::$SetAlarmLink) {
		echo '<hr />';
		echo '<div><span class="ps-red">Automatischer Alarmlink Insert eingeschaltet!</span></div>';
	}
	if(wpInit::$wpDebug) {
		echo '<hr />';
		echo '<div><span class="ps-red">Debug Mode eingeschaltet!</span></div>';
		std::test_array($_SESSION[SESSION_ID]);
		std::test_array($_SERVER);
	}
}
?>
				</div>
			</div>
		</div>
	</div>
	<div id="footerLinks">
	<div id="footerRechts">
	<div id="footer">
		<div class="pagemenu">
			<div class="footermenucontent">
				<div class="tablecell">
					<? if(security::logedin()) { ?>
					<? if(strtolower(std::arrays($_SESSION[SESSION_ID], 'USER')) == 'besucher') { ?>
					<a class="footerlogin" title="login" href="login.htm"><?=wpHTML_EMPTY?></a>
					<? } else { ?>
					<a class="footerlogin<?=(security::checkLevel(10)) ? ' logout' : '' ?>" title="abmelden" href="logout.htm"><?=wpHTML_EMPTY?></a>
					<? } ?>
					<span class="aktusername"><span class="ps-sm-hide"><span class="ps-md-hide">angemeldeter </span>Benutzer: </span>
<?
						if(security::checkLevel(10) && $sdata->ISSTATIC == '0') {
							echo '<a href="std.changepassword.'.$sdata->USER.'.htm">';
						}
						echo $sdata->USERNAME.' ('.$sdata->GROUP.')';
						if(security::checkLevel(10) && $sdata->ISSTATIC == '0') {
							echo '</a>';
						}
						if(security::checkGroup(security::benutzer)) {
							echo '
<span class="Autologoff ps-hidden">
	<span class="ps-sm-hide"><span class="ps-md-hide">automatisches </span>Abmelden in </span>
	<span class="AutologoffTime">'.wpHTML_EMPTY.'</span>
</span>';
						}
?>
					</span>
					<? } else { ?>
					<a class="footerlogin" title="login" href="login.htm"><?=wpHTML_EMPTY?></a>
					<? } ?>
				</div>

				<div class="filler"></div>

				<div class="tablecell">
					<div class="ledcontainer" title="Verbindung WEBautomation CS">
						<div id="LED1" class="LED_aus"></div>
						<div id="LED2" class="LED_aus"></div>
					</div>
					<? if(security::checkLevel(wpInit::$reqgroupalarm)) { ?>
					<span class="alarmup" title="Alarmfenster maximieren"></span>
					<span class="alarmsettings" title="Alarmleisteneinstellungen"></span>
					<? } ?>
					<? if(security::checkLevel(wpInit::$reqgroupwartung)) { ?>
					<div id="wartungactive" class="ps-hidden" title="Wartung ist aktiv"></div>
					<? } ?>
					<? if(std::vars(wpInit::$showATinFooter) != '') { ?>
					<span class="footertemp"><span class="ps-sm-hide">AT: </span><span data-ws="<?=wpInit::$showATinFooter?>" data-value="AT" class="atinfooter"><?=wpHTML_EMPTY?></span></span>
					<? } ?>
					<span class="footerdatetime"><span class="ps-sm-hide">Datum: </span>01.01.1970<span class="ps-sm-hide">, Uhrzeit:</span> 00:00:00</span>

				</div>

			</div>
		</div>
		<div class="alarmsettingspopup ps-hidden">
			<h4>Alarmleisteneinstellungen</h4>
			<hr />
			<? if(security::checkLevel(wpInit::$reqgroupwartung)) { ?>
				<span class="ps-button setWartung">Wartung einschalten</span>
				<hr />
			<? } ?>
			<? if(security::checkLevel(wpInit::$reqgroupquit)) { ?>
				<span class="quitall ps-button">Alle quittieren</span><br />
				<span class="quitallinaktiv ps-button">Alle gegangenen quittieren</span>
				<hr />
			<? } ?>
			<span class="flttype ps-button">Filter nach Typ</span>
			<span class="fltgroup ps-button">Filter nach Gruppe</span>
			<? if($system->useAlarmGroup5()) { ?>
			<span class="fltgroup5 ps-button">Filter nach <?=$system->nameAlarmGroup5()?></span>
			<? } ?>
			<? if($system->useAlarmGroup4()) { ?>
			<span class="fltgroup4 ps-button">Filter nach <?=$system->nameAlarmGroup4()?></span>
			<? } ?>
			<? if($system->useAlarmGroup3()) { ?>
			<span class="fltgroup3 ps-button">Filter nach <?=$system->nameAlarmGroup3()?></span>
			<? } ?>
			<? if($system->useAlarmGroup2()) { ?>
			<span class="fltgroup2 ps-button">Filter nach <?=$system->nameAlarmGroup2()?></span>
			<? } ?>
			<? if($system->useAlarmGroup1()) { ?>
			<span class="fltgroup1 ps-button">Filter nach <?=$system->nameAlarmGroup1()?></span>
			<? } ?>
			<span class="fltremove ps-button">Filter entfernen</span>
			<hr />
			<span class="defaultsort ps-button">Standard Sortierung</span>
			<span class="show-dp ps-button">Datenpunkte einblenden</span>
		</div>
		<? if(security::checkLevel(wpInit::$reqgroupalarm)) { ?>
		<table id="onlinealarm" data-priority="-1">
			<thead>
				<tr>
					<th>Kommt</th>
					<th>Geht</th>
					<th>Quittiert</th>
					<?=(($system->useAlarmGroup5()) ? '<th>'.$system->nameAlarmGroup5().'</th>' : '')?>
					<?=(($system->useAlarmGroup4()) ? '<th>'.$system->nameAlarmGroup4().'</th>' : '')?>
					<?=(($system->useAlarmGroup3()) ? '<th>'.$system->nameAlarmGroup3().'</th>' : '')?>
					<?=(($system->useAlarmGroup2()) ? '<th>'.$system->nameAlarmGroup2().'</th>' : '')?>
					<?=(($system->useAlarmGroup1()) ? '<th>'.$system->nameAlarmGroup1().'</th>' : '')?>
					<th>Gruppe</th>
					<th>Beschreibung</th>
					<th>Typ</th>
					<th>Datenpunkt</th>
					<th>AlarmID</th>
					<th>LastUpdate</th>
					<th>prio</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<? } ?>
	</div>
	</div>
	</div>
	<div id="error"></div>
	<div id="dialog"></div>
</body>
</html>
<?
if(wpInit::$OneLine == false) echo ob_get_clean();
else echo html::cleanOutput(ob_get_clean());
echo '<!-- '.(microtime(true) - $st).' -->'.PHP_EOL;
// echo '<!-- '.(session_encode()).' -->';
?>
