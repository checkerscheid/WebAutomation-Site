/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 22.05.2015                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 539                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: sonne.js 539 2023-10-19 22:23:43Z checker                $ #
//#                                                                                 #
//###################################################################################
?> sonne */

p.page.load = function() {
	getValues();
};
function getValues() {
	$.get('std.request.activedp.req', function(data) {
		for(var elem in wpResult) {
			try {
				if(elem == 'AZ') {
					var v = parseFloat(wpResult[elem].Value);
					var left = Math.round((-15 - 90) + (v * 2));
					$('[data-az=AZ]').each(function() {
						$(this).removeClass('ps-hidden');
						$(this).css({left:left});
					});
				}
				if(elem == 'EL') {
					var v = parseFloat(wpResult[elem].Value);
					var top = Math.round((-15 + 180) - (v * (90 / 65) * 2));
					$('[data-el=EL]').each(function() {
						if(v < 0) {
							$(this).addClass('ps-hidden');
						} else {
							$(this).removeClass('ps-hidden');
							$(this).css({top:top});
						}
					});
				}
			} catch(e) {
				p.log.write('fehlgeschlagen.');
			}
			p.automation.stdClass(elem, wpResult[elem].ValueString);
		}
	}, 'script').always(function() {
		window.setTimeout(function() { getValues(); }, p.automation.pointrate);
	});
}
