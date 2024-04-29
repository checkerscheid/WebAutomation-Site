<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 12.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: useradmin.inc 582 2024-04-10 06:45:45Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\Helper\security;
use system\std, system\wpInit, system\html;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'useradmin'");
$headline = $database->fetch();

function showerror($text) {
	return '<div class="entry"><span class="neg">'.$text.'</span></div>';
}

$errormessage = array();

if(isset($_POST['absenden']) && $_POST['absenden'] == 'speichern') {
	if(!preg_match('/^[a-zA-Z0-9_-]{3,15}$/', $_POST['login'])) {
		$errormessage['login'] = 'Der Benutzername muss zwischen 3 und 15 Zeichen lang sein.<br />Er darf nur die folgenden Zeichen enthalten:<br />- Buchstaben (a-z und A-Z)<br />- Zahlen (0-9)<br />- Binde- oder Unterstrich<br /><br />';
	}
	if(!preg_match('/^[a-zA-ZüöäÜÖÄ ]{2,30}$/', $_POST['lastname'])) {
		$errormessage['lastname'] = 'Der Nachname muss zwischen 2 und 30 Zeichen lang sein.<br />Er darf nur die folgenden Zeichen enthalten:<br />- Buchstaben (a-z und A-Z)<br />- Leerzeichen<br /><br />';
	}
	if(!preg_match('/^[a-zA-ZüöäÜÖÄ ]{2,30}$/', $_POST['name'])) {
		$errormessage['name'] = 'Der Vorname muss zwischen 2 und 30 Zeichen lang sein.<br />Er darf nur die folgenden Zeichen enthalten:<br />- Buchstaben (a-z und A-Z)<br />- Leerzeichen<br /><br />';
	}
	if(std::posts('startpage') != '' && !preg_match('/^[a-zA-Z0-9_\-\.]+$/', $_POST['startpage'])) {
		$errormessage['startpage'] = 'Die Startseite darf nur die folgenden Zeichen enthalten:<br />- Buchstaben (a-z und A-Z)<br />- Zahlen (0-9)<br />- Binde- oder Unterstrich<br />- Punkte<br /><br />';
	}
	if(std::arrays($errormessage, 'login') == '') {
		$userexists = array();
		$database->query('SELECT [login] FROM [user]');
		while($erg_userexists = $database->fetch()) {
			$userexists[] = $erg_userexists['login'];
		}
		if(in_array($_POST['login'], $userexists)) {
			$errormessage['login'] = 'Dieser Benutzername existiert bereits.<br />Bitte wählen Sie einen anderen.';
		}
	}
	if(count($errormessage) == 0) {
		$errormessage['erfolgreich'] = '<span class="pos">gespeichert</span>';

		$startpage = std::posts('startpage') == '' ? 'NULL' : '\''.strtolower(std::posts('startpage')).'\'';
		$database->query("INSERT INTO [user] ([name], [lastname], [login], [id_usergroup], [password], [startpage], [autologoff], [showpopup], [id_email])
								VALUES ('".$_POST['name']."', '".$_POST['lastname']."', '".strtolower($_POST['login'])."', '".$_POST['gruppe']."', '".security::createHash(wpInit::$stdpwd)."', ".$startpage.", ".std::posts('autologoff').", '".std::posts('showpopup')."', '".std::posts('contact')."')");
		$_POST = array();
	}
}

?>
<div id="useradmin">
	<h1><?=$headline['name']?></h1>
	<div id="changepassword" class="fieldsetcontainer">
		<fieldset>
			<legend>Neuen Benutzer anlegen</legend>
			<form action="std.useradmin.htm" method="post">
			<?=(isset($errormessage['erfolgreich']) ? $errormessage['erfolgreich'] : '')?>
<?
if(isset($errormessage['login'])) echo showerror($errormessage['login']);
$loginPOST = (isset($_POST['login'])) ? $_POST['login'] : '';
echo html::getTextInput('login', 'ps-input', 'Benutzername', $loginPOST);

if(isset($errormessage['lastname'])) echo showerror($errormessage['lastname']);
$lastnamePOST = (isset($_POST['lastname'])) ? $_POST['lastname'] : '';
echo html::getTextInput('lastname', 'ps-input', 'Name', $lastnamePOST);

if(isset($errormessage['name'])) echo showerror($errormessage['name']);
$namePOST = (isset($_POST['name'])) ? $_POST['name'] : '';
echo html::getTextInput('name', 'ps-input', 'Vorname', $namePOST);

$database->query('SELECT [id_usergroup], [name] FROM [usergroup] WHERE [order] <= '.$_SESSION[SESSION_ID]['LEVEL'].' AND [order] >= 10 ORDER BY [order]');
$userdrpdown = array();
while($erg = $database->fetch()) { $userdrpdown[$erg['id_usergroup']] = $erg['name']; }
$gruppePOST = (isset($_POST['gruppe'])) ? $_POST['gruppe'] : '';
echo html::getSelectInputnoDefault('gruppe', 'ps-input', 'Gruppe', $userdrpdown, $gruppePOST);

$autologoffdropdown = array(15 => '15 min', 20 => '20 min', 30 => '30 min', 45 => '45 min', 60 => '60 min', 120 => '120 min', 0 => 'kein automatisches Abmelden');
$autologoffPOST = (isset($_POST['autologoff'])) ? $_POST['autologoff'] : '30';
echo html::getSelectInputnoDefault('autologoff', 'ps-input', 'automatisches Abmelden nach', $autologoffdropdown, $autologoffPOST);

if(isset($errormessage['startpage'])) echo showerror($errormessage['startpage']);
$startpagePOST= (isset($_POST['startpage'])) ? $_POST['startpage'] : '';
echo html::getTextInput('startpage', 'ps-input', 'eigene Startseite', $startpagePOST);

$showpopupdropdown = array(0 => 'nein', 1 => 'ja');
$showpopupPOST = (isset($_POST['showpopup'])) ? $_POST['showpopup'] : '';
echo html::getSelectInputnoDefault('showpopup', 'ps-input', 'Alarmierungs Pop-up anzeigen', $showpopupdropdown, $showpopupPOST);

$database->query("SELECT CONCAT ([lastname],', ', [name]) AS [name], [id_email] FROM [email] ORDER BY [lastname]");
$contacts = array ();
$contacts[0] = 'Keine Zuordnung';
while($erg = $database->fetch()){
	$contacts[$erg['id_email']] = $erg['name'];
}
$contactPOST = (isset($_POST['contacts'])) ? $_POST['contacts'] : '';
echo html::getSelectInput('contact', 'ps-input', 'Teilnehmerzuordnung', $contacts, $contactPOST);

?>
				<div class="entry">
					<span class="label">
						Passwort:
					</span>
					<span class="ps-input inactive" id="password"><?=wpInit::$stdpwd?></span>
				</div>
				<!--
				<div class="entry">
					<span class="ps-checkbox" id="showpopup">Alarmierungs-Popup anzeigen</span>
				</div>
				-->
				<hr />
				<input class="ps-button" type="submit" name="absenden" value="speichern" />
				<span class="copyPW ps-image-button" title="Passwort in die Zwischenablage">&#10063;</span>
				<!--<span class="ps-button" id="submit">speichern</span>-->
			</form>
		</fieldset>
	</div>
	<div class="ps-flex-container">
<?

$tempStatic = '';

$database->query("SELECT CONCAT ([lastname], ', ', [name]) as [contact], [id_email] FROM [email]");
while ($erg = $database->fetch()){
	$contacts[$erg['id_email']] = $erg['contact'];
}

$database->query('SELECT [u].[id_user], [u].[static], [u].[login], [u].[name], [u].[lastname], [u].[password], [u].[startpage], [u].[showpopup], [u].[id_email], [ug].[name] AS [groupname], [ug].[order], [u].[autologoff]
		FROM [user] [u]
		INNER JOIN [usergroup] [ug] ON [u].[id_usergroup] = [ug].[id_usergroup]
		'.((std::sessions('ISSTATIC') != '1') ? 'WHERE [u].[static] = 0' : '' ) .'
		ORDER BY [u].[static], [u].[lastname], [u].[name], [u].[login]');

while($erg = $database->fetch()) {
	if($erg['static'] != $tempStatic) {
		//echo '<hr />';
		$tempStatic = $erg['static'];
	}

	if($erg['id_email'] != 0){
		$contact = $contacts[$erg['id_email']];
	} else {
		$contact = '-';
	}

	if($_SESSION[SESSION_ID]['LEVEL'] >= $erg['order']) {
?>
		<div class="usercontainer ps-container"<?=(($erg['static'] == 0) ? ' data-id="'.$erg['id_user'].'"' : '')?>>
			<? if($erg['static'] == 0) { ?>
			<span class="p-userbutton p-userdelete ps-hover-noborder" title="Benutzer l&ouml;schen"><?=wpHTML_EMPTY?></span>
			<? if($erg['password'] != security::createHash(wpInit::$stdpwd)) { ?>
			<span class="p-userbutton p-userrefresh ps-hover-noborder" title="Passwort zur&uuml;cksetzen"><?=wpHTML_EMPTY?></span>
			<? } ?>
			<span class="p-userbutton p-useredit ps-hover-noborder" title="Benutzerdaten bearbeiten"><?=wpHTML_EMPTY?></span>
			<? } ?>
			<h3<?=($erg['static'] == 0 && $erg['password'] != security::createHash(wpInit::$stdpwd) ? ' class="noreset"' : '')?>><?=$erg['lastname']?>, <?=$erg['name']?></h3>
			<hr />
			<div class="height0">
				<p>Benutzername: <span class="ps-bold"><?=$erg['login']?></span></p>
				<p>Sicherheitsgruppe: <span class="ps-bold"><?=$erg['groupname']?></span></p>
				<p>Sicherheitslevel: <span class="ps-bold"><?=$erg['order']?></span></p>
				<p>automatisches Abmelden nach: <span class="ps-bold"><?=$erg['autologoff']?> min</span></p>
				<p>eigene Startseite: <span class="ps-bold"><?=$erg['startpage']?></span></p>
				<p>Alarmierungs Pop-up anzeigen: <span class="ps-bold"><?=$erg['showpopup'] == 1 ? 'ja' : 'nein'?></span></p>
				<p>Zugeordneter Teilnehmer: <span class="ps-bold"><?echo $contact?></span></p>
			</div>
		</div>
<?
	}
}
?>

	</div>
</div>
