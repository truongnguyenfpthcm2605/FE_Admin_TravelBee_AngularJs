let a = new Date();

let year = a.getFullYear();
let month = String(a.getMonth() + 1).padStart(2, '0'); // Thêm số 0 ở đầu nếu cần
let day = String(a.getDate()).padStart(2, '0'); // Thêm số 0 ở đầu nếu cần

let formattedDate = year + '-' + month + '-' + day;
let s = 'he'
console.log(formattedDate);



const now = new Date().getHours()
if(now > 6 &&  now < 18){
    console.log("Chào Buổi Sáng")
}else{
    console.log("Chào Buổi Tối")
}