document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.style.display = 'none';
        msg.textContent = '';
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('input-error'));

    let isValid = true;

    function showError(element, message) {
        const errorElement = element.parentElement.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        element.classList.add('input-error');
        isValid = false;
    }

    if (fullName.value.trim().length < 2) {
        showError(fullName, 'Name must be at least 2 characters long.');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
    }

    if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters long.');
    }

    const passwordComplexity = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (password.value.length >= 8 && !passwordComplexity.test(password.value)) {
        showError(password, 'Password must contain at least one letter and one number.');
    }

    if (password.value !== confirmPassword.value || confirmPassword.value === '') {
        showError(confirmPassword, 'Passwords do not match.');
    }

    if (isValid) {
        localStorage.setItem("petUsername", fullName.value.trim());
        localStorage.setItem('pendingToast', 'Register successful!');
        window.location.href = "index.html";
    }
});