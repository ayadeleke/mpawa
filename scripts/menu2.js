// Function to toggle the visibility of the nav list and nav icon
function toggleNavList() {
    const navList = document.querySelector('.nav-list');
    const navbar = document.querySelector('.navbar');

    if (navList && navbar) {
        if (navList.style.display === 'block') {
            navList.style.display = 'none';
            navbar.classList.add('nav-hidden');
        } else {
            navList.style.display = 'block';
            navbar.classList.remove('nav-hidden');
        }
    }
}

// Add a scroll event listener to hide the navbar when scrolling down
let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        if (prevScrollPos < currentScrollPos) {
            // Scrolling down, hide the navbar
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up, show the navbar
            navbar.classList.remove('nav-hidden');
        }

        prevScrollPos = currentScrollPos;
    }
};