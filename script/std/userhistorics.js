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
//# Revision     : $Rev:: 668                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: userhistorics.js 668 2024-07-10 22:06:10Z                $ #
//#                                                                                 #
//###################################################################################
use system\Helper\wpDatabase;
use system\Helper\wpDateTime;
require_once 'system/Helper/wpDatetime.psys';
$database = new wpDatabase();
$database->query('SELECT MIN([writetime]) AS [min] FROM [useractivity]');
$erg = $database->fetch();
if($erg['min'] == null) {
	$minoption = new DateTime();
} else {
	$minoption = $erg['min'];
}

if($minoption instanceof DateTime) {
	$minoption = $minoption->format(wpDateTime::forDB);
} else {
	$dt = new DateTime();
	$minoption = $dt->format(wpDateTime::forDB);
}

?> emailcfg */

var minoption = new Date('<?=$minoption?>');
var TheTable;
var flusername = ['All'];
var fldatenpunkt = ['All'];
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
	$('.flt-entf').hide();
	$('#erg').addClass('ps-loading');
	getActivityTable();
	$('#Filter').on('click', '.dt-filter', function() {
		$('#erg').addClass('ps-loading');
		getActivityTable();
	});
	$('#Filter').on('click', '.flt-un', function() {
		$('#erg').addClass('ps-loading');
		uhfltusername();
	});
	$('#Filter').on('click', '.flt-dp', function() {
		$('#erg').addClass('ps-loading');
		uhfltdatenpunkt();
	});
	$('#Filter').on('click', '.flt-entf', function() {
		$('#erg').addClass('ps-loading');
		uhfltentfernen();
	});

	p.getValues();
};

function getActivityTable() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.userhistorics.getactivitytable.req', {from:from,to:to,flusername:flusername,fldatenpunkt:fldatenpunkt}, function(data) {
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
function uhfltusername() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.userhistorics.optionusername.req', {from:from,to:to,flusername:flusername,fldatenpunkt:fldatenpunkt}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach Benutzername',
				modal: true,
				width: p.popup.width.middel,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flusername = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flusername.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							flusername = ['All'];
							if(fldatenpunkt == ['All']) $('.flt-entf').hide();
						} else {
							$('.flt-entf').show();
						}
						getActivityTable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function () {
						$('#erg').removeClass('ps-loading');
						$('#dialog').dialog('close');
					}
				}]
			});
		}
	});
}
function uhfltdatenpunkt() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.userhistorics.optiondatenpunkt.req', {from:from,to:to,flusername:flusername,fldatenpunkt:fldatenpunkt}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach Datenpunkt',
				modal: true,
				width: p.popup.width.middel,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						fldatenpunkt = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								fldatenpunkt.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							fldatenpunkt = ['All'];
							if(flusername == ['All']) $('.flt-entf').hide();
						} else {
							$('.flt-entf').show();
						}
						getActivityTable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function () {
						$('#erg').removeClass('ps-loading');
						$('#dialog').dialog('close');
					}
				}]
			});
		}
	});
}
function uhfltentfernen() {
	flusername = ['All'];
	fldatenpunkt = ['All'];
	$('.flt-entf').hide();
	$('#erg').addClass('ps-loading');
	getActivityTable();
}
