/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 06.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 539                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: sys_ddc.js 539 2023-10-19 22:23:43Z checker              $ #
//#                                                                                 #
//###################################################################################
?> wago */

p.page.load = function() {
	$('.ps-container').on('click', 'h2', function() {
		var elem = $(this).parent('.ps-container').find('.height0');
		if($(elem).hasClass('open')) {
			$(this).removeClass('open');
			$(elem).removeClass('open').animate({ height:'0px' });
		} else {
			$(this).addClass('open');
			$(elem).addClass('open').animate({ height:$(elem).get(0).scrollHeight });
		}
	});
	getValues();
};
function getValues() {
	$.get('std.request.activedp.req', function(data) {
		for(var elem in wpResult) {
			$('[data-eq1=' + elem + ']').each(function() {
				if(wpResult[elem].Value == 1) {
					$(this).html('Ja').removeClass('ps-yellow').addClass('ps-green');
				} else {
					$(this).html('Nein').removeClass('ps-green').addClass('ps-yellow');
				}
			});
			$('[data-gt0=' + elem + ']').each(function() {
				$(this).html(wpResult[elem].Value);
				if(wpResult[elem].Value == 0) {
					$(this).removeClass('ps-yellow').addClass('ps-green');
				} else {
					$(this).removeClass('ps-green').addClass('ps-yellow');
				}
			});
			$('[data-led=' + elem + ']').each(function() {
				if(wpResult[elem].Value == 'True') {
					$(this).addClass('LED_ein').removeClass('LED_aus');
				} else {
					$(this).addClass('LED_aus').removeClass('LED_ein');
				}
			});
			p.automation.stdClass(elem, wpResult[elem].ValueString);
		}
	}, 'script').always(function() {
		window.setTimeout(function() { getValues(); }, p.automation.pointrate);
	});
}
