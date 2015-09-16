'use strict';

app.controller('mainCtrl', function($translate, $translatePartialLoader,
		$scope, $http, $state) {
	$translatePartialLoader.addPart('home');
	$translate.refresh();

	$scope.sendEmail = function(contact) {
		if ($scope.contactForm.$valid) {
			$http({
				method : 'POST',
				url : 'contact-form.php',
				data : $.param(contact), // param method from jQuery
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).success(function(data) {
				console.log(data);
				$state.go("email-success");
			}).error(function(data, status, headers, config) {
				console.log("Failed to send email.");
			});
		}
	}
});