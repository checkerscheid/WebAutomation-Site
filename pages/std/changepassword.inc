<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 13.06.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: changepassword.inc 550 2023-12-25 03:02:54Z              $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\Helper\security;
use system\std, system\wpInit, system\html;

if($_SESSION[SESSION_ID]['USER'] != std::gets('param1') && $_SESSION[SESSION_ID]['ISSTATIC'] != '0') {
	std::href(wpInit::$StartSeite);
}

$database->query("SELECT CONCAT ([lastname],', ', [name]) AS [name], [id_email] FROM [email] ORDER BY [lastname]");
$contacts = array ();
$contacts[0] = 'Keine Zuordnung';
while($erg = $database->fetch()){
	$contacts[$erg['id_email']] = $erg['name'];
}

$errormessage = array();
$database->query("SELECT TOP 1 [login], [name], [lastname], [autologoff], [startpage], [domainuser], [showpopup], [id_email] FROM [user] WHERE [login] = '".$_SESSION[SESSION_ID]['USER']."'");
$erg = $database->fetch();

if(isset($_POST['absenden']) && $_POST['absenden'] == 'speichern') {
	//std::test_array($_POST);
	if($erg['domainuser'] == 0) {
		if(!preg_match('/^[a-zA-Z0-9_\-]{3,15}$/', $_POST['login'])) {
			$errormessage['login'] = 'Der Benutzername muss zwischen 3 und 15 Zeichen lang sein.<br />Er darf nur die folgenden Zeichen enthalten:<br />- Buchstaben (a-z und A-Z)<br />- Zahlen (0-9)<br />- Binde- oder Unterstrich<br /><br />';
		}
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
	if($erg['domainuser'] == 0) {
		if($_POST['login'] != $erg['login'] && std::arrays($errormessage, 'login') == '') {
			$userexists = array();
			$database->query('SELECT [login] FROM [user]');
			while($erg_userexists = $database->fetch()) {
				$userexists[] = $erg_userexists['login'];
			}
			if(in_array($_POST['login'], $userexists)) {
				$errormessage['login'] = 'Dieser Benutzername existiert bereits.<br />Bitte wählen Sie einen anderen.';
			}
		}
		$password = '';
		if($_POST['password1'] != '') {
			if(wpInit::$PasswordHigh) {
				if(!preg_match('/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%-_,.]).{6,20})/', $_POST['password1'])) {
					$errormessage['password'][] = 'Das Passwort muss:<br />- kleine und große Buchstaben,<br />- eine Zahl,<br />- ein Sonderzeichen aus der Liste:"@ # $ % - _ . ,"<br />enthalten.';
				}
			} else {
				if(!preg_match('/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/', $_POST['password1'])) {
					$errormessage['password'][] = 'Das Passwort muss:<br />- kleine und große Buchstaben,<br />- eine Zahl<br />enthalten.';
				}
			}
			if(strlen($_POST['password1']) < 6 || strlen($_POST['password1']) > 20) {
				$errormessage['password'][] = 'Das Passwort muss zwischen 6 und 20 Zeichen haben.';
			}
			if($_POST['password1'] != $_POST['password2']) {
				$errormessage['password'][] = 'Die Passw&ouml;rter stimmen nicht &uuml;berein';
			}
			if(!isset($errormessage['password'])) {
				$password = ", [password] = '".security::createHash($_POST['password1'])."'";
			}
		}
	}
	if(count($errormessage) == 0) {
		$errormessage['erfolgreich'] = '<span class="pos">gespeichert</span>';
		$startpage = std::posts('startpage') == '' ? 'NULL' : '\''.strtolower(std::posts('startpage')).'\'';
		if($erg['domainuser'] == 0) {
			$database->query("UPDATE [user] SET
					[name] = '".$_POST['name']."', [lastname] = '".$_POST['lastname']."', [id_email] = " . $_POST['contact'] . ",
					[login] = '".strtolower($_POST['login'])."'".$password.",
					[startpage] = ".$startpage.", [autologoff] = ".$_POST['autologoff'].", [showpopup] = ".$_POST['showpopup']."
					WHERE [login] = '".strtolower($_SESSION[SESSION_ID]['USER'])."'");
			$_SESSION[SESSION_ID]['USER'] = $_POST['login'];
		} else {
			$database->query("UPDATE [user] SET
					[name] = '".$_POST['name']."', [lastname] = '".$_POST['lastname']."', [id_email] = " . $_POST['contact'] . ",
					[startpage] = ".$startpage.", [autologoff] = ".$_POST['autologoff'].", [showpopup] = ".$_POST['showpopup']."
					WHERE [login] = '".strtolower($_SESSION[SESSION_ID]['USER'])."'");
		}
		$_SESSION[SESSION_ID]['USERNAME'] = $_POST['name'].' '.$_POST['lastname'];
		$_SESSION[SESSION_ID]['LOGINTOUSERSRC'] = std::posts('startpage');
	}
}

function showerror($text) {
	return '<div class="entry"><span class="neg">'.$text.'</span></div>';
}

?>

<div id="changepassword">
	<fieldset>
		<legend><?=$erg['lastname'].', '.$erg['name']?></legend>
		<form action="std.changepassword.<?=$_SESSION[SESSION_ID]['USER']?>.htm" method="post">
		<?=(isset($errormessage['erfolgreich']) ? $errormessage['erfolgreich'] : '')?>
			<?
				if($erg['domainuser'] == 0) {
					if(isset($errormessage['login'])) echo showerror($errormessage['login']);
					$loginPOST = (isset($_POST['login'])) ? $_POST['login'] : $_SESSION[SESSION_ID]['USER'];
					echo html::getTextInputOSK('login', 'ps-input', 'Benutzername', $loginPOST);
				}

				if(isset($errormessage['lastname'])) echo showerror($errormessage['lastname']);
				$lastnamePOST = (isset($_POST['lastname'])) ? $_POST['lastname'] : $erg['lastname'];
				echo html::getTextInputOSK('lastname', 'ps-input', 'Name', $lastnamePOST);

				if(isset($errormessage['name'])) echo showerror($errormessage['name']);
				$namePOST = (isset($_POST['name'])) ? $_POST['name'] : $erg['name'];
				echo html::getTextInputOSK('name', 'ps-input', 'Vorname', $namePOST);

				if(isset($errormessage['startpage'])) echo showerror($errormessage['startpage']);
				$startpagePOST = (isset($_POST['startpage'])) ? $_POST['startpage'] : $erg['startpage'];
				echo html::getTextInputOSK('startpage', 'ps-input', 'eigene Startseite', $startpagePOST);

				$autologoffdropdown = array(15 => '15 min', 20 => '20 min', 30 => '30 min', 45 => '45 min', 60 => '60 min', 120 => '120 min', 0 => 'kein automatisches Abmelden');
				$autologoffPOST = (isset($_POST['autologoff'])) ? $_POST['autologoff'] : $erg['autologoff'];
				echo html::getSelectInputnoDefault('autologoff', 'ps-input', 'automatisches Abmelden nach', $autologoffdropdown, $autologoffPOST);

				$showpopupdropdown = array(0 => 'nein', 1 => 'ja');
				$showpopupPOST = (isset($_POST['showpopup'])) ? $_POST['showpopup'] : $erg['showpopup'];
				echo html::getSelectInputnoDefault('showpopup', 'ps-input', 'Alarmierungs-Popup anzeigen', $showpopupdropdown, $showpopupPOST);

				$contactPOST = (isset($_POST['contact'])) ? $_POST['contact'] : $erg['id_email'];
				echo html::getSelectInputnoDefault('contact', 'ps-input', 'Zugeordneter Teilnehmer', $contacts, $contactPOST);

				if($erg['domainuser'] == 0) {
					echo '<hr />';

					if(isset($errormessage['password'])) {
						foreach($errormessage['password'] as $text) {
							echo showerror($text);
						}
					}
					echo '<p class="p-help">Das Passwort leer lassen, wenn es nicht ge&auml;ndert werden soll';
					if(wpInit::$PasswordHigh) {
						echo '<span class="ps-info" title="Das Passwort muss:<br />- kleine und große Buchstaben,<br />- eine Zahl,<br />- ein Sonderzeichen aus der Liste:\'@ # $ % - _ . ,\'<br />enthalten."></span>';
					} else {
						echo '<span class="ps-info" title="Das Passwort muss:<br />- kleine und große Buchstaben,<br />- eine Zahl<br />enthalten."></span>';
					}
					echo '</p>';
					echo html::getPasswordInputOSK('password1', 'Passwort');
					echo html::getPasswordInputOSK('password2', 'erneut eingeben');
				}
			?>
			<hr />
			<input class="ps-button" type="submit" name="absenden" value="speichern" />
		</form>
	</fieldset>
</div>
