/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 11.12.2019                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: dbinfo.js 505 2021-05-07 21:55:45Z checker               $ #
//#                                                                                 #
//###################################################################################
?> dbinfo */

p.page.load = function() {
//###################################################################################
	$('#tabledbinfo').dataTable({
		oLanguage: {
			sZeroRecords: 'Keine Tabellen gefunden'
		},
		bPaginate: false,
		bLengthChange: false,
		bFilter: false,
		bInfo: false,
		bAutoWidth: false,
		aaSorting: [[2,'desc']],

		columnDefs: [
			{
				targets:[2,3,4],
				render: {
					display: function(data) {
						if(data < 1024) return data + ' kB';
						if(data < 1048576) return '<span title="' + data + ' kB">' + (Math.round(data / 1024 * 100) / 100) + ' MB</span>';
						return '<span title="' + data + ' kB">' + (Math.round(data / 1048576 * 100) / 100) + ' GB</span>';
					}
				}
			}
		],
	});
	p.getValues();
};