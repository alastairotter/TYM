var baseUrl = "http://localhost:8888/trackyourmayor/admin/";
//var baseUrl = "https://dev.mediahack.co.za/trackyourmayor/admin/";
// create the module and name it myApp
	var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.run(['$rootScope',function($rootScope){
//    $rootScope.loggedIn = false;
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
            .when('/list/:section', {
				templateUrl : 'pages/list.html',
				controller  : 'listController'
			})
            .when('/add/:section', {
				templateUrl : 'pages/add.html',
				controller  : 'addController'
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

    myApp.controller('frontController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {

            auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
        
            $http.get(baseUrl + "api/list_front.php")
                .then( function (data) { 
                    
                    $scope.frontData = data.data;
                
                    })

        }]);

	myApp.controller('aboutController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
		
        auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
        
	}]);

	myApp.controller('contactController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
      
		auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
        
	}]);

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
            
            
            $scope.listSection = $routeParams.section; 
            
//            if($scope.listSection === "mayors") { 
//                $scope.sortCol = "name";
//            }
        
            //List Order
            $scope.sortDir = "asc";
        
            $scope.listOrder = function (col) { 
                if($scope.sortDir === "asc") {
                    $scope.sortDir = "desc";
                    $scope.sortCol = col;
                }
                else if($scope.sortDir === "desc") { 
                    $scope.sortDir = "asc";
                    $scope.sortCol = '-' + col; 
                }
                
                
            }
            
            $scope.clearFilter = function () { 
                $scope.listFilter = '';
            }
            
            $scope.filterList = function (filter) { 
                $scope.listFilter = filter; 
                console.log(filter);
            }
            
            // delete item 
            $scope.delete = function (id, section) { 
//                $scope.deleteDialog = true;
                $rootScope.deleteId = id; 
                $rootScope.deleteSection = section; 
                $location.url("staging");
                
            }
                  
            $http.get(baseUrl + "api/all_data.php")
                    .then( function(data) { 
                        $scope.promises = data.data.promises;
                        $scope.mayors = data.data.mayors; 
                        $scope.municipalities = data.data.municipalities; 
                        $scope.categories = data.data.categories;
                        $scope.parties = data.data.parties; 
                    });
        
            

        }]);

        myApp.controller('addController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', '$routeParams', 'getData', function ($scope, $http, $cookies, auth, $location, $rootScope, $routeParams, getData) {

            
            
            
            $scope.name; 
            auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
            
            $scope.promise; 
            $scope.party = {};
            
            $scope.listSection = $routeParams.section; 
            
            
            $http.get(baseUrl + "api/all_data.php")
                    .then( function(data) { 
                        $scope.promises = data.data.promises;
                        $scope.mayors = data.data.mayors; 
                        $scope.municipalities = data.data.municipalities; 
                        $scope.categories = data.data.categories;
                        $scope.parties = data.data.parties; 
                    });
            
//            $scope.party="placeholder";
        
            
//            Add Mayor
            $scope.addMayor = function(name, party, municipality) { 
                
                $http.get(baseUrl + "api/addmayor.php?name=" + name + "&party=" + party + "&municipality=" + municipality)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/mayors");
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
                                $location.url("list/parties");
                            }
                        });
                
                
            }
            
            
            // Add category
            $scope.addCategory = function(category) { 
                
                $http.get(baseUrl + "api/addcategory.php?category=" + category)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/categories");
                            }
                        });
                
                
            }
            
            
            // Add promise
            $scope.addPromise = function(promise) { 
                
                
                
                var str = jq.param( promise );
                
                
                
                $http.get(baseUrl + "api/addpromise.php?" + str)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/promises");
                            }
                        });
                
                
            }
            
            // jquery for datepicker
            
            $scope.clearDates = function () { 
                console.log("clearDates");
                document.getElementById("dueDate").value = "My value";
                $scope.dueDate = "My value";
                delete $scope.dueDate;
                $scope.dueDate = '';             
               
                //Remove the assigned value
                delete $scope.dueDate.value;
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
            
            $scope.newDate = function () { 
                console.log("New Date");
            }
            
            
            // file upload
            
//            $scope.uploadFiles = function(file, errFiles) {
//                $scope.f = file;
//                $scope.errFile = errFiles && errFiles[0];
//                if (file) {
//                    console.log(file);
//                    file.upload = Upload.upload({
//                        url: 'http://localhost:8888/trackyourmayor/admin/images',
//                        data: {file: file}
//                    });
//
//                    file.upload.then(function (response) {
//                        $timeout(function () {
//                            file.result = response.data;
//                        });
//                    }, function (response) {
//                        if (response.status > 0)
//                            $scope.errorMsg = response.status + ': ' + response.data;
//                    }, function (evt) {
//                        file.progress = Math.min(100, parseInt(100.0 * 
//                                                 evt.loaded / evt.total));
//                    });
//                }   
//            }
            
//             $scope.uploadfiles = document.querySelector('#uploadfiles');
//                    $scope.uploadfiles = function () {
//                        console.log("triggered")
//                    var files = this.files;
//                    for(var i=0; i<files.length; i++){
//                    uploadFile(this.files[i]); // call the function to upload the file
//                }
//            };
            
          
            

        }]);

        myApp.controller('stagingController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', '$routeParams', 'getData', function ($scope, $http, $cookies, auth, $location, $rootScope, $routeParams, getData) {
            
            $scope.deleteDialog = true;
          
            
             $scope.cancelDelete = function () { 
                $scope.deleteDialog = false;
                 $location.url("list/" + $rootScope.deleteSection);
                 
             }
             
             $scope.deleteItem = function () { 
                
                
                $http.get(baseUrl + "api/delete.php?section=" + $rootScope.deleteSection + "&id=" + $rootScope.deleteId)
                    .then( function(deletedata) { 
                        $scope.listData = deletedata.data;
                   
                        if(deletedata.data === "success") { 
                            $location.url("list/" + $rootScope.deleteSection);
                        }
                    });
             }
        
            
        }]);
