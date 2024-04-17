// Function to open the registration modal
function openRegister() {
    const registrationModal = document.getElementById('registrationModal');
    registrationModal.style.display = 'block';
}

// Function to close the registration modal
function closeRegister() {
    const registrationModal = document.getElementById('registrationModal');
    registrationModal.style.display = 'none';
}

// Event listener to use Enter key for registration
document.getElementById('registerFullName').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        register();
    }
});

document.getElementById('registerUsername').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        register();
    }
});


document.getElementById('registerEmail').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        register();
    }
});

document.getElementById('registerNumber').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        register();
    }
});

document.getElementById('registerAddress').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        register();
    }
});

document.getElementById('registerPassword').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        register();
    }
});

document.getElementById('confirmPassword').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        register();
    }
});


// Registration function
function register() {
    // Get input values
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const fullName = document.getElementById('registerFullName').value.trim();
    const address = document.getElementById('registerAddress').value.trim();
    const number = document.getElementById('registerNumber').value.trim();
    const registrationMessage = document.getElementById('registrationMessage');
    const loadingAnimation = document.getElementById('registrationLoadingAnimation');

    // Construct requestBody object
    const requestBody = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        number: number
    };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        registrationMessage.innerHTML = 'Please enter a valid email address.';
        return;
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        registrationMessage.innerHTML = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        return;
    }

    // Validate matching passwords
    if (password !== confirmPassword) {
        registrationMessage.innerHTML = 'Passwords do not match.';
        return;
    }

     // Check for empty input fields
    if (!username || !email || !password || !confirmPassword || !fullName || !address || !number) {
        registrationMessage.innerHTML = 'Please fill in all fields.';
        return;
    }

    // Show loading animation and hide registration message
    loadingAnimation.style.display = 'block';
    registrationMessage.innerHTML = '';

// Send registration data to the server
fetch('https://mpawaserver.onrender.com/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Username or email already exists');
    }
    return response.json();
})
.then(data => {
    registrationMessage.innerHTML = data.message;
    console.log(data);
    // Check if redirectToLogin is true
    if (data.redirectToLogin) {
        // setTimeout to open the login modal after 3 seconds
        setTimeout(() => {
            // Close the registration modal
            closeRegister();
            // Open the login modal
            openLogin();
        }, 3000);
    }
})        
.catch(error => {
    registrationMessage.innerHTML = 'Error: ' + error.message;
    console.error('Registration error:', error);
})
.finally(() => {
    // Hide loading animation after registration attempt
    loadingAnimation.style.display = 'none';
});
}