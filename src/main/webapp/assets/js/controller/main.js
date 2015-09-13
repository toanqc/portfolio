'use strict';

app.controller('mainCtrl', function($translate, $translatePartialLoader) {
	$translatePartialLoader.addPart('home');
	$translate.refresh();

	$.getScript("assets/js/portfolio.js");
});