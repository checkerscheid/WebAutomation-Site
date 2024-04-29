/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 09.12.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 510                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: sys_codesys.js 510 2021-06-07 17:00:02Z checker          $ #
//#                                                                                 #
//###################################################################################
?> codesys */

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
	$('#codesys').on('click', '.ps-param', function() {
		var headline = $(this).attr('data-popup');
		var elem = $(this).attr('data-value');
		$.post('paramnumpad.pop', {elem:elem, id:elem, headline:headline}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Parameter', modal: true, width: '300px',
				buttons: {
					abbrechen: {
						text: 'Abbrechen',
						click: function() {
							$('#dialog').dialog('close');
						}
					},
					speichern: {
						text: 'speichern',
						click: function() {
							p.automation.write($('#numpad').attr('data-id'), $('#oskinput').val());
							$('#dialog').dialog('close');
						}
					}
				
				}
			});
		});
	});
	p.getValues();
};
