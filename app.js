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
		
    $scope.searchResult = false;     
    
         $http.get(baseUrl + "api/search_data.php")
                .then( function(data) { 
            
                    $scope.search = data.data;
//             console.log($scope.search);
//                   
                     });
    
    
        $scope.viewRecord = function (selectedRecord)  { 
               console.log($scope.selectedRecord); 
            
            $scope.searchResult = true;
            
            $http.get(baseUrl + "api/search_results.php?id=" + $scope.selectedRecord.originalObject.id + "&section=" + $scope.selectedRecord.originalObject.type)
                    .then( function(data) {
               
                    $scope.searchResultsTitle = data.data[0];
                    $scope.searchResults = data.data;
                    $scope.searchType = $scope.selectedRecord.originalObject.type;
//                    console.log($scope.searchResults);
                console.log($scope.searchResultsTitle);
                
            });
            
        }

       

        
	}]);
