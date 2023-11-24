app.config(function ($routeProvider) {
  $routeProvider
    .when("/main", {
      templateUrl: "./pages/main.html",
      controller: "mainController",
    })
    .when("/QuanLyPhanHoi", {
      templateUrl: "./pages/QuanLyPhanHoi.html",
      controller: "feedBackController",
    })
    .when("/profile", {
      templateUrl: "./pages/profile.html",
    })
    .when("/QuanLyVouCher", {
      templateUrl: "./pages/QuanLyVouCher.html",
      controller: "voucherController",
    })
    .when("/CRUDVoucher", {
      templateUrl: "./pages/CRUDVoucher.html",
      controller: "CRUDVoucherController",
    })

    .when("/CRUDVoucher/:id", {
      templateUrl: "./pages/CRUDVoucher.html",
      controller: "CRUDVoucherController",
    })
    .when("/login", {
      templateUrl: "./pages/sign-in.html",
      controller: "loginController",
    })
    .otherwise({
      redirectTo: "/login",
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
