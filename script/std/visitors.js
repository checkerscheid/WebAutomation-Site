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
//# Revision     : $Rev:: 657                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: visitors.js 657 2024-07-07 21:24:59Z                     $ #
//#                                                                                 #
//###################################################################################
use system\Helper\wpDatabase;
$database = new wpDatabase();
$database->query('SELECT MIN([datetime]) AS [min] FROM [visitors]');
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

?> emailcfg */

var minoption = new Date('<?=$minoption?>');
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
	$('#erg').addClass('ps-loading');
	getActivityTable();
	$('#Filter').on('click', '.dt-filter', function() {
		$('#erg').addClass('ps-loading');
		getActivityTable();
	});
	$('#visitors').on('click', '.form-dsgvo-go', function() {
		var dsgvo = $('.form-dsgvo').val();
		$.post('std.visitors.delete.req', {dsgvo:dsgvo}, function(data) {
			if(data == 'S_OK') {
				$('#erg').addClass('ps-loading');
				getActivityTable();
			} else {
				p.page.alert(data, 5000);
			}
		});
	});
	p.getValues();
};

function getActivityTable() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.visitors.getactivitytable.req', {from:from,to:to}, function(data) {
		$('#erg').html(data);
		$('#erg').removeClass('ps-loading');
		$('#historictable').dataTable({
			oLanguage: {
				sZeroRecords: 'Keine Benutzeraktivitäten gefunden'
			},
			columnDefs: [
			               {type: 'de_datetime', targets:[0]}
			],
			bPaginate: false,
			bLengthChange: false,
			bFilter: false,
			bInfo: false,
			bAutoWidth: false,
			aaSorting: [[0,'desc']]
		});
	});
}

