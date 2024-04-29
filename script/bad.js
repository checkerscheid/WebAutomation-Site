/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 14.01.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: bad.js 505 2021-05-07 21:55:45Z checker                  $ #
//#                                                                                 #
//###################################################################################
?> bad */

//p.log.level = p.log.type.info;

p.page.load = function() {
	$('#bad').on('click', '.pa-AufZu.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		$.post('std.truefalse.pop', {elem:id, headline:headline, type:'AufZu'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Ventilbedienung', modal: true, width: '300px'
			});
		});
	});
	$('#bad').on('click', '.Ventil.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		p.popup.title = 'Ventilbedienung';
		p.popup.AnalogSchieberegler(headline, id);
	});
	$('#bad').on('click', '.ps-regler', function() {
		var headline = $(this).attr('data-headline');
		var id = $(this).attr('data-id');
		$.post('std.regler.pop', {headline:headline}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Trends', modal: true, width: '600px'
			});
			var obj = {
				time: 'last1Hours',
				ids: id.split(','),
				useminmax: 'frompoint',
				only1axes: 'False'
			};
			$.post('std.trend.req', obj, function(data) {
				var plotdata = getPlotData();
				var plotoptions = getPlotOptions();
				plotoptions.selection = false;
				plotoptions.legend = {container:$('#popupTrendlegend')};

				plot = $.plot($('#popupTrend'), plotdata, plotoptions);

				renewLegendObject();
			}, 'script');
		});
	});

	p.getValues();
};
