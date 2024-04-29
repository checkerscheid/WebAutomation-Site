/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 15.12.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 505                                                     $ #
//# Author       : $Author:: checker                                              $ #
//# File-ID      : $Id:: templategen.js 505 2021-05-07 21:55:45Z checker          $ #
//#                                                                                 #
//###################################################################################
?> templategen */
var lastclicked;
var lastid;
p.page.load = function() {
	//###################################################################################
	$('#containerleft').on('click', '.ps-tree-parent', function() {
		lastclicked = $(this);
		lastid = $(this).attr('data-group');
		if($(lastclicked).hasClass('open')) {
			$('[data-templates]').html('');
			$('[data-group]').removeClass('open');
		} else {
			$('[data-templates]').html('');
			$('[data-group]').removeClass('open');
			$(lastclicked).addClass('loading');
			$.post('std.templategen.gettemplates.req', {id:lastid}, function(data) {
				$(lastclicked).removeClass('loading').addClass('open');
				$('[data-templates=' + lastid + ']').html(data);
			});
		}
	});
	//###################################################################################
	$('#containerleft').on('click', 'li[data-template] span.p-dpedit', function() {
		var id = $(this).parents('li:first').attr('data-template');
		$('#containerright .containercontent').html('').addClass('ps-loading');
		$.post('std.templategen.gettemplatesoptions.req', {id:id}, function(data) {
			$('#containerright .containercontent').html(data).removeClass('ps-loading');
			 $('.sortable').sortable({
				 placeholder: 'ui-state-highlight'
			 });
			 $('.sortable').disableSelection();
		});
		$('#containertemplate .containercontent').html('').addClass('ps-loading');
		$('#containertemplate h1').text($(this).parents('li:first').text());
		$.post('std.templategen.gettemplate.req', {id:id}, function(data) {
			$('#containertemplate .containercontent').html(data).removeClass('ps-loading');
			$('#templateraster *').draggable({containment: '#templateraster', grid: [ 10, 10 ],
				stop: function(e, ui) {
					$.post('std.templategen.savetemplateposition.req', {
						dbid:$('#templateraster').attr('data-id'),
						cssid:$(this).attr('id'),
						p:ui.position
					}, function(data) {
						if(data != 'S_OK') p.page.alert('<span class="neg">' + data + '</span>', 3000);
					});
				}
			});
			$('#templateraster div').resizable({containment: '#templateraster', grid:[5,5],
				stop: function(e, ui) {
					$.post('std.templategen.savetemplatesize.req', {
						dbid:$('#templateraster').attr('data-id'),
						cssid:$(this).attr('id'),
						s:ui.size
					}, function(data) {
						if(data != 'S_OK') p.page.alert('<span class="neg">' + data + '</span>', 3000);
					});
				}
			});
		});
	});
	//###################################################################################
	$('#containerright').on('click', '.templatehand', function() {
		if($(this).hasClass('checked')) {
			$.post('std.templategen.savetemplateclass.req', {dbid:$('#templateraster').attr('data-id'),cssid:'handbetrieb',value:'ps-hidden'}, function(data) {
				if(data == 'S_OK') $('#handbetrieb').addClass('ps-hidden');
			});
		} else {
			$.post('std.templategen.deletetemplateclass.req', {dbid:$('#templateraster').attr('data-id'),cssid:'handbetrieb'}, function(data) {
				if(data == 'S_OK') $('#handbetrieb').removeClass('ps-hidden');
			});
		}
	});
	//###################################################################################
	$('#containerright').on('click', '.templatevorort', function() {
		if($(this).hasClass('checked')) {
			$.post('std.templategen.savetemplateclass.req', {dbid:$('#templateraster').attr('data-id'),cssid:'vorort',value:'ps-hidden'}, function(data) {
				if(data == 'S_OK') $('#vorort').addClass('ps-hidden');
			});
		} else {
			$.post('std.templategen.deletetemplateclass.req', {dbid:$('#templateraster').attr('data-id'),cssid:'vorort'}, function(data) {
				if(data == 'S_OK') $('#vorort').removeClass('ps-hidden');
			});
		}
	});
	//###################################################################################
	$('#containerright').on('click', '#templatesetsize', function() {
		var w = $(this).parents('div.optionsrow').find('.templatewidth').val();
		var h = $(this).parents('div.optionsrow').find('.templateheight').val();
		if(Math.floor(w) == w && $.isNumeric(w) && Math.floor(h) == h && $.isNumeric(h)) {
			$.post('std.templategen.savetemplatesize.req', {
				dbid:$('#templateraster').attr('data-id'),
				cssid:'parent',
				s:{width:w, height:h}
			}, function(data) {
				if(data == 'S_OK') $('#templateraster').width(parseInt(w)).height(parseInt(h));
			});
		} else {
			alert('keine Integer angaben!')
		}
	});
};
