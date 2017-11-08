var baseUrl = "http://localhost:8888/trackyourmayor/";

var myApp = angular.module('myApp', ['ngRoute', "angucomplete"]);

// config routes

myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/search.html',
				controller  : 'searchController'
			})
//            .when('/search', {
////				templateUrl : 'pages/search.html',
////				controller  : 'searchController'
////			})
            .when('/browse', {
				templateUrl : 'pages/browse.html',
				controller  : 'browseController'
			})
            .when('/record/:id/:all/:type', {
				templateUrl : 'pages/record.html',
				controller  : 'recordController'
			})
        .when('/record/:id/:all/:type/:cat', {
                    templateUrl : 'pages/record.html',
                    controller  : 'recordFilterController'
                })
            .when('/result/:status', {
                    templateUrl : 'pages/status_records.html',
                    controller  : 'recordStatusController'
                })
});





// Controllers

myApp.controller('searchController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function ($scope, $http, $location, $rootScope, $routeParams) {
		
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
//            console.log($scope.searchResult);
            
            $http.get(baseUrl + "api/search_results.php?id=" + $scope.selectedRecord.originalObject.id + "&section=" + $scope.selectedRecord.originalObject.type)
                    .then( function(data) {
               
                    $scope.searchResultsTitle = data.data[0];
                    $scope.searchResults = data.data;
                    $scope.searchType = $scope.selectedRecord.originalObject.type;
//                    console.log($scope.searchResults);
//                console.log($scope.searchResultsTitle);
//                console.log("Search Results");
                
                
                
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
//                    console.log($scope.promises);

                     });
    
        
    
    
    
    
        $scope.viewRecord = function (selectedRecord)  { 
               console.log($scope.selectedRecord); 
            
            $scope.searchResult = true;
            console.log($scope.searchResult);
            
            $http.get(baseUrl + "api/search_results.php?id=" + $scope.selectedRecord.originalObject.id + "&section=" + $scope.selectedRecord.originalObject.type)
                    .then( function(data) {
                    console.log("Search Results Title");
                    $scope.searchResultsTitle = data.data[0];
                    $scope.searchResults = data.data;
                    $scope.searchType = $scope.selectedRecord.originalObject.type;
//                    console.log($scope.searchResults);
                
                
                
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


myApp.controller('recordController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function ($scope, $http, $location, $rootScope, $routeParams) {
    
    console.log($rootScope.selectedFilter);
    
    
    console.log($scope.selectedFilter);
    
     $scope.recordType = $routeParams.type;
     $scope.mayorId = $routeParams.id;
     $scope.all = $routeParams.all;
    
    console.log($scope.recordType);
    console.log($scope.mayorId);
    console.log($scope.all);
    
   
        
        var url = baseUrl + "api/promise_records.php?id=" + $scope.mayorId + "&all=" + $scope.all + "&tracked=" + $scope.recordType;
    
   
        
        
    console.log(url);
    
        $http.get(url)
                    .then( function(data) {
                        
                        $scope.recordData = data.data; 
                        
            
                        console.log($scope.recordData);
            
                        $scope.cats = data.data.cats;
            
                
            
                       
                        
                    }); 
    
    
    $scope.selectFilter = function () { 
        
        $rootScope.selectedFilter = $scope.selectedFilter;
        console.log("will relocate");
        $scope.selectedFilter = $scope.selectedFilter;
        
        $location.url("record/" + $scope.mayorId + "/" + $scope.all + "/" + $scope.recordType + "/" + $scope.selectedFilter);
       
    
    }
    
    
    
    
        
	}]);



myApp.controller('recordFilterController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function ($scope, $http, $location, $rootScope, $routeParams) {
    
    console.log($rootScope.selectedFilter);
    
    
    console.log($scope.selectedFilter);
    
     $scope.recordType = $routeParams.type;
     $scope.mayorId = $routeParams.id;
     $scope.all = $routeParams.all;
    $scope.filter = $routeParams.cat;
    
    console.log($scope.recordType);
    console.log($scope.mayorId);
    console.log($scope.all);
    
    
        
        var url = baseUrl + "api/promise_records.php?id=" + $scope.mayorId + "&all=" + $scope.all + "&tracked=" + $scope.recordType + "&category=" + $scope.filter;
    
        
        
    console.log(url);
    
        $http.get(url)
                    .then( function(data) {
                        
                        $scope.recordData = data.data; 
                        
            
                        console.log($scope.recordData);
            
                        $scope.cats = data.data.cats;
            
                
            
                       
                        
                    }); 
    
    
    $scope.selectFilter = function () { 
        
        $rootScope.selectedFilter = $scope.selectedFilter;
        console.log("will relocate");
        $scope.selectedFilter = $scope.selectedFilter;
        
        $location.url("record/" + $scope.mayorId + "/" + $scope.all + "/" + $scope.recordType + "/" + $scope.selectedFilter);
       
    
    }
    
    
    
    
        
	}]);




myApp.controller('recordStatusController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function ($scope, $http, $location, $rootScope, $routeParams) {
    
   
     $scope.status = $routeParams.status;
     
    console.log($scope.status);

    
    
        
        var url = baseUrl + "api/promises_record_type.php?status=" + $scope.status;
    
        
        
   
    
        $http.get(url)
                    .then( function(data) {
                        
                        $scope.recordData = data.data; 
                        
            
                        console.log($scope.recordData);
            
                        $scope.cats = data.data.cats;
            
                
            
                       
                        
                    }); 
    
//    
//    $scope.selectFilter = function () { 
//        
//        $rootScope.selectedFilter = $scope.selectedFilter;
//        console.log("will relocate");
//        $scope.selectedFilter = $scope.selectedFilter;
//        
//        $location.url("record/" + $scope.mayorId + "/" + $scope.all + "/" + $scope.recordType + "/" + $scope.selectedFilter);
//       
//    
//    }
//    
//    
//    
//    
        
	}]);





