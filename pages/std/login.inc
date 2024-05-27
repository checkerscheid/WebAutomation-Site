<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 12.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: login.inc 582 2024-04-10 06:45:45Z                       $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $system
 * @var Type $sdata
 */
namespace pages\std;
use system\Helper\cfg;
use system\Helper\security;
use system\std, system\wpInit;
require_once 'system/Helper/cfg.psys';

if(std::gets('aktion') == 'out') {
	$lastsrc = $sdata->LASTSRC;
	$lastpath = $sdata->LASTPATH;
	$lastparam1 = $sdata->LASTPARAM1;
	$lastparam2 = $sdata->LASTPARAM2;
	unset($_SESSION[SESSION_ID]);
	if($lastsrc != 'login' || $lastsrc != 'notallowed') {
		$sdata->LOGINTOSRC = (($lastpath != '') ? $lastpath . '.': '') . $lastsrc .
		(($lastparam1 != '') ? '.' . $lastparam1: '') .
		(($lastparam2 != '') ? '.' . $lastparam2: '');
	}
	security::unsetCookie('wps');
	if(std::gets('auto') == 'true') {
		$system->checkSrc('', '');
		std::href($system->getLinkedSrc());
	} else {
		std::href('login');
	}
}

$message = '';
if(std::posts('einloggen') == 'anmelden') {

	$database->query("SELECT TOP 1
			[u].[id_user], [u].[password], [u].[id_usergroup], [u].[name], [u].[lastname], [u].[static], [u].[startpage], [u].[autologoff],
			[g].[order], [g].[name] AS [groupname]
			FROM [user] [u]
			INNER JOIN [usergroup] [g] ON [u].[id_usergroup] = [g].[id_usergroup]
			WHERE [u].[login] = '".$_POST['username']."'");
	$erg = $database->fetch();
	if(security::createHash(std::posts('password')) == $erg['password']) {
		$id_user = $erg['id_user'];
		$sdata->angemeldet = 'angemeldet';
		$sdata->USER = $_POST['username'];
		$sdata->USERNAME = $erg['name'].' '.$erg['lastname'];
		$sdata->GROUP = $erg['groupname'];
		$sdata->IDGROUP = $erg['id_usergroup'];
		$sdata->LEVEL = $erg['order'];
		$sdata->ISSTATIC = $erg['static'];
		$sdata->ISAUTOLOGON = '0';
		if($erg['autologoff'] > 0) {
			$sdata->AUTOLOGOFFM = $erg['autologoff'];
			$sdata->AUTOLOGOFF = security::getAutoLogOff($erg['autologoff']);
		}
		$sdata->LOGINTOUSERSRC = $erg['startpage'];
		if(std::posts('angemeldetbleiben') == 'true') {
			toDatabase($_POST['username'], $id_user);
		}
		setFilterSession($id_user);
		$system->checkSrc('', '');
		if($sdata->LOGINTOSRC != '') {
			std::href($sdata->LOGINTOSRC);
		} else if($erg['startpage'] != '') {
			std::href($erg['startpage']);
		} else {
			std::href($system->getLinkedSrc());
		}
	} else {
		$message = 'Falsche Eingabe';
	}
}
$ldmessage = '';
if(std::posts('ldappen') == 'anmelden') {
	$adlogin = security::adLogin(std::posts('ldapuser'), std::posts('ldappw'));
	if(std::arrays($adlogin, 'angemeldet') == 'true') {
		$database->query("SELECT TOP 1
			[g].[order], [g].[name] AS [groupname], [u].[autologoff], [u].[startpage]
			FROM [user] [u]
			INNER JOIN [usergroup] [g] ON [u].[id_usergroup] = [g].[id_usergroup]
			WHERE [u].[login] = '".std::arrays($adlogin, 'username')."'");
		$erg = $database->fetch();
		$id_user = std::arrays($adlogin, 'iduser');
		$sdata->angemeldet = 'angemeldet';
		$sdata->USER = std::arrays($adlogin, 'username');
		$sdata->USERNAME = std::arrays($adlogin, 'showname');
		$sdata->GROUP = $erg['groupname'];
		$sdata->IDGROUP = std::arrays($adlogin, 'idgroup');
		$sdata->LEVEL = $erg['order'];
		$sdata->ISSTATIC = 0;
		$sdata->ISAUTOLOGON = 0;
		if($erg['autologoff'] > 0) {
			$sdata->AUTOLOGOFFM = $erg['autologoff'];
			$sdata->AUTOLOGOFF = security::getAutoLogOff($erg['autologoff']);
		}
		$sdata->LDAPPEN = 'angemeldet';
		if(std::posts('angemeldetbleiben') == 'true') {
			toDatabase(std::arrays($adlogin, 'username'), $id_user);
		}
		setFilterSession($id_user);
		$system->checkSrc('', '');

		if($erg['startpage'] != '') {
			$sdata->LOGINTOSRC = $erg['startpage'];
			std::href($sdata->LOGINTOSRC);
		} else if($sdata->LOGINTOSRC != '') {
			std::href($sdata->LOGINTOSRC);
		} else {
			std::href($system->getLinkedSrc());
		}
	} else {
		$ldmessage = std::arrays($adlogin, 'message');
	}
}
function toDatabase($benutzername, $iduser) {
	global $database;
	$security = security::createHash($benutzername);
	$database->query("
			MERGE INTO [cookie] AS [TARGET]
			USING
				(SELECT
					'$security' AS [id_cookie],
					$iduser AS [id_user]
				) AS [SOURCE] ([id_cookie], [id_user])
			ON
				([TARGET].[id_cookie] = [SOURCE].[id_cookie])
			WHEN MATCHED THEN
				UPDATE SET [id_user] = $iduser
			WHEN NOT MATCHED THEN
				INSERT ([id_cookie], [id_user]) VALUES ('$security', $iduser);");
	security::setCookie('wps', $security);
}
function setFilterSession($id_user) {
	global $database;
	$alarmgroup = array();
	$database->query('SELECT [id_alarmgroup], [name] FROM [alarmgroup]');
	while($erg = $database->fetch()) {
		$alarmgroup[$erg['id_alarmgroup']] = $erg['name'];
	}
	$alarmgroup1 = array();
	$database->query('SELECT [id_alarmgroups1], [name] FROM [alarmgroups1]');
	while($erg = $database->fetch()) {
		$alarmgroup1[$erg['id_alarmgroups1']] = $erg['name'];
	}
	$alarmgroup2 = array();
	$database->query('SELECT [id_alarmgroups2], [name] FROM [alarmgroups2]');
	while($erg = $database->fetch()) {
		$alarmgroup2[$erg['id_alarmgroups2']] = $erg['name'];
	}
	$alarmgroup3 = array();
	$database->query('SELECT [id_alarmgroups3], [name] FROM [alarmgroups3]');
	while($erg = $database->fetch()) {
		$alarmgroup3[$erg['id_alarmgroups3']] = $erg['name'];
	}
	$alarmgroup4 = array();
	$database->query('SELECT [id_alarmgroups4], [name] FROM [alarmgroups4]');
	while($erg = $database->fetch()) {
		$alarmgroup4[$erg['id_alarmgroups4']] = $erg['name'];
	}
	$alarmgroup5 = array();
	$database->query('SELECT [id_alarmgroups5], [name] FROM [alarmgroups5]');
	while($erg = $database->fetch()) {
		$alarmgroup5[$erg['id_alarmgroups5']] = $erg['name'];
	}
	$database->query("SELECT TOP 1 [value] FROM [cfg]
			WHERE [id_user] = $id_user AND [key] = '".cfg::alarmtable_filtertype."'");
	$erg = $database->fetch();
	if($database->hasRows() > 0) {
		foreach (explode('%~%', $erg['value']) as $value) {
			$_SESSION[SESSION_ID]['ALARMTABLE']['FLTTYPE'][] = cfg::$alarmtype[$value];
		}
	}
	$database->query("SELECT TOP 1 [value] FROM [cfg]
			WHERE [id_user] = $id_user AND [key] = '".cfg::alarmtable_filtergroup."'");
	$erg = $database->fetch();
	if($database->hasRows() > 0) {
		foreach (explode('%~%', $erg['value']) as $value) {
			$_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP'][] = $alarmgroup[$value];
		}
	}
	$database->query("SELECT TOP 1 [value] FROM [cfg]
			WHERE [id_user] = $id_user AND [key] = '".cfg::alarmtable_filtergroup1."'");
	$erg = $database->fetch();
	if($database->hasRows() > 0) {
		foreach (explode('%~%', $erg['value']) as $value) {
			$_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP1'][] = $alarmgroup1[$value];
		}
	}
	$database->query("SELECT TOP 1 [value] FROM [cfg]
			WHERE [id_user] = $id_user AND [key] = '".cfg::alarmtable_filtergroup2."'");
	$erg = $database->fetch();
	if($database->hasRows() > 0) {
		foreach (explode('%~%', $erg['value']) as $value) {
			$_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP2'][] = $alarmgroup2[$value];
		}
	}
	$database->query("SELECT TOP 1 [value] FROM [cfg]
			WHERE [id_user] = $id_user AND [key] = '".cfg::alarmtable_filtergroup3."'");
	$erg = $database->fetch();
	if($database->hasRows() > 0) {
		foreach (explode('%~%', $erg['value']) as $value) {
			$_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP3'][] = $alarmgroup3[$value];
		}
	}
	$database->query("SELECT TOP 1 [value] FROM [cfg]
			WHERE [id_user] = $id_user AND [key] = '".cfg::alarmtable_filtergroup4."'");
	$erg = $database->fetch();
	if($database->hasRows() > 0) {
		foreach (explode('%~%', $erg['value']) as $value) {
			$_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP4'][] = $alarmgroup4[$value];
		}
	}
	$database->query("SELECT TOP 1 [value] FROM [cfg]
			WHERE [id_user] = $id_user AND [key] = '".cfg::alarmtable_filtergroup5."'");
	$erg = $database->fetch();
	if($database->hasRows() > 0) {
		foreach (explode('%~%', $erg['value']) as $value) {
			$_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP5'][] = $alarmgroup5[$value];
		}
	}
}
?>

<div id="login">
	<? if(std::arrays(wpInit::$ad, 'Server') != '') { ?>
		<div class="accordion"<?=($message != '' ? ' data-active="1"' : ' data-active="0"')?>>
			<h3>Domänenanmeldung WEBautomation</h3>
			<div>
<?
if($ldmessage != '') {
	echo '<div class="error">'.$ldmessage.'</div>';
}
?>
				<form action="login.htm" method="post" id="ldapform">
					<div class="row">
						<h3>(Wie bei Windows)</h3>
					</div>
					<div class="row">
						<label for="ldapuser">Benutzername:</label>
						<span class="ps-button osk" data-popup="Benutzername" data-osk="ldapuser">⌨</span><!-- Unicode-Tastatur -->
						<input type="text" id="ldapuser" name="ldapuser" class="ps-input" placeholder="Benutzername" />
					</div>
					<div class="row">
						<label for="ldappw">Passwort:</label>
						<span class="ps-button osk pw" data-popup="Passwort" data-osk="ldappw">⌨</span><!-- Unicode-Tastatur -->
						<input type="password" id="ldappw" name="ldappw" class="ps-input" placeholder="Passwort" />
					</div>
					<div class="row">
						<span class="label"><?=wpHTML_EMPTY?></span>
						<span class="ps-checkbox">angemeldet bleiben</span>
					</div>
					<hr />
					<div class="row">
						<input type="submit" name="ldappen" value="anmelden" class="ps-button" />
					</div>
				</form>
			</div>
			<h3>Anmeldung WEBautomation</h3>
	<? } else {
		echo '<fieldset>
			<legend>Anmeldung WEBautomation</legend>';
	} ?>
			<div>
<?
if($message != '') {
	echo '<div class="error">'.$message.'</div>';
}
?>
				<form action="login.htm" method="post" id="loginform">
					<div class="row">
						<label for="username">Benutzername:</label>
						<span class="ps-button osk" data-popup="Benutzername" data-osk="username">⌨</span><!-- Unicode-Tastatur -->
						<input type="text" id="username" name="username" class="ps-input" placeholder="Benutzername" />
					</div>
					<div class="row">
						<label for="password">Passwort:</label>
						<span class="ps-button osk pw" data-popup="Passwort" data-osk="password">⌨</span><!-- Unicode-Tastatur -->
						<input type="password" id="password" name="password" class="ps-input" placeholder="Passwort" />
					</div>
					<div class="row">
						<span class="label"><?=wpHTML_EMPTY?></span>
						<span class="ps-checkbox">angemeldet bleiben</span>
					</div>
					<hr />
					<div class="row">
						<input type="submit" name="einloggen" value="anmelden" class="ps-button" />
					</div>
				</form>
			</div>
	<? if(std::arrays(wpInit::$ad, 'Server') != '') { ?>
		</div>
	<? } else {
		echo '</fieldset>';
	} ?>
</div>
