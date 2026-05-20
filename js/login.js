document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.style.display = 'none';
        msg.textContent = '';
    });

    const inputs = document.querySelectorAll('input:not([type="checkbox"])');
    inputs.forEach(input => input.classList.remove('input-error'));

    let isValid = true;

    function showError(element, message) {
        const errorElement = element.parentElement.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        element.classList.add('input-error');
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
    }

    if (password.value.trim() === '') {
        showError(password, 'Please enter your password.');
    }

    if (isValid) {
        const username = email.value.trim().split("@")[0];
        localStorage.setItem("petUsername", username);
        window.location.href = "home.html";
    }
});