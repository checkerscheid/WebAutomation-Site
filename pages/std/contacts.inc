<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 21.03.2016                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 638                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: contacts.inc 638 2024-07-04 14:41:27Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'contacts'");
$headline = $database->fetch();
?>
<!--
<div id="alarmingcfg">
		<div id="erg"></div>
</div>
-->
<div id="contacts">
<h1><?=$headline['name']?></h1>
<!--<span class="ps-hover-noborder p-dpbutton p-dpadd addnewcontact" title="Teilnehmer hinzufügen">&nbsp;</span>-->
<span class="ps-button addnewcontact">Neuer Teilnehmer</span>
<!--<span>Filter:</span><input type="text" class="ps-input emailfilter" />-->
<hr />
<?
$database->query("SELECT [id_email], [phone], [phone2], [address], [sms], [lastname], [name], [active], [etc] FROM [email] ORDER BY [lastname]");

echo '
	<div class="table emptable">
		<div class="tr">
			<div class="th"></div>
			<div class="th">Teilnehmer</div>
			<div class="th">E-Mail-Adresse</div>
			<div class="th">E-Mail 2 SMS</div>
			<div class="th">Telefonnummer 1</div>
			<div class="th">Telefonnummer 2</div>
			<div class="th">Anmerkungen</div>
			<div class="th"></div>
			<div class="th"></div>
		</div>';

while($erg = $database->fetch()) {
	echo '
		<div class="tr" data-id="'.$erg['id_email'].'">
			<div class="td ta-left"><span class="active '.($erg['active'] == 1 ? 'pos' : 'neg').'">'.($erg['active'] == 1 ? 'aktiv' : 'inaktiv').'</span></div>
			<div class="td ps-taleft">'.$erg['lastname'];
			if($erg['name'] != NULL){
				echo ', '.$erg['name'];
			}
			echo '
			</div>
			<div class="td ps-taright">'.$erg['address'].'</div>
			<div class="td ta-left"><span class="sms '.($erg['sms'] == 1 ? 'pos' : '').'">'.($erg['sms'] == 1 ? 'ja' : 'nein').'</span></div>
			<div class="td ps-taright">'.$erg['phone'].'</div>
			<div class="td ps-taright">'.$erg['phone2'].'</div>
			<div class="td ps-taright">'.$erg['etc'].'</div>
			<div class="td ta-right">
				<!--<input type="button" class="ps-button email-edit" value="bearbeiten" />-->
				<span class="ps-button ps-hover-noborder email-edit" data-email="'.$erg['id_email'].'">'.wpHTML_EMPTY.'</span>
			</div>
			<div class="td last ta-right">
				<!--<input type="button" class="ps-button email-delete" value="l&ouml;schen" />-->
				<span class="ps-button ps-hover-noborder email-delete" data-email="'.$erg['id_email'].'">'.wpHTML_EMPTY.'</span>
			</div>
		</div>';
}
echo '
	</div>
';
?>
</div>
