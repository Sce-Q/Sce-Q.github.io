// Dark Mode Toggle
const toggleButton = document.getElementById("toggle-theme");
const body = document.body;

toggleButton.addEventListener("click", () => {
    if (body.hasAttribute("data-theme")) {
        body.removeAttribute("data-theme");
        toggleButton.textContent = "🌙"; // Dark mode
    } else {
        body.setAttribute("data-theme", "dark");
        toggleButton.textContent = "☀️"; // Light mode
    }
});

// JavaScript for Scroll-to-Top Functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show or hide the button when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
        scrollToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

setInterval(updateClock, 1000);
updateClock();
