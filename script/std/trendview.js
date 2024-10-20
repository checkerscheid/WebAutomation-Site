/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.10.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 705                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: trendview.js 705 2024-10-20 17:29:42Z                    $ #
//#                                                                                 #
//###################################################################################
?> trendview */


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
	$('.trendshow').click(function() {
		loadTrendData();
	});
	$('.autoloadtrenddata').click(function() {
		setAutomaticTrendData();
	});
	$('#TrendviewContainer').on('plothover',  function (event, pos, item) {
		latestPosition = pos;
		if (!updateLegendTimeout) {
			updateLegendTimeout = setTimeout(updateLegend, 50);
		}
	});
	$('#TrendviewContainer').on('plotselected', function(event, ranges) {
		$('.zoomout').addClass('zoomedout').removeClass('inactive');
		plot = $.plot('#TrendviewContainer', plotdata, $.extend(true, {}, plotoptions, {
			xaxis: {
				min: ranges.xaxis.from,
				max: ranges.xaxis.to
			}
		}));
		renewLegendObject();
	});
	$('#trendview').on('click', '.zoomedout', function() {
		$('.zoomout').addClass('inactive').removeClass('zoomedout');
		zoomOut();
	});
	loadTrendData();
	// p.getValues();
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
				legends.eq(i).html(series.label.replace(/=.*/, "= " + y));
			} else {
				if (p1 == null) {
					y = p2[1];
				} else if (p2 == null) {
					y = p1[1];
				} else {
					y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
				}
				legends.eq(i).html(series.label.replace(/=.*/, "= " + y.toFixed(series.nks) + " " + series.unit));
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
		loadTrendData();
		autoloadtrenddataseconds = 0;
		autoloadtrenddatatimer = setInterval(function() {
			autoloadtrenddataseconds++;
			$('.autoloadtrenddataseconds').text((60 - autoloadtrenddataseconds) + ' sec');
			if(autoloadtrenddataseconds >= 60) {
				autoloadtrenddataseconds = 0;
				loadTrendData();
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
function renewLegendObject() {
	legends = $("#trendlegend .legendLabel");

	legends.each(function () {
		$(this).css('width', $(this).width());
	});
}
function printPlotData() {
	if(plot == null) {
		plot = $.plot($('#TrendviewContainer'), plotdata, plotoptions);
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
	$('#TrendviewContainer').removeClass('ps-loading');
}
function zoomOut() {
	$('#zoomout').removeClass('ps-hidden').addClass('inactive inactive');
	plot = $.plot('#TrendviewContainer', plotdata, $.extend(true, {}, plotoptions, {
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
function loadTrendData() {
	//$('#TrendviewContainer').height('500px').addClass('ps-loading');
	$('.GroupHeadLine li').each(function() {
		idsfortrend.push($(this).text());
	});
	var obj = {
		time: $('.GroupHeadLine').attr('data-time'),
		from: $('.GroupHeadLine').attr('data-from'),
		to: $('.GroupHeadLine').attr('data-to'),
		day: $('.GroupHeadLine').attr('data-day'),
		choosen: $('.GroupHeadLine').attr('data-choosen'),
		ids: idsfortrend,
		useminmax: $('.GroupHeadLine').attr('data-useminmax'),
		only1axes: $('.GroupHeadLine').attr('data-only1axes'),
		nobr: 'true'
	};
	$.post('std.trend.req', obj, function(data) {
		plotdata = data.plotdata;
		plotoptions = data.plotoptions;
		plotoptions.xaxis["tickFormatter"] = function(val) {
			var d = new Date(val);
			return $.plot.formatDate(d, "<?='%d.%m.%Y<br />%H:%M'?>");
		};
		printPlotData();
	}, 'json');
}
