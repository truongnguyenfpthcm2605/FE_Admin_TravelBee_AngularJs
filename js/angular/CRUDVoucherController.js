app.controller("CRUDVoucherController", function ($scope, $location, $http, $rootScope, $routeParams) {

    if ($routeParams.id) {
        $scope.voucher = $rootScope.voucherParam.find(function (voucher) {
            return voucher.id === $routeParams.id;
        });
        console.log($scope.voucher);
    } else {
        console.log("Không có tham số");
    }
    



    $scope.submitForm = function () {
        console.log($scope.voucher)
    };

})