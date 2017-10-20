var baseUrl = "http://localhost:8888/trackyourmayor/";

var myApp = angular.module('myApp', ['ngRoute', "angucomplete"]);

// config routes

myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})
});





// Controllers

myApp.controller('mainController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
		
        
         $http.get(baseUrl + "api/search_data.php")
                .then( function(data) { 
            
                    $scope.search = data.data;
             console.log($scope.search);
//                   
                     });

       

        
	}]);
