app.controller("voucherController", function ($scope, $location, $http, $rootScope) {
    $scope.vouchers =[]
    $scope.findAll = function(){
        $http.get($rootScope.url + "/api/v1/staff/voucher/all",{
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $scope.vouchers = response.data
            console.log($scope.vouchers)
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    }

    
    $scope.searchKeyword = function (keyword) {
        return $scope.vouchers.filter(function (voucher) {
            let result =[]
            if(voucher.id === keyword || voucher.title === keyword){
                result.push(voucher)
            }
            return result;
        });
    };

    console.log($scope.searchKeyword('D4G73B9G'))
    
    $scope.findAll()
})