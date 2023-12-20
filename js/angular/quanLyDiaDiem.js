app.controller("quanlydiadiemController", function ($scope, $location, $http, $rootScope, $cookies) {
    $scope.ls = [];

    // Fetch locations
    $scope.fetchLocations = function() {
        $http.get($rootScope.url + "/api/v1/location/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
            
        })
        .then(response => {
            console.log(response.data);
            activeLocations = response.data.filter(l => l.isactive);
             $scope.ls = response.data; 
             console.log("API Data:", activeLocations);
             console.log("token Data:", $rootScope.token);
        })
        .catch(error => {
            console.error('Error fetching locations:', error);
        });
    }

    // Call fetchLocations when the controller is loaded
    $scope.fetchLocations();

    // Delete location function
    $scope.deleteLocation = function(locationId) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this location?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                console.log('Attempting to delete location with ID:', locationId);
                $http.delete($rootScope.url + '/api/v1/location/delete/' + locationId, {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                })
                .then(function(response) {
                    console.log('Location deleted successfully');
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The location has been successfully deleted.'
                    });
                    $scope.fetchLocations(); // Refresh the list of locations
                })
                .catch(function(error) {
                    console.error('Error deleting location:', error);
                    if (error.status === 401 || error.status === 403) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Authentication Failed',
                            text: 'Your session has expired. Please log in again.'
                        });
                        $location.path('/login');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error Deleting Location',
                            text: 'An error occurred while attempting to delete the location. Please try again.'
                        });
                    }
                });
            }
        });
    };
    $scope.Edit = function(id) {
        console.log("id is  " + id);
        $location.path('/UpdateLoation');
        $location.search({id: id}); 
      }
    
}


);
