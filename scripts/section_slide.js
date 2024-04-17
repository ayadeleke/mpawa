document.addEventListener("DOMContentLoaded", function() {
    const projectsSection = document.getElementById('projects');
    let delay = 0;
    setTimeout(() => {
    projectsSection.classList.add('active');
}, delay);
delay += 1500; 
});
