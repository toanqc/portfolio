'use strict';

var app = angular.module('portfolio', [ 'ui.router', 'ngCookies',
		'pascalprecht.translate', 'ngMessages' ]);

app.config(function($translateProvider, $translatePartialLoaderProvider) {

	// Initialize angular-translate
	$translateProvider.useLoader('$translatePartialLoader', {
		urlTemplate : 'i18n/{part}_{lang}.json'
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.useLocalStorage();
	$translatePartialLoaderProvider.addPart('global');
	$translatePartialLoaderProvider.addPart('header-footer');

});

app.controller('appCtrl', function($scope, $translate) {
	$scope.changeLanguage = function(langKey) {
		$translate.use(langKey);
	};
});

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/');
	$urlRouterProvider.otherwise('404');

	$stateProvider.state('/', {
		url : '/',
		templateUrl : 'views/home.html'
	}).state('who-i-am', {
		url : '/who-i-am',
		templateUrl : 'views/who-i-am.html',
		controller : 'mainCtrl'
	}).state('what-i-do', {
		url : '/what-i-do',
		templateUrl : 'views/what-i-do.html',
		controller : 'mainCtrl'
	}).state('contact-me', {
		url : '/contact-me',
		templateUrl : 'views/contact-me.html',
		controller : 'mainCtrl'
	}).state('404', {
		url : '/404',
		templateUrl : 'views/errors/404.html'
	});
});

app.run(function($cookies, $rootScope, $state) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		var isAuthenticationRequired = toState.access
				&& toState.access.requiredLogin;

		var currentUser = $cookies.get('currentUser');
		if (currentUser) {
			$rootScope.currentUser = currentUser;
		}

		if (isAuthenticationRequired && currentUser === undefined) {
			event.preventDefault();
			$state.go('accounts-login');
		}
	});
});