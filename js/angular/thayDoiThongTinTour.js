angular.module('app').controller('thayDoiThongTinTour', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
  $scope.formData = {};
  var id = $location.search().id;

  $scope.loadLocationData = function () {
    var apiUrl = $rootScope.url+'/api/v1/tour/' + id; 
    $http({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Authorization': 'Bearer ' + $rootScope.token
      }
    })
      .then(function (response) {
        $scope.formData = response.data;
        delete $scope.formData.isActive;
        delete $scope.formData.views;
        if (response.data.account && response.data.account.email) {
          $scope.formData.email = response.data.account.email;
        }

      }, function (error) {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Đã xảy ra lỗi: ' + error.message,
          icon: 'error'
        });
      });
  };
  $scope.loadLocationData();
  $scope.updateLocation = function () {
    var apiUrl = $rootScope.url+'/api/v1/tour/update/' + $scope.formData.id;

    $http({
      method: 'PUT',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + $rootScope.token
      },
      data: $scope.formData
    })
      .then(function (response) {
        Swal.fire({
          title: 'Cập nhật thành công!',
          text: 'Bạn sẽ được đưa về trang chính sau 3s.',
          icon: 'success',
          timer: 3000,
          willClose: () => {
            $location.path('/QuanLyTour');
            $scope.$apply(); // Needed to trigger a digest cycle
          }
        });
      }, function (error) {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Đã xảy ra lỗi: ' + error.message,
          icon: 'error'
        });
       
      });
  };

}]);

