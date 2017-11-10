var baseUrl = "http://localhost:8888/trackyourmayor/admin/";
var baseImages = "http://localhost:8888/trackyourmayor/admin/images/";
//var baseUrl = "https://dev.mediahack.co.za/trackyourmayor/admin/";
// create the module and name it myApp
	var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.run(['$rootScope',function($rootScope){
    $rootScope.sortFilter;
    $rootScope.mayorFilter;
    $rootScope.muniFilter;
    $rootScope.catFilter;
    $rootScope.statusFilter;
    $rootScope.partyFilter;
    $rootScope.trackedFilter;
    $rootScope.filersOn = false;
    
    $rootScope.clearFilterOnChange = function ()  { 
        
                $rootScope.filtersOn = false; 
                $rootScope.mayorFilter = "";
                $rootScope.muniFilter = "";
                $rootScope.catFilter = "";
                $rootScope.statusFilter = "";
                $rootScope.partyFilter = "";
                $rootScope.trackedFilter = "";
           

    }
}]);

  myApp.service('auth', function () { 
      
      
  
        this.checkAuth = function($http, $location, $cookies, $scope, $rootScope) {
            
            
            
            var un = $cookies.get('username'),
                pw = $cookies.get('password'),
                fullname = $cookies.get('fullname');
            

            
            
            // if present
            if(un && pw) {
                
                
    
               $http.get(baseUrl + "api/auth.php?un=" + un + "&pw=" + pw)
                    .then( function(data) { 

                        if(data.data === 1) { 
                            $rootScope.loggedIn = true;
                            $rootScope.fullname = fullname;
//                            $scope.loginStatus = "You are logged in";

                        }
                        else { 
                        
                            $location.url("login");

                        }

                    });
                
            } // look up credentials
            else { 
                $location.url("login");
            }
                
        } // checkAuth

    }); // End of auth function


myApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});


// Add service to retrieve various options fo form fills
myApp.service('getData', function () { 

//        this.getFormData = function (section, $http, $scope) { 
//                
//                $http.get(baseUrl + "api/list.php?section=" + section)
//                    .then( function(data) { 
//                        
//                    if(section === "municipalities") {     
//                        $scope.municipalities = data.data; 
//                    }
//                    else if(section === "parties") { 
//                        $scope.parties = data.data;
//                    }
//                    else if(section === "mayors") { 
//                        $scope.mayors = data.data;
//                    }
//            
//                    });
//            
//            } 

})

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})
            // login page
            .when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
			})
            .when('/logout', {
				templateUrl : 'pages/logout.html',
				controller  : 'logoutController'
			})
            .when('/list/:section/:page', {
				templateUrl : 'pages/list.html',
				controller  : 'listController'
			})
            .when('/add/:section', {
				templateUrl : 'pages/add.html',
				controller  : 'addController'
			})
            .when('/edit/:section/:id', {
				templateUrl : 'pages/edit.html',
				controller  : 'editController'
			})
            .when('/staging', {
				templateUrl : 'pages/staging.html',
				controller  : 'stagingController'
			})
            .when('/front', {
				templateUrl : 'pages/front.html',
				controller  : 'frontController'
			});
	});


var jq = $.noConflict();

myApp.controller('navController', ['$scope', '$rootScope', function ($scope, $rootScope) {
//		$rootScope.loggedIn;      
	}]);

	// create the controller and inject Angular's $scope
	myApp.controller('mainController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
		
        auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
        
       

        
	}]);

//    myApp.controller('frontController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
//
//            auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
//        
//            $http.get(baseUrl + "api/list_front.php")
//                .then( function (data) { 
//                    
//                    $scope.frontData = data.data;
//                
//                    })
//
//        }]);

//	myApp.controller('aboutController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
//		
//        auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
//        
//	}]);

