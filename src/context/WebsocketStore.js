let socket = null; // WebSocket instance
let listeners = []; // Listeners to update on WebSocket state changes

// WebSocket state management
export const websocket = {
  get: () => socket,
  set: (newSocket) => {
    socket = newSocket;
    // Notify all listeners about the state change
    listeners.forEach((listener) => listener(socket));
  },
  subscribe: (listener) => {
    listeners.push(listener);
    // Immediately invoke listener with the current state
    listener(socket);
    return () => {
      // Remove listener when unsubscribed
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

// Connect WebSocket
export function connectWebSocket(url) {
  if (socket) {
    console.warn("WebSocket already connected. Closing existing connection...");
    socket.close();
  }

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket connected:", url);
    websocket.set(socket);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
    websocket.set(null);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    socket.close();
    websocket.set(null);
  };
}

// Utility to send a message through the WebSocket
export function sendMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error("WebSocket is not open. Cannot send message.");
  }
}

// Close WebSocket connection
export function closeWebSocket() {
  if (socket) {
    console.log("Closing WebSocket connection");
    socket.close();
    websocket.set(null);
  }
}
