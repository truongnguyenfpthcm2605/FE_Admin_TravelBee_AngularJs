app.controller("TaiKhoanController", function ($scope, $location, $http, $rootScope) {
    $scope.current = []
    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/account/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $rootScope.accountParam = response.data
            $scope.current = $rootScope.accountParam
            
            //test
            // console.log("đây là data chưa nạp",response.data);
            // const activeLocations = response.data;
            //  $scope.ls = activeLocations; 
            //  console.log("API Data Tour:", activeLocations);
             console.log("token Data:", $rootScope.token);
        })
            .catch(function (error) {
        });
    }
    $scope.findAll()


    $scope.searchKeyword = function (keyword) {
        const searchInput = keyword || '';
        $scope.current = $rootScope.accountParam.filter(function (account) {
            return account.id.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
                account.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
        });
    };
    $scope.exportExcel = function(){
        let table2excel = new Table2Excel();
        table2excel.export(document.querySelector("#table-account"),'Danh Sách account');
        console.log(table2excel)
    }
    $scope.removeElementById = function (id) {
        $rootScope.accountParam = $rootScope.accountParam.filter(function (item) {
            return item.id !== id;
        });
    };

    









})