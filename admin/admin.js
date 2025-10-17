document.addEventListener('DOMContentLoaded', () => {

    // --- Selectors ---
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const adminWrapper = document.querySelector('.admin-wrapper'); // Dashboard container
    const logoutBtn = document.getElementById('logoutBtn');

    // --- A. LOGIN PAGE LOGIC (Runs on index.html) ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = loginForm.username.value;
            const password = loginForm.password.value;

            // Clear previous error message
            loginError.textContent = '';
            loginError.style.display = 'none';

            // Hardcoded check (for local development ONLY):
            if (username === 'admin' && password === '12345') {

                localStorage.setItem('isAuthenticated', 'true');

                // *** FIX: Use './' for reliable relative path redirect ***
                window.location.href = './dashboard.html';

            } else {

                // Display the error message
                loginError.textContent = 'ERROR: Invalid username or password. Please try again.';
                loginError.style.display = 'block';

                loginForm.password.value = ''; // Clear password
            }
        });
    }

    // --- B. DASHBOARD PAGE LOGIC (Runs on dashboard.html) ---
    if (adminWrapper) {
        
        // 1. AUTH GUARD: If not logged in, redirect
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            window.location.href = './index.html';
            return; // Stop execution on this page
        }
        
        // 2. LOGOUT FUNCTIONALITY
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isAuthenticated');
                window.location.href = './index.html';
            });
        }
        
        // 3. NAVIGATION HIGHLIGHTING (Basic)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // NOTE: If you are ready to implement the RSVP table, 
        // the full function to load data from localStorage would go here.
        // loadRsvpData();
    }
});
