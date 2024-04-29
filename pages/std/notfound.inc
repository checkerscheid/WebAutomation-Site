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
//# File-ID      : $Id:: notfound.inc 552 2024-01-06 13:56:24Z                    $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
?>
<div id="notfound">
	<h2><?=ucfirst(std::gets('src'))?></h2>
	<div>
		Die angeforderte Seite wurde nicht gefunden.
	</div>
</div><!-- notfound -->
