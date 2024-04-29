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
//# File-ID      : $Id:: sys_kepware.js 539 2023-10-19 22:23:43Z checker          $ #
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

			$('[data-lt100=' + elem + ']').each(function() {
				$(this).html(wpResult[elem].ValueString);
				if(wpResult[elem].Value < 100) {
					$(this).removeClass('ps-green').addClass('ps-yellow');
				} else {
					$(this).removeClass('ps-yellow').addClass('ps-green');
				}
			});
			$('[data-gt0=' + elem + ']').each(function() {
				$(this).html(wpResult[elem].ValueString);
				if(wpResult[elem].Value == 0) {
					$(this).removeClass('ps-yellow').addClass('ps-green');
				} else {
					$(this).removeClass('ps-green').addClass('ps-yellow');
				}
			});
			p.automation.stdClass(elem, wpResult[elem].ValueString);
		}
	}, 'script').always(function() {
		window.setTimeout(function() { getValues(); }, p.automation.pointrate);
	});
}

