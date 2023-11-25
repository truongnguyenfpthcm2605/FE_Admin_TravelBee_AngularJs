app.controller("CRUDVoucherController", function ($scope, $location, $http, $rootScope, $routeParams) {
    $scope.check = false
    $scope.image = 'https://s3.amazonaws.com/thumbnails.venngage.com/template/5456834b-ba95-41a9-85b2-4abd4d313c11.png'
    if ($routeParams.id) {
        $scope.voucher = $rootScope.voucherParam.find(function (voucher) {
            return voucher.id === $routeParams.id;
        });
        $scope.check = true
    } else {
        $scope.voucher = {}
    }

    $scope.submitForm = function () {
        $scope.voucher.image = $scope.image
        $scope.email = $rootScope.email
        console.log($scope.voucher)
        $http.post($rootScope.url + "/api/v1/staff/voucher/save", $scope.voucher,
            {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.token
                }
            }).then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm voucher thành công',
                    text: 'Tuyệt vời!',
                });
                $location.url("/QuanLyVouCher")
            })
            .catch(function (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Thêm voucher thất bại',
                    text: 'kiểm tra lai dữ liệu',
                });
            });
    };

    let review = document.getElementsByClassName('review')
    document.getElementById('fileInputfb').onchange = function (e) {
        if (e.target.files.length > 0) {
            let fileType = e.target.files[0].type;

            if (fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/jpg') {
                alert('Chỉ chấp nhận file ảnh có định dạng .png hoặc .jpg');
                e.target.value = '';
                return;
            }
            let reader = new FileReader();
            reader.onload = function (event) {
                // review.src = event.target.result;
                $scope.uploadfirebase(e.target.files[0]);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            if (review) {
                review.src = 'https://s3.amazonaws.com/thumbnails.venngage.com/template/5456834b-ba95-41a9-85b2-4abd4d313c11.png';
                $scope.image = review.src;
            }
        }
    };

    $scope.uploadfirebase = function (file) {
        const ref = firebase.storage().ref();
        const files = file;
        const metadata = {
            contentType: files.type,
        };
        const name = files.name;
        const uploadIMG = ref.child(name).put(files, metadata);
        return uploadIMG.then((snapshot) => snapshot.ref.getDownloadURL())
            .then((url) => {
                $scope.image = url;
                console.log($scope.image)
                return url;
            });
    };



})