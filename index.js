document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    // Display user's message
    displayMessage(userInput, 'user');

    // Call your chatbot API to get the response
    fetch('http://localhost:5500/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
    })
    .then(response => response.json())
    .then(data => {
        // Display bot's response
        displayMessage(data.response, 'bot');
    })
    .catch(error => console.error('Error:', error));

    // Clear the input field
    document.getElementById('userInput').value = '';
});

function displayMessage(message, type) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
