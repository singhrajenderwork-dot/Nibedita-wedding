document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // --- A. LOGIN PAGE LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = loginForm.username.value;
            const password = loginForm.password.value;
            
            // Clear previous error
            loginError.textContent = '';
            loginError.style.display = 'none';

            // Hardcoded check: admin / 12345
            if (username === 'admin' && password === '12345') {
                
                // Set flag and redirect (using './' for safety)
                localStorage.setItem('isAuthenticated', 'true');
                window.location.href = './dashboard.html';
                
            } else {
                
                // Display error
                loginError.textContent = 'ERROR: Invalid username or password.';
                loginError.style.display = 'block'; 
                loginForm.password.value = '';
            }
        });
    }


    // --- B. AUTH CHECK ON DASHBOARD ---
    if (document.querySelector('.admin-wrapper')) {
        // Redirect to login if not authenticated
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            window.location.href = './index.html';
        }
        
        // Basic Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isAuthenticated');
                window.location.href = './index.html';
            });
        }
    }
});
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
