

var app = angular.module('MyApp', [
	'ngRoute',
	'HomeController'
	]);

app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'app/components/home/home.html', controller: 'HomeCtrl'});

  $routeProvider.otherwise('/');
});

