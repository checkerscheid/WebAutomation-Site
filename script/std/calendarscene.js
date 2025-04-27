/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 23.07.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: calendarscene.js 552 2024-01-06 13:56:24Z                $ #
//#                                                                                 #
//###################################################################################
?> scene */

// p.log.level = p.log.type.info;

p.page.load = function() {
	// Treeview
	$('#calendarscene').on('click', '.p-tree-parent-group', function() {
		if($(this).hasClass('open')) {
			$('.p-tree-child-group').html('');
			$('.ps-tree-parent').removeClass('open');
		} else {
			$('.p-tree-child-group').html('');
			$('.ps-tree-parent').removeClass('open');
			$(this).addClass('open loading');
			var group = $(this).attr('data-group');
			$.post('std.calendarscene.getgroup.req', {group:group}, function(data) {
				$('[data-scenen=' + group + ']').html(data);
				$('.ps-tree-parent').removeClass('loading');
			});
		}
	});
//###################################################################################
	$('#calendarscene').on('click', '[data-writescene]', function(data) {
		$.post('std.writescene.setid.req', {id:$(this).attr('data-writescene')}, function(data) {
			if(data.erg == 'S_OK') p.page.alert(data.message, 5000);
			else p.page.alertError(data.message, 5000);
		}, 'json');
	});
//###################################################################################
	$('#calendarschedule').on('click', '.gsync', function() {
		var id = $(this).attr('data-calendar');
		$('#dialog').html('<input type="text" placeholder="google id" /><span>Calendar id: ' + id  + '</span>').dialog({modal:true});
	});
//###################################################################################
	$('#calendarscene').on('click', '.p-tree-parent-scene', function() {
		if($(this).hasClass('open')) {
			$('.p-tree-child-scene').html('');
			$('.p-tree-parent-scene').removeClass('open');
		} else {
			$('.p-tree-child-scene').html('');
			$('.p-tree-parent-scene').removeClass('open');
			$(this).addClass('open loading');
			var scene = $(this).parent('.GroupHeadLine').attr('data-scene');
			$.post('std.calendarscene.getpoint.req', {id:scene}, function(data) {
				$('[data-points=' + scene + ']').html(data);
				$('.p-tree-parent-scene').removeClass('loading');
			});
		}
	});
//###################################################################################
	$('.sceneactive').on('click', function() {
		var id = $(this).attr('data-scene');
		if($(this).hasClass('checked')) {
			//deactivate
			$.post('std.calendarscene.unsetactive.req', {id:id}, function(data) {
				if(data != 'S_OK') {
					p.page.alert('<span class="neg">' + data + '</span>', 5000);
				}
			});
		} else {
			//activate
			$.post('std.calendarscene.setactive.req', {id:id}, function(data) {
				if(data != 'S_OK') {
					p.page.alert('<span class="neg">' + data + '</span>', 5000);
				}
			});
		}
	});
//###################################################################################
	$('#calendarschedule').on('click', '.gsync', function() {
		var calendarid = $(this).attr('data-idcalendar');
		$.post('std.syncszene.configdefaultscene.req', {key:'value'}, function(data) {
			$('#dialog').html(data).dialog({
				title: 'Default Szenen Konfigurieren', modal:true, width:p.popup.width.middle,
				buttons:[{
					text:'speichern',
					click: function(){
						var params = {
							url: $('.input').val(),
							calendarid: calendarid,
							startsceneid: $('.select-start').val(),
							endsceneid: $('.select-end').val(),
							reminderid: $('.select-reminder').val()
						};
						$.post('std.syncszene.updatedatabase.req', params, function(data){
							$('.popup-result').html(data);
							console.log(data);
						});
					}
				},{
					text:'close',
					click: function(){
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
//###################################################################################
	$('#calendarschedule').on('click', '.delete-gsync', function() {
		var idcalendar = $(this).attr('data-idcalendar');
		$.post('std.syncszene.requestdeletesync.req', {idcalendar:idcalendar}, function(data){
			$('#dialog').html(data).dialog({
				title:'delete default synchronization', modal:true, width:p.popup.width.middle,
				buttons:[{
					text: 'delete',
					click: function(){
						$.post('std.syncszene.deletesync.req', {idcalendar:idcalendar}, function(data){
							//update popup content with database response
							$('.popup-result').html(data);
						})
					}
				},{
					text:'close',
					click: function(){
						$('#dialog').dialog('close');
					}
				}]
			});
		});
	});
	p.getValues();
};
