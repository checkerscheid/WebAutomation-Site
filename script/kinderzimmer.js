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
//# Revision     : $Rev:: 677                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: kinderzimmer.js 677 2024-07-15 13:51:59Z                 $ #
//#                                                                                 #
//###################################################################################
?> kinderzimmer */

//p.log.level = p.log.type.info;

dragqueen.savePositionIn = '%';

p.page.load = function() {
	$('#kinderzimmer').on('click', '.Ventil.bedienbar', function() {
		var headline = $(this).attr('data-popup');
		var id = $(this).attr('id');
		p.popup.title = 'Ventilbedienung';
		p.popup.AnalogSchieberegler(headline, id);
	});
	$('#kinderzimmer').on('click', '.ps-regler', function() {
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
