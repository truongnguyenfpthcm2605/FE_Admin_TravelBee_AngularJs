const form = document.getElementById('formticket');
const nameInput = document.getElementById('input-name');
const emailInput = document.getElementById('input-email');
const cccdInput = document.getElementById('CCCD');
const phoneInput = document.getElementById('phonenumber');

document.addEventListener('DOMContentLoaded', () => {


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;

        if (nameInput.value === '') {
            valid = false;
            nameInput.classList.add('error');
        }

        if (!emailInput.value.includes('@')) {
            valid = false;
            emailInput.classList.add('error');
        }

        if (cccdInput.value.length !== 12) {
            valid = false;
            cccdInput.classList.add('error');
        }

        if (phoneInput.value.length < 10) {
            valid = false;
            phoneInput.classList.add('error');
        }

        if (valid) {
            form.submit();
        }
    });

});