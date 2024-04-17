let slideIndex = 0;
let slideShowInterval; // Variable to hold the setInterval reference
let slides; // Global variable to store slide elements

function showSlides() {
  slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";

  slideShowInterval = setTimeout(showSlides, 5000);
}

function plusSlides(n) {
  // Clear the existing timer to avoid conflicts with manual navigation
  clearTimeout(slideShowInterval);
  slideIndex += n;

  // Handle cases where user navigates beyond slide boundaries
  if (slideIndex > slides.length) {
    slideIndex = 1;
  } else if (slideIndex < 1) {
    slideIndex = slides.length;
  }

  showSlides();
}

showSlides();