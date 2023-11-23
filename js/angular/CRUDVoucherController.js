app.controller("CRUDVoucherController", function ($scope, $location, $http, $rootScope) {
    $scope.voucher ={
    }

    $scope.submitForm = function () {
       console.log($scope.voucher)
    };

})