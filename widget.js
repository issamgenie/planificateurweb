document.addEventListener("DOMContentLoaded", () => {
   /*  const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotHeader = document.getElementById("chatbot-header");
    const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSendBtn = document.getElementById("chatbot-send-btn");
    const chatbotToggleBtn = document.getElementById("chatbot-toggle-btn");
    const chatbotTitle = document.getElementById("chatbot-title"); */

        // Créer d'abord les éléments HTML du chatbot
        const body = document.body;
    
        // Créer le conteneur principal
        const chatbotContainer = document.createElement("div");
        chatbotContainer.id = "chatbot-container";
        chatbotContainer.className = "chatbot-container";
        
        // Créer l'en-tête
        const chatbotHeader = document.createElement("div");
        chatbotHeader.id = "chatbot-header";
        chatbotHeader.className = "chatbot-header";
        
        const chatbotTitle = document.createElement("span");
        chatbotTitle.id = "chatbot-title";
        chatbotTitle.textContent = "Chatbot";
        
        const chatbotCloseBtn = document.createElement("button");
        chatbotCloseBtn.id = "chatbot-close-btn";
        chatbotCloseBtn.className = "chatbot-close-btn";
        chatbotCloseBtn.innerHTML = "&times;";
        
        chatbotHeader.appendChild(chatbotTitle);
        chatbotHeader.appendChild(chatbotCloseBtn);
        
        // Créer la zone de messages
        const chatbotMessages = document.createElement("div");
        chatbotMessages.id = "chatbot-messages";
        chatbotMessages.className = "chatbot-messages";
        
        // Créer la zone de saisie
        const chatbotInputContainer = document.createElement("div");
        chatbotInputContainer.id = "chatbot-input-container";
        chatbotInputContainer.className = "chatbot-input-container";
        
        const chatbotInput = document.createElement("input");
        chatbotInput.id = "chatbot-input";
        chatbotInput.className = "chatbot-input";
        chatbotInput.type = "text";
        chatbotInput.placeholder = "Tapez votre message...";
        
        const chatbotSendBtn = document.createElement("button");
        chatbotSendBtn.id = "chatbot-send-btn";
        chatbotSendBtn.className = "chatbot-send-btn";
        chatbotSendBtn.textContent = "Envoyer";
        
        chatbotInputContainer.appendChild(chatbotInput);
        chatbotInputContainer.appendChild(chatbotSendBtn);
        
        // Assembler le conteneur principal
        chatbotContainer.appendChild(chatbotHeader);
        chatbotContainer.appendChild(chatbotMessages);
        chatbotContainer.appendChild(chatbotInputContainer);
        
        // Créer le bouton de bascule
        const chatbotToggleBtn = document.createElement("button");
        chatbotToggleBtn.id = "chatbot-toggle-btn";
        chatbotToggleBtn.className = "chatbot-toggle-btn";
        chatbotToggleBtn.textContent = "Chat";
        
        // Ajouter les éléments au body
        body.appendChild(chatbotContainer);
        body.appendChild(chatbotToggleBtn);
        
        // Ajouter les styles CSS
        const styleElement = document.createElement("style");
        styleElement.textContent = `
            /* Styles pour le conteneur principal du chatbot */
            .chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                max-width: 90%;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: none; /* Caché par défaut */
                flex-direction: column;
                overflow: hidden;
                font-family: Arial, sans-serif;
                z-index: 9999;
            }

            /* Styles pour l'en-tête du chatbot */
            .chatbot-header {
                background-color: #007bff;
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }

            #chatbot-title {
                font-weight: bold;
                font-size: 1.1em;
            }

            .chatbot-close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5em;
                cursor: pointer;
            }

            /* Styles pour la zone des messages */
            .chatbot-messages {
                flex-grow: 1;
                padding: 15px;
                overflow-y: auto;
                height: 300px; /* Hauteur fixe pour la zone de messages */
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .chatbot-message {
                padding: 8px 12px;
                border-radius: 18px;
                max-width: 80%;
                word-wrap: break-word;
            }

            .chatbot-message.user {
                background-color: #007bff;
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 5px;
            }

            .chatbot-message.bot {
                background-color: #f1f1f1;
                color: #333;
                align-self: flex-start;
                border-bottom-left-radius: 5px;
            }

            /* Styles pour la zone de saisie */
            .chatbot-input-container {
                display: flex;
                padding: 10px;
                border-top: 1px solid #eeeeee;
            }

            .chatbot-input {
                flex-grow: 1;
                border: 1px solid #dddddd;
                border-radius: 20px;
                padding: 10px 15px;
                font-size: 1em;
                margin-right: 10px;
            }

            .chatbot-input:focus {
                outline: none;
                border-color: #007bff;
            }

            .chatbot-send-btn {
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 10px 20px;
                font-size: 1em;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }

            .chatbot-send-btn:hover {
                background-color: #0056b3;
            }

            /* Styles pour le bouton de bascule du chatbot */
            .chatbot-toggle-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 1.2em;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9998;
            }

            .chatbot-toggle-btn:hover {
                background-color: #0056b3;
            }

            /* Classe pour afficher le chatbot */
            .chatbot-container.open {
                display: flex;
            }

            /* Classe pour cacher le bouton de bascule lorsque le chat est ouvert */
            .chatbot-toggle-btn.hidden {
                display: none;
            }

            /* Animation de chargement */
            .chatbot-loading {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            background-color: #f1f1f1;
            color: #333;
            align-self: flex-start;
            border-radius: 18px;
            border-bottom-left-radius: 5px;
            max-width: 80%;
            margin-bottom: 8px;
            }

            .chatbot-loading-dots {
            display: inline-flex;
            margin-left: 5px;
            }

            .chatbot-loading-dots span {
            width: 6px;
            height: 6px;
            margin: 0 2px;
            background-color: #666;
            border-radius: 50%;
            animation: chatbot-loading 1.4s infinite ease-in-out both;
            }

            .chatbot-loading-dots span:nth-child(1) {
            animation-delay: -0.32s;
            }

            .chatbot-loading-dots span:nth-child(2) {
            animation-delay: -0.16s;
            }

            @keyframes chatbot-loading {
            0%, 80%, 100% { 
                transform: scale(0);
            } 
            40% { 
                transform: scale(1.0);
            }
            }

        `;
        document.head.appendChild(styleElement);

    // Configuration - these could be dynamically set or fetched
    const backendUrl = "https://app-748abdaa-3823-4c68-9a48-792458bf6799.cleverapps.io"; // Replace with your actual backend URL
    //const backendUrl = "http://localhost:3000"; // Replace with your actual backend URL
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
