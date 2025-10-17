// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener("DOMContentLoaded", () => {

    /**
     * 1. Countdown Timer
     */
    const countdown = () => {
        // Set the wedding date (Year, Month (0-11), Day)
        const weddingDate = new Date("December 15, 2025 11:00:00").getTime();

        // Update the timer every second
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            // Calculate time
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result, adding a "0" if the number is less than 10
            document.getElementById("days").innerText = days < 10 ? '0' + days : days;
            document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

            // If the countdown is over, display a message
            if (distance < 0) {
                clearInterval(interval);
                document.getElementById("countdown-timer").innerHTML = "<div class='timer-box'>We're Married!</div>";
            }
        }, 1000);
    };
    countdown(); // Run the function


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
