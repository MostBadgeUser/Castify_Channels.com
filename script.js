// Function to register a new user
function registerUser(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username is already taken
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        alert("Username already taken! Please choose a different one.");
        return;
    }

    // Add new user to the array of users
    users.push({ username: username });
    localStorage.setItem('users', JSON.stringify(users));

    // Automatically log in the user after registration
    localStorage.setItem('currentUser', username);

    alert("Registration successful! Welcome, " + username);
    displayUsername();  // Update the displayed username immediately
}

// Function to log in an existing user
function loginUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username exists in registered users
    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
        // Set the current logged-in user
        localStorage.setItem('currentUser', username);
        alert("Login successful! Welcome back, " + username);
        displayUsername();  // Update the displayed username immediately
    } else {
        alert("User not found! Please register first.");
    }
}

// Function to load channels from localStorage and display them
function loadChannels() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const channelsList = document.getElementById('channelsList');

    // Clear previous channel entries
    channelsList.innerHTML = '';

    users.forEach(user => {
        const channelItem = document.createElement('div');
        channelItem.className = 'channel-item';

        // Create channel content
        channelItem.innerHTML = `
            <img src="https://i.ibb.co/Ksjms5W/channel-icon.png" alt="${user.username} Channel Icon" class="channel-icon">
            <div class="channel-info">
                <h2>${user.username}</h2>
                <p>${user.username} Channel</p>
                <p>0 Subscribers</p>
            </div>
        `;
        channelsList.appendChild(channelItem);
    });

    // Check if no channels were created
    if (users.length === 0) {
        channelsList.innerHTML = '<p>No channels available. Please register an account to create a channel.</p>';
    }
}

// Call loadChannels function when the page loads
window.onload = loadChannels;

// Function to display user's nickname from registration
function displayUsername() {
    const currentUser = localStorage.getItem('currentUser');  // Fetch the logged-in user's username
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usernameDisplay = document.querySelector('.username');

    // If no user is logged in, show "Guest"
    if (!currentUser) {
        usernameDisplay.textContent = "Guest";
        return;
    }

    // Check if the logged-in user exists in the registered users list
    const foundUser = users.find(user => user.username === currentUser);

    if (foundUser) {
        usernameDisplay.textContent = foundUser.username;  // Display the logged-in username
    } else {
        usernameDisplay.textContent = "Guest";  // If no matching user, default to Guest
    }
}

// Call displayUsername function on page load
document.addEventListener('DOMContentLoaded', displayUsername);

// JavaScript for search functionality
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function() {
    const query = document.querySelector('.search-input').value;
    alert('Searching for: ' + query);
    // Here you can redirect to a search results page if implemented
});

// Logout functionality
const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    localStorage.removeItem('currentUser'); // Remove current user from local storage
    displayUsername(); // Update displayed username to "Guest"
    alert('Logged out successfully!'); // Notify user of successful logout
});