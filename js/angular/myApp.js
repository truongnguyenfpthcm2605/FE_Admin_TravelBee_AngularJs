
app.config(function($routeProvider) {
  $routeProvider
    .when('/hotel', {
      templateUrl: 'QLKhachSan.html'   
    })
    .when('/account', {
      templateUrl: 'pages/account.html'
    })
    .when('/transport', {
      templateUrl: 'pages/transport.html'
    })
    .when('/crudTransport', {
      templateUrl: 'pages/CRUDQuanLyPhuongTien.html'
    })
    .when('/crudHotel', {
      templateUrl: 'pages/CRUDQuanLyKhachSan.html'
    })
    .when('/CRUDaccount', {
      templateUrl: 'pages/CRUDQuanLyTaiKhoan.html'
    })
    .when('/test', {
      templateUrl: 'pages/hotel.html'
    })
    .otherwise({
      redirectTo: '/test'
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

