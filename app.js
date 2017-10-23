var baseUrl = "http://localhost:8888/trackyourmayor/";

var myApp = angular.module('myApp', ['ngRoute', "angucomplete"]);

// config routes

myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/search', {
				templateUrl : 'pages/search.html',
				controller  : 'searchController'
			})
            .when('/browse', {
				templateUrl : 'pages/browse.html',
				controller  : 'browseController'
			})
});





// Controllers

myApp.controller('searchController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
		
    // get core data
    $http.get(baseUrl + "api/all_data.php")
                    .then( function(data) { 
                        $scope.promises = data.data.promises;
                        $scope.mayors = data.data.mayors; 
                        $scope.municipalities = data.data.municipalities; 
                        $scope.categories = data.data.categories;
                        $scope.parties = data.data.parties; 
                    });
    
    
    $scope.searchResult = false;
    $scope.view = { 
        name: "browseList"
    }
    
         $http.get(baseUrl + "api/search_data.php")
                .then( function(data) { 
            
                    $scope.search = data.data;

                     });
    
        // get promises
        $http.get(baseUrl + "api/promise_data.php")
                .then( function(data) { 
            
                    $scope.promises = data.data;
                    console.log($scope.promises);

                     });
    
        
    
    
    
    
        $scope.viewRecord = function (selectedRecord)  { 
               console.log($scope.selectedRecord); 
            
            $scope.searchResult = true;
            console.log($scope.searchResult);
            
            $http.get(baseUrl + "api/search_results.php?id=" + $scope.selectedRecord.originalObject.id + "&section=" + $scope.selectedRecord.originalObject.type)
                    .then( function(data) {
               
                    $scope.searchResultsTitle = data.data[0];
                    $scope.searchResults = data.data;
                    $scope.searchType = $scope.selectedRecord.originalObject.type;
//                    console.log($scope.searchResults);
                console.log($scope.searchResultsTitle);
                
            });
            
        }
        
        
        
        // sortTable headers
        $scope.sortTable = function () { 
            console.log("sortTable");
            $scope.tableFind = true; 
            
        }

       

        
	}]);


myApp.controller('browseController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
		
    // get core data
    $http.get(baseUrl + "api/all_data.php")
                    .then( function(data) { 
                        $scope.promises = data.data.promises;
                        $scope.mayors = data.data.mayors; 
                        $scope.municipalities = data.data.municipalities; 
                        $scope.categories = data.data.categories;
                        $scope.parties = data.data.parties; 
                    });
    
    
    $scope.searchResult = false;
    $scope.view = { 
        name: "browseList"
    }
    
         $http.get(baseUrl + "api/search_data.php")
                .then( function(data) { 
            
                    $scope.search = data.data;

                     });
    
        // get promises
        $http.get(baseUrl + "api/promise_data.php")
                .then( function(data) { 
            
                    $scope.promises = data.data;
                    console.log($scope.promises);

                     });
    
        
    
    
    
    
        $scope.viewRecord = function (selectedRecord)  { 
               console.log($scope.selectedRecord); 
            
            $scope.searchResult = true;
            console.log($scope.searchResult);
            
            $http.get(baseUrl + "api/search_results.php?id=" + $scope.selectedRecord.originalObject.id + "&section=" + $scope.selectedRecord.originalObject.type)
                    .then( function(data) {
               
                    $scope.searchResultsTitle = data.data[0];
                    $scope.searchResults = data.data;
                    $scope.searchType = $scope.selectedRecord.originalObject.type;
//                    console.log($scope.searchResults);
                console.log($scope.searchResultsTitle);
                
            });
            
        }
        
        
        
        // sortTable headers
//        $scope.sortTable = function () { 
//            console.log("sortTable");
//            $scope.tableFind = true; 
//            
//        }
        
        $scope.browseFilter = {  };
    
        $scope.sortHeader = function (header, section) { 
            if(section === "party") { 
                $scope.browseFilter.party_abbr = header;
            }
            if(section === "mayor") {
                $scope.browseFilter.mayor_name = header;
            }
            
            console.log($scope.browseFilter);
        }
    
    

       

        
	}]);