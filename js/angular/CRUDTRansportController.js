app.controller(
    "CRUDtransportController",
    function ($scope, $location, $http, $rootScope, $routeParams) {
      $scope.check = false;
      $scope.save = {};
      $scope.img =''
  
  
      if ($routeParams.id) {
        $scope.transport = $rootScope.transportParam.find(function (transport) {
          return transport.id === Number($routeParams.id);
        });
        $scope.img = $scope.transport.images.split(",")
        $scope.check = true;
  
       
      } else {
        $scope.transport = {};
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
      document.getElementById("imagetransport").onchange = function (e) {
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
  
      $scope.submit = function () {
        $scope.transport = {
          ...$scope.transport,
          email : $rootScope.email,
          images : $scope.img
         
        };
  
  
        if ($scope.check) {
          $http
            .put(
              $rootScope.url + "/api/v1/transport/update/" + $scope.transport.id,
              $scope.transport,
              {
                headers: {
                  Authorization: "Bearer " + $rootScope.token,
                },
              }
            )
            .then(function (response) {
              Swal.fire({
                icon: "success",
                title: "Cập nhật transport thành công",
                text: "Tuyệt vời!",
              });
              $location.url("/transport");
            })
            .catch(function (error) {
              Swal.fire({
                icon: "error",
                title: "Cập nhật transport thất bại",
                text: "kiểm tra lai dữ liệu",
              });
            });
        } else {
          $http
            .post($rootScope.url + "/api/v1/transport/save", $scope.transport, {
              headers: {
                Authorization: "Bearer " + $rootScope.token,
              },
            })
            .then(function (response) {
              Swal.fire({
                icon: "success",
                title: "Thêm transport thành công",
                text: "Tuyệt vời!",
              });
              $location.url("/transport");
            })
            .catch(function (error) {
              Swal.fire({
                icon: "error",
                title: "Thêm transport thất bại",
                text: "kiểm tra lai dữ liệu",
              });
            });
        }
      };
    }
  );
  