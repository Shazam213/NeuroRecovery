<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot Input</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script> 
</head>

<body class="bg-gray-100 font-sans">
    <div class="flex justify-center items-center h-screen">
        <div class="bg-white shadow-lg rounded-lg w-full max-w-md">
            <!-- Title and Description Section -->
            <div class="px-6 py-4 text-center">
                <h1 class="text-2xl font-semibold text-gray-800">Chatbot Assistant</h1>
                <p class="text-gray-600 mt-2">Ask me anything, and I will do my best to help you out!</p>
            </div>

            <!-- Chat Messages Section -->
            <div class="px-6 py-4 chatbot-messages overflow-y-auto h-80" id="chatbot-messages">
                <!-- Chat messages will appear here -->
            </div>

            <!-- Chat Input Form -->
            <form class="px-6 py-4 flex space-x-2" id="chatbot-form">
                @csrf
                <input name="input_box" type="text" id="chatbot-input"
                    class="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..." required />
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
            </form>
        </div>
    </div>
    <script>
        document.getElementById('chatbot-form').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the form from reloading the page

            const inputBox = document.getElementById('chatbot-input');
            const messagesContainer = document.getElementById('chatbot-messages');

            // Append user message to chat
            const userMessage = document.createElement('div');
            userMessage.textContent = inputBox.value;
            messagesContainer.appendChild(userMessage);

            // Send data to Laravel controller via AJAX
            const formData = new FormData();
            formData.append('_token', '{{ csrf_token() }}');
            formData.append('input_box', inputBox.value);

            // Clear the input field
            inputBox.value = '';

            try {
                const response = await fetch("{{ route('submit') }}", {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data.status === 'success') {
                    const botMessage = document.createElement('div');
                    botMessage.classList.add('mb-4', 'text-gray-700', 'p-4', 'bg-gray-100', 'rounded-lg');
                    // botMessage.textContent = data.data.response;
                    botMessage.innerHTML = marked.parse(data.data.response);
                    messagesContainer.appendChild(botMessage);
                } else {
                    const errorMessage = document.createElement('div');
                    errorMessage.textContent = 'Error: ' + data.message;
                    messagesContainer.appendChild(errorMessage);
                }
            } catch (error) {
                console.error('Error:', error);
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Error: Unable to reach server.';
                messagesContainer.appendChild(errorMessage);
            }

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    </script>

</body>

</html>

