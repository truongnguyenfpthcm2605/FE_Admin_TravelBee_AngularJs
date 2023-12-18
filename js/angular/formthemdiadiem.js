angular.module('app').controller('test123', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    // Your controller's code...
    // Controller logic

    $scope.s = ''
    let uploadPromises = [];
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
        $scope.uploadfirebase(files)




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
            })

            .catch((error) => {
                console.error("Lỗi khi tải lên hình ảnh: " + error);
            });
    }


    // Function to submit form
    $scope.submitForm = function () {
        // Assuming you have model bindings for these fields in your form
        var locationData = {
            title: $scope.title,
            address: $scope.address,
            description: $scope.description,
            images: list, // Array of image URLs from Firebase
            latitude: $scope.latitude,
            longitude: $scope.longitude,
            email: $scope.email // Assuming you have the user's email
        };

        // Log data to console in JSON format
        console.log('Submitting the following data:', JSON.stringify(locationData, null, 2));


        $http.post('http://localhost:8080/api/v1/location/save', locationData, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
        .then(function(response) {
            console.log('Data submitted successfully:', response.data);
            // Add any success notification or actions here
        })
        .catch(function(error) {
            console.error('Error submitting data:', error);
            // Add error handling logic here, possibly similar to quanlydiadiemController
        });
}}]);

