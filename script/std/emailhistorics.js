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
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: emailhistorics.js 550 2023-12-25 03:02:54Z               $ #
//#                                                                                 #
//###################################################################################
use system\Helper\wpDatabase;
$database = new wpDatabase();
$database->query('SELECT MIN([send]) AS [min] FROM [emailhistoric]');
$erg = $database->fetch();
if($erg['min'] == null) {
	$minoption = new DateTime();
} else {
	$minoption = $erg['min'];
}

if($minoption instanceof DateTime) {
	$minoption = $minoption->format("Y,n-1,j");
} else {
	$dt = new DateTime();
	$minoption = $dt->format("Y,n-1,j");
}

?> emailhistorics */

var minoption = new Date(<?=$minoption?>);
var TheTable;
var isover = false;

p.page.load = function() {
	$('.dt-from').datepicker({
		monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','December'],
		dayNamesMin: ['So','Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
		firstDay: 1,
		dateFormat: 'dd.mm.yy',
		minDate: minoption,
		onClose: function( selectedDate ) {
			$('.dt-to').datepicker('option', 'minDate', selectedDate);
		}
	});
	$('.dt-from').datepicker('setDate', '-1d');
	$('.dt-to').datepicker({
		monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','December'],
		dayNamesMin: ['So','Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
		firstDay: 1,
		dateFormat: 'dd.mm.yy',
		onClose: function( selectedDate ) {
			$('dt-from').datepicker('option', 'maxDate', selectedDate);
		}
	});
	$('.dt-to').datepicker('setDate', '+0d');
	$('#Filter').on('click', '.dt-filter', function() {
		$('#erg').addClass('ps-loading');
		getActivityTable();
	});
	$('#erg').addClass('ps-loading');
	getActivityTable();

	p.getValues();
};

function getActivityTable() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.emailhistorics.getactivitytable.req', {from:from,to:to}, function(data) {
		$('#erg').html(data);
		$('#erg').removeClass('ps-loading');
		TheTable = $('#historictable').dataTable({
			oLanguage: {
				sZeroRecords: 'Keine historischen Mails gefunden'
			},
			columnDefs: [
			             {type: 'de_datetime', targets:[1]}
			],
			bPaginate: false,
			bLengthChange: false,
			bFilter: false,
			bInfo: false,
			bAutoWidth: false,
			aaSorting: [[1,'desc']]
		});
	});
}

