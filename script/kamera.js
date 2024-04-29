/*<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.03.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 578                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: kamera.js 578 2024-03-22 21:53:46Z                       $ #
//#                                                                                 #
//###################################################################################
?> kamera */
p.page.load = function() {
	loadImages();
	window.setInterval(function() {
		loadImages();
	}, 2500);
	//p.getValues();
};
function loadImages() {
	$('.imgReload').each(function() {
		var src = 'kamera.' + $(this).attr('data-kamera') + '.t' + (new Date().getTime()) + '.req';
		$(this).parents('div:first').prepend($('<img class="imgReload" alt="" data-kamera="' + $(this).attr('data-kamera') + '" src="' + src + '" />'));
		$(this).delay(1000).fadeOut(500, function() { $(this).remove(); });
	});
}