//	myApp.controller('contactController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
//      
//		auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
//        
//	}]);

    myApp.controller('loginController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
		
//        auth.checkAuth($http, $location, $cookies);
        
        
        
         $scope.loginSubmit = function () { 
            
            $http.get(baseUrl + "api/login.php?un=" + $scope.username + "&pw=" + $scope.password)
                    .then( function(data) { 

                        

                        if(data.data[0] === 1) { 
                            
                            $cookies.put("username", $scope.username);
                            $cookies.put("password", data.data[1]);
                            $cookies.put("fullname", data.data[2].first_name + " " + data.data[2].last_name);
                            $rootScope.fullname = data.data[2].first_name + " " + data.data[2].last_name;
                            $rootScope.loggedIn = true;
                            $location.url("/");
                            

                        }
                        else { 
                            $scope.loginError = true; 
                            $scope.username = '';
                            $scope.password = '';
                            $location.url("login");

                        }

                    });
            
        
        }
	}]);


    myApp.controller('logoutController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
		
        
        $cookies.remove("username");
        $cookies.remove("password");
        $cookies.remove('fullname');
        $rootScope.loggedIn = false;
        $rootScope.fullname = '';
        
        $location.url("login");
        

	}]);


    myApp.controller('listController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', '$routeParams', function ($scope, $http, $cookies, auth, $location, $rootScope, $routeParams) {

            auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
            

        
            $scope.prev = false; 
        
            $scope.listSection = $routeParams.section; 
        
            
        
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
                
                $scope.getData();
            }

            
            
            
                    $scope.listFilter = function (col, selected) {
                       
                        if(col === "mayor") { $rootScope.mayorFilter = selected; }
                        if(col === "municipality") { $rootScope.muniFilter = selected; }
                        if(col === "category") { $rootScope.catFilter = selected; }
                        if(col === "status") { $rootScope.statusFilter = selected; }
                        if(col === "party") { console.log(selected); $rootScope.partyFilter = selected; }
                        if(col === "tracked") { $rootScope.trackedFilter = selected; }
                        

                        $scope.getData();
                    }
         

            
            $scope.getData = function () {
                
            if($scope.listSection == 'promises') { $rootScope.promisesList = true; }
                else { $rootScope.promisesList = false; }
                     
           $scope.fetchUrl = baseUrl + "api/all_data.php?section=" + $scope.listSection + "&start=" + $scope.page + "&count=" + $scope.pageDepth;
                
               
             
            
                
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
                            $scope.data = data.data;
                        
                        console.log("----------------------");
                        
                        console.log($scope.data);
                        console.log($scope.mayors);
                        console.log($scope.parties);
                
                        console.log("----------------------");

                     
                    });
                
            };
      
            $scope.getData();
        
            

        }]);

        myApp.controller('addController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', '$routeParams', 'getData', function ($scope, $http, $cookies, auth, $location, $rootScope, $routeParams, getData) {

            
            
            
            
            $scope.name; 
            auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
            
            $scope.promise = {}; 
            $scope.party = {};
            $scope.mayor = {};
            
            $scope.listSection = $routeParams.section; 
            
            
            $http.get(baseUrl + "api/core_data.php")
                    .then( function(data) { 
                        console.log(data);
                        $scope.promises = data.data.promises;
                        $scope.mayors = data.data.mayors; 
                        $scope.municipalities = data.data.municipalities; 
                        $scope.categories = data.data.categories;
                        $scope.parties = data.data.parties; 
                
                
                    });
            
        
            
//            Add Mayor
            $scope.addMayor = function(mayor) { 
                var str = jq.param( mayor );
                console.log(str);
                
                $http.get(baseUrl + "api/addmayor.php?" + str)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/mayors/0");
                            }
                        });
                
                
            }
            
            // Add party            

            $scope.addParty = function(party) {
                
                var str = jq.param( party );
            
                console.log(str);
                
                $http.get(baseUrl + "api/addparty.php?" + str)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/parties/0");
                            }
                        });
                
                
            }
            
            
            // Add category
            $scope.addCategory = function(category) { 
                
                $http.get(baseUrl + "api/addcategory.php?category=" + category)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/categories/0");
                            }
                        });
                
                
            }
            
            
            // Add promise
            $scope.addPromise = function(promise) { 
                
                
                
                var str = jq.param( promise );
                console.log("---------------------------" + str);
                
                
                
                $http.get(baseUrl + "api/addpromise.php?" + str)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/promises/0");
                            }
                        });
                
                
            }
            

            
            // jquery for datepicker
            
            $scope.clearDates = function () { 
                
                document.getElementById("dueDate").value = "";
                document.getElementById("dueMonth").value = "";
                $scope.promise.dateDue = '';
                $scope.promise.monthDue = '';

            }
            
//            $scope.dueDate = " ";
//            $scope.dueMonth = " ";
            
            jq("document").ready( function () { 
            jq('#date-pick .input-group.date').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var ddate = document.getElementById("dueDate").value;
                    $scope.dueDate = ddate;
                    console.log($scope.dueDate);
                
                
                });
                
            jq('#date-pick-2 .input-group.date').datepicker({
                format: "yyyy-mm",
                startView: 1,
                minViewMode: 1,
                maxViewMode: 2,
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var dmonth = document.getElementById("dueMonth").value;
                    $scope.dueMonth = dmonth;
                    console.log($scope.dueMonth);
                
                });                                 
                                                 
                
                
                
            });

            
            // Set watches for due dates
            
