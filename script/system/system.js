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
//# Revision     : $Rev:: 582                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: system.js 582 2024-04-10 06:45:45Z                       $ #
//#                                                                                 #
//###################################################################################
use system\wpInit;
use system\std;
use system\helper\security;
use system\helper\wpdatabase;

$flttypeaktiv = '';
$flttypefill = 'true';
if(std::arrays($_SESSION[SESSION_ID], 'ALARMTABLE') != '' && std::arrays($_SESSION[SESSION_ID]['ALARMTABLE'], 'FLTTYPE') != '' && count($_SESSION[SESSION_ID]['ALARMTABLE']['FLTTYPE']) > 0) {
	foreach($_SESSION[SESSION_ID]['ALARMTABLE']['FLTTYPE'] as $flttype) $flttypeaktiv .= '"'.$flttype.'", ';
	$flttypefill = 'false';
}
if(strlen($flttypeaktiv) > 3) $flttypeaktiv = substr($flttypeaktiv, 1, -3);

$fltgroupaktiv = '';
$fltgroupfill = 'true';
if(std::arrays($_SESSION[SESSION_ID], 'ALARMTABLE') != '' && std::arrays($_SESSION[SESSION_ID]['ALARMTABLE'], 'FLTGROUP') != '' && count($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP']) > 0) {
	foreach($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP'] as $fltgroup) $fltgroupaktiv .= '"'.$fltgroup.'", ';
	$fltgroupfill = 'false';
}
if(strlen($fltgroupaktiv) > 3) $fltgroupaktiv = substr($fltgroupaktiv, 1, -3);

$fltgroup1aktiv = '';
$fltgroup1fill = 'true';
if(isset($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP1']) &&
	is_array($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP1']) &&
	count($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP1']) > 0) {
	foreach($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP1'] as $fltgroup1) $fltgroup1aktiv .= '"'.$fltgroup1.'", ';
	$fltgroup1fill = 'false';
}
if(strlen($fltgroup1aktiv) > 3) $fltgroup1aktiv = substr($fltgroup1aktiv, 1, -3);

$fltgroup2aktiv = '';
$fltgroup2fill = 'true';
if(isset($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP2']) &&
	is_array($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP2']) &&
	count($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP2']) > 0) {
	foreach($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP2'] as $fltgroup2) $fltgroup2aktiv .= '"'.$fltgroup2.'", ';
	$fltgroup2fill = 'false';
}
if(strlen($fltgroup2aktiv) > 3) $fltgroup2aktiv = substr($fltgroup2aktiv, 1, -3);

$fltgroup3aktiv = '';
$fltgroup3fill = 'true';
if(isset($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP3']) &&
	is_array($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP3']) &&
	count($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP3']) > 0) {
	foreach($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP3'] as $fltgroup3) $fltgroup3aktiv .= '"'.$fltgroup3.'", ';
	$fltgroup3fill = 'false';
}
if(strlen($fltgroup3aktiv) > 3) $fltgroup3aktiv = substr($fltgroup3aktiv, 1, -3);

$fltgroup4aktiv = '';
$fltgroup4fill = 'true';
if(isset($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP4']) &&
	is_array($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP4']) &&
	count($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP4']) > 0) {
	foreach($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP4'] as $fltgroup4) $fltgroup4aktiv .= '"'.$fltgroup4.'", ';
	$fltgroup4fill = 'false';
}
if(strlen($fltgroup4aktiv) > 3) $fltgroup4aktiv = substr($fltgroup4aktiv, 1, -3);

$fltgroup5aktiv = '';
$fltgroup5fill = 'true';
if(isset($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP5']) &&
	is_array($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP5']) &&
	count($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP5']) > 0) {
	foreach($_SESSION[SESSION_ID]['ALARMTABLE']['FLTGROUP5'] as $fltgroup5) $fltgroup5aktiv .= '"'.$fltgroup5.'", ';
	$fltgroup5fill = 'false';
}
if(strlen($fltgroup5aktiv) > 3) $fltgroup5aktiv = substr($fltgroup5aktiv, 1, -3);

?> system */
<?
//global $system;

if($system->useAlarmGroup5()){
	echo 'var useAlarmGroup5 = true;';
} else {
	echo 'var useAlarmGroup5 = false;';
}
if($system->useAlarmGroup4()){
	echo 'var useAlarmGroup4 = true;';
} else {
	echo 'var useAlarmGroup4 = false;';
}
if($system->useAlarmGroup3()){
	echo 'var useAlarmGroup3 = true;';
} else {
	echo 'var useAlarmGroup3 = false;';
}
if($system->useAlarmGroup2()){
	echo 'var useAlarmGroup2 = true;';
} else {
	echo 'var useAlarmGroup2 = false;';
}
if($system->useAlarmGroup1()){
	echo 'var useAlarmGroup1 = true;';
} else {
	echo 'var useAlarmGroup1 = false;';
}

echo 'var showpopup = false;';
if(security::logedin() && $system->useAlarmingmodule()){
	$database = new wpatabase();
	$database->query("SELECT [showpopup] FROM [user] WHERE [login] ='".$_SESSION[SESSION_ID]['USER']."'");
	while($erg = $database->fetch()) { $showpopup = $erg['showpopup']; }
	if($showpopup == 1){
		echo 'showpopup = true;';
	}
}
?>

var TheAlarmTable;
var wpResult;
var wpAlarm;
var wpAlarmupdate;
var wpWartung;
var firstCycle = true;
var flttype = [];
var flttypeaktiv = ["<?=$flttypeaktiv?>"];
var flttypefill = '<?=$flttypefill?>';
var fltgroup = [];
var fltgroupaktiv = ["<?=$fltgroupaktiv?>"];
var fltgroupfill = '<?=$fltgroupfill?>';
var fltgroup1 = [];
var fltgroup1aktiv = ["<?=$fltgroup1aktiv?>"];
var fltgroup1fill = '<?=$fltgroup1fill?>';
var fltgroup2 = [];
var fltgroup2aktiv = ["<?=$fltgroup2aktiv?>"];
var fltgroup2fill = '<?=$fltgroup2fill?>';
var fltgroup3 = [];
var fltgroup3aktiv = ["<?=$fltgroup3aktiv?>"];
var fltgroup3fill = '<?=$fltgroup3fill?>';
var fltgroup4 = [];
var fltgroup4aktiv = ["<?=$fltgroup4aktiv?>"];
var fltgroup4fill = '<?=$fltgroup4fill?>';
var fltgroup5 = [];
var fltgroup5aktiv = ["<?=$fltgroup5aktiv?>"];
var fltgroup5fill = '<?=$fltgroup5fill?>';
var isover = false;
var WatchDogByte = -1;
var lastWatchDogByte;
var showAlarm = false;
var showdp = false;
var isbig = false;
var firstclick = true;
var toquit = [];
var pDateTime = 'Datum: 01.01.1970, Uhrzeit: 00:00:00';
var pDate;
var pTime;
var sessionisset = "<?=(isset($_SESSION[SESSION_ID]['TOUCH']) && $_SESSION[SESSION_ID]['TOUCH'] == '1' ? '1' : '0')?>";
var markisset = "<?=(isset($_SESSION[SESSION_ID]['MARK']) && $_SESSION[SESSION_ID]['MARK'] == '1' ? '1' : '0')?>";
var draggrid = [5, 5];
var isLogedIn = '<?=((isset($_SESSION[SESSION_ID]["LEVEL"]) && $_SESSION[SESSION_ID]["LEVEL"] > 10) ? "TRUE" : "FALSE")?>';
/* <? if(isset($_SESSION[SESSION_ID]["AUTOLOGOFF"])) {?> */
var ForceAutoLogOff = new Date(<?=$_SESSION[SESSION_ID]["AUTOLOGOFF"]?>);
/* <? } else {?> */
var ForceAutoLogOff = '';
/* <? }?> */
var alarmsound;
var popupids = [];
var HeightFooterHeader;
var HeightHeader;
var HeightFooter;

$(document).ready(function() {
	$('html').css({overflowY:'hidden'});
	HeightFooterHeader = $('#header').height() + $('.pagemenu').height() + $('#footerLinks').height() + 25;
	HeightHeader = $('#header').height() + $('.pagemenu').height();
	HeightFooter = $('#footerLinks').height();
	$('.pagecontent').css({overflow:'auto', height:($(window).height() - HeightFooterHeader) + 'px'});
	$('.blank').attr('target', '_blank');

	$('[data-sm]').addClass('sm');

	if(fltgroupaktiv[0] == '') fltgroupaktiv.splice(0,fltgroupaktiv.length);
	if(flttypeaktiv[0] == '') flttypeaktiv.splice(0,flttypeaktiv.length);

	$(window).resize(function() {
		if(showAlarm) {
			$('.pagecontent').css({height:'0px'});
			$('#footerLinks').css({height:($(window).height() - HeightHeader) + 'px',marginTop:'-' + ($(window).height() - HeightHeader) + 'px'});
			$('#footerRechts').css({height:($(window).height() - HeightHeader) + 'px'});
			$('#footer').css({height:($(window).height() - HeightHeader - 20) + 'px'});
			$('#onlinealarm_wrapper').css({height:($(window).height() - HeightHeader - 90) + 'px'});
			// p.log.write('newhight: ' + '100px');
		} else {
			$('.pagecontent').css({height:($(window).height() - HeightFooterHeader) + 'px'});
			// p.log.write('newhight: ' + ($(window).height() - HeightFooterHeader) + 'px');
		}
	});
	$('.pageback').click(function() {
		history.back();
		return false;
	});
	$('body').on('click', '[data-point][data-write]', function() {
		p.automation.write($(this).attr('data-point'), $(this).attr('data-write'));
	});
	$('body').on('click', '[data-multipoint][data-write]', function() {
		var dps = $(this).attr('data-multipoint');
		dps = dps.split(',');
		p.automation.writeMulti(dps, $(this).attr('data-write'));
	});
	$('body').on('click', '.ShellyDirect', function() {
		$.post('shellydirect.req', {bm:$(this).attr('data-value')});
	});
	$('body').on('click', '.pa-scene[data-scene]', function() {
		$.post('std.writescene.setid.req', {id:$(this).attr('data-scene')}, function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('body').on('click', '[data-togglewrite]', function() {
		$.post('std.request.togglewrite.req', {datapoint:$(this).attr('data-togglewrite')}, function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('body').on('click', '[data-increment]', function() {
		$.post('std.request.increment.req', {datapoint:$(this).attr('data-increment')}, function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('body').on('click', '[data-decrement]', function() {
		$.post('std.request.decrement.req', {datapoint:$(this).attr('data-decrement')}, function(data) {
			if(data != 'S_OK') p.page.alert(data);
		});
	});
	$('body').on('click', 'a.inWork', function() {
		p.page.linkToInWork();
		return false;
	});
	$('body').on('click', '.changeWrongVisibles', function() {
		$(this).toggleClass('on');
		var allhiden = $('.ps-hidethiswrong');
		var allnohidden = $('.ps-nohidethiswrong');
		$(allhiden).each(function() { $(this).removeClass('ps-hidethiswrong').addClass('ps-nohidethiswrong'); });
		$(allnohidden).each(function() { $(this).removeClass('ps-nohidethiswrong').addClass('ps-hidethiswrong'); });
	});
	$('body').on('mouseover', '.ps-hidethiswrong, .ps-nohidethiswrong', function() {
		var id = $(this).find('div:first').attr('id');
		if(typeof(id) !== 'undefined') {
			$('.lastidCheckDiv').text('id: ' + id);
		}
	});
	$('.checkPosition .redHorizontal').draggable({
		axis: 'y',
		drag: function(event, ui) {
			var newpos = ui.position.top - 150;
			if(newpos >= 0) $('.redHorizontal p').text(newpos + ' px');
			else $('.redHorizontal p').text('');
		}
	});
	$('.checkPosition .redVertical').draggable({
		axis: 'x',
		drag: function(event, ui) {
			var newpos = $('.center').length ? parseInt($('.center').offset().left) : parseInt($('.pagecontent').offset().left);
			newpos = ui.position.left - newpos;

			if(newpos >= 0) $('.redVertical p').text(newpos + ' px');
			else $('.redVertical p').text('');
		}
	});
	$('.pagecontent .pa-slider').slider({
		min: 0,
		max: 100,
		start: function() {
			$(this).addClass('WriteOnly');
			$(this).find('a').append('<span class="toleft"></span>');
		},
		slide: function(event, ui) {
			var TheValue = ui.value;
			var TheSpan = $(this).find('span.toleft');
			$(TheSpan).text(TheValue);
		},
		stop: function(event, ui) {
			p.automation.write($(this).attr('data-value'), ui.value);
			$(this).removeClass('WriteOnly').find('a').text('');
		}
	});
	$('.wpBalken').on('click', '.getsession', function() {
		p.page.getsession();
		return false;
	});
	$('.wpBalken').on('click', '.touchoptimum', function() {
		var modus = '<?=(std::arrays($_SESSION[SESSION_ID], "USER") == "checker" ? "Seniorenmodus" : "Touchoptimierung")?>';
		var toset;
		if(sessionisset == '1') {
			toset = 0;
			$('body').removeClass('touch');
			$('.touchoptimum').text(modus + ' einschalten');
		} else {
			toset = 1;
			$('body').addClass('touch');
			$('.touchoptimum').text(modus + ' ausschalten');
		}
		p.page.setsession('TOUCH', toset);
		sessionisset = toset.toString();
		//p.page.alert('gespeichert');
		return false;
	});
	$('.wpBalken').on('click', '.mark', function() {
		var toset;
		if(markisset == '1') {
			toset = 0;
			$('body').addClass('nomark');
			$('.mark').text('Mark');
		} else {
			toset = 1;
			$('body').removeClass('nomark');
			$('.mark').text('no Mark');
		}
		p.page.setsession('MARK', toset);
		markisset = toset.toString();
		//p.page.alert('gespeichert');
		return false;
	});
	/**
	 * Dragqueen Aktivierung
	 */
	$('.wpBalken').on('click', '.dragqueen', function() {
		if(dragqueen.active == true) {
			$('.dragthis').removeClass('ps-cursorclick').each(function() {
				$(this).draggable('option', 'disabled', true);
			});
			$('.ui-draggable').removeClass('ui-state-disabled');
			$('.lastidCheckDiv').text('');
			$('.dragqueen').text('Dragqueen').removeClass('neg');
			dragqueen.active = false;
		} else {
			$('.dragthis').addClass('ps-cursorclick').each(function() {
				$(this).draggable('option', 'disabled', false);
			});
			$('.dragqueen').text('you are Dragqueen').addClass('neg');
			p.page.alert('<h2 class="neg">Warnung: (für die Pienser)</h2><span class="neg ps-bold">Das System speichert alle Positionsänderungen automatisch und diese können NICHT rückgängig gemacht werden!!!</span>', 7500);
			dragqueen.active = true;
		}
	});
	/**
	 * Dragqueen Initialisierung
	 */
	$('.dragthis').each(function() {
		$(this).draggable({
			grid: draggrid,
			containment: '.pagecontent',
			disabled: true,
			stop: function(event, ui) {
				var id = $(this).attr('id');
				var file = '';
				var path = window.location.pathname.substr(1).split('.');
				if(path.length == 4) {
					if(path[path.length - 4] == 'std') file = 'std/' + path[path.length - 3];
					else file = path[path.length - 4];
				} else if(path.length == 3) {
					if(path[path.length - 3] == 'std') file = 'std/' + path[path.length - 2];
					else file = path[path.length - 3];
				} else {
					file = path[path.length - 2];
				}
				$.post('std.movethis.saveposition.req', {file:file, id:id, top:Math.round(ui.position.top), left:Math.round(ui.position.left)}, function(data) {
					p.page.alert(data, 5000);
				})
			}
		})
	});
	/**
	 * Dragqueen id auslesen
	 */
	$('body').on('mouseover', '.dragthis', function() {
		if(dragqueen.active) {
			var id = $(this).attr('id');
			if(typeof(id) !== 'undefined') {
				$('.lastidCheckDiv').text('#' + id);
			}
		} else {
			$('.lastidCheckDiv').text('');
		}
	});
	/**
	 * Dragqueen id ausblenden
	 */
	$('body').on('mouseout', '.dragthis', function() {
		$('.lastidCheckDiv').text('');
	});
	/**
	 * Dragqueen id in den Cursor heften
	 */
	$('.pagecontent').mousemove(function(event) {
		dragqueen.latestPosition = {top: event.pageY, left: event.pageX};
		if (!dragqueen.updateLegendTimeout) {
			dragqueen.updateLegendTimeout = setTimeout(dragqueen.updateLegend, dragqueen.legendTimeout);
		}
	});

	$('.wpBalken').on('click', '.dropdownmenu', function(ev) {
		ev.stopPropagation();
		var divclass = '.menudiv.' + $(this).attr('data-div');
		if($(divclass).hasClass('open')) {
			$('.dropdownmenu').removeClass('active');
			$('.menudiv').animate({height:'0px'}, 'fast', function() { $(this).addClass('ps-hidden'); }).removeClass('open');
		} else {
			$('.dropdownmenu').removeClass('active');
			$('.menudiv').addClass('ps-hidden').removeClass('open').css({height:'0px'});
			$(this).addClass('active');
			$(divclass).css({width:($(window).width() - 132) + 'px'}).removeClass('ps-hidden').show().animate({height:$(divclass).prop('scrollHeight')}, 'fast').addClass('open');
		}
	});
	$(document.body).not('.menudiv').click(function() {
		if($('.menudiv').hasClass('open')) {
			$('.dropdownmenu').removeClass('active');
			$('.menudiv').animate({height:'0px'}, 'fast', function() { $(this).addClass('ps-hidden'); }).removeClass('open');
		}
	});
	$('.menudiv').click(function(ev) {
		ev.stopPropagation();
	});
	$('#footer').on('click', '.alarmup', function() {
		if($(this).hasClass('oben')) {
			$('.pagecontent').show().animate({height:($(window).height() - HeightFooterHeader) + 'px'});
			$('#footerLinks').animate({height:HeightFooter + 'px',marginTop:'-' + HeightFooter + 'px'});
			$('#footerRechts').animate({height:HeightFooter + 'px'});
			$('#footer').animate({height:(HeightFooter - 15) + 'px'});
			$('#onlinealarm_wrapper').animate({height:(HeightFooter - 90) + 'px'});
			$(this).removeClass('oben');
			showAlarm = false;
		} else {
			$('.pagecontent').animate({height:'0px'}, function() { $(this).hide(); });
			$('#footerLinks').animate({height:($(window).height() - HeightHeader) + 'px',marginTop:'-' + ($(window).height() - HeightHeader) + 'px'});
			$('#footerRechts').animate({height:($(window).height() - HeightHeader) + 'px'});
			$('#footer').animate({height:($(window).height() - HeightHeader - 15) + 'px'});
			$('#onlinealarm_wrapper').animate({height:($(window).height() - HeightHeader - 90) + 'px'});
			$(this).addClass('oben');
			showAlarm = true;
		}
	});
	$('#footer').on('click', '.alarmsettings', function(ev) {
		ev.stopPropagation();
		if($('.alarmsettingspopup').hasClass('offen')) {
			$('.alarmsettingspopup').animate({width:'0px',height:'0px',padding:'0px',bottom:'160px', right:'145px'}, function() { $(this).addClass('ps-hidden'); }).removeClass('offen');
		} else {
			$('.alarmsettingspopup').animate({width:'300px',height:(430 + (45 * AlarmRowAdd)) + 'px',padding:'10px',bottom:'20px', right:'155px'}).removeClass('ps-hidden').show().addClass('offen');
		}
	});
	$(document.body).not('.alarmsettings').click(function() {
		if($('.alarmsettingspopup').hasClass('offen')) {
			$('.alarmsettingspopup').animate({width:'0px',height:'0px',padding:'0px',bottom:'160px', right:'145px'}, function() { $(this).addClass('ps-hidden'); }).removeClass('offen');
		}
	});
	$('body').on('click', '.ps-checkbox', function() {
		if(!($(this).hasClass('ps-disabled'))) {
			if($(this).hasClass('checked')) {
				$(this).removeClass('checked');
			} else {
				if($(this).hasClass('p-checkboxgroup')) {
					$('[data-checkboxgroup=' + $(this).attr('data-checkboxgroup') + ']').removeClass('checked');
				}
				$(this).addClass('checked');
			}
		}
	}).on('mouseover', '.ps-checkbox', function() {
		if(!($(this).hasClass('ps-disabled'))) {
			$(this).addClass('hover');
		}
	}).on('mouseout', '.ps-checkbox', function() {
		$('.ps-checkbox').removeClass('hover');
	});
	$('.ps-info', document).tooltip({
		//track: true,
		position: {
			my: 'left+55 top-35',
			at: 'left top',
			collision: 'flipfit'
		},
		open: function(event, ui) {
			setTimeout(function() {
				$(ui.tooltip).hide('fade');
			}, 2500);
		},
		content: function() {
			return $(this).prop('title');
		}
	});
	wpAlarmupdate = false;
	$.fn.dataTableExt.sErrMode = 'throw';
	TheAlarmTable = $('#onlinealarm').DataTable({
		oLanguage: {
			sZeroRecords: 'Keine Alarme gefunden'
		},
		aoColumnDefs: [
		               {type: 'de_datetime', targets:[0,1,2]},
		               {visible: showdp, targets:[7 + AlarmRowAdd]},
		               {visible: false, targets:[5 + AlarmRowAdd,8 + AlarmRowAdd,9 + AlarmRowAdd,10 + AlarmRowAdd]}
		],
		//sScrollY: "125px",
		bPaginate: false,
		bDeferRender: false,
		bLengthChange: false,
		bFilter: false,
		bInfo: false,
		bAutoWidth: false,
		aaSorting: [[10 + AlarmRowAdd,'desc'],[0,'desc'],[2,'desc']]
	});
	$('#onlinealarm_wrapper').addClass('ps-loading');
	$('#onlinealarm').on('click', '.toquit', function() {
		isbig = false;
		toquit = [];
		toquit.push($(this).attr('data-value'));
		$.get('std.quit.pop', function(data) {
			//p.osk.ok = function() { oskquitok(); };
			$('#dialog').html(data).dialog({
				title: 'Erforderlicher Quittiertext', modal: true, width:p.popup.width.osk, buttons: {
					'OK' : function() { oskquitok(); }
				}
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.quitall', function(ev) {
		ev.stopPropagation();
		isbig = false;
		toquit = [];
		$('#onlinealarm tbody tr').each(function() {
			if($(this).find('.toquit').text() == 'Alarm quittieren'
				|| $(this).find('.toquit').text() == 'Störung quittieren'
				|| $(this).find('.toquit').text() == 'Warnung quittieren') {
				if(!$(this).hasClass('ps-hidden'))
					toquit.push($(this).find('.toquit').attr('data-value'));
			}
		});
		$.get('std.quit.pop', function(data) {
			//p.osk.ok = function() { oskquitok(); };
			$('#dialog').html(data).dialog({
				title: 'Erforderlicher Quittiertext', modal: true, width:p.popup.width.osk, buttons: {
					'OK' : function() { oskquitok(); }
				}
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.quitallinaktiv', function(ev) {
		ev.stopPropagation();
		isbig = false;
		toquit = [];
		$('#onlinealarm tbody tr').each(function() {
			if(($(this).find('.toquit').text() == 'Alarm quittieren'
				|| $(this).find('.toquit').text() == 'Störung quittieren'
				|| $(this).find('.toquit').text() == 'Warnung quittieren')
				&& $(this).hasClass('quit')) {
				if(!$(this).hasClass('ps-hidden'))
					toquit.push($(this).find('.toquit').attr('data-value'));
			}
		});
		$.get('std.quit.pop', function(data) {
			//p.osk.ok = function() { oskquitok(); };
			$('#dialog').html(data).dialog({
				title: 'Erforderlicher Quittiertext', modal: true, width:p.popup.width.osk, buttons: {
					'OK' : function() { oskquitok(); }
				}
			});
		});
	});
	$('#dialog').on('change', '#oskselect', function() {
		$('#oskinput').val($(this).val());
	});
	$('#dialog').on('click', '#osk .ps-button', function() {
		switch($(this).text()) {
			case '<-':
				$('#oskinput').val($('#oskinput').val().substr(0,$('#oskinput').val().length - 1));
				break;
			case 'shift':
				if(isbig) {
					$('#osk .ps-button').each(function() {
						if($(this).text().match(/^[A-Z]{1}$/)) $(this).text($(this).text().toLowerCase());
						if($(this).text() == '_') $(this).text('-');
						if($(this).text() == ';') $(this).text(',');
						if($(this).text() == ':') $(this).text('.');
						if($(this).text() == '!') $(this).text('@');
						if($(this).text() == '?') $(this).text('ß');
					});
					isbig = false;
				} else {
					$('#osk .ps-button').each(function() {
						if($(this).text().match(/^[a-z]{1}$/)) $(this).text($(this).text().toUpperCase());
						if($(this).text() == '-') $(this).text('_');
						if($(this).text() == ',') $(this).text(';');
						if($(this).text() == '.') $(this).text(':');
						if($(this).text() == '@') $(this).text('!');
						if($(this).text() == 'ß') $(this).text('?');
					});
					isbig = true;
				}
				break;
			case 'space':
				$('#oskinput').val($('#oskinput').val() + ' ');
				break;
			case 'OK':
				if(typeof(p.osk.ok) == 'function') p.osk.ok();
				break;
			default:
				$('#oskinput').val($('#oskinput').val() + $(this).text());
				break;
		}
	});
	$('#dialog').on('click', '#numpad .ps-button', function() {
		if(!$(this).hasClass('isNoOskInput')) {
			if(firstclick) {
				$('#oskinput').val('');
				firstclick = false;
			}
			switch($(this).text()) {
				case '<-':
					$('#oskinput').val($('#oskinput').val().substr(0, $('#oskinput').val().length - 1));
					break;
				default:
					$('#oskinput').val($('#oskinput').val() + $(this).text());
					break;
			}
		}
	});
	$('.alarmsettingspopup').on('click', '.flttype', function(ev) {
		ev.stopPropagation();
		setflttype();
		$.post('std.alarmtable.optiontype.req', {type:flttype,aktiv:flttypeaktiv}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Filter nach Typ',
				modal:true,
				buttons: [{
					text: 'OK',
					click: function() {
						flttypeaktiv = [];
						$('#dialog li.ps-checkbox.checked').each(function() {
							flttypeaktiv.push($(this).text());
						});
						$.post('std.alarmtable.setsessionflt.req', {type:flttypeaktiv, group:fltgroupaktiv,
							group1:fltgroup1aktiv, group2:fltgroup2aktiv, group3:fltgroup3aktiv,
							group4:fltgroup4aktiv, group5:fltgroup5aktiv});
						filtertable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}

				}]
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.fltgroup', function(ev) {
		ev.stopPropagation();
		setfltgroup();
		$.post('std.alarmtable.optiongroup.req', {group:fltgroup,aktiv:fltgroupaktiv}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Filter nach Gruppe',
				modal:true,
				buttons: [{
					text: 'OK',
					click: function() {
						fltgroupaktiv = [];
						$('#dialog li.ps-checkbox.checked').each(function() {
							fltgroupaktiv.push($(this).text());
						});
						$.post('std.alarmtable.setsessionflt.req', {type:flttypeaktiv, group:fltgroupaktiv,
							group1:fltgroup1aktiv, group2:fltgroup2aktiv, group3:fltgroup3aktiv,
							group4:fltgroup4aktiv, group5:fltgroup5aktiv});
						filtertable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}

				}]
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.fltgroup1', function(ev) {
		ev.stopPropagation();
		setfltgroup1();
		$.post('std.alarmtable.optiongroup1.req', {group1:fltgroup1,aktiv:fltgroup1aktiv}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Filter nach <?=$system->nameAlarmGroup1()?>',
				modal:true,
				buttons: [{
					text: 'OK',
					click: function() {
						fltgroup1aktiv = [];
						$('#dialog li.ps-checkbox.checked').each(function() {
							var t = $(this).text() == 'leer' ? '' : $(this).text();
							fltgroup1aktiv.push(t);
						});
						$.post('std.alarmtable.setsessionflt.req', {type:flttypeaktiv, group:fltgroupaktiv,
							group1:fltgroup1aktiv, group2:fltgroup2aktiv, group3:fltgroup3aktiv,
							group4:fltgroup4aktiv, group5:fltgroup5aktiv});
						filtertable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}

				}]
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.fltgroup2', function(ev) {
		ev.stopPropagation();
		setfltgroup2();
		$.post('std.alarmtable.optiongroup2.req', {group2:fltgroup2,aktiv:fltgroup2aktiv}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Filter nach <?=$system->nameAlarmGroup2()?>',
				modal:true,
				buttons: [{
					text: 'OK',
					click: function() {
						fltgroup2aktiv = [];
						$('#dialog li.ps-checkbox.checked').each(function() {
							var t = $(this).text() == 'leer' ? '' : $(this).text();
							fltgroup2aktiv.push(t);
						});
						$.post('std.alarmtable.setsessionflt.req', {type:flttypeaktiv, group:fltgroupaktiv,
							group1:fltgroup1aktiv, group2:fltgroup2aktiv, group3:fltgroup3aktiv,
							group4:fltgroup4aktiv, group5:fltgroup5aktiv});
						filtertable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}

				}]
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.fltgroup3', function(ev) {
		ev.stopPropagation();
		setfltgroup3();
		$.post('std.alarmtable.optiongroup3.req', {group3:fltgroup3,aktiv:fltgroup3aktiv}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Filter nach <?=$system->nameAlarmGroup3()?>',
				modal:true,
				buttons: [{
					text: 'OK',
					click: function() {
						fltgroup3aktiv = [];
						$('#dialog li.ps-checkbox.checked').each(function() {
							var t = $(this).text() == 'leer' ? '' : $(this).text();
							fltgroup3aktiv.push(t);
						});
						$.post('std.alarmtable.setsessionflt.req', {type:flttypeaktiv, group:fltgroupaktiv,
							group1:fltgroup1aktiv, group2:fltgroup2aktiv, group3:fltgroup3aktiv,
							group4:fltgroup4aktiv, group5:fltgroup5aktiv});
						filtertable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}

				}]
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.fltgroup4', function(ev) {
		ev.stopPropagation();
		setfltgroup4();
		$.post('std.alarmtable.optiongroup4.req', {group4:fltgroup4,aktiv:fltgroup4aktiv}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Filter nach <?=$system->nameAlarmGroup4()?>',
				modal:true,
				buttons: [{
					text: 'OK',
					click: function() {
						fltgroup4aktiv = [];
						$('#dialog li.ps-checkbox.checked').each(function() {
							var t = $(this).text() == 'leer' ? '' : $(this).text();
							fltgroup4aktiv.push(t);
						});
						$.post('std.alarmtable.setsessionflt.req', {type:flttypeaktiv, group:fltgroupaktiv,
							group1:fltgroup1aktiv, group2:fltgroup2aktiv, group3:fltgroup3aktiv,
							group4:fltgroup4aktiv, group5:fltgroup5aktiv});
						filtertable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}

				}]
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.fltgroup5', function(ev) {
		ev.stopPropagation();
		setfltgroup5();
		$.post('std.alarmtable.optiongroup5.req', {group5:fltgroup5,aktiv:fltgroup5aktiv}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Filter nach <?=$system->nameAlarmGroup5()?>',
				modal:true,
				buttons: [{
					text: 'OK',
					click: function() {
						fltgroup5aktiv = [];
						$('#dialog li.ps-checkbox.checked').each(function() {
							var t = $(this).text() == 'leer' ? '' : $(this).text();
							fltgroup5aktiv.push(t);
						});
						$.post('std.alarmtable.setsessionflt.req', {type:flttypeaktiv, group:fltgroupaktiv,
							group1:fltgroup1aktiv, group2:fltgroup2aktiv, group3:fltgroup3aktiv,
							group4:fltgroup4aktiv, group5:fltgroup5aktiv});
						filtertable();
						$('#dialog').dialog('close');
					}
				},{
					text: 'Abbruch',
					click: function() {
						$('#dialog').dialog('close');
					}

				}]
			});
		});
	});
	$('.alarmsettingspopup').on('click', '.fltremove', function(ev) {
		ev.stopPropagation();
		$.get('std.alarmtable.removeflt.req', function() {
			//filtertable();
			location.reload();
		});
	});
	$('.alarmsettingspopup').on('click', '.setWartung', function(ev) {
		ev.stopPropagation();
		p.page.save('std.alarmtable.setwartung.req', {value:wpWartung});
	});
	$('.alarmsettingspopup').on('click', '.defaultsort', function(ev) {
		ev.stopPropagation();
		TheAlarmTable.order([[10 + AlarmRowAdd,'desc'],[0,'desc'],[2,'desc']]).draw();
	});
	$('.alarmsettingspopup').on('click', '.show-dp', function(ev) {
		ev.stopPropagation();
		showdp = !showdp;
		TheAlarmTable.column(7 + AlarmRowAdd).visible(showdp);
		$('.show-dp').text(showdp ? 'Datenpunkte ausblenden' : 'Datenpunkte einblenden');
	});
	getOnlineAlarms();
	if(typeof(p.page.load) == 'function') p.page.load();
	if(typeof(project.page.load) == 'function') project.page.load();

	alarmsound = document.getElementById('alarmsound');
});

function filtertable() {
	$('#onlinealarm tbody tr').each(function() {
		var typetext = $(this).find('td:eq(' + (5 + AlarmRowAdd) + ')').text();
		var grouptext = $(this).find('td:eq(' + (3 + AlarmRowAdd) + ')').text();
		var group1text = $(this).find('td:eq(' + AlarmRowGroup1 + ')').text();
		var group2text = $(this).find('td:eq(' + AlarmRowGroup2 + ')').text();
		var group3text = $(this).find('td:eq(' + AlarmRowGroup3 + ')').text();
		var group4text = $(this).find('td:eq(' + AlarmRowGroup4 + ')').text();
		var group5text = $(this).find('td:eq(' + AlarmRowGroup5 + ')').text();
		if($.inArray(typetext, flttypeaktiv) == -1 || $.inArray(grouptext, fltgroupaktiv) == -1 ||
			(AlarmRowGroup1 > 0 && $.inArray(group1text, fltgroup1aktiv) == -1) ||
			(AlarmRowGroup2 > 0 && $.inArray(group2text, fltgroup2aktiv) == -1) ||
			(AlarmRowGroup3 > 0 && $.inArray(group3text, fltgroup3aktiv) == -1) ||
			(AlarmRowGroup4 > 0 && $.inArray(group4text, fltgroup4aktiv) == -1) ||
			(AlarmRowGroup5 > 0 && $.inArray(group5text, fltgroup5aktiv) == -1)) {
			$(this).addClass('ps-hidden');
		} else {
			$(this).removeClass('ps-hidden');
		}
	});
	if(flttypeaktiv[0] == '') flttypeaktiv.splice(0,flttypeaktiv.length);
	if(flttype[0] == '') flttype.splice(0,flttype.length);
	if(p.arrayEquals(flttype, flttypeaktiv, false)) {
		$('#onlinealarm thead tr').find('th:eq(' + (5 + AlarmRowAdd) + ')').removeClass('neg');
	} else {
		$('#onlinealarm thead tr').find('th:eq(' + (5 + AlarmRowAdd) + ')').addClass('neg');
	}
	if(fltgroupaktiv[0] == '') fltgroupaktiv.splice(0,fltgroupaktiv.length);
	if(fltgroup[0] == '') fltgroup.splice(0,fltgroup.length);
	if(p.arrayEquals(fltgroup, fltgroupaktiv, false)) {
		$('#onlinealarm thead tr').find('th:eq(' + (3 + AlarmRowAdd) + ')').removeClass('neg');
	} else {
		$('#onlinealarm thead tr').find('th:eq(' + (3 + AlarmRowAdd) + ')').addClass('neg');
	}
	if(AlarmRowGroup1 > 0) {
		//if(fltgroup1aktiv[0] == '') fltgroup1aktiv.splice(0,fltgroup1aktiv.length);
		//if(fltgroup1[0] == '') fltgroup1.splice(0,fltgroup1.length);
		if(p.arrayEquals(fltgroup1, fltgroup1aktiv, false)) {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup1 + ')').removeClass('neg');
		} else {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup1 + ')').addClass('neg');
		}
	}
	if(AlarmRowGroup2 > 0) {
		//if(fltgroup2aktiv[0] == '') fltgroup2aktiv.splice(0,fltgroup2aktiv.length);
		//if(fltgroup2[0] == '') fltgroup2.splice(0,fltgroup2.length);
		if(p.arrayEquals(fltgroup2, fltgroup2aktiv, false)) {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup2 + ')').removeClass('neg');
		} else {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup2 + ')').addClass('neg');
		}
	}
	if(AlarmRowGroup3 > 0) {
		//if(fltgroup3aktiv[0] == '') fltgroup3aktiv.splice(0,fltgroup3aktiv.length);
		//if(fltgroup3[0] == '') fltgroup3.splice(0,fltgroup3.length);
		if(p.arrayEquals(fltgroup3, fltgroup3aktiv, false)) {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup3 + ')').removeClass('neg');
		} else {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup3 + ')').addClass('neg');
		}
	}
	if(AlarmRowGroup4 > 0) {
		//if(fltgroup4aktiv[0] == '') fltgroup4aktiv.splice(0,fltgroup4aktiv.length);
		//if(fltgroup4[0] == '') fltgroup4.splice(0,fltgroup4.length);
		if(p.arrayEquals(fltgroup4, fltgroup4aktiv, false)) {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup4 + ')').removeClass('neg');
		} else {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup4 + ')').addClass('neg');
		}
	}
	if(AlarmRowGroup5 > 0) {
		//if(fltgroup5aktiv[0] == '') fltgroup5aktiv.splice(0,fltgroup5aktiv.length);
		//if(fltgroup5[0] == '') fltgroup5.splice(0,fltgroup5.length);
		if(p.arrayEquals(fltgroup5, fltgroup5aktiv, false)) {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup5 + ')').removeClass('neg');
		} else {
			$('#onlinealarm thead tr').find('th:eq(' + AlarmRowGroup5 + ')').addClass('neg');
		}
	}
}

function setflttype() {
	flttype.splice(0,flttype.length);
	$('#onlinealarm tbody tr').each(function() {
		var filter = $(this).find('td:eq(' + (5 + AlarmRowAdd) + ')').text();
		if($.inArray(filter, flttype) == -1) {
			flttype.push(filter);
			//p.log.write('Type filter: ' + filter);
		}
	});
}
function setfltgroup() {
	fltgroup.splice(0,fltgroup.length);
	$('#onlinealarm tbody tr').each(function() {
		var filter = $(this).find('td:eq(' + (3 + AlarmRowAdd) + ')').text();
		if($.inArray(filter, fltgroup) == -1) {
			fltgroup.push(filter);
			//p.log.write('Group filter: ' + filter);
		}
	});
}

function setfltgroup1() {
	if(AlarmRowGroup1 > 0) {
		fltgroup1.splice(0,fltgroup1.length);
		$('#onlinealarm tbody tr').each(function() {
			var filter = $(this).find('td:eq(' + AlarmRowGroup1 + ')').text();
			if($.inArray(filter, fltgroup1) == -1) {
				fltgroup1.push(filter);
				//p.log.write('Group1 filter: ' + filter);
			}
		});
	}
}

function setfltgroup2() {
	if(AlarmRowGroup2 > 0) {
		fltgroup2.splice(0,fltgroup2.length);
		$('#onlinealarm tbody tr').each(function() {
			var filter = $(this).find('td:eq(' + AlarmRowGroup2 + ')').text();
			if($.inArray(filter, fltgroup2) == -1) {
				fltgroup2.push(filter);
				//p.log.write('Group2 filter: ' + filter);
			}
		});
	}
}

function setfltgroup3() {
	if(AlarmRowGroup3 > 0) {
		fltgroup3.splice(0,fltgroup3.length);
		$('#onlinealarm tbody tr').each(function() {
			var filter = $(this).find('td:eq(' + AlarmRowGroup3 + ')').text();
			if($.inArray(filter, fltgroup3) == -1) {
				fltgroup3.push(filter);
				//p.log.write('Group3 filter: ' + filter);
			}
		});
	}
}

function setfltgroup4() {
	if(AlarmRowGroup4 > 0) {
		fltgroup4.splice(0,fltgroup4.length);
		$('#onlinealarm tbody tr').each(function() {
			var filter = $(this).find('td:eq(' + AlarmRowGroup4 + ')').text();
			if($.inArray(filter, fltgroup4) == -1) {
				fltgroup4.push(filter);
				//p.log.write('Group4 filter: ' + filter);
			}
		});
	}
}

function setfltgroup5() {
	if(AlarmRowGroup5 > 0) {
		fltgroup5.splice(0,fltgroup5.length);
		$('#onlinealarm tbody tr').each(function() {
			var filter = $(this).find('td:eq(' + AlarmRowGroup5 + ')').text();
			if($.inArray(filter, fltgroup5) == -1) {
				fltgroup5.push(filter);
				//p.log.write('Group5 filter: ' + filter);
			}
		});
	}
}
var firstalarmcontact = true;
function getOnlineAlarms() {
	lastWatchDogByte = WatchDogByte;
	/*<? if(security::checkLevel(wpInit::$reqgroupalarm)) { ?>*/
	var AktAlarms = {};
	var CountAlarms = 0;
	$('#onlinealarm tbody tr').each(function() {
		var id = $(this).data('alarmid');
		if(typeof(id) != 'undefined') {
			AktAlarms[id] = $(this).data('lastupdate');
			CountAlarms++;
		}
	});
	$.get('std.request.activealarm.' + CountAlarms + '.req', function(data) {
		var TheAlarms = {};
		WatchDogByte = data.WatchDogByte;
		pDate = data.pDate;
		pTime = data.pTime;
		$('.footerdatetime').html('<span class="ps-sm-hide">Datum: </span>'+pDate+'<span class="ps-sm-hide">, Uhrzeit:</span> '+pTime);

		for(var Alarm in data.wpAlarm) {
			var alarmid = wpAlarm[Alarm][8 + AlarmRowAdd];

			if ($('#dialog'+alarmid).length == 0){
				$('body').append('<div id="dialog'+alarmid+'" class="alarmpopup"></div>');
			}

			TheAlarms[alarmid] = wpAlarm[Alarm][9 + AlarmRowAdd];
			if(typeof(AktAlarms[alarmid]) == 'undefined') {
				p.log.write('Create Alarm: ' + alarmid);
				TheAlarmTable.row.add(wpAlarm[Alarm], false);
				TheAlarmTable.draw();
				$('#AlarmID' + alarmid).data('alarmid', alarmid);
				$('#AlarmID' + alarmid).data('lastupdate', wpAlarm[Alarm][9 + AlarmRowAdd]);
				if(!firstalarmcontact &&
					//todo: Algorithmus schreiben der die Indizes
					//wpAlarm[Alarm][10 + AlarmRowAdd] > 32 && $.inArray(wpAlarm[Alarm][AlarmRowGroup5], fltgroup5aktiv) != -1) {
					wpAlarm[Alarm][10 + AlarmRowAdd] > 32) {

					alarmsound.play();
					/*<? if(security::logedin() && $system->useAlarmingmodule()){ ?>*/
					if(showpopup == true){
						$.post('std.alarming.alarmingpopup.req', {id:alarmid}, function() {
							$('#dialog'+getID()).html(getHTML()).dialog({
								title: 'Alarmierung', modal: false, width: '950px',
								buttons: [{
									text:'OK',
									click: function() {
										$(this).dialog('close');
										$(this).remove();
										//$('.alarmpopup'+alarmid).remove();
									}
								}]
							});
						}, 'script');
					}
					/*<? } ?>*/
				}
			} else {
				if(AktAlarms[alarmid] != wpAlarm[Alarm][9 + AlarmRowAdd]) {
					p.log.write('Update Alarm: ' + alarmid);
					if($('#onlinealarm tbody tr').length == 1) {
						TheAlarmTable.clear();
					} else {
						TheAlarmTable.row($('#AlarmID' + alarmid)).remove();
					}
					TheAlarmTable.draw();
				}
			}
		}
		if(firstalarmcontact) {
			firstalarmcontact = false;
		}
		wpAlarmupdate = (data.updaterequired == 'True') ? true : false;
		if(wpAlarmupdate) {
			$('#onlinealarm tbody tr').each(function() {
				if(!$(this).find('td:first').hasClass('dataTables_empty')) {
					var alarmid = $(this).data('alarmid');
					if(!p.keyexist(alarmid, TheAlarms)) {
						p.log.write('Delete Alarm: ' + alarmid);
						if($('#onlinealarm tbody tr').length == 1) {
							TheAlarmTable.clear();
						} else {
							TheAlarmTable.row($('#AlarmID' + alarmid)).remove();
						}
					}
				}
			});
			wpAlarmupdate = false;
		}
		if (data.updaterequired == 'True') TheAlarmTable.draw();
		setflttype();
		if(flttypefill == 'true') {
			flttypeaktiv = flttype;
			flttypefill = 'false';
		}
		setfltgroup();
		if(fltgroupfill == 'true') {
			fltgroupaktiv = fltgroup;
			fltgroupfill = 'false';
		}
		setfltgroup1();
		if(fltgroup1fill == 'true') {
			fltgroup1aktiv = fltgroup1;
			fltgroup1fill = 'false';
		}
		setfltgroup2();
		if(fltgroup2fill == 'true') {
			fltgroup2aktiv = fltgroup2;
			fltgroup2fill = 'false';
		}
		setfltgroup3();
		if(fltgroup3fill == 'true') {
			fltgroup3aktiv = fltgroup3;
			fltgroup3fill = 'false';
		}
		setfltgroup4();
		if(fltgroup4fill == 'true') {
			fltgroup4aktiv = fltgroup4;
			fltgroup4fill = 'false';
		}
		setfltgroup5();
		if(fltgroup5fill == 'true') {
			fltgroup5aktiv = fltgroup5;
			fltgroup5fill = 'false';
		}

		$('#onlinealarm_wrapper').removeClass('ps-loading');
		filtertable();
		if(data.wpWartung == 'True') {
			$('.setWartung').text('Wartung ausschalten');
			$('#onlinealarm_wrapper th').addClass('bgred');
			$('#wartungactive').removeClass('ps-hidden');
		} else {
			$('.setWartung').text('Wartung einschalten');
			$('#onlinealarm_wrapper th').removeClass('bgred');
			$('#wartungactive').addClass('ps-hidden');
		}
		if(data.isLogedIn == 'TRUE') {
			var isnow = pDateTime; //new Date(pDateTime);
			if(ForceAutoLogOff != '') {
				if(ForceAutoLogOff < isnow) {
					location.href = 'logout.auto.htm';
				} else {
					$('.AutologoffTime').html('automatisches Abmelden: ' + p.time.diff(isnow, ForceAutoLogOff));
				}
			}
		}
	}, 'json').always(function() {
		if(lastWatchDogByte != WatchDogByte || WatchDogByte > 0) {
			$('.footerdatetime').html('<span class="ps-sm-hide">Datum: </span>'+pDate+'<span class="ps-sm-hide">, Uhrzeit:</span> '+pTime);
			if($('#LED1').hasClass('LED_aus')) {
				$('#LED1').removeClass('LED_aus LED_error LED warn').addClass('LED_ein');
				$('#LED2').removeClass('LED_ein LED_error LED warn').addClass('LED_aus');
			} else {
				$('#LED1').removeClass('LED_ein LED_error LED warn').addClass('LED_aus');
				$('#LED2').removeClass('LED_aus LED_error LED warn').addClass('LED_ein');
			}
		} else {
			$('#LED1').removeClass('LED_aus LED_ein LED warn').addClass('LED_error');
			$('#LED2').removeClass('LED_aus LED_ein LED warn').addClass('LED_error');
		}
		WatchDogByte = -1;
		window.setTimeout(function() { getOnlineAlarms(); }, p.automation.alarmrate);
	});
	/*<? } else { ?>*/
	$.get('std.request.activesystem.req', function(data) {
		WatchDogByte = data.WatchDogByte;
		pDate = data.pDate;
		pTime = data.pTime;
	}, 'json').always(function() {
		if(lastWatchDogByte != WatchDogByte || WatchDogByte > 0) {
			$('.footerdatetime').html('<span class="ps-sm-hide">Datum: </span>'+pDate+'<span class="ps-sm-hide">, Uhrzeit:</span> '+pTime);
			if($('#LED1').hasClass('LED_aus')) {
				$('#LED1').removeClass('LED_aus LED_error LED warn').addClass('LED_ein');
				$('#LED2').removeClass('LED_ein LED_error LED warn').addClass('LED_aus');
			} else {
				$('#LED1').removeClass('LED_ein LED_error LED warn').addClass('LED_aus');
				$('#LED2').removeClass('LED_aus LED_error LED warn').addClass('LED_ein');
			}
		} else {
			$('#LED1').removeClass('LED_aus LED_ein LED warn').addClass('LED_error');
			$('#LED2').removeClass('LED_aus LED_ein LED warn').addClass('LED_error');
		}
		WatchDogByte = -1;
		window.setTimeout(function() { getOnlineAlarms(); }, p.automation.alarmrate);
	});
	/*<? } ?>*/
};
function oskquitok() {
	var quittext = $.trim($('#oskinput').val());
	if(quittext == '') {
		alert('Der Quittext ist erforderlich.');
	} else {
		$.post('std.alarmtable.quitall.req', {toquit:toquit, text:quittext}, function(data) {
			switch(data) {
				case 'S_OK':
					p.page.alert('<span class="pos">quittiert</span>');
					$('#dialog').dialog('close');
					break;
				case '':
					p.page.alert('<span class="pos">nichts zu quittieren</span>');
					$('#dialog').dialog('close');
					break;
				default:
					p.page.alert('<span class="neg">Fehler: ' + data + '</span>', 2000);
					break;
			}
		});
	}
}
