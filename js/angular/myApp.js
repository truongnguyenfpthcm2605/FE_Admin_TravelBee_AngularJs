var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/hotel', {
      templateUrl: './pages/hotel.html'   
    })
    .when('/account', {
      templateUrl: 'pages/account.html'
    })
    .when('/transport', {
      templateUrl: 'pages/transport.html'
    })
    .when('/crudHotel', {
      templateUrl: 'CRUDQuanLyKhachSan.html'
    })
    .when('/crudAccount', {
      templateUrl: 'CRUDQuanLyKhachSan.html'
    })
    .when('/crudHotel', {
      templateUrl: 'CRUDQuanLyKhachSan.html'
    })
    .otherwise({
      redirectTo: 'hotel'
    });
});

app.run(function ($rootScope) {
  $rootScope.$on("$routeChangeStart", function () {
    $rootScope.loading = true;
  });
  $rootScope.$on("$routeChangeSuccess", function () {
    $rootScope.loading = false;
  });
  $rootScope.$on("$routeChangeError", function () {
    $rootScope.loading = false;
    alert("loading Templet Errors");
  });
});

