/*<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 05.12.2014                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: useralarmcfg.js 552 2024-01-06 13:56:24Z                 $ #
//#                                                                                 #
//###################################################################################
?> useralarmcfg */

// p.log.level = p.log.type.info;

p.page.load = function() {
	$('#formalarmfiltertype').addClass('ps-loading');
	$('#formalarmfiltergroup').addClass('ps-loading');
	$('#formalarmfiltergroup1').addClass('ps-loading');
	$('#formalarmfiltergroup2').addClass('ps-loading');
	$('#formalarmfiltergroup3').addClass('ps-loading');
	$('#formalarmfiltergroup4').addClass('ps-loading');
	$('#formalarmfiltergroup5').addClass('ps-loading');
	$('.p-tabs').tabs();
	$('.p-accordion').accordion({
		collapsible: true,
		heightStyle: 'content',
		active: false
	});
	$.get('std.useralarmcfg.formfiltertype.req', function(data) {
		$('#formalarmfiltertype').html(data).removeClass('ps-loading');
	});
	$.get('std.useralarmcfg.formfiltergroup.req', function(data) {
		$('#formalarmfiltergroup').html(data).removeClass('ps-loading');
	});
	$.get('std.useralarmcfg.formfiltergroup1.req', function(data) {
		$('#formalarmfiltergroup1').html(data).removeClass('ps-loading');
	});
	$.get('std.useralarmcfg.formfiltergroup2.req', function(data) {
		$('#formalarmfiltergroup2').html(data).removeClass('ps-loading');
	});
	$.get('std.useralarmcfg.formfiltergroup3.req', function(data) {
		$('#formalarmfiltergroup3').html(data).removeClass('ps-loading');
	});
	$.get('std.useralarmcfg.formfiltergroup4.req', function(data) {
		$('#formalarmfiltergroup4').html(data).removeClass('ps-loading');
	});
	$.get('std.useralarmcfg.formfiltergroup5.req', function(data) {
		$('#formalarmfiltergroup5').html(data).removeClass('ps-loading');
	});
	$.post('std.useralarmcfg.getentrie.req', {id:1}, function(data) {
		$('div.entries1').html(data);
	});
	$.post('std.useralarmcfg.getentrie.req', {id:2}, function(data) {
		$('div.entries2').html(data);
	});
	$.post('std.useralarmcfg.getentrie.req', {id:3}, function(data) {
		$('div.entries3').html(data);
	});
	$.post('std.useralarmcfg.getentrie.req', {id:4}, function(data) {
		$('div.entries4').html(data);
	});
	$.post('std.useralarmcfg.getentrie.req', {id:5}, function(data) {
		$('div.entries5').html(data);
	});
	$.post('std.useralarmcfg.gettypes.req', {id:5}, function(data) {
		$('div.formalarmtypes').html(data);
	});
	$('#entries').on('click', '.p-dpadd', function() {
		var id = $(this).parents('table').attr('data-id');
		var text = $(this).parents('tr').find('.ps-input').val();
		$.post('std.useralarmcfg.addentrie.req', {id:id, text:text}, function(data) {
			if(data == 'S_OK') {
				$.post('std.useralarmcfg.getentrie.req', {id:id}, function(data) {
					$('div.entries' + id).html(data);
				});
			} else {
				p.page.alert(data, 5000);
			}
		});
	});
	$('#entries').on('click', '.p-dpsave', function() {
		var group = $(this).parents('table').attr('data-id');
		var id = $(this).parents('tr').attr('data-id');
		var text = $(this).parents('tr').find('.ps-input').val();
		$.post('std.useralarmcfg.saveentrie.req', {id:id, group:group, text:text}, function(data) {
			if(data == 'S_OK') {
				$.post('std.useralarmcfg.getentrie.req', {id:group}, function(data) {
					$('div.entries' + group).html(data);
					p.page.alert('gespeichert');
				});
			} else {
				p.page.alert('Eintrag konnte nicht gespeichert werden.', 5000);
			}
		});
	});
	$('#entries').on('click', '.p-dpdelete', function() {
		var group = $(this).parents('table').attr('data-id');
		var id = $(this).parents('tr').attr('data-id');
		$.post('std.useralarmcfg.deleteentrie.req', {id:id, group:group}, function(data) {
			if(data == 'S_OK') {
				$.post('std.useralarmcfg.getentrie.req', {id:group}, function(data) {
					$('div.entries' + group).html(data);
				});
			} else {
				p.page.alert('Eintrag konnte nicht gespeichert werden.', 5000);
			}
		});
	});
	$('#filtertypesubmit').click(function(event) {
		var userflttype = [];
		$('#formalarmfiltertype .ps-checkbox').each(function() {
			if($(this).hasClass('checked')) userflttype.push($(this).attr('data-id'));
		});
		$.post('std.useralarmcfg.savefiltertype.req', {userflttype:userflttype}, function(data) {
			$('#formalarmfiltertype').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltertype.req', {message:message}, function(data) {
				$('#formalarmfiltertype').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltertype .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroupsubmit').click(function(event) {
		var userfltgroup = [];
		$('#formalarmfiltergroup .ps-checkbox').each(function() {
			if($(this).hasClass('checked')) userfltgroup.push($(this).attr('data-id'));
		});
		$.post('std.useralarmcfg.savefiltergroup.req', {userfltgroup:userfltgroup}, function(data) {
			$('#formalarmfiltergroup').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup.req', {message:message}, function(data) {
				$('#formalarmfiltergroup').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup1submit').click(function(event) {
		var userfltgroup1 = [];
		$('#formalarmfiltergroup1 .ps-checkbox').each(function() {
			if($(this).hasClass('checked')) userfltgroup1.push($(this).attr('data-id'));
		});
		$.post('std.useralarmcfg.savefiltergroup1.req', {userfltgroup1:userfltgroup1}, function(data) {
			$('#formalarmfiltergroup1').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup1.req', {message:message}, function(data) {
				$('#formalarmfiltergroup1').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup1 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup2submit').click(function(event) {
		var userfltgroup2 = [];
		$('#formalarmfiltergroup2 .ps-checkbox').each(function() {
			if($(this).hasClass('checked')) userfltgroup2.push($(this).attr('data-id'));
		});
		$.post('std.useralarmcfg.savefiltergroup2.req', {userfltgroup2:userfltgroup2}, function(data) {
			$('#formalarmfiltergroup2').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup2.req', {message:message}, function(data) {
				$('#formalarmfiltergroup2').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup2 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup3submit').click(function(event) {
		var userfltgroup3 = [];
		$('#formalarmfiltergroup3 .ps-checkbox').each(function() {
			if($(this).hasClass('checked')) userfltgroup3.push($(this).attr('data-id'));
		});
		$.post('std.useralarmcfg.savefiltergroup3.req', {userfltgroup3:userfltgroup3}, function(data) {
			$('#formalarmfiltergroup3').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup3.req', {message:message}, function(data) {
				$('#formalarmfiltergroup3').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup4submit').click(function(event) {
		var userfltgroup4 = [];
		$('#formalarmfiltergroup4 .ps-checkbox').each(function() {
			if($(this).hasClass('checked')) userfltgroup4.push($(this).attr('data-id'));
		});
		$.post('std.useralarmcfg.savefiltergroup4.req', {userfltgroup4:userfltgroup4}, function(data) {
			$('#formalarmfiltergroup4').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup4.req', {message:message}, function(data) {
				$('#formalarmfiltergroup4').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup4 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup5submit').click(function(event) {
		var userfltgroup5 = [];
		$('#formalarmfiltergroup5 .ps-checkbox').each(function() {
			if($(this).hasClass('checked')) userfltgroup5.push($(this).attr('data-id'));
		});
		$.post('std.useralarmcfg.savefiltergroup5.req', {userfltgroup5:userfltgroup5}, function(data) {
			$('#formalarmfiltergroup5').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup5.req', {message:message}, function(data) {
				$('#formalarmfiltergroup5').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup5 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#alarmgroupssubmit').click(function(event) {
		var forpost = {
			'usegroup1': $('.usegroup1').hasClass('checked') ? 'True' : 'False',
			'usegroup2': $('.usegroup2').hasClass('checked') ? 'True' : 'False',
			'usegroup3': $('.usegroup3').hasClass('checked') ? 'True' : 'False',
			'usegroup4': $('.usegroup4').hasClass('checked') ? 'True' : 'False',
			'usegroup5': $('.usegroup5').hasClass('checked') ? 'True' : 'False',

			'namegroup1': $('.namegroup1').val() == '' ? 'default' : $('.namegroup1').val(),
			'namegroup2': $('.namegroup2').val() == '' ? 'default' : $('.namegroup2').val(),
			'namegroup3': $('.namegroup3').val() == '' ? 'default' : $('.namegroup3').val(),
			'namegroup4': $('.namegroup4').val() == '' ? 'default' : $('.namegroup4').val(),
			'namegroup5': $('.namegroup5').val() == '' ? 'default' : $('.namegroup5').val()
		};
		$.post('std.useralarmcfg.savegroups.req', forpost, function(data) {
			if(data == 'S_OK') {
				p.page.alert('<span class="pos">gespeichert</span>');
			} else {
				p.page.alert(data);
			}
		});
	});
	$('#filtertypedelete').click(function(event) {
		$.post('std.useralarmcfg.deletefiltertype.req', function(data) {
			$('#formalarmfiltertype').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltertype.req', {message:message}, function(data) {
				$('#formalarmfiltertype').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltertype .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroupdelete').click(function(event) {
		$.post('std.useralarmcfg.deletefiltergroup.req', function(data) {
			$('#formalarmfiltergroup').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup.req', {message:message}, function(data) {
				$('#formalarmfiltergroup').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup1delete').click(function(event) {
		$.post('std.useralarmcfg.deletefiltergroup1.req', function(data) {
			$('#formalarmfiltergroup1').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup1.req', {message:message}, function(data) {
				$('#formalarmfiltergroup1').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup1 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup2delete').click(function(event) {
		$.post('std.useralarmcfg.deletefiltergroup2.req', function(data) {
			$('#formalarmfiltergroup2').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup2.req', {message:message}, function(data) {
				$('#formalarmfiltergroup2').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup2 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup3delete').click(function(event) {
		$.post('std.useralarmcfg.deletefiltergroup3.req', function(data) {
			$('#formalarmfiltergroup3').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup3.req', {message:message}, function(data) {
				$('#formalarmfiltergroup3').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup3 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup4delete').click(function(event) {
		$.post('std.useralarmcfg.deletefiltergroup4.req', function(data) {
			$('#formalarmfiltergroup4').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup4.req', {message:message}, function(data) {
				$('#formalarmfiltergroup4').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup4 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	$('#filtergroup5delete').click(function(event) {
		$.post('std.useralarmcfg.deletefiltergroup5.req', function(data) {
			$('#formalarmfiltergroup5').addClass('ps-loading');
			var message = '';
			if(data == 'S_OK') {
				message = '<span class="pos">gespeichert, wird ab dem n&auml;chsten anmelden aktiv</span>';
			} else {
				message = data;
			}
			$.post('std.useralarmcfg.formfiltergroup5.req', {message:message}, function(data) {
				$('#formalarmfiltergroup5').html(data).removeClass('ps-loading');
				setTimeout(function() {
					$('#formalarmfiltergroup5 .pos').fadeOut();
				}, 2500);
			});
		});
	});
	p.getValues();
};
