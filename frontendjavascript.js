// Add this to your existing script section
document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const isSignup = document.getElementById('modalTitle').textContent === 'Sign Up';
    const url = isSignup ? '/api/auth/signup' : '/api/auth/login';
    
    const formData = {
      username: e.target.elements[0].value,
      email: e.target.elements[1].value,
      password: e.target.elements[2].value
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        hideModal();
        updateAuthState();
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      alert('Error connecting to server');
    }
  });
  
  function updateAuthState() {
    const token = localStorage.getItem('token');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (token) {
      authButtons.innerHTML = `
        <a href="#profile">Profile</a>
        <a href="#logout" onclick="logout()">Logout</a>
      `;
    } else {
      authButtons.innerHTML = `
        <a href="#signup" onclick="showModal('signup')">Sign Up</a>
        <a href="#login" onclick="showModal('login')">Log In</a>
      `;
    }
  }
  
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    updateAuthState();
  }
  
  // Initialize auth state on page load
  updateAuthState();