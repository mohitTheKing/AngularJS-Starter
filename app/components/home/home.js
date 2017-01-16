

var app = angular.module('HomeController', []);

app.controller('HomeCtrl', ['$scope', function($scope){
	$scope.message = "Hello! This is a sample angular app";
}]);
