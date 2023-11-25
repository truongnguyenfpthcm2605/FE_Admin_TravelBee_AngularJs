app.controller("voucherController", function ($scope, $location, $http, $rootScope) {
    $scope.current = []
    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/staff/voucher/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $rootScope.voucherParam = response.data
            $scope.current = $rootScope.voucherParam
        })
        .catch(function (error) {
                console.error('Error:', error);
        });
    }
    $scope.findAll()

    $scope.check = function(id){
        alert(id)
    }

    $scope.searchKeyword = function (keyword) {
        const searchInput = keyword || '';
        $scope.current = $rootScope.voucherParam.filter(function (voucher) {
            return voucher.id.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
                voucher.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
        });
    };








})