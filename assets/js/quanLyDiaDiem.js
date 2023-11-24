app.controller('ThemTourCtrl', function ($timeout) {
    // Lấy thẻ select
    let selectEl = document.querySelector('.badge-sm');

    // Lắng nghe sự kiện thay đổi
    selectEl.addEventListener('change', () => {

        // Nếu chọn "Đã ẩn" 
        if (selectEl.value === 'Đã ẩn') {

            let confirmMessage = confirm("Bạn có chắc chắn muốn ẩn địa điểm này không?");

            if (!confirmMessage) {
                selectEl.value = 'Đang hoạt động';
            }

            // Nếu chọn "Đang hoạt động"    
        } else if (selectEl.value === 'Đang hoạt động') {

            let confirmMessage = confirm("Bạn có chắc chắn muốn kích hoạt lại địa điểm này không?");

            if (!confirmMessage) {
                selectEl.value = 'Đã ẩn';
            }
        }
    });

});