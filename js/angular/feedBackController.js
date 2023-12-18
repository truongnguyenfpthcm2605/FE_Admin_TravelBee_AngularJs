app.controller(
  "feedBackController",
  function ($scope, $location, $http, $rootScope) {
    $scope.current = [];

    $scope.findAll = function () {
      $http
        .get($rootScope.url + "/api/v1/feedback/all", {
          headers: {
            Authorization: "Bearer " + $rootScope.token,
          },
        })
        .then(function (response) {
          console.log(response.data);
          $rootScope.feedbackParam = response.data;
          $scope.current = $rootScope.feedbackParam;
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    };
    $scope.findAll();
    console.log($scope.findAll());
    $scope.check = function (id) {
      alert(id);
    };
    $scope.content = "";
    $scope.submitForm = function (id, content) {
      $http
        .post(
          $rootScope.url +
          "/api/v1/feedback/reply" +
          "?id=" +
          id +
          "&content=" +
          content,
          $scope.feedback,

          {
            headers: {
              Authorization: "Bearer " + $rootScope.token,
            },
          }
        )
        .then((response) => {
          Swal.fire({
            title: "gửi Thành Công",
            width: 600,
            icon: "success",
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
                            rgba(0,0,123,0.4)
                            url("https://i.pinimg.com/originals/4e/bf/f3/4ebff34bb96f7d7b0c157d64bd116085.gif")
                            left top
                            no-repeat
                          `,
          });
          $location.path("/QuanLyPhanHoi");
        })

        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Thất Bại",
            text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
          });
        });
    };
  }
);
