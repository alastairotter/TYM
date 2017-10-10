var baseUrl = "http://localhost:8888/trackyourmayor/manage/"

var myApp = angular.module('myApp', ['ngCookies']);

myApp.controller('mainController', ['$scope', '$http','$cookies', function ($scope, $http, $cookies) {
    
    // Check login status
    
    var un = $cookies.get('username'),
        pw = $cookies.get('password');
    
    
    $http.get(baseUrl + "api/auth.php")
            .then( function(data) { 
            
                $scope.accounts = data;
                console.log(data);
            
            });
    
    var auth = function () {
        
        
        
        
    }
    
    auth();
    
    if(un && pw) { 
        console.log(un);
        console.log(pw);
        
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


