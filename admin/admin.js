// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // --- Hardcoded Login Credentials ---
    // In a real application, this would be checked on a server.
    const CORRECT_USER = "admin";
    const CORRECT_PASS = "wedding123";

    /**
     * This script runs on BOTH admin pages (index.html and dashboard.html).
     * We need to find out which page we're on.
     */
    
    const loginForm = document.getElementById("login-form");
    const dashboardContainer = document.getElementById("rsvp-container");

    // --- LOGIC FOR LOGIN PAGE (index.html) ---
    if (loginForm) {
        
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop form from submitting

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const errorMsg = document.getElementById("login-error");

            // Check if username and password are correct
            if (username === CORRECT_USER && password === CORRECT_PASS) {
                // Login is successful!
                // We use sessionStorage: data is stored only for this session
                // and is deleted when the browser tab is closed.
                sessionStorage.setItem("loggedIn", "true");

                // Redirect to the dashboard
                window.location.href = "dashboard.html";

            } else {
                // Show an error message
                errorMsg.textContent = "Invalid username or password.";
            }
        });
    }

    // --- LOGIC FOR DASHBOARD PAGE (dashboard.html) ---
    if (dashboardContainer) {

        // 1. Auth Guard: Check if user is logged in
        if (sessionStorage.getItem("loggedIn") !== "true") {
            // If not logged in, kick them back to the login page
            window.location.href = "index.html";
        }

        // 2. Logout Button
        const logoutButton = document.getElementById("logout-btn");
        logoutButton.addEventListener("click", () => {
            // Remove the login token
            sessionStorage.removeItem("loggedIn");
            // Redirect to login page
            window.location.href = "index.html";
        });

        // 3. Load and Display RSVP Data
        const loadRsvps = () => {
            // Retrieve the (string) data from localStorage
            const rsvpDataString = localStorage.getItem("rsvps");
            // Parse the string back into an array
            const rsvps = JSON.parse(rsvpDataString) || [];

            // Clear the "Loading..." message
            dashboardContainer.innerHTML = "";

            if (rsvps.length === 0) {
                dashboardContainer.innerHTML = "<p>No RSVP submissions yet.</p>";
                return;
            }

            // Create a table to display the data
            const table = document.createElement("table");
            table.className = "rsvp-table";

            // Create table header
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Attending?</th>
                        <th>Guests</th>
                        <th>Song Request</th>
                    </tr>
                </thead>
            `;

            // Create table body
            const tbody = document.createElement("tbody");
            
            // Loop through each RSVP and create a table row
            rsvps.forEach(rsvp => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${rsvp.timestamp}</td>
                    <td>${rsvp.name}</td>
                    <td>${rsvp.email}</td>
                    <td>${rsvp.attending}</td>
                    <td>${rsvp.guests}</td>
                    <td>${rsvp.song}</td>
                `;
                tbody.appendChild(tr);
            });

            // Add the body to the table, and the table to the container
            table.appendChild(tbody);
            dashboardContainer.appendChild(table);
        };

        // Run the function to load data (after auth check passes)
        loadRsvps();
    }
});
