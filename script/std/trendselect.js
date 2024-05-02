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
//# Revision     : $Rev:: 585                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: trendselect.js 585 2024-04-15 22:57:57Z                  $ #
//#                                                                                 #
//###################################################################################
?> trendselect */

// p.log.level = p.log.type.info;

var plot = null;
var plotdata;
var plotoptions;
var nozoom = {min:null,max:null};

var updateLegendTimeout = null;
var latestPosition = null;
var legends;

var lastclicked;
var lastid;

var idsfortrend = [];

var dateFormat = 'dd.mm.yyyy';
var timefrom;
var timeto;

var autoloadtrenddatatimer = null;
var autoloadtrenddatastarted = false;
var autoloadtrenddataseconds = 0;

timezoneJS.timezone.zoneFileBasePath = 'system/tz';
timezoneJS.timezone.defaultZoneFile = ['europe.txt'];
timezoneJS.timezone.init({async: true});

p.page.load = function() {

	$.get('std.trendselect.getusertrends.req', function(data) {
		$('#trendusercfg').removeClass('ps-loading').html(data);
	});

	$('#trendexists').on('click', '.ps-tree-parent', function() {
		lastclicked = $(this);
		lastid = $(this).attr('data-group');
		if($(lastclicked).hasClass('open')) {
			$('[data-trends]').html('');
			$('[data-group]').removeClass('open');
		} else {
			$('[data-trends]').html('');
			$('[data-group]').removeClass('open');
			$(lastclicked).addClass('loading');
			$.post('std.trendselect.gettrendsingroup.req', {id:lastid}, function(data) {
				$(lastclicked).removeClass('loading').addClass('open');
				$('[data-trends=' + lastid + ']').html(data);
				$.each(idsfortrend, function(index, value) {
					$('#trendexists [data-trend=' + value + ']').addClass('ps-hidden');
				});
			});
		}
	});

	$('#trendexists').on('click', 'div.trend .ps-button', function() {
		var toCopy = $(this).parent('div.trend').clone();
		$(this).parent('div.trend').addClass('ps-hidden');
		idsfortrend.push($(this).parent('div.trend').attr('data-trend'));

		var button = $(toCopy).find('ps-button');
		$(toCopy).prepend($(button));
		$(toCopy).find('.ps-button').text('←');
		$('#choosentrend').append(toCopy);
	});
	$('#choosentrend').on('click', 'div.trend .ps-button', function() {
		var idtrend = $(this).parent('div.trend').attr('data-trend');
		for(var i = 0; i < idsfortrend.length; i++) {
			if(idsfortrend[i] == idtrend) idsfortrend.splice(i, 1);
		}
		$(this).parent('div.trend').fadeOut().remove();
		$('#trendexists [data-trend=' + idtrend + ']').removeClass('ps-hidden');
	});
	$('#trendconfig, #trendcontainer').on('click', '.trendshow', function() {
		getTrendData();
	});
	$('#trendcontainer').on('click', '.autoloadtrenddata', function() {
		setAutomaticTrendData();
	});
	$('#erg').on('plothover',  function (event, pos, item) {
		latestPosition = pos;
		if (!updateLegendTimeout) {
			updateLegendTimeout = setTimeout(updateLegend, 50);
		}
	});
	$('#erg').on('plotselected', function(event, ranges) {
		$('#zoomout').addClass('zoomout').removeClass('inactive');
		plot = $.plot('#erg', plotdata, $.extend(true, {}, plotoptions, {
			xaxis: {
				min: ranges.xaxis.from,
				max: ranges.xaxis.to
			}
		}));
		renewLegendObject();
	});
	$('#erg').on('plotclick', function(event, pos, item) {
		if(item) {
			$.post('std.trendselect.deletetrendvalue.req', {id_trend:item.series.id, time:item.datapoint[0], value:item.datapoint[1]}, function(data) {
				if(data != 'S_OK') p.page.alert(data);
			});
			//console.log(item);
		}
	});
	$('#trendcontainer').on('click', '.zoomout', function() {
		$('#zoomout').addClass('inactive').removeClass('zoomout');
		zoomOut();
	});

	$('#trendconfig').on('click', '.trendsaveuser', function() {
		var dpfrom = $('.timefrom').datepicker('getDate') == null ? '' : $('.timefrom').datepicker('getDate').getTime() / 1000;
		var dpto = $('.timeto').datepicker('getDate') == null ? '' : $('.timeto').datepicker('getDate').getTime() / 1000;
		var dpday = $('.trendday').datepicker('getDate') == null ? '' : $('.trendday').datepicker('getDate').getTime() / 1000;
		var dpchoosen = $('[data-checkboxgroup="trendtimerange"].checked').attr('data-choosen');
		var obj = {
			time: $('.timerange option:selected').val(),
			from: dpfrom,
			to: dpto,
			day: dpday,
			choosen: dpchoosen,
			name: $('.trendsavename').val(),
			useminmax: $('.trendminmax').hasClass('checked') ? 'frompoint' : 'fromdb',
			only1axes: $('.trendonly1Axes').hasClass('checked') ? 'True' : 'False',
			ids: {}
		};
		for(var i = 0; i < idsfortrend.length; i++){
			obj['ids'][i] = idsfortrend[i];
		}
		$.post('std.trendselect.savetrenduser.req', obj, function(data) {
			if(data == 'S_OK') {
				$('#trendusercfg').addClass('ps-loading').html('');
				$.get('std.trendselect.getusertrends.req', function(data) {
					$('#trendusercfg').removeClass('ps-loading').html(data);
					$('.trendsavename').val('');
				});
			} else {
				p.page.alert('<span class="neg">' + data + '</span>', 2500);
			}
		});
	});
	$('#trendconfig').on('click', '.trendsaveadmin', function() {
		var dpfrom = $('.timefrom').datepicker('getDate') == null ? '' : $('.timefrom').datepicker('getDate').getTime() / 1000;
		var dpto = $('.timeto').datepicker('getDate') == null ? '' : $('.timeto').datepicker('getDate').getTime() / 1000;
		var dpday = $('.trendday').datepicker('getDate') == null ? '' : $('.trendday').datepicker('getDate').getTime() / 1000;
		var dpchoosen = $('[data-checkboxgroup="trendtimerange"].checked').attr('data-choosen');
		var obj = {
				time: $('.timerange option:selected').val(),
				from: dpfrom,
				to: dpto,
				day: dpday,
				choosen: dpchoosen,
				name: $('.trendsavename').val(),
				useminmax: $('.trendminmax').hasClass('checked') ? 'frompoint' : 'fromdb',
				only1axes: $('.trendonly1Axes').hasClass('checked') ? 'True' : 'False',
				ids: {}
			};
			for(var i = 0; i < idsfortrend.length; i++){
				obj['ids'][i] = idsfortrend[i];
			}
			$.post('std.trendselect.savetrendadmin.req', obj, function(data) {
				if(data == 'S_OK') {
					$('#trendusercfg').addClass('ps-loading').html('');
					$.get('std.trendselect.getusertrends.req', function(data) {
						$('#trendusercfg').removeClass('ps-loading').html(data);
						$('.trendsavename').val('');
					});
				} else {
					p.page.alert('<span class="neg">' + data + '</span>', 2500);
				}
			});
	});
	$('#trendusercfg').on('click', '.ps-bold', function() {
		$('#erg').height('300px').addClass('ps-loading');
		idsfortrend = [];
		$('#choosentrend').html('');
		$('[data-trends]').html('');
		$('[data-group]').removeClass('open');
		$('.timefrom').val('');
		$('.timeto').val('');
		var elemWithData = $(this).parents('.GroupHeadLine');
		$('[data-parent=' + $(elemWithData).attr('data-child') + '] li').each(function() {
			idsfortrend.push($(this).attr('data-trendid'));
			$('#choosentrend').append('<div class="trend" data-trend="' + $(this).attr('data-trendid') + '" data-group="' + $(this).attr('data-trendgroup') + '">' +
					'<span class="text">' + $(this).text() + '</span>' +
					'<span class="ps-button">&larr;</span>' +
					'<div class="clearboth"></div></div>')
		});
		var obj = {
			time: $(elemWithData).attr('data-time'),
			from: $(elemWithData).attr('data-from'),
			to: $(elemWithData).attr('data-to'),
			day: $(elemWithData).attr('data-day'),
			choosen: $(elemWithData).attr('data-choosen'),
			ids: idsfortrend,
			useminmax: $(elemWithData).attr('data-useminmax'),
			only1axes: $(elemWithData).attr('data-only1axes')
		};
		$('.timerange').val($(elemWithData).attr('data-time'));
		$('.timefrom').val($(elemWithData).attr('data-from'));
		$('.timeto').val($(elemWithData).attr('data-to'));
		$('.trendday').val($(elemWithData).attr('data-day'));
		$('[data-checkboxgroup="trendtimerange"]').removeClass('checked');
		$('[data-choosen="' + $(elemWithData).attr('data-choosen') + '"]').addClass('checked');
		if($(elemWithData).attr('data-useminmax') == 'frompoint') {
			$('.trendminmax').addClass('checked');
		} else {
			$('.trendminmax').removeClass('checked');
		}
		if($(elemWithData).attr('data-only1axes') == 'True') {
			$('.trendonly1Axes').addClass('checked');
		} else {
			$('.trendonly1Axes').removeClass('checked');
		}
		//$('#erg').html('');
		$.post('std.trend.req', obj, function(data) {
			$('#trendcontainer .ps-button').removeClass('ps-hidden');
			$('.selectedtime').text('-');
			plotdata = data.plotdata;
			plotoptions = data.plotoptions;
			plotoptions.xaxis["tickFormatter"] = function(val) {
				var d = new Date(val);
				return $.plot.formatDate(d, "<?='%d.%m.%Y<br />%H:%M'?>");
			};
			printPlotData();
		}, 'json');
	});
	$('#trendusercfg').on('click', '.ps-tree-parent', function() {
		var wasOpen = $(this).hasClass('open');
		$('#trendusercfg .ps-tree-parent').removeClass('open');
		$('#trendusercfg .ps-tree-child').addClass('ps-hidden');
		if(wasOpen == false) {
			var elemWithData = $(this).parents('.GroupHeadLine');
			$(this).addClass('open');
			$('[data-parent=' + $(elemWithData).attr('data-child') + ']').removeClass('ps-hidden');
		}
	});
	$('#trendusercfg').on('click', '.trenddeleteadmin', function() {
		var elemWithData = $(this).parents('.GroupHeadLine');
		var obj = { idtrendcfg: $(elemWithData).attr('data-child') };
		$.post('std.trendselect.deletetrendadmin.req', obj, function(data) {
			if(data == 'S_OK') {
				$('#trendusercfg').addClass('ps-loading').html('');
				$.get('std.trendselect.getusertrends.req', function(data) {
					$('#trendusercfg').removeClass('ps-loading').html(data);
				});
			} else {
				p.page.alert('<span class="neg">' + data + '</span>', 2500);
			}
		});
	});
	$('#trendusercfg').on('click', '.trenddeleteuser', function() {
		var elemWithData = $(this).parents('.GroupHeadLine');
		var obj = { idtrendcfg: $(elemWithData).attr('data-child') };
		$.post('std.trendselect.deletetrenduser.req', obj, function(data) {
			if(data == 'S_OK') {
				$('#trendusercfg').addClass('ps-loading').html('');
				$.get('std.trendselect.getusertrends.req', function(data) {
					$('#trendusercfg').removeClass('ps-loading').html(data);
				});
			} else {
				p.page.alert('<span class="neg">' + data + '</span>', 2500);
			}
		});
	});
	$('#trendusercfg').on('click', '.trendrenameadmin', function() {
		var idtrendcfg = $(this).parents('.GroupHeadLine').attr('data-child');
		$.post('std.osk.pop', {type:'min'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Trendkonfiguration Umbenennen', modal: true, width: p.popup.width.osk,
				buttons: [{
					text: 'speichern',
					click: function() {
						$.post('std.trendselect.renametrendadmin.req', {idtrendcfg:idtrendcfg,newname:$('#oskinput').val()}, function(data) {
							if(data == 'S_OK') {
								$('#trendusercfg').addClass('ps-loading').html('');
								$('#dialog').dialog('close');
								$.get('std.trendselect.getusertrends.req', function(data) {
									$('#trendusercfg').removeClass('ps-loading').html(data);
								});
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 2500);
							}
						});
					}
				}]
			});
		});
	});
	$('#trendusercfg').on('click', '.trendrenameuser', function() {
		var idtrendcfg = $(this).parents('.GroupHeadLine').attr('data-child');
		$.post('std.osk.pop', {type:'min'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Trendkonfiguration Umbenennen', modal: true, width: p.popup.width.osk,
				buttons: [{
					text: 'speichern',
					click: function() {
						$.post('std.trendselect.renametrenduser.req', {idtrendcfg:idtrendcfg,newname:$('#oskinput').val()}, function(data) {
							if(data == 'S_OK') {
								$('#trendusercfg').addClass('ps-loading').html('');
								$('#dialog').dialog('close');
								$.get('std.trendselect.getusertrends.req', function(data) {
									$('#trendusercfg').removeClass('ps-loading').html(data);
								});
							} else {
								p.page.alert('<span class="neg">' + data + '</span>', 2500);
							}
						});
					}
				}]
			});
		});
	});


	timefrom = $('.timefrom').datepicker({
		defaultDate: '-1w',
		numberOfMonths: 2,
		dateFormat: 'dd.mm.yy',
		maxDate: 0
	}).on('change', function() {
		timeto.datepicker('option', 'minDate', getDate(this));
	});
	timeto = $('.timeto').datepicker({
		numberOfMonths: 2,
		dateFormat: 'dd.mm.yy',
		maxDate: 0
	}).on('change', function() {
		timefrom.datepicker('option', 'maxDate', getDate(this));
	});
	
	$('.trendday').datepicker({
		dateFormat: 'dd.mm.yy',
		maxDate: 0
	});

	p.getValues();
};
function updateLegend() {
	updateLegendTimeout = null;
	var pos = latestPosition;
	var axes = plot.getAxes();
	if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
		pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
		return;
	}
	var i, j, dataset = plot.getData();
	for (i = 0; i < dataset.length; ++i) {
		var series = dataset[i];
		if(dataset[i]['data'].length > 0) {
			var isbool = (dataset[i]['data'][0][1] == true || dataset[i]['data'][0][1] == false) ? true : false;
			for (j = 0; j < series.data.length; ++j) {
				if (series.data[j][0] > pos.x) {
					break;
				}
			}
			var y,
				p1 = series.data[j - 1],
				p2 = series.data[j];
			if(isbool) {
				if (p1 == null) {
					y = p2[1];
				} else {
					y = p1[1];
				}
				legends.eq(i).html(series.label.replace(/=<br \/>.*/, "=<br />" + y));
			} else {
				if (p1 == null) {
					y = p2[1];
				} else if (p2 == null) {
					y = p1[1];
				} else {
					y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
				}
				legends.eq(i).html(series.label.replace(/=<br \/>.*/, "=<br />" + y.toFixed(series.nks) + " " + series.unit));
			}
		}
	}
	var oDate = new Date(Math.floor(pos.x));
	var tDay = (oDate.getDate().toString().length == 1) ? '0' + oDate.getDate() : oDate.getDate();
	var tMonth = ((oDate.getMonth() + 1).toString().length == 1) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1;
	var tHour = (oDate.getHours().toString().length == 1) ? '0' + oDate.getHours() : oDate.getHours();
	var tMinute = (oDate.getMinutes().toString().length == 1) ? '0' + oDate.getMinutes() : oDate.getMinutes();
	var tSeconds = (oDate.getSeconds().toString().length == 1) ? '0' + oDate.getSeconds() : oDate.getSeconds();
	var tDate = tDay + '.' + tMonth + '.' + oDate.getFullYear() + ' ' + tHour + ':' + tMinute + ':' + tSeconds;
	$('.selectedtime').text(tDate);
}
function setAutomaticTrendData() {
	if(!autoloadtrenddatastarted) {
		getTrendData();
		autoloadtrenddataseconds = 0;
		autoloadtrenddatatimer = setInterval(function() {
			autoloadtrenddataseconds++;
			$('.autoloadtrenddataseconds').text((60 - autoloadtrenddataseconds) + ' sec');
			if(autoloadtrenddataseconds >= 60) {
				autoloadtrenddataseconds = 0;
				getTrendData();
				console.log('getTrendData');
			}
		}, 1000);
		$('.autoloadtrenddata').addClass('bm');
	} else {
		clearTimeout(autoloadtrenddatatimer);
		$('.autoloadtrenddataseconds').text('');
		$('.autoloadtrenddata').removeClass('bm');
	}
	autoloadtrenddatastarted = !autoloadtrenddatastarted;
	console.log('autoloadtrenddatastarted: ' + autoloadtrenddatastarted);
}
function getTrendData() {
	$('#trendcontainer .ps-button').removeClass('ps-hidden');
	$('#erg').height('300px').addClass('ps-loading');
	var dpfrom = $('.timefrom').datepicker('getDate') == null ? '' : $('.timefrom').datepicker('getDate').getTime() / 1000;
	var dpto = $('.timeto').datepicker('getDate') == null ? '' : $('.timeto').datepicker('getDate').getTime() / 1000;
	var dpday = $('.trendday').datepicker('getDate') == null ? '' : $('.trendday').datepicker('getDate').getTime() / 1000;
	var dpchoosen = $('[data-checkboxgroup="trendtimerange"].checked').attr('data-choosen');
	var obj = {
		time: $('.timerange option:selected').val(),
		from: dpfrom,
		to: dpto,
		day: dpday,
		choosen: dpchoosen,
		ids: idsfortrend,
		useminmax: $('.trendminmax').hasClass('checked') ? 'frompoint' : 'fromdb',
		only1axes: $('.trendonly1Axes').hasClass('checked') ? 'True' : 'False',
	};
	//$('#erg').html('');
	$.post('std.trend.req', obj, function(data) {
		$('.selectedtime').text('-');
		plotdata = data.plotdata;
		plotoptions = data.plotoptions;
		plotoptions.xaxis["tickFormatter"] = function(val) {
			var d = new Date(val);
			return $.plot.formatDate(d, "<?='%d.%m.%Y<br />%H:%M'?>");
		};
		printPlotData();
	}, 'json');
}
function renewLegendObject() {
	legends = $("#trendlegend .legendLabel");

	legends.each(function () {
		$(this).css('width', $(this).width());
	});
}
function printPlotData() {
	if(plot == null) {
		plot = $.plot($('#erg'), plotdata, plotoptions);
	} else {
		plot.setData(plotdata);
		plot.setupGrid(plotoptions);
		plot.draw();
	}

	nozoom.min = plot.getXAxes().datamin;
	nozoom.max = plot.getXAxes().datamax;

	zoomOut();
	$.each(plot.getData(), function(k, v) {
		$('.flot-y' + v.yaxis.n + '-axis .flot-tick-label').css({color:v.color});
	});
	//plot.draw();
	$('#erg').removeClass('ps-loading');
	$('#expformat').removeClass('ps-hidden');
}
function zoomOut() {
	$('#zoomout').removeClass('ps-hidden').addClass('inactive inactive');
	plot = $.plot('#erg', plotdata, $.extend(true, {}, plotoptions, {
		xaxis: {
			min: nozoom.min,
			max: nozoom.max
		}
	}));
	renewLegendObject();
}
function getDate(element) {
	var date;
	try {
		date = $(element).datepicker('getDate');
	} catch( error ) {
		date = null;
	}
	return date;
}
