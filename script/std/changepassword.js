/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 10.07.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: changepassword.js 505 2021-05-07 21:55:45Z checker       $ #
//#                                                                                 #
//###################################################################################
?> changepassword */

var ispw = false;
var password = '';
p.page.load = function() {
	$('#changepassword').on('click', '.osk', function() {
		isbig = false;
		var headline = $(this).attr('data-popup');
		var elem = $('#' + $(this).attr('data-osk'));
		$.post('std.osk.pop', {defaultValue:$(elem).val()}, function(data) {
			p.osk.ok = function() {
				$(elem).val($.trim($('#oskinput').val()));
				$('#dialog').dialog('close');
			};
			$('#dialog').html(data).dialog({
				title: headline, modal: true, width: p.popup.width.osk,
				buttons:null
			});
		});
	});
	p.getValues();
};
