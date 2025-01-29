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
//# File-ID      : $Id:: opcbrowse.js 561 2024-01-16 02:06:50Z                    $ #
//#                                                                                 #
//###################################################################################
?> opcbrowse */

// p.log.level = p.log.type.info;

var selserver = { progid:null, clsid:null, remote:null };
var opcserver = null;
var opcgroups = null;
var selgroup = null;
var actualdatapath;

p.page.load = function() {
	$('.remoteserverinput').hide();
	$('#erg').addClass('ps-loading');
	$(window).resize(function() {
		calcBrowseHide();
	});
	$.get('std.opcbrowse.opcserver.req', function(data) {
		$('#erg').removeClass('ps-loading').html(data);
	});
	$('#submenu').on('click', '.opcserverbutton', function() {
		$('#erg').addClass('ps-loading').html('');
		if($('.remoteopcbutton').hasClass('checked')) {
			$.post('std.opcbrowse.opcserver.req', {remoteopcserver:$('.remoteserverinput').val()}, function(data) {
				$('#erg').removeClass('ps-loading').html(data);
			});
		} else {
			$.get('std.opcbrowse.opcserver.req', function(data) {
				$('#erg').removeClass('ps-loading').html(data);
			});
		}
	});
	$('#submenu').on('click', '.remoteopcbutton', function() {
		if($(this).hasClass('checked')) {
			$('.remoteserverinput').hide();
		} else {
			$('.remoteserverinput').show();
		}
	});
	$('#erg').on('click', '.opcsearch', function() {
		$('#erg').addClass('ps-loading').html('');
		selserver.progid = $(this).attr('data-progid');
		selserver.clsid = $(this).attr('data-clsid');
		p.log.write('progid: ' + selserver.progid + '\nclsid: ' + selserver.clsid, p.log.type.info);
		selgroup = null;
		var TheObj;
		if($('.remoteopcbutton').hasClass('checked')) {
			selserver.remote = $('.remoteserverinput').val();
			TheObj = {id:selserver.progid, remoteopcserver:selserver.remote};
		} else {
			selserver.remote = null;
			TheObj = {id:selserver.progid};
		}
		$.post('std.opcbrowse.opcgroup.req', TheObj, function(data) {
			$('#erg').removeClass('ps-loading').html(data);
			calcBrowseHide();
			if($('.forGroup li.noGroup').attr('data-group') == 'nogroup') {
				selgroup = selserver.progid;
				$('.headlineopcgroup').text('selektiert: ' + selgroup);
				p.log.write('selgroup: ' + selgroup, p.log.type.info);
			}
		});
	});
	$('#erg').on('click', '.getItems', function(ev) {
		ev.stopPropagation();
		selgroup = $(this).text();
		p.log.write('selgroup: ' + selgroup, p.log.type.info);
		actualdatapath = $(this).attr('data-path');
		$('.headlineopcgroup').text('selektiert: ' + actualdatapath.replace(/\\/g, ' - '));
		$('.getItems').removeClass('ps-itemsactive');
		$(this).addClass('ps-itemsactive');
		var TheObj;
		if($('.remoteopcbutton').hasClass('checked')) {
			TheObj = {id:selserver.progid, group:$(this).attr('data-path'), remoteopcserver:$('.remoteserverinput').val()};
		} else {
			TheObj = {id:selserver.progid, group:$(this).attr('data-path')};
		}
		p.page.change('.forItems','std.opcbrowse.opcitem.req', TheObj, function() {
			$('.opccountflt').text($('.forItems li').length);
			$('.opccount').text($('.forItems li').length);
		});
	});
	$('#erg').on('click', '.ps-tree-parent', function() {
		var remoteopcserver;
		var ulid = $(this).attr('data-id');
		if($('.remoteopcbutton').hasClass('checked')) {
			remoteopcserver = $('.remoteserverinput').val();
		} else {
			remoteopcserver = 'localhost';
		}
		if($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('.ul' + ulid).find('ul').html('').addClass('ps-hidden');
		} else {
			$(this).addClass('open');
			$('.ul' + ulid).find('ul').removeClass('ps-hidden').addClass('ps-loading');
			$.post('std.opcbrowse.browsegroup.req', {id:selserver.progid, path:$(this).attr('data-path'),remoteopcserver:remoteopcserver}, function(data) {
				$('.ul' + ulid).find('ul').html(data).removeClass('ps-loading');
			});
		}
	});
	$('#opcbrowse').on('click', '.additems', function() {
		var newtext = new Array();
		$('.forItems li').each(function() {
			if($(this).hasClass('checked')) newtext.push($(this).attr('data-item'));
		});
		console.log(newtext);
		if(selgroup != null && newtext.length > 0) {
			$.post('std.opcbrowse.additemspopup.req', {clsid:selserver.clsid, progid:selserver.progid, remote:(selserver.remote == null) ? 'false' : selserver.remote, group:selgroup, items:newtext}, function(data) {
				$('#dialog').html(data).dialog({
					title: 'Datenpunkte hinzufügen',
					modal: true,
					width: p.popup.width.osk,
					maxHeight: 600,
					buttons:[{
						text:'speichern',
						click: function() {
							var newItems = {};
							$('#dialog tbody tr').each(function() {
								newItems[$(this).find('label').text().replace(/\[/g, '(').replace(/\]/g, ')')] = $(this).find('input').val();
							});
							var TheObj;
							var TheGroupToAdd = ($('.existgrouptoadd').hasClass('checked')) ? $('#existgroupToAdd').val() : $('#newgroupToAdd').val();
							if($('.remoteopcbutton').hasClass('checked')) {
								TheObj = {progid:selserver.progid, clsid:selserver.clsid, group:TheGroupToAdd, items:newItems, remoteopcserver:$('.remoteserverinput').val()};
							} else {
								TheObj = {progid:selserver.progid, clsid:selserver.clsid, group:TheGroupToAdd, items:newItems};
							}
							$.post('std.opcbrowse.additems.req', TheObj, function(data) {
								if(data != 'S_OK') {
									p.page.alert(data);
								} else {
									$('#dialog').dialog('close');
									p.page.alert('<span class="pos">gespeichert</span>');
								}
							});
							var TheObj2 = {id:selserver.progid, group:actualdatapath};
							p.page.change('.forItems','std.opcbrowse.opcitem.req', TheObj2, function() {
								$('.opccountflt').text($('#forItems li').length);
								$('.opccount').text($('#forItems li').length);
							});
						}
					},{
						text: 'abbruch',
						click: function() { $('#dialog').dialog('close'); }
					}]
				});
			});
		}
	});
	$('#erg').on('click', '.markall', function() {
		$('.forItems li').each(function() {
			if($(this).hasClass('ps-hidden')) $(this).removeClass('checked');
			else $(this).addClass('checked');
		});
	});
	$('#erg').on('click', '.markno', function() {
		$('.forItems li').removeClass('checked');
	});
	$('#erg').on('click', '.existsout', function() {
		$('.forItems li').each(function() {
			if($(this).hasClass('exists')) $(this).addClass('ps-hidden');
		});
		$('.opccountflt').text($('.forItems li:not(.ps-hidden)').length);
	});
	$('#erg').on('click', '.removefilter', function() {
		$('.forItems li').removeClass('ps-hidden');
		$('.opccountflt').text($('.forItems li').length);
	});
	$('#erg').on('keyup', '.FilterText', function() { setFilter(); });
	$('#erg').on('change', '.FilterText', function() { setFilter(); });
	p.getValues();
};

