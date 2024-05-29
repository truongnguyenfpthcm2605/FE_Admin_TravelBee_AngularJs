
angular.module('app').controller('themTourDuLich', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    // Your controller's code...
    // Controller logic

    $scope.s = ''
    $scope.headerText = "Thêm tour du lịch";



    let saveTour = document.getElementById('savetour').disabled = true
    var firebaseConfig = {
        apiKey: "AIzaSyBnSgLNQca9x6g5SFN8CU9YA1tBz5gGn6c",
        authDomain: "travel-bee-e0b59.firebaseapp.com",
        projectId: "travel-bee-e0b59",
        storageBucket: "travel-bee-e0b59.appspot.com",
        messagingSenderId: "991526403311",
        appId: "1:991526403311:web:24e7a3ba76e7d0d769af1a",
        measurementId: "G-DE29CFQQMY"
    };
    var config = firebase.initializeApp(firebaseConfig);
    $scope.image = ''
    document.getElementById('fileInputfb').onchange = function (e) {
        let files = e.target.files;
        Swal.fire({
            title: 'Please await!',
            text: 'Vui lòng đợi 5s để upload ảnh!',
            icon: 'warning',
            timer: 5000,
        });
        $scope.uploadfirebase(files)
        let saveTour = document.getElementById('savetour').disabled = false

    }



    $scope.uploadfirebase = function (files) {

        const ref = firebase.storage().ref();

        if (files.length === 0) {
            console.log("Vui lòng chọn ít nhất một tệp hình ảnh.");
            return;
        }

        const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const metadata = {
                contentType: file.type,
            };
            const name = file.name;
            const uploadIMG = ref.child(name).put(file, metadata);

            const promise = uploadIMG
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((url) => {
                    return url;
                });

            uploadPromises.push(promise);
        }

        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                list = downloadURLs;

                console.log(list.join(","))
                Swal.fire({
                    title: 'Success!',
                    text: 'Images uploaded successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })

            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to upload images: ' + error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }


    // Function to submit form
    $scope.submitForm = function () {
        var imagesString = list.join(",");
        var locationData = {
            title: $scope.title,
            description: $scope.description,
            price: $scope.price,
            location: $scope.location,
            images: imagesString,
            email: $rootScope.email
        };
        $http.post($rootScope.url + "/api/v1/tour/save", locationData, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
            .then(function (response) {
                localStorage.setItem('tourID',response.data.id)
                console.log('Data submitted successfully:', response.data);
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Thêm tour thành công',
                    icon: 'success'
                });
                document.getElementById("detail").style.display = "block";

            })
            .catch(function (error) {
                console.log(error)
            });

    }


    $scope.hotels = []
    $scope.transports = []
    $scope.locations = []

    $http.get($rootScope.url + "/api/v1/hotel/all")
        .then(function (response) {
            $scope.hotels = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    $http.get($rootScope.url + "/api/v1/transport/all")
        .then(function (response) {
            $scope.transports = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    $http.get($rootScope.url + "/api/v1/location/all")
        .then(function (response) {
            $scope.locations = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    $scope.tourdetail = {
        hotel: "",
        location: "",
        tour: Number(localStorage.getItem('tourID')),
        transport: "",
        description: ""
    }

   

    $scope.saveTourDetail = () => {
        console.log(localStorage.getItem('tourID'))
        $http.post($rootScope.url + "/api/v1/staff/tour-detail/save", $scope.tourdetail, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
            .then(function (response) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Thêm Tour Detail thành công',
                    icon: 'success'
                });
                document.getElementById("plantour").style.display = "block";

            })
            .catch(function (error) {
                console.log(error)
            });
    }


    $scope.plantour = {
        startDate: '',
        endDate: "",
        email: $rootScope.email,
        description: '',
        tourId: Number(localStorage.getItem('tourID'))
    }

    $scope.savePlantour = () => {
        $http.post($rootScope.url + "/api/v1/plant-tour/save", $scope.plantour, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
            .then(function (response) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Thêm Thời gian thành công',
                    icon: 'success'
                });
                $location.url("/QuanLyTour")

            })
            .catch(function (error) {
                console.log(error)
            });
    }

}]);

