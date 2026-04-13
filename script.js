document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('input');

    // Add focus animations to inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const pass = document.getElementById('pass').value;

        // Basic validation
        if (!name || !pass) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Simulate login process
        showMessage('Signing in...', 'info');

        // Add loading animation to button
        const button = document.querySelector('.signin-btn');
        button.innerHTML = '<span class="spinner"></span> Signing In...';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // For demo purposes, always "succeed"
            showMessage('Login successful! Welcome back, ' + name, 'success');
            button.innerHTML = 'Sign In';
            button.disabled = false;

            // Reset form
            loginForm.reset();
        }, 2000);
    });

    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert after form
        loginForm.appendChild(messageDiv);

        // Animate in
        setTimeout(() => messageDiv.classList.add('show'), 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
});

// Add CSS for messages and spinner via JavaScript
const style = document.createElement('style');
style.textContent = `
    .message {
        padding: 10px 15px;
        margin-top: 15px;
        border-radius: 5px;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    }

    .message.show {
        opacity: 1;
        transform: translateY(0);
    }

    .message.error {
        background-color: #fee;
        color: #c33;
        border: 1px solid #fcc;
    }

    .message.success {
        background-color: #efe;
        color: #363;
        border: 1px solid #cfc;
    }

    .message.info {
        background-color: #eef;
        color: #336;
        border: 1px solid #ccf;
    }

    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .input-group.focused label {
        color: #667eea;
    }
`;
document.head.appendChild(style);