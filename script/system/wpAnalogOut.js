/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 01.08.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 703                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: wpAnalogOut.js 703 2024-10-18 23:17:50Z              $ #
//#                                                                                 #
//###################################################################################
?> wpCwWw */

var wpAnalogOut = {
	ip: null,
	target:null,
	Init: function(target) {
		wpAnalogOut.ip = $('.wpAnalogOut').attr('data-ip');
		wpAnalogOut.target = target;
		wpAnalogOut.Register();
	},
	Register: function() {
		$('.setAnalogOutPidType').on('click', function() {
			const pidtype = {
				ip: wpAnalogOut.ip,
				id: $('.AnalogOutPidType').val()
			};
			$.post(wpAnalogOut.target + '.AnalogOutPidType.req', pidtype, function(data) {
			}, 'json');
		});
		$('.wpAnalogOut').on('click', '.ps-wsparam', function() {
			var obj = {
				name: $(this).attr('data-ws'),
				headline: $(this).attr('data-popup')
			};
			$.post('wsparam.pop', obj, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Parameter', modal: true, width: '300px',
					buttons: {
						abbrechen: {
							text: 'Abbrechen',
							click: function() {
								$('#dialog').dialog('close');
							}
						},
						speichern: {
							text: 'speichern',
							click: function() {
								p.automation.wswrite($('#numpad').attr('data-id'), $('#oskinput').val());
								$('#dialog').dialog('close');
							}
						}
					
					}
				});
			});
		});
		$('.page').on('click', '.ps-topicparam', function() {
			const that = $(this)
			const topic = $(this).attr('data-topic');
			const unit = $(this).attr('data-unit') ? $(this).attr('data-unit') : '';
			const value = $(this).text().replace(' ' + unit, '').trim();
			$.post('std.write.pop', {headline:topic, unit:unit, value:value}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Topic setzen',
					width: p.popup.width.std,
					buttons: [{
						text: 'schreiben',
						click: function() {
							const value = $('.popup .newDpVal').val();
							$.post('std.d1mini.writetopic.req', {topic:topic, value:value}, function(data) {
								if(data.erg == 'S_OK') {
									$(that).text(value + ' ' + unit);
									$('#dialog').dialog('close');
								} else if(data.erg == 'S_WARNING') {
									p.page.alertWarning(data.msg);
								} else if(data.erg == 'S_ERROR') {
									p.page.alertError(data.msg);
								}
							}, 'json');
						}
					}, {
						text: 'Abbrechen',
						click: function() {
							$('#dialog').dialog('close');
						}
					}]
				});
			});
		});
	}
};
