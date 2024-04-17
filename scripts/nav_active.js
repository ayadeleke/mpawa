// Get all navigation links
const navLinks = document.querySelectorAll('nav ul li a');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' class from all links
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});
