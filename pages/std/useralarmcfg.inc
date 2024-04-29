<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 05.12.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: useralarmcfg.inc 552 2024-01-06 13:56:24Z                $ #
//#                                                                                 #
//###################################################################################
/**
 * @var wpDatabase $database
 * @var Type $system
 */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'useralarmcfg'");
$headline = $database->fetch();
?>
<div id="useralarmcfg">
	<h1><?=$headline['name']?></h1>
	<div class="p-tabs">
		<ul>
			<li><a href="#groups">Zusätzliche Alarmgruppen</a></li>
			<li><a href="#entries">Alarmgruppen Einträge</a></li>
			<li><a href="#filter">Filter</a></li>
			<li><a href="#types">Alarmtypen</a></li>
		</ul>
		<div id="groups">
			<fieldset>
				<legend>Zusätzliche Alarmgruppen</legend>
				<div id="formalarmgroups">
					<div>
						<h3>Gruppe 1</h3>
						<span class="ps-checkbox<?=($system->useAlarmGroup1() ? ' checked' : '')?> usegroup1">aktiv</span><br />
						<span>Gruppenname (Überschrift):</span>
						<input type="text" class="ps-input namegroup1" value="<?=$system->nameAlarmGroup1()?>" />
					</div>
					<hr />
					<div>
						<h3>Gruppe 2</h3>
						<span class="ps-checkbox<?=($system->useAlarmGroup2() ? ' checked' : '')?> usegroup2">aktiv</span><br />
						<span>Gruppenname (Überschrift):</span>
						<input type="text" class="ps-input namegroup2" value="<?=$system->nameAlarmGroup2()?>" />
					</div>
					<hr />
					<div>
						<h3>Gruppe 3</h3>
						<span class="ps-checkbox<?=($system->useAlarmGroup3() ? ' checked' : '')?> usegroup3">aktiv</span><br />
						<span>Gruppenname (Überschrift):</span>
						<input type="text" class="ps-input namegroup3" value="<?=$system->nameAlarmGroup3()?>" />
					</div>
					<hr />
					<div>
						<h3>Gruppe 4</h3>
						<span class="ps-checkbox<?=($system->useAlarmGroup4() ? ' checked' : '')?> usegroup4">aktiv</span><br />
						<span>Gruppenname (Überschrift):</span>
						<input type="text" class="ps-input namegroup4" value="<?=$system->nameAlarmGroup4()?>" />
					</div>
					<hr />
					<div>
						<h3>Gruppe 5</h3>
						<span class="ps-checkbox<?=($system->useAlarmGroup5() ? ' checked' : '')?> usegroup5">aktiv</span><br />
						<span>Gruppenname (Überschrift):</span>
						<input type="text" class="ps-input namegroup5" value="<?=$system->nameAlarmGroup5()?>" />
					</div>
				</div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="alarmgroupssubmit">Einstellungen speichern</span>
				</div>
			</fieldset>
		</div>
		<div id="entries">
			<h2>Alarmgruppen Einträge</h2>
			<div id="formalarmgroups">
				<hr />
				<div>
					<h3<?=($system->useAlarmGroup1() ? ' class="active"' : '')?>>Gruppe 1 (<?=$system->nameAlarmGroup1()?>)</h3>
					<div class="p-accordion clearboth">
						<h3>Einträge verwalten</h3>
						<div class="entries1"></div>
					</div>
				</div>
				<hr />
				<div>
					<h3<?=($system->useAlarmGroup2() ? ' class="active"' : '')?>>Gruppe 2 (<?=$system->nameAlarmGroup2()?>)</h3>
					<div class="p-accordion clearboth">
						<h3>Einträge verwalten</h3>
						<div class="entries2"></div>
					</div>
				</div>
				<hr />
				<div>
					<h3<?=($system->useAlarmGroup3() ? ' class="active"' : '')?>>Gruppe 3 (<?=$system->nameAlarmGroup3()?>)</h3>
					<div class="p-accordion clearboth">
						<h3>Einträge verwalten</h3>
						<div class="entries3"></div>
					</div>
				</div>
				<hr />
				<div>
					<h3<?=($system->useAlarmGroup4() ? ' class="active"' : '')?>>Gruppe 4 (<?=$system->nameAlarmGroup4()?>)</h3>
					<div class="p-accordion clearboth">
						<h3>Einträge verwalten</h3>
						<div class="entries4"></div>
					</div>
				</div>
				<hr />
				<div>
					<h3<?=($system->useAlarmGroup5() ? ' class="active"' : '')?>>Gruppe 5 (<?=$system->nameAlarmGroup5()?>)</h3>
					<div class="p-accordion clearboth">
						<h3>Einträge verwalten</h3>
						<div class="entries5"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="filter">
			<fieldset>
				<legend>Filter nach Type</legend>
				<div id="formalarmfiltertype"></div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="filtertypedelete">Filter entfernen</span>
					<span class="ps-button" id="filtertypesubmit">Einstellungen speichern</span>
				</div>
			</fieldset>
			<fieldset>
				<legend>Filter nach Gruppe</legend>
				<div id="formalarmfiltergroup"></div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="filtergroupdelete">Filter entfernen</span>
					<span class="ps-button" id="filtergroupsubmit">Einstellungen speichern</span>
				</div>
			</fieldset>
			<? if($system->useAlarmGroup5()) { ?>
			<fieldset>
				<legend>Filter nach <?=$system->nameAlarmGroup5()?></legend>
				<div id="formalarmfiltergroup5"></div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="filtergroup5delete">Filter entfernen</span>
					<span class="ps-button" id="filtergroup5submit">Einstellungen speichern</span>
				</div>
			</fieldset>
			<? } ?>
			<? if($system->useAlarmGroup4()) { ?>
			<fieldset>
				<legend>Filter nach <?=$system->nameAlarmGroup4()?></legend>
				<div id="formalarmfiltergroup4"></div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="filtergroup4delete">Filter entfernen</span>
					<span class="ps-button" id="filtergroup4submit">Einstellungen speichern</span>
				</div>
			</fieldset>
			<? } ?>
			<? if($system->useAlarmGroup3()) { ?>
			<fieldset>
				<legend>Filter nach <?=$system->nameAlarmGroup3()?></legend>
				<div id="formalarmfiltergroup3"></div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="filtergroup3delete">Filter entfernen</span>
					<span class="ps-button" id="filtergroup3submit">Einstellungen speichern</span>
				</div>
			</fieldset>
			<? } ?>
			<? if($system->useAlarmGroup2()) { ?>
			<fieldset>
				<legend>Filter nach <?=$system->nameAlarmGroup2()?></legend>
				<div id="formalarmfiltergroup2"></div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="filtergroup2delete">Filter entfernen</span>
					<span class="ps-button" id="filtergroup2submit">Einstellungen speichern</span>
				</div>
			</fieldset>
			<? } ?>
			<? if($system->useAlarmGroup1()) { ?>
			<fieldset>
				<legend>Filter nach <?=$system->nameAlarmGroup1()?></legend>
				<div id="formalarmfiltergroup1"></div>
				<hr />
				<div class="entry">
					<span class="ps-button" id="filtergroup1delete">Filter entfernen</span>
					<span class="ps-button" id="filtergroup1submit">Einstellungen speichern</span>
				</div>
			</fieldset>
			<? } ?>
		</div>
		<div id="types">
			<fieldset>
				<legend>Alarmtypen</legend>
				<div class="formalarmtypes">
				</div>
			</fieldset>
		</div>
	</div>
</div>
