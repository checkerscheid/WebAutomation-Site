/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 10.01.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: login.js 505 2021-05-07 21:55:45Z checker                $ #
//#                                                                                 #
//###################################################################################
?> login */

var password = '';
var firstclick = false;
p.page.load = function() {
	$('.accordion').accordion({
		active: parseInt($('.accordion').attr('data-active'))
	});
	$('#login').on('click', '.osk', function() {
		isbig = false;
		var headline = $(this).attr('data-popup');
		var elem = $('#' + $(this).attr('data-osk'));
		var pw = $(this).hasClass('pw') ? 'True' : 'False';
		$.post('std.osk.pop', {pw:pw}, function(data) {
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
	$('#loginform').submit(function() {
		if($('#loginform .ps-checkbox').hasClass('checked')) {
			$('#loginform').append('<input type="hidden" name="angemeldetbleiben" value="true" />');
		} else {
			$('#loginform').append('<input type="hidden" name="angemeldetbleiben" value="false" />');
		}
	});
	$('#ldapform').submit(function() {
		if($('#ldapform .ps-checkbox').hasClass('checked')) {
			$('#ldapform').append('<input type="hidden" name="angemeldetbleiben" value="true" />');
		} else {
			$('#ldapform').append('<input type="hidden" name="angemeldetbleiben" value="false" />');
		}
	});
	p.getValues();
};
