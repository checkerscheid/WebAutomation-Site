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
//# Revision     : $Rev:: 539                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: sys_wago.js 539 2023-10-19 22:23:43Z checker             $ #
//#                                                                                 #
//###################################################################################
?> wago */

p.page.load = function() {
	$('.ps-container').on('click', 'h2', function() {
		var elem = $(this).parent('.ps-container').find('.height0');
		if($(elem).hasClass('open')) {
			$(this).removeClass('open');
			$(elem).removeClass('open').animate({ height:'0px' });
		} else {
			$(this).addClass('open');
			$(elem).addClass('open').animate({ height:$(elem).get(0).scrollHeight });
		}
	});
	getValues();
};
function getValues() {
	$.get('std.request.activedp.req', function(data) {
		for(var elem in wpResult) {

			$('[data-eq1=' + elem + ']').each(function() {
				if(wpResult[elem].Value == 1) {
					$(this).html('Ja').removeClass('ps-yellow').addClass('ps-green');
				} else {
					$(this).html('Nein').removeClass('ps-green').addClass('ps-yellow');
				}
			});
			$('[data-gt0=' + elem + ']').each(function() {
				$(this).html(wpResult[elem].Value);
				if(wpResult[elem].Value == 0) {
					$(this).removeClass('ps-yellow').addClass('ps-green');
				} else {
					$(this).removeClass('ps-green').addClass('ps-yellow');
				}
			});
			$('[data-gt0=' + elem + ']').each(function() {
				if($(this).hasClass('hasStatusEnum')) {
					$(this).text(softingstatus[wpResult[elem].Value]).attr('title', softingstatus[wpResult[elem].Value]);
				}
			});
			p.automation.stdClass(elem, wpResult[elem].ValueString);
		}
	}, 'script').always(function() {
		window.setTimeout(function() { getValues(); }, p.automation.pointrate);
	});
}
var softingstatus = {
	'0': 'Verbindung erfolgreich hergestellt',
	'1': 'Falsche Verbindungsparameter',
	'2': 'Maximale Verbindungsanzahl erreicht',
	'3': 'Verbindung nicht vorhanden',
	'4': 'Funktion nicht implementiert',
	'5': 'Ungültiger Verbindungs-Handle',
	'6': 'Noch keine Daten verfügbar',
	'7': 'Warten auf Quittieren (acknowledge) für zuletzt gesandte Daten',
	'8': 'Interner Fehler',
	'9': 'Abruf (polling) eines nicht-existierenden Jobs',
	'10': 'Treiber nicht geöffnet oder ungültiger Treiber',
	'11': 'Netzwerkzielteilnehmer überlastet',
	'12': 'Blocked Data erfolgreich empfangen',
	'13': 'Ungültiges Adapter oder Adapter existiert nicht',
	'14': 'Verbindungs-Job läuft bereits',
	'15': 'Funktion wird von zugehöriger SPS nicht unterstützt',
	'16': 'Temporär keine ausreichenden Ressourcen. Versuchen Sie es später erneut',
	'17': 'Kein Speicher verfügbar',
	'18': 'Industrial Ethernet-Signatur nicht empfangen oder ungültig',
	'19': 'Datenfehler',
	'20': 'Logischer Protokollfehler',
	'21': 'Timeout',
	'22': 'Verbindung von SPS abgewiesen',
	'23': 'Gegenstelle oder Gateway sendeten gerätespezifischen Fehler',
	'24': 'Verbindung für immer geschlossen. Sie wird nicht automatisch wieder aufgebaut',
	'25': 'Verbotener IP-Port',
	'26': 'Verbindung zu Peer-Station unterbrochen',
	'27': 'Verbindung nach Timeout aufgebaut'
};
