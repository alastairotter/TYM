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

        this.getFormData = function (section, $http, $scope) { 
                
                $http.get(baseUrl + "api/list.php?section=" + section)
                    .then( function(data) { 
                        
                    if(section === "municipalities") {     
                        $scope.municipalities = data.data; 
                    }
                    else if(section === "parties") { 
                        $scope.parties = data.data;
                    }
                    else if(section === "mayors") { 
                        $scope.mayors = data.data;
                    }
            
                    });
            
            } 

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
            
            if($scope.listSection === "mayors") { 
                $scope.sortCol = "name";
            }
        
            $scope.listOrder = function (col) { 
                $scope.sortCol = col;
                
            }
            
            // delete item 
            $scope.delete = function (id, section) { 
               
//                $scope.deleteDialog = true;
                $rootScope.deleteId = id; 
                $rootScope.deleteSection = section; 
                $location.url("staging");
                
            }
            
           
            
            
            // get list
            
            $http.get(baseUrl + "api/list.php?section=" + $scope.listSection)
                    .then( function(data) { 
                        $scope.listData = data.data;
                        console.log($scope.listData);
                       
                        
                    });
        
            
            

        }]);

        myApp.controller('addController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', '$routeParams', 'getData', function ($scope, $http, $cookies, auth, $location, $rootScope, $routeParams, getData) {

            $scope.name; 
            auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
            
            $scope.listSection = $routeParams.section; 
            
            getData.getFormData("municipalities", $http, $scope); 
            getData.getFormData("parties", $http, $scope);
            getData.getFormData("mayors", $http, $scope);
            
            $scope.party="placeholder";
        
            
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
            $scope.addParty = function(name, abbreviation) { 
                
                $http.get(baseUrl + "api/addparty.php?name=" + name + "&abbreviation=" + abbreviation)
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
            $scope.addPromise = function(mayor, promise, tracked) { 
                
                
                
                $http.get(baseUrl + "api/addpromise.php?mayor=" + mayor + "&promise=" + promise + "&tracked=" + tracked)
                        .then( function (response) { 
                            if(response.data === "success") { 
                                $location.url("list/promises");
                            }
                        });
                
                
            }
        
            
            

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
