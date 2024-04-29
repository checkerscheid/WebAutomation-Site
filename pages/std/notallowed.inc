<?
//###################################################################################
//#                                                                                 #
//#                     (C) by WebProgrammierung - Scheid                           #
//#                     =================================                           #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 19.02.2011                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: notallowed.inc 552 2024-01-06 13:56:24Z                  $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
?>
<div id="notallowed">
	<h1><?=(std::gets('param1') == 'license' ? 'Sie haben keine Lizenz für das Alarmierungsmodul' : 'Zugriff verweigert!!')?></h1>
	<div>
		Sie haben nicht die erfoderlichen Rechte diese Seite zu besuchen.<br />
		Melden sie sich an und versuchen sie es erneut.
	</div>
</div><!-- notallowed -->
