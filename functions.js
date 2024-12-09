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

const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
        scrollToTopBtn.classList.remove('show');
    }
});

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

document.getElementById('submitBtn').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10,15}$/;
    const addressPattern = /^.{5,}$/;

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = '#e74c3c';
        toast.style.color = '#fff';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
        toast.style.zIndex = 1000;
        document.body.appendChild(toast);

        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }

    if (!emailPattern.test(email)) {
        showToast('Invalid email address!');
        return;
    }

    if (!phonePattern.test(phone)) {
        showToast('Invalid phone number! Enter 10-15 digits.');
        return;
    }

    if (!addressPattern.test(address)) {
        showToast('Invalid address! Must be at least 5 characters long.');
        return;
    }

    // Gather data
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: email,
        phone: phone,
        address: address,
        ratings: {
            question1: parseInt(document.getElementById('question1').value),
            question2: parseInt(document.getElementById('question2').value),
            question3: parseInt(document.getElementById('question3').value),
            question4: parseInt(document.getElementById('question4').value),
            question5: parseInt(document.getElementById('question5').value),
        }
    };

    console.log(data);

    const fullAddress = `${data.address}`;

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
        <p><strong>First Name:</strong> ${data.firstName}</p>
        <p><strong>Last Name:</strong> ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${fullAddress}</p>
        <p><strong>Question 1 Rating:</strong> ${data.ratings.question1}</p>
        <p><strong>Question 2 Rating:</strong> ${data.ratings.question2}</p>
        <p><strong>Question 3 Rating:</strong> ${data.ratings.question3}</p>
        <p><strong>Question 4 Rating:</strong> ${data.ratings.question4}</p>
        <p><strong>Question 5 Rating:</strong> ${data.ratings.question5}</p>
    `;

    const ratings = Object.values(data.ratings);
    const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

    let averageColor = 'red';
    if (average > 4 && average <= 7) {
        averageColor = 'orange';
    } else if (average > 7) {
        averageColor = 'green';
    }

    outputDiv.innerHTML += `
        <p style="color: ${averageColor};">
            <strong>${data.firstName} ${data.lastName} (${data.email}):</strong> 
            Average Score: ${average.toFixed(2)}
        </p>
    `;
});
