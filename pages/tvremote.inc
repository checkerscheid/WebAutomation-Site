<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 10.02.2025                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 745                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: tvremote.inc 745 2025-06-18 08:33:40Z                    $ #
//#                                                                                 #
//###################################################################################
namespace pages;
use system\html;
use system\std;

?>
<div id="tvremote" class="ps-page">
	<h1><? html::getPageHeadline();?></h1>
	<div class="ps-flex-container">
<? if(std::gets('param1') == '') { ?>
		<select class="ps-input tvName">
			<option value="wohnzimmer">Wohnzimmer</option>
			<option value="schlafzimmer">Schlafzimmer</option>
			<option value="kinderzimmer">Kinderzimmer</option>
		</select>
<? } else { ?>
		<h2><?=std::gets('param1') ?> TV</h2>
		<input class="ps-hidden tvName" type="hidden" value="<?=std::gets('param1') ?>" />
<? } ?>
	</div>
	<hr />
	<div class="ps-flex-container">
		<table class="ps-container">
			<tbody>
				<tr>
					<td><span class="ps-button tvbutton" data-tvbutton="lauter">&#708;</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="mute">&#128263;</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="ch_up">+</span></td>
					<td>
						<span class="ps-button tvonoff" data-tvbutton="ein">
							On
							<!--span class="bg-poweroff"><?=wpHTML_EMPTY ?></span-->
						</span>
					</td><td>
						<span class="ps-button tvonoff" data-tvbutton="aus">
							Off
							<!--span class="bg-poweroff"><?=wpHTML_EMPTY ?></span-->
						</span>
					</td>
				</tr>
				<tr>
					<td class="ps-tacenter"><div class="border"><span>&#128362;</span></div></td>
					<td><span class="ps-button tvbutton" data-tvbutton="home">&#127968;</span></td>
					<td class="ps-tacenter"><div class="border"><span>CH</span></div></td>
					<td colspan="2"><span class="ps-button tvbutton" data-tvbutton="guide">&equiv;</span></td>
				</tr>
				<tr>
					<td><span class="ps-button tvbutton" data-tvbutton="leiser">&#709;</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="zurueck">&#8617;</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="ch_down">-</span></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="3"><hr /></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td><div class="border-corner corner1"></div></td>
					<td><span class="ps-button tvbutton" data-tvbutton="hoch">&#708;</span></td>
					<td><div class="border-corner corner2"></div></td>
					<td colspan="2"><span class="ps-button tvdienst" data-tvbutton="netflix">Netflix</span></td>
				</tr>
				<tr>
					<td><span class="ps-button tvbutton" data-tvbutton="links">&#706;</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="enter">OK</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="rechts">&#707;</span></td>
					<td colspan="2"><span class="ps-button tvdienst" data-tvbutton="disney">Disney +</span></td>
				</tr>
				<tr>
					<td><div class="border-corner corner4"></div></td>
					<td><span class="ps-button tvbutton" data-tvbutton="runter">&#709;</span></td>
					<td><div class="border-corner corner3"></div></td>
					<td colspan="2"><span class="ps-button tvdienst" data-tvbutton="youtube">YouTube</span></td>
				</tr>
				<tr>
					<td colspan="3"><hr /></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td><span class="ps-button tvbutton" data-tvbutton="rwd">&lt;&lt;</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="pause">&gt;</span></td>
					<td><span class="ps-button tvbutton" data-tvbutton="fwd">&gt;&gt;</span></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
