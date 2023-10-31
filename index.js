const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


function appendMessage(sender, message) {
	const messageDiv = document.createElement("div");
	messageDiv.classList.add("mb-2", "p-2", "rounded", "max-w-fit", "ml-auto");
	if (sender === "user") {
		messageDiv.innerHTML = `<div class="bg-gradient-to-r from-indigo-500  to-pink-500 text-white px-4 py-2 rounded-xl">${message}</div>`;
	} else {
		messageDiv.classList.toggle("ml-auto");
		messageDiv.innerHTML = `<div class="bg-gradient-to-r from-pink-500  to-yellow-500  text-white px-4 py-2 rounded-xl">${message}</div>`;
	}
	chatMessages.appendChild(messageDiv);
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
	const message = userInput.value;
	if (message.trim() === "") return;
	appendMessage("user", message);
	userInput.value = "";
	// Send user message to Python server
	fetch("/get_bot_response", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_message: message }),
	})
		.then((response) => response.json())
		.then((data) => {
			const botResponse = data.bot_response;
			appendMessage("bot", botResponse);
		})
		.catch((error) => console.error("Error:", error));
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		sendMessage();
	}
});