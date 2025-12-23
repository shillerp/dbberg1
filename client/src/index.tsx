import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';

/**
 * Initialize the chat widget
 * This function is called when the script is loaded in an HTML page
 */
function initChatWidget() {
  // Find or create the chat root element
  let chatRoot = document.getElementById('chat-root');
  
  if (!chatRoot) {
    // Create chat root if it doesn't exist
    chatRoot = document.createElement('div');
    chatRoot.id = 'chat-root';
    document.body.appendChild(chatRoot);
  }

  // Render the ChatWidget component
  const root = ReactDOM.createRoot(chatRoot);
  root.render(
    <React.StrictMode>
      <ChatWidget />
    </React.StrictMode>
  );
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatWidget);
} else {
  // DOM is already ready
  initChatWidget();
}

// Export for manual initialization if needed
export { initChatWidget, ChatWidget };
