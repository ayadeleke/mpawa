    document.addEventListener("DOMContentLoaded", function () {
        const expandButton = document.querySelector(".expand-button");
        const descriptionWrapper = document.querySelector(".description-wrapper");
    
        // Function to toggle description visibility based on screen width
        function toggleDescriptionVisibility() {
        if (window.innerWidth <= 768) {
            descriptionWrapper.classList.add("collapsed");
        } else {
            descriptionWrapper.classList.remove("collapsed");
        }
        }
    
        // Call the function when the page loads and on resize
        toggleDescriptionVisibility();
        window.addEventListener("resize", toggleDescriptionVisibility);
    
        expandButton.addEventListener("click", function () {
        // Toggle the visibility of the description content
        descriptionWrapper.classList.toggle("collapsed");
    
        // Change the expand button icon based on the visibility state
        if (descriptionWrapper.classList.contains("collapsed")) {
            expandButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
            expandButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
    
        // Move the button to the end of the description on expansion
        if (!descriptionWrapper.classList.contains("collapsed")) {
            const descriptionHeight = descriptionWrapper.scrollHeight; // Get the actual height
            expandButton.style.top = descriptionHeight + "px"; // Set new top position
        } else {
            // Reset button position on collapse
            expandButton.style.top = null; // Remove inline style
        }
        });
    });
    