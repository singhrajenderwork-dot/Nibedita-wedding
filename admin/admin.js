document.addEventListener('DOMContentLoaded', () => {
    // --- Login Page Logic (index.html) ---
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            // Simple client-side validation (REPLACE with real API call in production)
            if (username === 'admin' && password === '12345') {
                // Store a token or flag to simulate a successful login
                localStorage.setItem('isAuthenticated', 'true');
                // Redirect to the dashboard
                window.location.href = 'dashboard.html';
            } else {
                loginError.textContent = 'Invalid username or password.';
                loginForm.password.value = ''; // Clear password field
            }
        });
    }


    // --- Dashboard Logic (dashboard.html) ---
    const logoutBtn = document.getElementById('logoutBtn');
    
    // 1. Check Authentication on Dashboard Load
    if (document.body.classList.contains('admin-wrapper') || document.querySelector('.admin-wrapper')) {
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            // If not logged in, redirect them back to the login page
            window.location.href = 'index.html';
        }
    }
    
    // 2. Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isAuthenticated');
            window.location.href = 'index.html';
        });
    }

    // 3. Simple Nav Item Highlighting
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Optional: prevent default to stop page refresh if links are '#'
            // e.preventDefault(); 
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // In a real app, you would load different views/components here
            console.log(`Mapsd to: ${item.querySelector('a').textContent.trim()}`);
        });
    });
});
            // Failed login
            errorMsg.textContent = 'Invalid Username or Password.';
            errorMsg.style.color = 'red'; // Make the error stand out
            
            // Clear the password field for security
            passwordInput.value = '';
        }
    });
}


// --- Dashboard Page Logic (dashboard.html) will be added below the login function ---
// NOTE: For a real project, it's best to split these into separate files, 
// but for this simple setup, we'll keep the logic in one file.

/**
 * AUTH GUARD: Check if the user is logged in on dashboard.html load.
 * This function will only run if the current page is dashboard.html
 */
function checkAuthAndLoadDashboard() {
    // Check if the dashboard-specific container exists
    const rsvpContainer = document.getElementById('rsvp-container');
    
    if (rsvpContainer) {
        // Check session storage for the 'loggedIn' flag
        if (sessionStorage.getItem('loggedIn') !== 'true') {
            // If not logged in, redirect them back to the login page
            window.location.href = 'index.html';
            return; // Stop execution
        }

        // --- User is Logged In: Load Data ---

        // 1. Get the RSVP data from localStorage
        const rsvpData = localStorage.getItem('weddingRSVPs');
        let rsvps = rsvpData ? JSON.parse(rsvpData) : [];

        // 2. Check if there are any RSVPs
        if (rsvps.length === 0) {
            rsvpContainer.innerHTML = '<p class="no-data">No RSVPs have been submitted yet.</p>';
            return;
        }

        // 3. Dynamically create the table
        let tableHTML = '<table>';
        tableHTML += '<thead><tr><th>Name</th><th>Email</th><th>Attending</th><th>Guests</th><th>Song Request</th></tr></thead>';
        tableHTML += '<tbody>';

        rsvps.forEach(rsvp => {
            // Sanitize attendance value for display
            const attendingStatus = rsvp.attending.includes('Yes') ? '✅ Yes' : '❌ No';
            
            tableHTML += `
                <tr>
                    <td>${rsvp.fullName}</td>
                    <td>${rsvp.email}</td>
                    <td>${attendingStatus}</td>
                    <td>${rsvp.guests}</td>
                    <td>${rsvp.songRequest}</td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';
        
        // 4. Insert the table into the container
        rsvpContainer.innerHTML = tableHTML;
    }
}

/**
 * LOGOUT LOGIC
 */
function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear the login flag
            sessionStorage.removeItem('loggedIn');
            // Redirect back to the login page
            window.location.href = 'index.html';
        });
    }
}


// Initialize the dashboard logic if we are on the dashboard page
document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndLoadDashboard();
    handleLogout();
});
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
