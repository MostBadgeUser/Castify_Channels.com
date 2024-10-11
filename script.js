<script>
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
</script>