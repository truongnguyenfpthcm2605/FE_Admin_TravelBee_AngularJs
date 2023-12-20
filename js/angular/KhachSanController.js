app.controller("KhachSanController", function ($scope, $location, $http, $rootScope) {
    $scope.current = []
    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/hotel/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $rootScope.hotel = response.data
            $scope.current = $rootScope.hotel
            console.log($rootScope.hotel)
        })
            .catch(function (error) {

            });

    }
    $scope.findAll()

    $scope.save = function () {
        alert("hello")
        Swal.fire({
            title: "Bạn có muốn lưu khách sạn này ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, save it!"
        })
        .then((result) => {
            if (result.isConfirmed) {
                $http.delete($rootScope.url + "/api/v1/hotel/save", {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Khách sạn đã được lưu thành công.",
                        icon: "success"
                    });
                    // $scope.removeElementById(id)
                    // $scope.current = $rootScope.hotel
                    $scope.findAll()
                })
                    .catch(function (error) {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'thêm khách sạn thất bại',
                            text: 'kiểm tra lai dữ liệu',
                        });
                    });

            }
        });
    }
    $scope.updateid = function (id) {
        Swal.fire({
            title: "Bạn có muốn chỉnh sửa khách sạn này ?",
            text: "sẽ không thể phục hồi lại được!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete($rootScope.url + "/api/v1/hotel/update/" + id, {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Khách sạn đã được update thành công.",
                        icon: "success"
                    });
                    $scope.removeElementById(id)
                    $scope.current = $rootScope.hotel
                    $scope.findAll()
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
    $scope.deleteid = function (id) {
        Swal.fire({
            title: "Bạn có muốn xóa khách sạn này ?",
            text: "sẽ không thể phục hồi lại được!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete($rootScope.url + "/api/v1/hotel/delete/" + id, {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Khách sạn đã được delete thành công.",
                        icon: "success"
                    });
                    $scope.removeElementById(id)
                    $scope.current = $rootScope.hotel
                    $scope.findAll()
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