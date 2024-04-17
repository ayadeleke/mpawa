document.addEventListener('DOMContentLoaded', function() {
    // Toggle dropdown on click
    var profileIconLink = document.querySelector('.profile-icon-link');
    if (profileIconLink) {
        profileIconLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Profile icon clicked');
            var profileIcon = document.querySelector('.profile-icon');
            if (profileIcon) {
                profileIcon.classList.toggle('open');
                console.log('Dropdown toggled');
            } else {
                console.log('Profile icon not found');
            }
        });
    } else {
        console.log('Profile icon link not found');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        var dropdown = document.querySelector('.profile-icon');
        if (dropdown && !dropdown.contains(event.target)) {
            dropdown.classList.remove('open');
            console.log('Dropdown closed');
        }
    });
});
