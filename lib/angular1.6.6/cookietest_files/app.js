var myApp = angular.module('myApp', ['ngCookies']);

myApp.controller('mainController', ['$scope', '$http','$cookies', function ($scope, $http, $cookies) {
    
    $scope.hello = "Hello Brave World";
    
}]);


// angular.module('myApp', ['ngCookies']);
//    function CookieCtrl($scope, $cookieStore) {
//      $scope.lastVal = $cookieStore.get('tab');
//        
//        $cookieStore.username = 'alastairotter';
//        
//        var username = $cookieStore.username;
//        console.log(username);
//        
//        
//    }