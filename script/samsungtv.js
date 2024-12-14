/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 08.12.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 714                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: samsungtv.js 714 2024-12-14 16:27:22Z                    $ #
//#                                                                                 #
//###################################################################################
?> samsungtv */
p.page.load = function() {
	// p.getValues();
	$('#samsungtv').on('click', '.sendremote', function() {
		const selectedtv = $('.selectedtv').val();
		$.post('samsungtv.' + selectedtv + '.req', {button: $(this).text()});
	});
};
