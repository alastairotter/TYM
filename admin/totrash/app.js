var baseUrl = "http://localhost:8888/trackyourmayor/manage/"

var myApp = angular.module('myApp', ['ngCookies']);

myApp.controller('mainController', ['$scope', '$http','$cookies', function ($scope, $http, $cookies) {
    
    // defaults
    $scope.loggedIn = false;
    $scope.loginStatus = "Please log in";
    
    // Check login status

    var un = $cookies.get('username'),
        pw = $cookies.get('password');
    
    var auth = function (username, password) {
                
       $http.get(baseUrl + "api/auth.php?un=" + username + "&pw=" + password)
            .then( function(data) { 
           
                console.log(data);
           
                if(data.data === 1) { 
                    $scope.loggedIn = true;
                    $scope.loginStatus = "You are logged in";
                    
                }
                else { 
                    $scope.loggedIn = false;
                    
                }
            
            });

    } // End of auth function
    
    
    
    
    
    if(un && pw) { 
        
        auth(un,pw);

        
    }
    
//    $scope.hello = "Hello Brave World";
//    
//    $cookies.put('username', "RodgerDodger");
//    
//    console.log($cookies.get('username'));
//    
//    $scope.username = $cookies.get('username');
//    console.log($scope.username);
    
    
    
}]);


