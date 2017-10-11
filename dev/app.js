var baseUrl = "http://localhost:8888/trackyourmayor/manage/";	
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
            
            console.log(fullname);
            
            
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
			});
	});


myApp.controller('navController', ['$scope', '$rootScope', function ($scope, $rootScope) {
//		$rootScope.loggedIn;      
	}]);

	// create the controller and inject Angular's $scope
	myApp.controller('mainController', ['$scope', '$http','$cookies', 'auth', '$location', '$rootScope', function ($scope, $http, $cookies, auth, $location, $rootScope) {
		console.log($scope.loggedIn);
//        $scope.loggedIn = false;
//        $scope.loginError = false;
        auth.checkAuth($http, $location, $cookies, $scope, $rootScope);
        
       

        
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
                            console.log(data);
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