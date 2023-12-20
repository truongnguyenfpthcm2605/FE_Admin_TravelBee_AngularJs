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
             console.log("token Data:", $rootScope.token);
        })
            .catch(function (error) {
        });
    }
    $scope.findAll()

    $scope.deleteid = function (id) {
        Swal.fire({
            title: "Bạn có muốn xóa khách này ?",
            text: "sẽ không thể phục hồi lại được!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete($rootScope.url + "/api/v1/account/delete/" + id, {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Tài khoản đã được vô hiệu hóa thành công.",
                        icon: "success"
                    });
                    $scope.removeElementById(id)
                    $scope.current = $rootScope.accountParam
                })
                    .catch(function (error) {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'vô hiệu hóa thất bại',
                            text: 'kiểm tra lai dữ liệu',
                        });
                    });

            }
        });
    }
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