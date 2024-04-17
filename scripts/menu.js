document.addEventListener('DOMContentLoaded', function () {
    const toggleNavBtn = document.getElementById('toggleNavBtn');
    const navList = document.querySelector('nav ul');
    const loginButton = document.getElementById('loginButton'); // Add id="loginButton" to your login button
    const registerButton = document.getElementById('registerButton'); // Add id="registerButton" to your register button

    // Function to close the navigation menu
    function closeNavMenu() {
        navList.classList.remove('show');
    }

    // Event listener for clicking the menu button
    toggleNavBtn.addEventListener('click', function () {
        navList.classList.toggle('show');
    });

    // Event listener for clicking anywhere outside the menu or the button
    document.addEventListener('click', function (event) {
        const isMenuButton = event.target === toggleNavBtn;
        const isNavList = event.target === navList || navList.contains(event.target);

        if (!isMenuButton && !isNavList) {
            closeNavMenu();
        }
    });

    // Event listener for scrolling
    window.addEventListener('scroll', function () {
        closeNavMenu();
    });

    // Event listener for clicking the login button
    loginButton.addEventListener('click', function () {
        closeNavMenu();
        openLogin(); // Call your openLogin function
    });

    // Event listener for clicking the register button
    registerButton.addEventListener('click', function () {
        closeNavMenu();
        openRegister(); // Call your openRegister function
    });
});
