console.log("đây là danh sách vé");
angular.module('app').controller('danhsachve', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    $scope.Ticket = [];
    
    var idTicket = $location.search().id;
    console.log("id Ticketsegsgg", idTicket);
    // Fetch locations
    $scope.fetchticket = function () {
        console.log("đây là token " + $rootScope.token)
        $http.get($rootScope.url + "/api/v1/orders/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }

        })
            .then(response => {
                console.log("đây là data chưa nạp", response.data);
                const tickets = response.data;
                console.log("bdqjqwjeq::  ", tickets);
                const plantour1Tickets = tickets.filter(ticket => {
                    return ticket.plantour.id === parseInt(idTicket); // Change this line
                });
                $scope.Ticket = plantour1Tickets;
                console.log("API Data Ticketfdhd:",  $scope.tickets);
                console.log("token Data:", $rootScope.token);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }
   


    // Call fetchLocations when the controller is loaded

    $scope.fetchticket();
    console.log("đây là danh sách vé APIs", $scope.Ticket);

    // Delete location function
    $scope.deleteTiket = function (locationId) {
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
                $http.delete($rootScope.url + 'api/v1/orders/delete/' + locationId, {
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




]);