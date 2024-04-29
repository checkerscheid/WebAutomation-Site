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
//# Revision     : $Rev:: 561                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: alarmhistorics.js 561 2024-01-16 02:06:50Z               $ #
//#                                                                                 #
//###################################################################################
use system\Helper\wpDatabase;
$database = new wpDatabase();
$database->query('SELECT MIN([come]) AS [min] FROM [alarmhistoric]');
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

?> alarmhistorics */

var minoption = new Date(<?=$minoption?>);
var groupname1 = '<?=$system->nameAlarmGroup1()?>';
var groupname2 = '<?=$system->nameAlarmGroup2()?>';
var groupname3 = '<?=$system->nameAlarmGroup3()?>';
var groupname4 = '<?=$system->nameAlarmGroup4()?>';
var groupname5 = '<?=$system->nameAlarmGroup5()?>';
var TheTable;
var flgroup = ['All'];
var flgroup1 = ['All'];
var flgroup2 = ['All'];
var flgroup3 = ['All'];
var flgroup4 = ['All'];
var flgroup5 = ['All'];
var fltype = ['All'];
var flfrom = ['All'];
var fldp = ['All'];
var isover = false;
var showdp = false;

p.page.load = function() {
	$('.show-dp').text(showdp ? 'Datenpunkte ausblenden' : 'Datenpunkte einblenden');
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
	$('#Filter').on('click', '.flt-group', function() {
		$('#erg').addClass('ps-loading');
		ahfltgroup();
	});
	$('#Filter').on('click', '.flt-group1', function() {
		$('#erg').addClass('ps-loading');
		ahfltgroup1();
	});
	$('#Filter').on('click', '.flt-group2', function() {
		$('#erg').addClass('ps-loading');
		ahfltgroup2();
	});
	$('#Filter').on('click', '.flt-group3', function() {
		$('#erg').addClass('ps-loading');
		ahfltgroup3();
	});
	$('#Filter').on('click', '.flt-group4', function() {
		$('#erg').addClass('ps-loading');
		ahfltgroup4();
	});
	$('#Filter').on('click', '.flt-group5', function() {
		$('#erg').addClass('ps-loading');
		ahfltgroup5();
	});
	$('#Filter').on('click', '.flt-type', function() {
		$('#erg').addClass('ps-loading');
		ahflttype();
	});
	$('#Filter').on('click', '.flt-quit', function() {
		$('#erg').addClass('ps-loading');
		ahfltfrom();
	});

	$('#Filter').on('click', '.flt-dp', function() {
		$('#erg').addClass('ps-loading');
		ahfltdp();
	});

	$('#Filter').on('click', '.flt-entf', function() {
		$('#erg').addClass('ps-loading');
		ahfltentfernen();
	});
	$('#Filter').on('click', '.show-dp', function() {
		showdp = !showdp;
		TheTable.fnSetColumnVis(8 + AlarmRowAdd, showdp);
		$('.show-dp').text(showdp ? 'Datenpunkte ausblenden' : 'Datenpunkte einblenden');
	});
	$('body').on('click', '.print-screen', function() {
		window.print();
	});

	$('#dialog').on('click', '.markall', function() {
		$('#dialog li.ps-checkbox').addClass('checked');
	});
	$('#dialog').on('click', '.markno', function() {
		$('#dialog li.ps-checkbox').removeClass('checked');
	});
	p.getValues();
};

