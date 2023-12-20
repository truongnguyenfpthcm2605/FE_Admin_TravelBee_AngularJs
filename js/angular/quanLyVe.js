console.log("đây là quản lý vé");
app.controller("quanLyVe", function ($scope, $location, $http, $rootScope, $cookies, $timeout) {
    $scope.ls = [];
    $scope.Ticket = [];
    // Fetch locations
    $scope.fetchLocations = function () {
        console.log("đây là token " + $rootScope.token)
        $http.get($rootScope.url + "/api/v1/tour/plantour/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }

        })
            .then(response => {
                console.log("đây là data chưa nạp", response.data);
                const activeLocations = response.data;
                $scope.ls = activeLocations;
                // $rootScope.locations = response.data;
                // $scope.ls = $rootScope.locations;
                console.log("API Data Tour:", activeLocations);
                console.log("token Data:", $rootScope.token);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }

    $scope.fetchticket = function () {
        console.log("đây là token " + $rootScope.token)
        $http.get($rootScope.url + "/api/v1/orders/all", {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cnVvbmdudnBzMjQwODNAZnB0LmVkdS52biIsImlhdCI6MTcwMzA2NjgyNiwiZXhwIjoxNzAzMTUwODI2fQ.wka6D8JaqQ43WS_w9HtmJz8CcGye68BogjJolO0DaDI'
            }

        })
            .then(response => {
                console.log("đây là data chưa nạp", response.data);
                const tickets = response.data;
                console.log("bdqjqwjeq::  ", tickets);
                const plantour1Tickets = tickets.filter(ticket => {
                    return ticket.plantour.id === 1; // Change this line
                });
                $scope.tickets = plantour1Tickets;
                console.log("API Data Ticketfdhd:",  $scope.tickets);
                console.log("token Data:", $rootScope.token);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }



    // Call fetchLocations when the controller is loaded
    $scope.fetchLocations();

    // $scope.fetchticket();


    // Delete location function
    $scope.deleteLocation = function (locationId) {
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
                    .then(function (response) {
                        console.log('Location deleted successfully');
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The location has been successfully deleted.'
                        });
                        $scope.fetchLocations(); // Refresh the list of locations
                    })
                    .catch(function (error) {
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
    $scope.Edit = function (id) {
        console.log("id của tour là:   " + id);
        $location.path('/danhsachve');
        $location.search({ id: id });
    }

}


);
