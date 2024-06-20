import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface WebSocketContextType {
  socket: SocketIOClient.Socket | null;
  connectWebSocket: (url: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  connectWebSocket: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  const connectWebSocket = (url: string) => {
    const newSocket = io.connect(url);

    newSocket.on('connect', () => {
      console.log('WebSocket connection established.');
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected.');
      setSocket(null);
    });

    newSocket.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <WebSocketContext.Provider value={{ socket, connectWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
