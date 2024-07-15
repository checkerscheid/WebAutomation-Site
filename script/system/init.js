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
//# Revision     : $Rev:: 677                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: init.js 677 2024-07-15 13:51:59Z                         $ #
//#                                                                                 #
//###################################################################################
use system\wpInit;
use system\std;
?> init */

var p = {
	page: {
		alert: function(meldung, zeit, callback) {
			if(typeof(zeit) == 'undefined' || isNaN(zeit)) zeit = 1000;
			$('#error').html(meldung).animate({left:10}, function() {
				setTimeout(function() {
					$('#error').fadeOut('normal', function() {
						$(this).css({left:(-1 * ($(this).width() + 50)) + 'px'}).show();
						if(typeof(callback) == 'function') callback();
					});
				}, zeit);
			});
		},
		alertred:function(meldung, zeit, callback) {
			meldung = '<span class="neg">' + meldung + '</span>';
			if(typeof(zeit) == 'undefined' || isNaN(zeit)) zeit = 3000;
			p.page.alert(meldung, zeit, callback);
		},
		alertWarning: function(meldung, zeit, callback) {
			meldung = '<span class="ps-fontyellow">' + meldung + '</span>';
			if(typeof(zeit) == 'undefined' || isNaN(zeit)) zeit = 3000;
			p.page.alert(meldung, zeit, callback);
		},
		alertError: function(meldung, zeit, callback) {
			meldung = '<span class="ps-fontred">' + meldung + '</span>';
			if(typeof(zeit) == 'undefined' || isNaN(zeit)) zeit = 3000;
			p.page.alert(meldung, zeit, callback);
		},
		href: function(ziel) {
			window.location = 'std.' + ziel + '.htm';
		},
		setsession: function(key, value, group) {
			var obj;
			if(typeof(group) == 'undefined') {
				obj = {key:key,value:value};
			} else {
				obj = {key:key,value:value,group:group};
			}
			$.post('std.setsession.req', obj);
		},
		getsession: function() {
			$.get('std.getsession.req', function(data) {
				$('#presession').html(data);
			});
		},
		change: function(html, target, obj, fkt) {
			$(html).html('').addClass('ps-loading');
			if(typeof(obj) == 'undefined') {
				$.get(target, function(data) {
					$(html).removeClass('ps-loading').html(data);
					if(typeof(fkt) == 'function') fkt();
				});
			} else {
				$.post(target, obj, function(data) {
					$(html).removeClass('ps-loading').html(data);
					if(typeof(fkt) == 'function') fkt();
				});
			}
		},
		save: function(target, obj) {
			if(typeof(obj) == 'undefined') {
				$.get(target, function(data) {
					if(data == 'S_OK') p.page.alert('<span class="pos">gespeichert</span>');
					else p.page.alert('<span class="neg">' + data + '</span>', 3000);
				});
			} else {
				$.post(target, obj, function(data) {
					if(data == 'S_OK') p.page.alert('<span class="pos">gespeichert</span>');
					else p.page.alert('<span class="neg">' + data + '</span>', 3000);
				});
			}
		},
		savedialog: function(target, obj) {
			if(typeof(obj) == 'undefined') {
				$.get(target, function(data) {
					if(data == 'S_OK') {
						p.page.alert('<span class="pos">gespeichert</span>');
						$('#dialog').dialog('close');
					} else {
						p.page.alert('<span class="neg">' + data + '</span>', 3000);
					}
				});
			} else {
				$.post(target, obj, function(data) {
					if(data == 'S_OK') {
						p.page.alert('<span class="pos">gespeichert</span>');
						$('#dialog').dialog('close');
					} else {
						p.page.alert('<span class="neg">' + data + '</span>', 3000);
					}
				});
			}
		},
		setAlarms: function(wpAlarm) {
			var TheAlarms = {};
			var AktAlarms = {};
			$('#onlinealarm tbody tr').each(function() {
				var id = $(this).data('id');
				AktAlarms[id] = $(this).data('lastupdate');
			});
			for(var Alarm in wpAlarm) {
				var alarmid = wpAlarm[Alarm][8];
				TheAlarms[alarmid] = wpAlarm[Alarm][9];
				if(typeof(AktAlarms[alarmid]) == 'undefined') {
					p.log.write('Create Alarm: ' + alarmid);
					TheTable.fnAddData(wpAlarm[Alarm]);
					$('#AlarmID' + alarmid).data('id', alarmid);
					$('#AlarmID' + alarmid).data('lastupdate', wpAlarm[Alarm][9]);
				} else {
					if(AktAlarms[alarmid] != wpAlarm[Alarm][9]) {
						p.log.write('Update Alarm: ' + alarmid);
						if($('#onlinealarm tbody tr').length == 1) {
							TheTable.fnClearTable();
						} else {
							TheTable.fnDeleteRow(TheTable.fnGetPosition($('#AlarmID' + alarmid).find('td')[0])[0]);
						}
					}
				}
			}
			if(wpWartung == 'True') {
				$('.setWartung').text('Wartung ausschalten');
				$('#table_wrapper').addClass('bgred');
			} else {
				$('.setWartung').text('Wartung einschalten');
				$('#table_wrapper').removeClass('bgred');
			}
			$('#onlinealarm tbody tr').each(function() {
				if(!$(this).find('td:first').hasClass('dataTables_empty')) {
					var alarmid = $(this).data('id');
					if(!p.keyexist(alarmid, TheAlarms)) {
						p.log.write('Delete Alarm: ' + alarmid);
						if($('#table tbody tr').length == 1) {
							TheTable.fnClearTable();
						} else {
							TheTable.fnDeleteRow(TheTable.fnGetPosition($('#AlarmID' + alarmid).find('td')[0])[0]);
						}
					}
				}
			});
			if(firstCycle) {
				setfltgroup();
				fltgroupaktiv = fltgroup;
				setflttype();
				flttypeaktiv = flttype;
				firstCycle = false;
			}
		},
		close: function(browser) {
			$.post('std.request.closebrowserwindow.req', {browser:browser}, function(data) {
				if(data != 'S_OK') p.page.alert('<span class="neg">' + data + '</span>', 2500);
			});
		},
		linkToInWork: function() {
			$('#dialog').html('<h1 class="neg">An dieser Seite wird noch gearbeitet</h1>').dialog({
			title: 'in Work', modal: true, width: p.popup.width.middle,
			buttons: null});
		},
		load: null,
		get: null
	},
	getValues: function(additional) {
		$.get('std.request.activedp.req', function(data) {
			wpResult = data.wpResult;
			if(typeof(additional) == 'function') additional();
			for(var elem in wpResult) {
				p.automation.stdClass(elem);
			}
		}, 'json').always(function() {
			window.setTimeout(function() { p.getValues(additional); }, p.automation.pointrate);
		});
	},
	menuStd: {
		target: null,
		init : function() {
			$('area').mouseover(function() {
				p.menuStd.target = $(this).attr('alt');
				$('img.' + $(this).attr('alt')).removeClass('ps-hidden');
				$('a.' + p.menuStd.target).addClass('ps-navi-button-jshover');
			})
			.mouseleave(function(){
				$('img.overlay').addClass('ps-hidden');
				$('a.' + p.menuStd.target).removeClass('ps-navi-button-jshover');
			});
			$('.ps-navi-button').mouseover(function(){
				p.menuStd.target = $(this).attr('id');
				$('img.' + p.menuStd.target).removeClass('ps-hidden');
			})
			.mouseleave(function(){
				$('img.' + p.menuStd.target).addClass('ps-hidden');
			});
		}
	},
	automation: {
		pointrate: 1049,
		alarmrate: 1509,
		write: function(point, value, doku) {
			var dokuparam = 'True';
			if(typeof(doku) == 'undefined') {
				dokuparam = 'True';
			} else if(doku == false || doku == 'False') {
				dokuparam = 'False';
			}
			$.post('std.request.writedp.req', {item:point, value:value, doku:dokuparam}, function(data) {
				if(data != 'S_OK') p.page.alert(data);
			});
		},
		writeMulti: function(point, value, doku) {
			var dokuparam = 'True';
			if(typeof(doku) == 'undefined') {
				dokuparam = 'True';
			} else if(doku == false || doku == 'False') {
				dokuparam = 'False';
			}
			$.post('std.request.writemultidp.req', {item:point, value:value, doku:dokuparam}, function(data) {
				if(data != 'S_OK') p.page.alert(data);
			});
		},
		checkDP: function(result) {
			if(typeof(wpResult[result]) == 'undefined') {
				p.log.write('Datepunkt ist nicht vorhanden:' + result, p.log.type.warn);
				return false;
			}
			return true;
		},
		stdClass: function(elem) {
			if(!p.automation.checkDP(elem)) return false;
			var TheValue = wpResult[elem].Value;
			var ValueString = wpResult[elem].ValueString;
			var foundElement = false;
			//*****************************************************
			$('[data-bm=' + elem + ']').each(function() {
				if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') $(this).removeClass('bm');
				else $(this).addClass('bm');
			});
			//*****************************************************
			$('[data-sm=' + elem + ']').each(function() {
				if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') $(this).removeClass('sm');
				else $(this).addClass('sm');
			});
			//*****************************************************
			$('[data-warn=' + elem + ']').each(function() {
				if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') $(this).removeClass('warn');
				else $(this).addClass('warn');
			});
			//*****************************************************
			$('[data-negbm=' + elem + ']').each(function() {
				if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') $(this).addClass('bm');
				else $(this).removeClass('bm');
			});
			//*****************************************************
			$('[data-negsm=' + elem + ']').each(function() {
				if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') $(this).addClass('sm');
				else $(this).removeClass('sm');
			});
			//*****************************************************
			$('[data-negwarn=' + elem + ']').each(function() {
				if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') $(this).addClass('warn');
				else $(this).removeClass('warn');
			});
			//*****************************************************
			$('[data-frg=' + elem + ']').each(function() {
				if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') $(this).removeClass('frg');
				else $(this).addClass('frg');
			});
			//*****************************************************
			$('[data-value=' + elem + ']').each(function() {
				foundElement = false;
				var dataTrue = $(this).attr('data-True');
				var dataFalse = $(this).attr('data-False');
				if($(this).hasClass('pa-EinAus')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Aus');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Betrieb');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-AusEin')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Betrieb');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString)
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Aus');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-AufZu')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('geschl.');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('offen');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-ZuAuf')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('offen');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('geschl.');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-OnOff')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Aus');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Ein');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-OffOn')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Ein');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Aus');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-OpenClose')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Schließen');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					} else {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Öffnen');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-CloseOpen')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Öffnen');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					} else {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Schließen');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-OpensCloses')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('schließt');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					} else {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('öffnet');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-ClosesOpens')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('öffnet');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					} else {
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('schließt');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-HeizenKuehlen')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-colorblue').removeClass('ps-colorred');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Kühlen');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString)
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-colorblue').addClass('ps-colorred');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Heizen');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-KuehlenHeizen')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-colorblue').addClass('ps-colorred');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Heizen');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString)
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-colorblue').removeClass('ps-colorred');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Kühlen');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-HeizenKuehlenEnum')) {
					foundElement = true;
					$(this).removeClass('ps-blue').removeClass('ps-red');
					if(TheValue == '1') {
						$(this).addClass('ps-blue').removeClass('ps-red');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Winterbetrieb');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString)
							} else {
								$(this).html(dataFalse);
							}
						}
					}
					if(TheValue == '2') {
						$(this).removeClass('ps-blue').addClass('ps-red');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Sommerbetrieb');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-Belegung')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('unbel.');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('belegt');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-BelegungNeg')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('unbel.');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					} else {
						$(this).removeClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('belegt');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-Stoerung')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-red').addClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Normal');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-red').removeClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Störung');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-StoerungNeg')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-red').removeClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Störung');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-red').addClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Normal');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-Warnung')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-yellow').addClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Normal');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-yellow').removeClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Warnung');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-WarnungNeg')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-red').removeClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Warnung');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-red').addClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Normal');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-Meldung')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-yellow');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Normal');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-yellow');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Meldung');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-MeldungNeg')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-yellow').removeClass('ps-green');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Meldung');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-yellow').addClass('ps-green');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Normal');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-Bereit')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-blue');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Aus');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-blue');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Bereit');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-BereitNeg')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-blue');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Bereit');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-blue');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Aus');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-HandAuto')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-green').removeClass('ps-yellow');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Automatik');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).removeClass('ps-green').addClass('ps-yellow');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Handbetrieb');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-AutoHand')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-green').addClass('ps-yellow');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Handbetrieb');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-green').removeClass('ps-yellow');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Automatik');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-HandAutoHAWK')) {
					foundElement = true;
					if(TheValue != '8') {
						$(this).addClass('ps-green').removeClass('ps-yellow');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Automatik');
						} else {
							if(typeof(dataTrue) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					} else {
						$(this).removeClass('ps-green').addClass('ps-yellow');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Handbetrieb');
						} else {
							if(typeof(dataFalse) == 'undefined' && ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-HandAutoEnum')) {
					foundElement = true;
					switch(TheValue) {
						case '2':
							$(this).addClass('ps-green').removeClass('ps-yellow').html('Automatik');
							break;
						case '3':
							$(this).removeClass('ps-green').addClass('ps-yellow').html('Override');
							break;
						case '4':
							$(this).removeClass('ps-green').addClass('ps-yellow').html('Manual');
							break;
						default:
							$(this).removeClass('ps-green').removeClass('ps-yellow').html(TheValue);
							break;
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-bac-HandAuto')) {
					foundElement = true;
					if(TheValue != 'NULL') {
						$(this).removeClass('ps-green').addClass('ps-yellow').html('Handbetrieb');
					} else {
						$(this).addClass('ps-green').removeClass('ps-yellow').html('Automatik');
					}
				}
				//*****************************************************
				if($(this).hasClass('pa-Freigabe')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-red');
						$(this).removeClass('ps-green');
						var dataFalse = $(this).attr('data-False');
						if(typeof(dataFalse) == 'undefined' && ValueString == TheValue) {
							$(this).html('Sperren');
						} else {
							if(ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataFalse);
							}
						}
					} else {
						$(this).addClass('ps-green');
						var dataTrue = $(this).attr('data-True');
						if(typeof(dataTrue) == 'undefined' && ValueString == TheValue) {
							$(this).html('Freigabe');
						} else {
							if(ValueString != TheValue) {
								$(this).html(ValueString);
							} else {
								$(this).html(dataTrue);
							}
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-hide')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-hidden');
					} else {
						$(this).removeClass('ps-hidden');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-nohide')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-nullhide')) {
					foundElement = true;
					if(TheValue != 'NULL') {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-hide-ax8')) {
					foundElement = true;
					if(TheValue == '8') {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-hide-ax1')) {
					foundElement = true;
					if(TheValue == '1') {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-hide-eq')) {
					foundElement = true;
					var eq = $(this).attr('data-eq');
					if(TheValue == eq) {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-hide-noteq')) {
					foundElement = true;
					var noteq = $(this).attr('data-noteq');
					if(TheValue != noteq) {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
			// Loytec Manual
				if($(this).hasClass('pa-hide-nr3')) {
					foundElement = true;
					if(TheValue == '3') {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
			// Loytec Override
				if($(this).hasClass('pa-hide-nr4')) {
					foundElement = true;
					if(TheValue == '4') {
						$(this).removeClass('ps-hidden');
					} else {
						$(this).addClass('ps-hidden');
					}
				}
			//*****************************************************
				for(var iHide = 1; iHide <= 8; iHide++) {
					if($(this).hasClass('pa-hide-8bit-' + iHide)) {
						foundElement = true;
						if(p.bitDemux(TheValue)[8 - iHide]) {
							$(this).removeClass('ps-hidden');
						} else {
							$(this).addClass('ps-hidden');
						}
					}
				}
			//*****************************************************
				for(var iHide = 1; iHide <= 4; iHide++) {
					if($(this).hasClass('pa-hide-4bit-' + iHide)) {
						foundElement = true;
						if(p.bitDemux(TheValue, 4)[4 - iHide]) {
							$(this).removeClass('ps-hidden');
						} else {
							$(this).addClass('ps-hidden');
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-strhide')) {
					foundElement = true;
					if(TheValue == '') {
						$(this).addClass('ps-hidden');
					} else {
						$(this).text(ValueString);
						$(this).removeClass('ps-hidden');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-100minus')) {
					foundElement = true;
					var v = parseInt(TheValue);
					$(this).text((100 - v) + ' %');
				}
			//*****************************************************
				if($(this).hasClass('pa-bmgt0')) {
					foundElement = true;
					var v = parseInt(TheValue);
					if(v > 5) $(this).addClass('bm');
					else $(this).removeClass('bm');
				}
			//*****************************************************
				if($(this).hasClass('pa-bmgt')) {
					foundElement = true;
					var v = parseInt(TheValue);
					var dataMin = $(this).attr('data-min');
					if(typeof(dataMin) == 'undefined') dataMin = 0;
					else dataMin = parseInt(dataMin);
					if(v > dataMin) $(this).addClass('bm');
					else $(this).removeClass('bm');
				}
			//*****************************************************
				if($(this).hasClass('pa-bmlt100')) {
					foundElement = true;
					var v = parseInt(TheValue);
					if(v < 100) $(this).addClass('bm');
					else $(this).removeClass('bm');
				}
			//*****************************************************
				if($(this).hasClass('pa-bmlt')) {
					foundElement = true;
					var v = parseInt(TheValue);
					var dataMax = $(this).attr('data-max');
					if(typeof(dataMax) == 'undefined') dataMax = 100;
					else dataMax = parseInt(dataMax);
					if(v < dataMax) $(this).addClass('bm');
					else $(this).removeClass('bm');
				}
			//*****************************************************
				if($(this).hasClass('pa-slider')) {
					foundElement = true;
					if(!$(this).hasClass('WriteOnly')) {
						$(this).slider('option', 'value', parseInt(TheValue));
						if($(this).hasClass('pa-licht')) {
							$(this).find('.ui-slider-handle').css({
								boxShadow: '0px 0px 5px 5px rgba(255,255,0,' +
									(parseInt(TheValue) / 100) + ')'
							});
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-addclass')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass($(this).attr('data-addclass'));
						if(!(typeof(dataFalse) == 'undefined')) {
							$(this).html(dataFalse);
						}
					} else {
						$(this).addClass($(this).attr('data-addclass'));
						if(!(typeof(dataTrue) == 'undefined')) {
							$(this).html(dataTrue);
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-removeclass')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass($(this).attr('data-removeclass'));
						if(!(typeof(dataFalse) == 'undefined')) {
							$(this).html(dataFalse);
						}
					} else {
						$(this).removeClass($(this).attr('data-removeclass'));
						if(!(typeof(dataTrue) == 'undefined')) {
							$(this).html(dataTrue);
						}
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-opacity')) {
					foundElement = true;
					$(this).css({opacity:parseInt(TheValue) / 100});
				}
			//*****************************************************
				if($(this).hasClass('pa-inttotime')) {
					foundElement = true;
					var time;
					var sec = parseInt(TheValue) % 60;
					var min = Math.floor(parseInt(TheValue) / 60) % 60;
					var std = Math.floor(parseInt(TheValue) / 60 / 60);
					if(sec < 10) sec = '0' + sec;
					time = sec;
					if(min > 0 || std > 0) {
						if(min < 10) min = '0' + min;
						time = min + ':' + time;
					}
					if(std > 0) {
						if(std < 10) std = '0' + std;
						time = std + ':' + time;
					}
					if($(this).val()) {
						$(this).val(time);
					} else {
						$(this).text(time);
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-plantmode')) {
					foundElement = true;
					$(this).removeClass('ps-green ps-yellow ps-red');
					TheValue = parseInt(TheValue);
					if(TheValue > 0) {
						if(TheValue <= 5) {
							$(this).addClass('ps-green');
						} else if(TheValue <= 12) {
							$(this).addClass('ps-yellow');
						} else if(TheValue <= 30) {
							$(this).addClass('ps-red');
						}
					}
					var newString = p.keyexist(TheValue, p.automation.plantmode) ? p.automation.plantmode[TheValue] : TheValue;
					if($(this).val()) {
						$(this).val(newString);
					} else {
						$(this).text(newString);
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-winter')) {
					foundElement = true;
					if(wpResult[elem].Value == 'True') {
						$(this).addClass('ps-blue').removeClass('ps-yellow').text('Winter');
					} else {
						$(this).removeClass('ps-blue').addClass('ps-yellow').text('Sommer');
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-cov')) {
					foundElement = true;
					if(wpResult[elem].ValueString != $(this).attr('data-lastValue')) {
						if($(this).val()) {
							if(ValueString == '') ValueString = ' ';
							$(this).val(ValueString);
						} else {
							if(ValueString == '') {
								$(this).html('<?=wpHTML_EMPTY?>');
							} else {
								$(this).text(ValueString);
							}
						}
						$(this).attr('data-lastValue', ValueString);
					}
				}
			//*****************************************************
				if($(this).hasClass('pa-green')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-green');
					} else {
						$(this).addClass('ps-green');

					}
				}
			//*****************************************************
				if($(this).hasClass('pa-nogreen')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-green');
					} else {
						$(this).removeClass('ps-green');

					}
				}
			//*****************************************************
				if($(this).hasClass('pa-yellow')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-yellow');
					} else {
						$(this).addClass('ps-yellow');

					}
				}
			//*****************************************************
				if($(this).hasClass('pa-noyellow')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-yellow');
					} else {
						$(this).removeClass('ps-yellow');

					}
				}
			//*****************************************************
				if($(this).hasClass('pa-red')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-red');
					} else {
						$(this).addClass('ps-red');

					}
				}
			//*****************************************************
				if($(this).hasClass('pa-nored')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-red');
					} else {
						$(this).removeClass('ps-red');

					}
				}
			//*****************************************************
				if($(this).hasClass('pa-blue')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).removeClass('ps-blue');
					} else {
						$(this).addClass('ps-blue');

					}
				}
			//*****************************************************
				if($(this).hasClass('pa-noblue')) {
					foundElement = true;
					if(TheValue == 'False' || TheValue == '0' || TheValue == 'Off') {
						$(this).addClass('ps-blue');
					} else {
						$(this).removeClass('ps-blue');

					}
				}
			//*****************************************************
				if(foundElement == false) {
					if($(this).val()) {
						if(ValueString == '') ValueString = ' ';
						$(this).val(ValueString);
					} else {
						if(ValueString == '') {
							$(this).html('<?=wpHTML_EMPTY?>');
						} else {
							$(this).text(ValueString);
						}
					}
				}
				foundElement = false;
			});
		},
		plantmode: {
			'0': 'Aus',
			'1': 'Optimum Start',
			'2': 'Nachtstützbetrieb',
			'3': 'Nachtkühlbetrieb',
			'4': 'Betrieb',
			'5': 'Betriebszeitverlängerung',
			'11': 'Aussetzbetrieb',
			'12': 'EOV-Abschaltung',
			'20': 'Frostschutz',
			'21': 'Lüfterstörung',
			'30': 'Brandabschaltung'
		},
	},
	popup: {
		isBacnet: 'False',
		slider: {
			Min: 0,
			Max: 100,
			Step: 1
		},
		title: 'Bedienung',
		invertHand: 'False',
		enumHand: 'False',
		hasFeedback: 'False',
		FUtext1: '',
		FUtext2: '',
		setDefault: function() {
			p.popup.isBacnet = 'False';
			p.popup.slider.Min = 0;
			p.popup.slider.Max = 100;
			p.popup.slider.Step = 1;
			p.popup.title = 'Bedienung';
			p.popup.invertHand = 'False';
			p.popup.enumHand = 'False';
			p.popup.hasFeedback = 'False';
			p.popup.FUtext1 = '';
			p.popup.FUtext2 = '';
		},
		AnalogSchieberegler: function(headline, id, sliderwrite) {
			$.post('std.schieberegler.pop', { elem:id, headline:headline, bacnet:p.popup.isBacnet, invertHand:p.popup.invertHand, enumHand:p.popup.enumHand, hasFeedback:p.popup.hasFeedback }, function(data) {
				$('#dialog').html(data).dialog({
					title:p.popup.title, modal:true, width:p.popup.width.std,
					buttons:null
				});
				var sliderwritepoint = (typeof(sliderwrite) == 'undefined') ?
					$('#dialog').find('.pa-slider').attr('data-value') : sliderwrite;
				p.popup.setSchieberegler(sliderwritepoint);
			}).always(function() {
				p.popup.setDefault();
			});
		},
		SimpleSchieberegler: function(headline, id, sliderwrite) {
			$.post('std.schieberegler.pop', { elem:id, headline:headline, type:'ohneHandAuto', bacnet:p.popup.isBacnet }, function(data) {
				$('#dialog').html(data).dialog({
					title:p.popup.title, modal:true, width:p.popup.width.std,
					buttons:null
				});
				var sliderwritepoint = (typeof(sliderwrite) == 'undefined') ?
					$('#dialog').find('.pa-slider').attr('data-value') : sliderwrite;
				p.popup.setSchieberegler(sliderwritepoint);
			}).always(function() {
				p.popup.setDefault();
			});
		},
		LichtSchieberegler: function(headline, id, sliderwrite) {
			$.post('std.schieberegler.pop', { elem:id, headline:headline, type:'EinAus', bacnet:p.popup.isBacnet }, function(data) {
				$('#dialog').html(data).dialog({
					title:p.popup.title, modal:true, width:p.popup.width.std,
					buttons:null
				});
				var sliderwritepoint = (typeof(sliderwrite) == 'undefined') ?
					$('#dialog').find('.pa-slider').attr('data-value') : sliderwrite;
				p.popup.setLichtSchieberegler(sliderwritepoint);
			}).always(function() {
				p.popup.setDefault();
			});
		},
		FU: function(headline, id, sliderwrite) {
			$.post('std.fu.pop', { elem:id, headline:headline, bacnet:p.popup.isBacnet, invertHand:p.popup.invertHand, hasFeedback:p.popup.hasFeedback, t1:p.popup.FUtext1, t2:p.popup.FUtext2 }, function(data) {
				$('#dialog').html(data).dialog({
					title:p.popup.title, modal:true, width:p.popup.width.std,
					buttons:null
				});
				var sliderwritepoint = (typeof(sliderwrite) == 'undefined') ?
					$('#dialog').find('.pa-slider').attr('data-value') : sliderwrite;
				p.popup.setSchieberegler(sliderwritepoint);
			}).always(function() {
				p.popup.setDefault();
			});
		},
		MAGNA: function(headline, id, sliderwrite) {
			$.post('std.fu.pop', { elem:id, type:'MAGNA3', headline:headline, bacnet:p.popup.isBacnet, invertHand:p.popup.invertHand, hasFeedback:p.popup.hasFeedback, t1:p.popup.FUtext1, t2:p.popup.FUtext2 }, function(data) {
				$('#dialog').html(data).dialog({
					title:p.popup.title, modal:true, width:p.popup.width.std,
					buttons:null
				});
				var sliderwritepoint = (typeof(sliderwrite) == 'undefined') ?
					$('#dialog').find('.pa-slider').attr('data-value') : sliderwrite;
				p.popup.setSchieberegler(sliderwritepoint);
			}).always(function() {
				p.popup.setDefault();
			});
		},
		Sollwert: function(headline, id) {
			firstclick = true;
			$.post('std.numpad.pop', { headline:headline, elem:id, bacnet:p.popup.isBacnet }, function(data) {
				$('#dialog').html(data).dialog({
					title:'Sollwert', modal:true, width:p.popup.width.std,
					buttons:{
						ok:{
							text:'speichern',
							click:function() {
								p.automation.write($('.popup').find('table').attr('data-id'), $('#oskinput').val());
								$('#dialog').dialog('close');
							}
						}
					}
				});
			}).always(function() {
				p.popup.setDefault();
			});
		},
		setSchieberegler: function(sliderwritepoint) {
			$('#dialog').find('.pa-slider').slider({
				min: p.popup.slider.Min,
				max: p.popup.slider.Max,
				step: p.popup.slider.Step,
				start: function() {
					$(this).addClass('WriteOnly');
					$(this).find('a').append('<span class="toleft">--</span>');
				},
				slide: function(event, ui) {
					var TheValue = ui.value;
					var TheSpan = $(this).find('span.toleft');
					$(TheSpan).text(TheValue);
				},
				stop: function(event, ui) {
					p.automation.write(sliderwritepoint, ui.value);
					$(this).removeClass('WriteOnly').find('a').text('');
				}
			});
		},
		setLichtSchieberegler: function(sliderwritepoint) {
			$('#dialog').find('.pa-slider').slider({
				min: p.popup.slider.Min,
				max: p.popup.slider.Max,
				step: p.popup.slider.Step,
				start: function() {
					$(this).addClass('WriteOnly');
					$(this).find('a').append('<span class="toleft">--</span>');
				},
				slide: function(event, ui) {
					var TheValue = ui.value;
					var TheSpan = $(this).find('span.toleft');
					$(TheSpan).text(TheValue);
					$(this).find('.ui-slider-handle').css({
						boxShadow: '0px 0px 5px 5px rgba(255,255,0,' + (ui.value / 100) + ')'
					});
				},
				stop: function(event, ui) {
					p.automation.write(sliderwritepoint, ui.value);
					$(this).removeClass('WriteOnly').find('a').text('');
				}
			});
		},
		width: {
			std: '350px',
			middle : '550px',
			osk: '820px'
		}
	},
	osk: {
		ok: null
	},
	log: {
		level: null,
		type: {
			debug: 0,
			info: 1,
			log: 2,
			warn: 3
		},
		write: function(log, type) {
			if(typeof(console) != 'undefined') {
				switch(type) {
					case p.log.type.debug:
						if(p.log.level <= p.log.type.debug) console.debug(log);
						break;
					case p.log.type.info:
						if(p.log.level <= p.log.type.info) console.info(log);
						break;
					case p.log.type.warn:
						if(p.log.level <= p.log.type.warn) console.warn(log);
						break;
					default:
						if(p.log.level <= p.log.type.log) console.log(log);
						break;
				}
			}
		}
	},
	time: {
		print: function(timevalue, useDate, useTime) {
			let d1;
			let useTheDate = typeof useDate == 'undefined' ? true : useDate;
			let useTheTime = typeof useTime == 'undefined' ? true : useTime;
			if(useTheDate == false && useTheTime == false) useTheDate = true;
			if(timevalue instanceof Date) d1 = timevalue;
			else if(Number.isInteger(timevalue)) d1 = new Date(timevalue * 1000);
			else d1 = new Date(timevalue);
			let DateString = '';
			if(useTheDate) {
				var curr_year = d1.getFullYear();
				var curr_month = d1.getMonth() + 1;
				if(curr_month < 10) curr_month = '0' + curr_month;
				var curr_date = d1.getDate();
				if(curr_date < 10) curr_date = '0' + curr_date;
				DateString = curr_date + '.' + curr_month + '.' + curr_year;
			}
			let TimeString = '';
			if(useTheTime) {
				var curr_hour = d1.getHours();
				if(curr_hour < 10) curr_hour = '0' + curr_hour;
				var curr_min = d1.getMinutes();
				if(curr_min < 10) curr_min = '0' + curr_min;
				var curr_sec = d1.getSeconds();
				if(curr_sec < 10) curr_sec = '0' + curr_sec;
				TimeString = curr_hour + ':' + curr_min + ':' + curr_sec;
			}
			let sep = DateString != '' && TimeString != '' ? ' ' : '';
			return DateString + sep + TimeString;
		},
		diff: function(date1, date2) {
			var diff = (date2.getTime() - date1.getTime()) / 1000;
			var returns = '';

			var seconds = Math.floor(diff % 60);
			diff = diff / 60;
			var minutes = Math.floor(diff % 60);
			diff = diff / 60;
			var hours = Math.floor(diff % 24);
			diff = diff / 24;
			var days = Math.floor(diff % 365);

			if(days > 0) returns += days + ' ';
			returns += ((hours < 10) ? '0' : '') + hours + ':';
			returns += ((minutes < 10) ? '0' : '') + minutes + ':';
			returns += ((seconds < 10) ? '0' : '') + seconds;

			return returns;
		},
		stringToTimestamp: function(date1) {
			var regDateTime = /^(0?[1-9]|1[0-2]), ?(0?[1-9]|[1-2][0-9]|3[0-1]), ?(20[0-9][0-9]|[0-9][0-9]) (0?[0-9]|1[0-9]|2[0-4]):(0?[0-9]|[1-5][0-9]):(0?[0-9]|[1-5][0-9])$/;
			var regSQLTime = /^(20[0-9][0-9])-([0-2][0-9]|3[0-1])-([0-2][0-9]|3[0-1]) (0?[0-9]|1[0-9]|2[0-4]):(0?[0-9]|[1-5][0-9]):(0?[0-9]|[1-5][0-9])$/;
			var returns;
			var text = '', a, i;
			if(regDateTime.test(date1) === true) {
				a = regDateTime.exec(date1);
				returns = new Date(a[3], a[1], a[2], a[4], a[5], a[6], 0);
			} else if(regSQLTime.test(date1) == true) {
				a = regSQLTime.exec(date1);
				returns = new Date(a[1], a[2], a[3], a[4], a[5], a[6], 0);
			} else {
				returns = null;
			}
			return returns;
		}
	},
	keyexist: function(item, arr) {
		for(var oneitem in arr) {
			if(oneitem == item) return true;
		}
		return false;
	},
	valueexist: function(item, arr) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == item) return true;
		}
		return false;
	},
	arrayEquals : function (array1, array2, strict) {
		if(!array1)
			return false;
		if(!array2)
			return false;

		if(arguments.length == 2)
			strict = true;

		if(array1.length != array2.length)
			return false;

		for (var i = 0; i < array1.length; i++) {
			if(array1[i] instanceof Array && array2[i] instanceof Array) {
				if(!p.arrayEquals(array1[i], array2[i], strict))
					return false;
			} else if(strict && array1[i] != array2[i]) {
				return false;
			} else if(!strict) {
				return p.arrayEquals(array1.sort(), array2.sort(), true);
			}
		}
		return true;
	},
	bitDemux: function(toDemux, length) {
		if(typeof(length) === 'undefined') length = 8;
		var returns = [];
		var chars = parseInt(toDemux).toString(2);
		for(var si = (length - 1); si >= 0; si--) {
			returns.push((chars.charAt(si) == '0' ||
					chars.charAt(si) == '' ||
					typeof(chars.charAt(si)) === 'undefined') ? false : true);
		}
		return returns;
	},
	runde: function(x, n) {
		if(n < 1 || n > 14) return false;
		var e = Math.pow(10, n);
		var k = (Math.round(x * e) / e).toString();
		if(k.indexOf('.') == -1) k += '.';
		k += e.toString().substring(1);
		return k.substring(0, k.indexOf('.') + n+1).replace('.', ',');
	}
};
// <? if(wpInit::$wpDebug) { ?> Default Werte initialisieren (Debug)
p.log.level = p.log.type.debug;
// <? } else { ?> Default Werte initialisieren
p.log.level = p.log.type.warn;
// <? } ?>

var project = {
	page: {
		load: null
	}
};

var dragqueen = {
	active: false,
	savePositionIn: 'px',
	latestPosition: null,
	legendTimeout : 75,
	updateLegendTimeout: null,
	updateLegend: function() {
		dragqueen.updateLegendTimeout = null;
		if(dragqueen.active) {
			$('.lastidCheckDiv').css({
				top: (dragqueen.latestPosition.top - 30) + 'px',
				left: (dragqueen.latestPosition.left + 30) + 'px',
				zIndex: 10, backgroundColor:'#FFF'
			});
		}
	}
};


