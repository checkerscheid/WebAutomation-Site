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
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: sys_prosystems.js 505 2021-05-07 21:55:45Z checker       $ #
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
	p.getValues();
};

