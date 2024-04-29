/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 03.07.2017                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: readevent.js 505 2021-05-07 21:55:45Z checker            $ #
//#                                                                                 #
//###################################################################################
?> readevent */

p.page.load = function() {
//###################################################################################
	$.get('std.readevent.geteventtable.req', function(data) {
		$('#readevent .erg').html(data);
		$('#readeventtable').dataTable({
			oLanguage: {
				sZeroRecords: 'Keine Benutzeraktivitäten gefunden'
			},
			columnDefs: [
			               {type: 'de_datetime', targets:[2]}
			],
			bPaginate: false,
			bLengthChange: false,
			bFilter: false,
			bInfo: false,
			bAutoWidth: false,
			aaSorting: [[2,'desc'],[0, 'desc']]
		});
	});
	$('#readevent').on('click', '.reload', function() {
		$.get('std.readevent.reloadsettings.req', function(data) {
			if(data != 'S_OK') p.page.alert(data, 5000);
		});
	});
	p.getValues();
};