//            $scope.newDate = function () { 
//                console.log("New Date");
//            }
//            
            
          
          
            

        }]);



        myApp.controller('editController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', '$routeParams', 'getData', function ($scope, $http, $cookies, auth, $location, $rootScope, $routeParams, getData) {
            
           
            $scope.name; 
            auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
            
             $scope.listSection = $routeParams.section; 
             $scope.editId = $routeParams.id;
            
            
            
            // jquery for datepicker
            
             $scope.clearDates = function () { 
                console.log("clearDates");
                document.getElementById("dueDate").value = "";
                document.getElementById("dueMonth").value = "";
                $scope.promise.dateDue = '';
                $scope.promise.monthDue = '';

            }
            
//            $scope.dueDate = " ";
//            $scope.dueMonth = " ";
            
            jq("document").ready( function () { 
            jq('#date-pick .input-group.date').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var ddate = document.getElementById("dueDate").value;
                    $scope.dueDate = ddate;
                    console.log($scope.dueDate);
                
                });
                
            jq('#date-pick-2 .input-group.date').datepicker({
                format: "yyyy-mm",
                startView: 1,
                minViewMode: 1,
                maxViewMode: 2,
                autoclose: true,
                clearBtn: true
                }).on("changeDate", function (e) { 
                    var dmonth = document.getElementById("dueMonth").value;
                    $scope.dueMonth = dmonth;
                    console.log($scope.dueMonth);
                
                });                                 
                                                 
                
                
                
            });
            
            
            
            $http.get(baseUrl + "api/core_data.php")
                    .then( function(data) { 
                        $scope.promises = data.data.promises;
                        $scope.mayors = data.data.mayors; 
                        $scope.municipalities = data.data.municipalities; 
                        $scope.categories = data.data.categories;
                        $scope.parties = data.data.parties; 
                    });
            
            console.log($scope.listSection);
            console.log($scope.editId);
            
            // get record
            $http.get(baseUrl + "api/get_record.php?section=" + $scope.listSection + "&id=" + $scope.editId)
                        .then( function (response) { 

                            if($scope.listSection === "mayors") { $scope.mayor = response.data[0]; }
                            else if($scope.listSection === "parties") { $scope.party = response.data[0]; }
                            else if($scope.listSection === "categories") { $scope.category = response.data[0]; }
                            else if($scope.listSection === "promises") { $scope.promise = response.data[0]; }
                        });
            
            
            //update
            
            $scope.updateMayor = function (mayor) { 
                  
                
                var str = jq.param( mayor );
                
                
                $http.get(baseUrl + "api/update_mayor.php?" + str)
                    .then( function(data) { 
                        if(data.data === "success") { 
                            
                            $location.url("list/mayors/0");
                            
                        }
                    }); 
                
                
            }
            
            
            
            $scope.updateParty = function (party) { 
                  
                
                var str = jq.param( party );
                
                
                $http.get(baseUrl + "api/update_party.php?" + str)
                    .then( function(data) { 
                        if(data.data === "success") { 
                            
                            $location.url("list/parties/0");
                            
                        }
                    }); 
                
                
            }
            
            
            
            
            $scope.updateCategory = function (category) { 
                  
                
                var str = jq.param( category );
               
                
                $http.get(baseUrl + "api/update_category.php?" + str)
                    .then( function(data) { 
                        if(data.data === "success") { 
                            
                            $location.url("list/categories/0");
                            
                        }
                    }); 
                
                
            }
            
            
            $scope.updatePromise = function (promise) { 
                  
                
                var str = jq.param( promise );
                
                
                $http.get(baseUrl + "api/update_promise.php?" + str)
                    .then( function(data) { 
                        if(data.data === "success") { 
                            
                            $location.url("list/promises/0");
                            
                        }
                    }); 
                
                
            }



            
            
            
        }]);










        myApp.controller('stagingController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', '$routeParams', 'getData', function ($scope, $http, $cookies, auth, $location, $rootScope, $routeParams, getData) {
            
            $scope.deleteDialog = true;
          
            
             $scope.cancelDelete = function () { 
                $scope.deleteDialog = false;
                 $location.url("list/" + $rootScope.deleteSection + "/0");
                 
             }
             
             $scope.deleteItem = function () { 
                
                
                $http.get(baseUrl + "api/delete.php?section=" + $rootScope.deleteSection + "&id=" + $rootScope.deleteId)
                    .then( function(deletedata) { 
                        $scope.listData = deletedata.data;
                   
                        if(deletedata.data === "success") { 
                            $location.url("list/" + $rootScope.deleteSection + "/0");
                        }
                    });
             }
        
            
        }]);
