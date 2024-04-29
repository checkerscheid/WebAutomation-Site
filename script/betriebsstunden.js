/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 30.06.2021                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: betriebsstunden.js 582 2024-04-10 06:45:45Z              $ #
//#                                                                                 #
//###################################################################################
?> betriebsstunden */
p.page.load = function() {
	getValues();
};
function getValues() {
	$.get('std.request.activedp.req', function(data) {
		for(var elem in wpResult) {
			var TheValue = wpResult[elem].Value;
			$('[data-value=' + elem + ']').each(function() {
				if(TheValue == '') {
					$(this).html('<?=wpHTML_EMPTY?>');
				} else {
					$(this).text(secToText(TheValue));
				}
			});
		}
	}, 'script').always(function() {
		window.setTimeout(function() { getValues(); }, p.automation.pointrate);
	});
}

function secToText(sec) {
	const parsed = Number.parseInt(sec);
	if (Number.isNaN(parsed)) {
		return 0;
	}
	var d = Math.floor(parsed / (24 * 60 * 60));
	var r = parsed % (24 * 60 * 60);
	var h = Math.floor(r / 60 / 60);
	r = r % (60 * 60);
	var m = Math.floor(r / 60);
	var s = r % 60;
	return d + ' Tage ' + f0(h) + ':' + f0(m) + ':' + f0(s);
}
function f0(num) {
	return num.toString().padStart(2, "0");
}
