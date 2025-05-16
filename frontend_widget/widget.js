document.addEventListener("DOMContentLoaded", () => {
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotHeader = document.getElementById("chatbot-header");
    const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSendBtn = document.getElementById("chatbot-send-btn");
    const chatbotToggleBtn = document.getElementById("chatbot-toggle-btn");
    const chatbotTitle = document.getElementById("chatbot-title");

    // Configuration - these could be dynamically set or fetched
    const backendUrl = "https://app-748abdaa-3823-4c68-9a48-792458bf6799.cleverapps.io/"; // Replace with your actual backend URL
    const scriptTag = document.currentScript || document.querySelector("script[src*=\"widget.js\"]");
    const configId = scriptTag ? scriptTag.getAttribute("data-config-id") || "default_config" : "default_config";

    let conversationState = {}; // To store context for multi-turn conversations like appointments

    // Function to add a message to the chat window
    function addMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chatbot-message", sender);
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to the bottom
    }

    // Fonction pour ajouter l'animation de chargement
    function showLoadingIndicator() {
        const loadingElement = document.createElement("div");
        loadingElement.classList.add("chatbot-loading");
        loadingElement.id = "chatbot-loading-indicator";
        
        loadingElement.innerHTML = `
            En train de réfléchir
            <div class="chatbot-loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        chatbotMessages.appendChild(loadingElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to the bottom
    }

    // Fonction pour masquer l'animation de chargement
    function hideLoadingIndicator() {
        const loadingElement = document.getElementById("chatbot-loading-indicator");
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    // Function to send a message to the backend
    async function sendMessageToBackend(message) {
        try {
            // Afficher l'indicateur de chargement
            showLoadingIndicator();
            
            const response = await fetch(`${backendUrl}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Config-Id": configId
                },
                body: JSON.stringify({ message: message, state: conversationState })
            });
            
            // Masquer l'indicateur de chargement
            hideLoadingIndicator();
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            addMessage(data.reply, "bot");
            if (data.newState) {
                conversationState = data.newState;
            }
        } catch (error) {
            // Masquer l'indicateur de chargement en cas d'erreur aussi
            hideLoadingIndicator();
            
            console.error("Error sending message to backend:", error);
            addMessage("Désolé, une erreur est survenue. Veuillez réessayer plus tard.", "bot");
        }
    }

    // Function to fetch initial data (e.g., welcome message)
    async function fetchInitialData() {
        try {
            // Afficher l'indicateur de chargement pour le message initial aussi
            showLoadingIndicator();
            
            const response = await fetch(`${backendUrl}/api/init?configId=${configId}`);
            
            // Masquer l'indicateur de chargement
            hideLoadingIndicator();
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.welcomeMessage) {
                addMessage(data.welcomeMessage, "bot");
            }
            if (data.siteName) {
                chatbotTitle.textContent = data.siteName;
            }
        } catch (error) {
            // Masquer l'indicateur de chargement en cas d'erreur
            hideLoadingIndicator();
            
            console.error("Error fetching initial data:", error);
            addMessage("Bienvenue !", "bot"); // Default welcome
        }
    }

    // Event listener for the send button
    chatbotSendBtn.addEventListener("click", () => {
        const messageText = chatbotInput.value.trim();
        if (messageText) {
            addMessage(messageText, "user");
            sendMessageToBackend(messageText);
            chatbotInput.value = "";
        }
    });

    // Event listener for pressing Enter in the input field
    chatbotInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            chatbotSendBtn.click();
        }
    });

    // Event listener for the toggle button
    chatbotToggleBtn.addEventListener("click", () => {
        chatbotContainer.classList.toggle("open");
        chatbotToggleBtn.classList.toggle("hidden");
        if (chatbotContainer.classList.contains("open") && chatbotMessages.children.length === 0) {
             // Fetch initial data only if chat is opened for the first time or messages are empty
            fetchInitialData();
        }
    });

    // Event listener for the close button
    chatbotCloseBtn.addEventListener("click", () => {
        chatbotContainer.classList.remove("open");
        chatbotToggleBtn.classList.remove("hidden");
    });

    // Initial setup: check if the widget should be auto-opened or if there's a saved state
    // For now, it starts closed. fetchInitialData() is called when the user opens it.
});
