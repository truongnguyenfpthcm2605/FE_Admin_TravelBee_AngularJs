app.controller(
  "CRUDKhachSanController",
  function ($scope, $location, $http, $rootScope, $routeParams) {
    $scope.check = false;
    $scope.save = {};
    $scope.img =''


    if ($routeParams.id) {
      $scope.hotel = $rootScope.hotelParam.find(function (hotel) {
        return hotel.id === Number($routeParams.id);
      });
      $scope.img = $scope.hotel.images.split(",")
      $scope.check = true;

     
    } else {
      $scope.hotel = {};
    }
    document.getElementById("save").disabled = true;

    var firebaseConfig = {
      apiKey: "AIzaSyBnSgLNQca9x6g5SFN8CU9YA1tBz5gGn6c",
      authDomain: "travel-bee-e0b59.firebaseapp.com",
      projectId: "travel-bee-e0b59",
      storageBucket: "travel-bee-e0b59.appspot.com",
      messagingSenderId: "991526403311",
      appId: "1:991526403311:web:24e7a3ba76e7d0d769af1a",
      measurementId: "G-DE29CFQQMY",
    };
    var config = firebase.initializeApp(firebaseConfig);
    $scope.image = "";
    document.getElementById("imagehotel").onchange = function (e) {
      let files = e.target.files;
      $scope.uploadfirebase(files);
    };

    $scope.uploadfirebase = function (files) {
      const ref = firebase.storage().ref();

      if (files.length === 0) {
        alert("Vui lòng chọn ít nhất một tệp hình ảnh.");
        return;
      }

      Swal.fire({
        title: "Vui lòng đợi upload ảnh!",
        text: "Có thể mấy khoản 3s - 5s.",
        icon: "warning",
        timer: 3000,
      });

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

          $scope.img = list.join(",")

          let html = document.getElementById('img');
          let imagesHTML = '';
          
          list.forEach(e => {
              let img = `<img src="${e}" style="width: 200px; border-radius: 10px;" alt="">`;
              imagesHTML += img;
          });
          
          html.innerHTML = imagesHTML;
          
          Swal.fire({
            title: "Success!",
            text: "Upload image thành công",
            icon: "success",
            confirmButtonText: "OK",
          });

          document.getElementById("save").disabled = false;
        })

        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Failed to upload images: " + error,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    };

    $scope.submitForm = function () {
      $scope.hotel = {
        ...$scope.hotel,
        email : $rootScope.email,
        images : $scope.img
       
      };


      if ($scope.check) {
        $http
          .put(
            $rootScope.url + "/api/v1/hotel/update/" + $scope.hotel.id,
            $scope.hotel,
            {
              headers: {
                Authorization: "Bearer " + $rootScope.token,
              },
            }
          )
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Cập nhật hotel thành công",
              text: "Tuyệt vời!",
            });
            $location.url("/hotel");
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Cập nhật hotel thất bại",
              text: "kiểm tra lai dữ liệu",
            });
          });
      } else {
        $http
          .post($rootScope.url + "/api/v1/hotel/save", $scope.hotel, {
            headers: {
              Authorization: "Bearer " + $rootScope.token,
            },
          })
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Thêm hotel thành công",
              text: "Tuyệt vời!",
            });
            $location.url("/hotel");
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Thêm hotel thất bại",
              text: "kiểm tra lai dữ liệu",
            });
          });
      }
    };
  }
);
