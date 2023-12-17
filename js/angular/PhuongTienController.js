app.controller("PhuongTienController", function ($scope, $location, $http, $rootScope) {
    $scope.current = []
    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/transport/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $rootScope.transport = response.data
            $scope.current = $rootScope.transport
            console.log($rootScope.transport)
        })
            .catch(function (error) {

            });

    }
    $scope.findAll()


    $scope.deleteid = function (id) {
        Swal.fire({
            title: "Bạn có muốn xóa phương tiện này ?",
            text: "sẽ không thể phục hồi lại được!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete($rootScope.url + "/api/v1/admin/transport/" + id, {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Phương tiện đã được delete thành công.",
                        icon: "success"
                    });
                    $scope.removeElementById(id)
                    $scope.current = $rootScope.voucherParam
                })
                    .catch(function (error) {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'xóa phương tiện thất bại',
                            text: 'kiểm tra lai dữ liệu',
                        });
                    });

            }
        });
    }

    $scope.searchKeyword = function (keyword) {
        const searchInput = keyword || '';
        $scope.current = $rootScope.voucherParam.filter(function (voucher) {
            return voucher.id.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
                voucher.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
        });
    };
    $scope.exportExcel = function () {
        let table2excel = new Table2Excel();
        table2excel.export(document.querySelector("#table-pt"), 'Danh Sách phương tiện');
    }
    $scope.removeElementById = function (id) {
        $rootScope.voucherParam = $rootScope.voucherParam.filter(function (item) {
            return item.id !== id;
        });
    };











})