// --- Configuration ---
// Wedding date is November 24, 2025 at 6:00 PM (18:00:00)
const WEDDING_DATE = new Date('November 24, 2025 18:00:00').getTime();
const COUNTDOWN_ELEMENT = document.getElementById('countdown');
const RSVP_FORM = document.getElementById('rsvp-form');
const RSVP_SUCCESS_MESSAGE = document.getElementById('rsvp-success');

// --- 1. Countdown Timer Logic ---
function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Stop the countdown when the wedding date is reached
    if (distance < 0) {
        clearInterval(countdownInterval);
        COUNTDOWN_ELEMENT.innerHTML = '<p class="date-location">The Day Is Here!</p>';
        return;
    }

    // Function to generate the HTML for a single countdown box
    function getBoxHtml(number, label) {
        return `
            <div class="countdown-box">
                <span class="countdown-number">${String(number).padStart(2, '0')}</span>
                <span class="countdown-label">${label}</span>
            </div>
        `;
    }

    // Inject the HTML into the DOM
    COUNTDOWN_ELEMENT.innerHTML = `
        ${getBoxHtml(days, 'Days')}
        ${getBoxHtml(hours, 'Hours')}
        ${getBoxHtml(minutes, 'Minutes')}
        ${getBoxHtml(seconds, 'Seconds')}
    `;

    // Subtle 'flip/fade' animation for numbers that change
    // Since we re-render the whole HTML, the 'flip' transition is visually implied
    // by the quick re-render and CSS transition on .countdown-number if the number changes.
}

// Initial call and set up the interval
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// --- 2. Scroll Animation Logic (Global) ---
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Check if the element is intersecting (visible)
        if (entry.isIntersecting) {
            // Add the 'is-visible' class to trigger the CSS transition
            entry.target.classList.add('is-visible');
            // Stop observing once it's visible
            observer.unobserve(entry.target);
        }
    });
}, {
    // Start the animation when the top of the element is 10% visible
    threshold: 0.1
});

// Select all elements with the 'fade-in-section' class
document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// --- 3. Hero Text Animation on Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Select the main hero text elements
    const heroTexts = document.querySelectorAll('.animate-on-load');

    // Apply the final, visible state after a short delay
    setTimeout(() => {
        heroTexts.forEach((el, index) => {
            // Apply a staggered transition for an elegant entrance
            el.style.transition = `opacity 1s ease-out ${index * 0.3}s, transform 1s ease-out ${index * 0.3}s`;
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});


// --- 4. RSVP Form Submission Logic (Data to localStorage) ---

if (RSVP_FORM) {
    RSVP_FORM.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // 1. Get all form values
        const newRsvp = {
            id: Date.now(), // Unique ID for each submission
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            attending: document.getElementById('attending').value,
            guests: document.getElementById('guests').value,
            song: document.getElementById('song').value || 'N/A', // Handle optional field
            timestamp: new Date().toLocaleString()
        };

        // 2 & 3. Retrieve existing RSVPs from localStorage
        // || [] provides a fallback if the key doesn't exist
        const rsvps = JSON.parse(localStorage.getItem('rsvpData')) || [];

        // 4. Add the new RSVP object to the array
        rsvps.push(newRsvp);

        // 5. Save the updated array back to localStorage
        localStorage.setItem('rsvpData', JSON.stringify(rsvps));

        // 6. Show success message and reset form
        RSVP_FORM.style.display = 'none';
        RSVP_SUCCESS_MESSAGE.style.display = 'block';

        // Optional: Log the saved data to console for confirmation
        console.log("RSVP Submitted Successfully:", newRsvp);
        console.log("Current total RSVPs in localStorage:", rsvps);
    });
}

    /**
     * 2. Sticky Navigation
     */
    const stickyNav = () => {
        const nav = document.getElementById("sticky-nav");
        // We want the nav to appear after scrolling past the hero section
        const heroSection = document.getElementById("home");
        const heroHeight = heroSection.offsetHeight;

        window.addEventListener("scroll", () => {
            if (window.scrollY > heroHeight) {
                nav.classList.add("sticky");
            } else {
                nav.classList.remove("sticky");
            }
        });
    };
    stickyNav(); // Run the function


    /**
     * 3. Scroll Animations (Intersection Observer)
     */
    const scrollAnimations = () => {
        // Select all elements with the class 'animate-on-scroll'
        const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

        // The 'IntersectionObserver' watches for elements entering the viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the element is in view (isIntersecting)
                if (entry.isIntersecting) {
                    // Add the 'visible' class to trigger the CSS animation
                    entry.target.classList.add("visible");
                    // Stop observing this element so the animation only runs once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        // Tell the observer to watch each of our selected elements
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    };
    scrollAnimations(); // Run the function


    /**
     * 4. Gallery Modal (Lightbox)
     */
    const galleryModal = () => {
        const modal = document.getElementById("gallery-modal");
        const modalImg = document.getElementById("modal-image");
        const galleryItems = document.querySelectorAll(".gallery-item");
        const closeModal = document.querySelector(".modal-close");

        // Loop through all gallery images and add a click event
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                modal.classList.add("open"); // Show the modal
                modalImg.src = item.src;     // Set the modal image to the clicked image's source
                modalImg.alt = item.alt;
            });
        });

        // Function to close the modal
        const close = () => {
            modal.classList.remove("open");
        };

        // Close the modal when the 'x' is clicked
        closeModal.addEventListener("click", close);

        // Close the modal when clicking outside the image (on the modal background)
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                close();
            }
        });
    };
    galleryModal(); // Run the function


    /**
     * 5. RSVP Form Handling (Saving to localStorage)
     */
    const rsvpForm = () => {
        const form = document.getElementById("rsvp-form");
        const successMessage = document.getElementById("rsvp-success-msg");

        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop the form from submitting the traditional way

            // 1. Get all form values into an object
            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                attending: e.target.attending.value,
                guests: e.target.guests.value,
                song: e.target.song.value,
                timestamp: new Date().toLocaleString() // Add a timestamp
            };

            // 2. Get existing RSVPs from localStorage, or create an empty array
            // localStorage can only store strings, so we use JSON.parse()
            let rsvps = JSON.parse(localStorage.getItem("rsvps")) || [];

            // 3. Add the new RSVP to the array
            rsvps.push(formData);

            // 4. Save the updated array back to localStorage
            // We use JSON.stringify() to convert the array to a string
            localStorage.setItem("rsvps", JSON.stringify(rsvps));

            // 5. Show the success message and hide the form
            form.style.display = "none";
            successMessage.style.display = "block";
            
            // Optional: scroll to the success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        });
    };
    rsvpForm(); // Run the function

});
