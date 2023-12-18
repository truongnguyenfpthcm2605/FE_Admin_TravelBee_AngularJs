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
            $rootScope.locations = response.data;
            $scope.ls = $rootScope.locations;
            console.log("API Data:", $rootScope.locations);
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
    
}


);

// function fetchLocations() {
//   fetch('http://localhost:8080/api/v1/location/all')
//       .then(response => response.json())
//       .then(locations => {
//           const tableBody = document.querySelector('.table tbody');
//           locations.forEach(location => {
//               const row = document.createElement('tr');
//               const imageUrls = location.images.split(',\r\n');
//               const firstImageUrl = imageUrls[0];
//               const isActiveOptionSelected = location.isActive ? '' : 'selected';
//               const isHiddenOptionSelected = location.isActive ? 'selected' : '';
//               const createDate = new Date(location.createdate);
//               const formattedDate = createDate.toLocaleDateString('en-GB', {
//                   day: '2-digit',
//                   month: '2-digit',
//                   year: '2-digit'
//               });
//               // Column for Name
//               row.innerHTML += `
//                   <td>
//                       <div class="d-flex px-2 py-1">
//                           <!-- Other elements like image here -->
//                           <div>
//                           <img src="${firstImageUrl}" class="avatar avatar-sm me-3" alt="${location.title}">
//                         </div>

//                           <div class="d-flex flex-column justify-content-center">
//                               <h6 class="mb-0 text-sm">${location.title}</h6>
//                               <!-- Other links or elements here -->
//                               <a class="text-xs text-secondary mb-0 "
//                               href=""><i class="fa-solid fa-location-dot"></i> Vị trí</a>
//                           <a class="text-xs text-secondary mb-0 tel"
//                               href="">Đánh Giá:
//                               <span style="color: rgb(255, 149, 0)"> <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><span></a>
                       
//                           </div>
//                       </div>
//                   </td>`;

//               // Column for Description
            
//               row.innerHTML += `
//                   <td>
//                       <p class="text-secondary text-x mb-0" style="white-space: pre-line; font-size:11px;">
//                           ${location.description}
//                       </p>
//                   </td>`;
//                   row.innerHTML+=`<td>
//               <p class="text-secondary text-x font-weight-bold mb-0"></p>
//           </td>`;
//                   row.innerHTML += `
//                   <td class="align-middle text-center text-sm">
//                   <select class="badge badge-sm bg-gradient-success" onchange="updateLocationStatus('${location.id}', this.value)">
//                   <option class="bg-secondary" value="true" ${isActiveOptionSelected}>Đang hoạt động</option>
//                   <option class="bg-secondary" value="false" ${isHiddenOptionSelected}>Đã ẩn</option>
//               </select>
//                     </td>`;
//                     row.innerHTML += `
//                     <td class="align-middle text-center">
//                         <span class="text-secondary text-xs font-weight-bold">${formattedDate}</span>
//                     </td> <td class="align-middle">
//                     <a href="#!themDiaDiem" class="text-secondary font-weight-bold text-xs"
//                         data-toggle="tooltip" data-original-title="Edit user" onclick="editLocation(${location.id})">
//                         Edit location</a>
//                     </a>
//                 </td>
//                 <td class="align-middle">
//                     <a href="" class="text-primary font-weight-bold text-xs" data-toggle="tooltip"
//                         data-original-title="Edit user">
//                         <i class="fa-solid fa-trash-can text-sm"></i>
//                     </a>
//                 </td>
//                 <td class="align-middle text-center text-sm">
//                     <button STYLE="border-radius: 5px;display: block"> <i
//                             class="fa-solid fa-print"></i></button>
//                 </td>
//                 </td>`;
                  
//               // Add other columns as needed, e.g., for creation date

//               tableBody.appendChild(row);
//           });
//       })
//       .catch(error => console.error('Error fetching locations:', error));
// }


// // // update active
// // function updateLocationStatus(locationId, newStatus) {
// //   // ... Confirm dialog logic
// //   if (!confirm('Bạn có chắc chắn muốn thay đổi trạng thái địa điểm này không?')) {
// //     return;
// // }



// //   const data = {
// //       // ... populate other required fields as per LocationDTO structure
// //       isActive: newStatus === 'true'
// //   };

// //   fetch(`http://localhost:8080/update/${locationId}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(data)
// //   })
// //   .then(response => {
// //       if (response.ok) {
// //           console.log('Status updated successfully');
// //           // Refresh data or page here as needed
// //       } else {
// //           console.error('Failed to update status');
// //       }
// //   })
// //   .catch(error => console.error('Error updating location status:', error));
// // }


// //update location

// // function editLocation(locationId) {
// //   fetch(`http://localhost:8080/update/${locationId}`)
// //       .then(response => response.json())
// //       .then(location => {
// //           // Populate the form fields
// //           document.getElementById('title').value = location.title;

// //           //images
// //           if (location.images && location.images.length > 0) {
// //             const imageName = location.images[0].split('/').pop(); // Assuming the image URL is in the array
// //             document.getElementById('image-name').value = imageName; // Replace 'image-name' with your actual field ID
// //         }
// //           document.getElementById('location-id').value = locationId; // Hidden field
// //       })
// //       .catch(error => console.error('Error:', error));
// // }

// // // Modify the existing form submission logic
// // document.getElementById('your-form-id').addEventListener('submit', function(event) {
// //   event.preventDefault();
// //   const id = document.getElementById('location-id').value;
// //   // Check if in edit mode and choose method and URL accordingly
// //   // Send the request...
// // });

// // Call fetchLocations when the DOM content is fully loaded
// document.addEventListener('DOMContentLoaded', function () {
//   fetchLocations();
//   updateLocationStatus(locationId, newStatus);
//   console.log("day là location");
// });