function getActivityTable() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.getactivitytable.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').html(data);
		$('#erg').removeClass('ps-loading');
		TheTable = $('#historictable').dataTable({
			oLanguage: {
				sZeroRecords: 'Keine historischen Alarme gefunden'
			},
			columnDefs: [
			             {type: 'de_datetime', targets:[0,1,2]},
			             {visible: showdp, targets:[8 + AlarmRowAdd]}
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

function ahfltgroup() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiongroup.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach Alarmgruppe',
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flgroup = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flgroup.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							flgroup = ['All'];
							if(flgroup1 == ['All'] && flgroup2 == ['All'] && flgroup3 == ['All']  && flgroup4 == ['All'] && flgroup5 == ['All'] && fltype == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltgroup1() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiongroup1.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach ' + groupname1,
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flgroup1 = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flgroup1.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							flgroup1 = ['All'];
							if(flgroup == ['All'] && flgroup2 == ['All'] && flgroup3 == ['All']  && flgroup4 == ['All'] && flgroup5 == ['All'] && fltype == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltgroup2() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiongroup2.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach ' + groupname2,
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flgroup2 = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flgroup2.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							flgroup2 = ['All'];
							if(flgroup == ['All'] && flgroup1 == ['All'] && flgroup3 == ['All']  && flgroup4 == ['All'] && flgroup5 == ['All'] && fltype == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltgroup3() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiongroup3.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach ' + groupname3,
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flgroup3 = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flgroup3.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							flgroup3 = ['All'];
							if(flgroup == ['All'] && flgroup1 == ['All'] && flgroup2 == ['All']  && flgroup4 == ['All'] && flgroup5 == ['All'] && fltype == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltgroup4() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiongroup4.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach ' + groupname4,
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flgroup4 = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flgroup4.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							flgroup4 = ['All'];
							if(flgroup == ['All'] && flgroup1 == ['All'] && flgroup2 == ['All'] && flgroup3 == ['All']  && flgroup5 == ['All'] && fltype == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltgroup5() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiongroup5.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach ' + groupname5,
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flgroup5 = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flgroup5.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							flgroup5 = ['All'];
							if(flgroup == ['All'] && flgroup1 == ['All'] && flgroup2 == ['All'] && flgroup3 == ['All']  && flgroup4 == ['All'] && fltype == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahflttype() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiontype.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach Alarmtyp',
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						fltype = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								fltype.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							fltype = ['All'];
							if(flgroup == ['All'] && flgroup1 == ['All'] && flgroup2 == ['All'] && flgroup3 == ['All']  && flgroup4 == ['All']  && flgroup5 == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltfrom() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optionfrom.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach quittiert von',
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						flfrom = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								flfrom.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz) {
							flfrom = ['All'];
							if(flgroup == ['All'] && flgroup1 == ['All'] && flgroup2 == ['All'] && flgroup3 == ['All']  && flgroup4 == ['All']  && flgroup5 == ['All'] && fltype == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltdp() {
	var from = $.datepicker.formatDate('yy-mm-dd', $('.dt-from').datepicker('getDate'));
	var to = $.datepicker.formatDate('yy-mm-dd', $('.dt-to').datepicker('getDate'));
	$.post('std.alarmhistorics.optiondp.req', {from:from,to:to,flgroup:flgroup,flgroup1:flgroup1,flgroup2:flgroup2,flgroup3:flgroup3,flgroup4:flgroup4,flgroup5:flgroup5,fltype:fltype,flfrom:flfrom,fldp:fldp}, function(data) {
		$('#erg').removeClass('ps-loading');
		$('#dialog').hide().html('<ul>' + data + '</ul><span class="ps-button markall">Alle</span><span class="ps-button markno">keine</span>');
		if($('#dialog li').length > 1) {
			$('#dialog').dialog({
				title:'Filter nach Datenpunkt',
				modal: true,
				width: p.popup.width.osk,
				maxHeight: 400,
				buttons: [{
					text: 'OK',
					click: function () {
						$('#erg').addClass('ps-loading');
						var anz = $('#dialog li').length;
						fldp = [];
						var counter = 0;
						$('#dialog li').each(function() {
							if($(this).hasClass('checked')) {
								counter++;
								fldp.push($(this).text());
							}
						});
						p.log.write('Anzahl: ' + anz + ' - checked: ' + counter);
						if(counter == anz || counter == 0) {
							fldp = ['All'];
							if(flgroup == ['All'] && flgroup1 == ['All'] && flgroup2 == ['All'] && flgroup3 == ['All']  && flgroup4 == ['All']  && flgroup5 == ['All'] && flfrom == ['All'] && fldp == ['All']) $('.flt-entf').hide();
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

function ahfltentfernen() {
	flgroup = ['All'];
	flgroup1 = ['All'];
	flgroup2 = ['All'];
	flgroup3 = ['All'];
	flgroup4 = ['All'];
	flgroup5 = ['All'];
	fltype = ['All'];
	flfrom = ['All'];
	fldp = ['All'];
	$('.flt-entf').hide();
	$('#erg').addClass('ps-loading');
	getActivityTable();
}
