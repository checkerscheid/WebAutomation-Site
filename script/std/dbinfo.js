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
//# Revision     : $Rev:: 636                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: dbinfo.js 636 2024-07-04 14:28:56Z                       $ #
//#                                                                                 #
//###################################################################################
?> dbinfo */

p.page.load = function() {
	$('#dbinfo').on('click', '.startHistoryCleaner', function() {
		$.get('std.dbinfo.historycleaner.req', function(data) {
			
		});
	});
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