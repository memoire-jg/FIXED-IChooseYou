function showToast(message, type = 'success', duration = 3000) {
    const existing = document.getElementById('appToast');
    if (existing) existing.remove();

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
    const toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    const incomingMessage = localStorage.getItem('pendingToast');
    if (incomingMessage) {
        showToast(incomingMessage, 'success');
        localStorage.removeItem('pendingToast'); 
    }
});

const loginForm = document.getElementById('loginForm');
if (loginForm) loginForm.addEventListener('submit', function(event) {
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

    if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters long.');
    }
    const passwordComplexity = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (password.value.length >= 8 && !passwordComplexity.test(password.value)) {
        showError(password, 'Password must contain at least one letter and one number.');
    }

    if (isValid) {
        const username = email.value.trim().split("@")[0];
        localStorage.setItem("petUsername", username);
        localStorage.setItem('pendingToast', 'Login successful!');
        window.location.href = "home.html";
    }
});
