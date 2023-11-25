app.config(function ($routeProvider) {
  $routeProvider
    .when("/main", {
      templateUrl: "./pages/main.html",
      controller: "mainController"
    })
    .when("/QuanLyPhanHoi", {
      templateUrl: "./pages/QuanLyPhanHoi.html",
    })
    .when("/profile", {
      templateUrl: "./pages/profile.html",
    })
    .when("/QuanLyVouCher", {
      templateUrl: "./pages/QuanLyVouCher.html",
      controller: "voucherController"
    })
    .when("/CRUDVoucher", {
      templateUrl: "./pages/CRUDVoucher.html",
      controller: "CRUDVoucherController"
    })

    .when("/CRUDVoucher/:id", {
      templateUrl: "./pages/CRUDVoucher.html",
      controller: "CRUDVoucherController"
    })
    .when("/login", {
      templateUrl: "./pages/sign-in.html",
      controller: "loginController"
    })
    .when('/hotel', {
      templateUrl: 'QLKhachSan.html'
    })
    .when('/account', {
      templateUrl: 'pages/account.html'
    })
    .when('/transport', {
      templateUrl: 'QLPhuongTien.html'
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
      redirectTo: "/login"
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