function setFilter() {
	if($('.FilterText').val().length == 0) {
		$('.forItems li').removeClass('ps-hidden');
	} else {
		$('.forItems li').each(function() {
			if($(this).text().indexOf($('.FilterText').val()) == -1) {
				$(this).addClass('ps-hidden').removeClass('checked');
			} else {
				$(this).removeClass('ps-hidden');
			}
		});
	}
	$('.opccountflt').text($('.forItems li:not(.ps-hidden)').length);
}
function calcBrowseHide() {
	p.log.write($(window).height(), p.log.type.warn); //520 981 == 460
	$('.forGroup').css({overflow:'auto', height:($(window).height() - 360) + 'px'});
	$('.forItems').css({overflow:'auto', height:($(window).height() - 570) + 'px'});
}
function createItemsToAdd(group, items) {
	var html = '<table><thead><tr><th><label for="groupToAdd">Into Group:</label></th>';
	var cleangroup = group.replace(/[^a-zA-Z0-9_]/g, '_');
	html += '<th><input type="text" id="groupToAdd" value="' + cleangroup + '" class="ps-input" /></th></tr></thead><tbody>';
	var logtext = 'cleangroup: ' + cleangroup + '\n';
	$(items).each(function(index, value) {
		var cleanitem = value.replace(/[^a-zA-Z0-9_]/g, '_');
		html += '<tr><td><label for="id' + index + '">' + value + '</label></td>';
		html += '<td><input type="text" id="id' + index + '" value="' + cleanitem + '" class="ps-input" /></td></tr>';
		logtext += 'cleanitem: ' + cleanitem + '\n';
	});
	p.log.write(logtext, p.log.type.info);
	return html + '<tbody></table>';
}
