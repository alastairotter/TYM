var baseUrl = "http://localhost:8888/trackyourmayor/";

var myApp = angular.module('myApp', ['ngRoute', "angucomplete"]);

myApp.run(['$rootScope',function($rootScope){
    $rootScope.filtersOn = false;
    $rootScope.catFilter;
    $rootScope.statusFilter;
    $rootScope.startDate;
    $rootScope.endDate;
    
    
//    $rootScope.clearFilterOnChange = function ()  { 
//        
//                $rootScope.filtersOn = false; 
//                $rootScope.mayorFilter = "";
//                $rootScope.muniFilter = "";
//                $rootScope.catFilter = "";
//                $rootScope.statusFilter = "";
//                $rootScope.partyFilter = "";
//                $rootScope.trackedFilter = "";
//           
//
//    }
}]);


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
            .when('/browse/:page', {
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


var jq = $.noConflict();







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
        
        
        $scope.filterResults = function (status) { 
            console.log(status);
            $rootScope.statusFilter = status;
            $location.url("/browse/0");
        }

       

        
	}]);


//myApp.controller('browseController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
//		
//    // get core data
//    $http.get(baseUrl + "api/all_data.php")
//                    .then( function(data) { 
//                        $scope.promises = data.data.promises;
//                        $scope.mayors = data.data.mayors; 
//                        $scope.municipalities = data.data.municipalities; 
//                        $scope.categories = data.data.categories;
//                        $scope.parties = data.data.parties; 
//                    });
//    
//    
//    $scope.searchResult = false;
//    $scope.view = { 
//        name: "browseList"
//    }
//    
//         $http.get(baseUrl + "api/search_data.php")
//                .then( function(data) { 
//            
//                    $scope.search = data.data;
//
//                     });
//    
//        // get promises
//        $http.get(baseUrl + "api/promise_data.php")
//                .then( function(data) { 
//            
//                    $scope.promises = data.data;
////                    console.log($scope.promises);
//
//                     });
//    
//        
//    
//    
//    
//    
//        $scope.viewRecord = function (selectedRecord)  { 
//               console.log($scope.selectedRecord); 
//            
//            $scope.searchResult = true;
//            console.log($scope.searchResult);
//            
//            $http.get(baseUrl + "api/search_results.php?id=" + $scope.selectedRecord.originalObject.id + "&section=" + $scope.selectedRecord.originalObject.type)
//                    .then( function(data) {
//                    console.log("Search Results Title");
//                    $scope.searchResultsTitle = data.data[0];
//                    $scope.searchResults = data.data;
//                    $scope.searchType = $scope.selectedRecord.originalObject.type;
////                    console.log($scope.searchResults);
//                
//                
//                
//            });
//            
//        }
//        
//        
//        
//        // sortTable headers
////        $scope.sortTable = function () { 
////            console.log("sortTable");
////            $scope.tableFind = true; 
////            
////        }
//        
//        $scope.browseFilter = {  };
//    
//        $scope.sortHeader = function (header, section) { 
//            if(section === "party") { 
//                $scope.browseFilter.party_abbr = header;
//            }
//            if(section === "mayor") {
//                $scope.browseFilter.mayor_name = header;
//            }
//            
//            console.log($scope.browseFilter);
//        }
//    
//    
//
//       
//
//        
//	}]);



 myApp.controller('browseController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function ($scope, $http, $location, $rootScope, $routeParams) {

            

            $scope.prev = false; 
        
//            $scope.listSection = $routeParams.section; 
        
            
        
            $scope.page = $routeParams.page;
            $scope.pageDepth = 10;
            $scope.nextStart = +$scope.page + $scope.pageDepth;
            $scope.prevStart = +$scope.page - $scope.pageDepth; 
            if($scope.prevStart <0) { $scope.prevStart = 0; }
             if($scope.page > 0) { $scope.prev = true; }
            else if($scope.page == 0) { $scope.prev = false; }

        
            $scope.delete = function (id, section) { 
                $rootScope.deleteId = id; 
                $rootScope.deleteSection = section; 
                $location.url("staging");
                
            }
            
            $scope.clearFilters = function () { 
                $rootScope.filtersOn = false; 
                $rootScope.mayorFilter = "";
                $rootScope.muniFilter = "";
                $rootScope.catFilter = "";
                $rootScope.statusFilter = "";
                $rootScope.partyFilter = "";
                $rootScope.trackedFilter = "";
                console.log("clearing filters");
                $rootScope.startDate = "";
                $rootScope.endDate = "";
                console.log("cleared");
                document.getElementById("startDate").value = '';
                document.getElementById("endDate").value = '';
                
                
                
                $scope.getData();
                $location.url("/browse/0");
            }

            
            
            
                    $scope.listFilter = function (col, selected) {
                        
                        console.log(col);
                        console.log(selected);
                       
                        if(col === "mayor") { $rootScope.mayorFilter = selected; }
                        if(col === "municipality") { $rootScope.muniFilter = selected; }
                        if(col === "category") { $rootScope.catFilter = selected; }
                        if(col === "status") { $rootScope.statusFilter = selected; }
                        if(col === "party") { console.log(selected); $rootScope.partyFilter = selected; }
                        if(col === "tracked") { $rootScope.trackedFilter = selected; }
                        if(col === "date") { $rootScope.dateFilter = true; $rootScope.startDate = $scope.startDate; $rootScope.endDate = $scope.endDate; }
                        
                        
                        

                        $scope.getData();
                        $location.url("/browse/0");
                        
                    }
         

            
            $scope.getData = function () {
                
            if($scope.listSection == 'promises') { $rootScope.promisesList = true; }
                else { $rootScope.promisesList = false; }
                     
           $scope.fetchUrl = baseUrl + "api/all_data.php?start=" + $scope.page + "&count=" + $scope.pageDepth;
                
               
             
            
                
            if($scope.mayorFilter) {
                $rootScope.filtersOn = true;
                $scope.fetchUrl += "&mayor=" + $rootScope.mayorFilter; }
                
            if($scope.muniFilter) {
                $rootScope.filtersOn = true;
                $scope.fetchUrl += "&municipality=" + $rootScope.muniFilter; }
                
            if($scope.catFilter) {
                $rootScope.filtersOn = true;
                $scope.fetchUrl += "&category=" + $rootScope.catFilter; }
            
            if($scope.statusFilter) {
                $rootScope.filtersOn = true;
                $scope.fetchUrl += "&status=" + $rootScope.statusFilter; }
                
            if($scope.partyFilter) {
                $rootScope.filtersOn = true;
                $scope.fetchUrl += "&party=" + $rootScope.partyFilter; }
              
            if($scope.trackedFilter) {
                $rootScope.filtersOn = true;
                $scope.fetchUrl += "&tracked=" + $rootScope.trackedFilter; }
                
            if($scope.dateFilter) {
//                console.log("-------------------- Got Here --------------");
//                console.log("StartDate: " + $rootScope.startDate);
//                console.log("EndDate: " + $rootScope.endDate);
//                console.log("-------------------- Got Here --------------");
                $rootScope.filtersOn = true; 
                $scope.fetchUrl += "&startdate=" + $rootScope.startDate + "&enddate=" + $rootScope.endDate; 

            }
       
                
            console.log($scope.fetchUrl);
                
            $http.get($scope.fetchUrl)
                    .then( function(data) { 
                            
                        $scope.categories = data.data.categories;
                        $scope.mayors = data.data.mayors;
                        $scope.municipalities = data.data.municipalities;
                        $scope.statuses = data.data.statuses; 
                        $scope.parties = data.data.parties;
                        delete data.data['statuses'];
                        delete data.data['categories'];
                        delete data.data['mayors'];
                        delete data.data['municipalities'];
                        delete data.data['parties'];
                            $scope.data = data.data.promises;
                console.log($scope.data);
                console.log($scope.categories);
                
//                console.log($scope.data.promises);
//                console.log(data.data);
                        
//                        console.log("----------------------");
                        
//                        console.log($scope.data);
//                        console.log($scope.mayors);
//                        console.log($scope.parties);
                
//                        console.log("----------------------");

                     
                    });
                
            };
      
            $scope.getData();
        
        
        
        // DatePicker
        
        jq("document").ready( function () { 
            jq('#date-pick .input-group.date').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var ddate = document.getElementById("startDate").value;
                    $scope.startDate = ddate;
                    console.log($scope.startDate);
                
                
                });
                
            jq('#date-pick-2 .input-group.date').datepicker({
                format: "yyyy-mm-dd",
                
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var dmonth = document.getElementById("endDate").value;
                    $scope.endDate = dmonth;
                    console.log($scope.endDate);
                
                });                                 
                                                 
                
                
                
            });
        
            

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
    
    if($scope.all == 1) { $scope.listType = "all"; }
    if($scope.all == 0 && $scope.recordType === "Yes") { $scope.listType = "tracked"; }
    if($scope.all == 0 && $scope.recordType === "No") { $scope.listType = "untracked"; }
    
    console.log($scope.listType);
   
    
    var getData = function () { 
        
        var url = baseUrl + "api/promise_records.php?id=" + $scope.mayorId + "&all=" + $scope.all + "&tracked=" + $scope.recordType;
        
        if($rootScope.catFilter) { 
            url += "&category=" + $rootScope.catFilter; 
        }
        if($rootScope.statusFilter) { 
            url +="&status=" + $rootScope.statusFilter;
        }
        if($rootScope.dateFilter) { 
            url += "&startdate=" + $rootScope.startDate + "&enddate=" + $rootScope.endDate;
        }
    
        
    
        $http.get(url)
                    .then( function(data) {
                        
                        $scope.cats = data.data.cats;
                        $scope.stats = data.data.stats;
                        $scope.statuses = data.data.statuses; 
                        delete data.data.cats;
                        delete data.data.stats;
                        delete data.data.statuses;
            
                        $scope.recordData = data.data;
           
                        
            
            console.log($scope.recordData);
                        
                        
                    }); 
        
    }
    
    getData();
    
    $scope.clearFilters = function () { 
        
        $rootScope.filtersOn = false; 
//        $rootScope.mayorFilter = "";
//        $rootScope.muniFilter = "";
        $rootScope.catFilter = "";
        $rootScope.statusFilter = "";
//        $rootScope.partyFilter = "";
//        $rootScope.trackedFilter = "";
        $rootScope.startDate = '';
        $rootScope.endDate = '';
            document.getElementById("startDate").value = '';
            document.getElementById("endDate").value = '';
        
        getData();
    }
    
    
    $scope.selectFilter = function (col, selected) { 
        
        
        if(col === "category") { $rootScope.filtersOn = true; 
                                $rootScope.catFilter = selected; }
        if(col === "status") { $rootScope.filtersOn = true; 
                              if(selected === "Untracked") { $rootScope.statusFilter = " ";} 
                              else { $rootScope.statusFilter = selected; }
                             }
        if(col === "date") { $rootScope.filtersOn = true;
                             $rootScope.dateFilter = true; $rootScope.startDate = $scope.startDate; $rootScope.endDate = $scope.endDate; }
        
        
        
        getData();

    
    }
    
    
    
    // DatePicker
        
        jq("document").ready( function () { 
            jq('#date-pick .input-group.date').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var ddate = document.getElementById("startDate").value;
                    $scope.startDate = ddate;
                    console.log($scope.startDate);
                
                
                });
                
            jq('#date-pick-2 .input-group.date').datepicker({
                format: "yyyy-mm-dd",
                
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var dmonth = document.getElementById("endDate").value;
                    $scope.endDate = dmonth;
                    console.log($scope.endDate);
                
                });                                 
                                                 
                
                
                
            });
    
    
    
        
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
    
    if($scope.all == 1) { $scope.listType = "all"; }
    if($scope.all == 0 && $scope.recordType === "Yes") { $scope.listType = "tracked"; }
    if($scope.all == 0 && $scope.recordType === "No") { $scope.listType = "untracked"; }
    
    
        
        var url = baseUrl + "api/promise_records.php?id=" + $scope.mayorId + "&all=" + $scope.all + "&tracked=" + $scope.recordType + "&category=" + $scope.filter;
    
        
        
    console.log(url);
    
        $http.get(url)
                    .then( function(data) {
                        
                        $scope.recordData = data.data; 
                        
                        console.log($scope.recordData);
            
                        $scope.cats = data.data.cats;
                        $scope.stats = data.data.stats;
                        delete $scope.recordData.cats;
                        delete $scope.recordData.stats;
            
            console.log($scope.cats);
            
                
            
                       
                        
                    }); 
    
    
    $scope.selectFilter = function (col, selected) { 
        
//        $rootScope.selectedFilter = $scope.selectedFilter;
        $scope.selectedFilter = selected;
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
                        $scope.stats = data.data.stats;
                        delete data.data.cats;
                        delete data.data.stats;
            
                
            
                       
                        
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





