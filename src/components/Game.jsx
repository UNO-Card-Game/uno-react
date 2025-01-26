import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom"; // To get the WebSocket URL passed from RoomForm.jsx
import { websocket } from "../context/WebsocketStore"; // Use the existing WebSocket instance
import "../styles/Game.css";
import Title from "./Title";
import TopSection from "./TopSection";
import "nes.css/css/nes.min.css";
import BottomSection from "./BottomSection";

const Game = () => {
  const location = useLocation();
  const websocketUrl = location.state?.websocketUrl; // Get WebSocket URL passed from RoomForm.jsx
  const [gameState, setGameState] = useState(null);
  const [connectionDTO, setConnectionDTO] = useState(null);
  const [infoDTO, setInfoDTO] = useState(null);

  useEffect(() => {
    // Ensure the WebSocket URL is present
    if (!websocketUrl) {
      console.error("WebSocket URL is missing. Redirecting...");
      window.location.href = "/"; // Redirect to RoomForm if URL is missing
      return;
    }

    // Subscribe to WebSocket state changes
    const unsubscribe = websocket.subscribe((socket) => {
     
      if (!socket) return;

      const handleMessage = (event) => {
        const incomingData = JSON.parse(event.data);

        switch (incomingData.type) {
          case "connection":
            setConnectionDTO(incomingData.obj);
            console.log("Connection:", incomingData.obj);
            break;
          case "info":
            setInfoDTO(incomingData.obj);
            console.log("INFO:", incomingData.obj);
            break;
          case "sync":
            setGameState(incomingData.obj);
            break;
          default:
            console.warn("Unknown message type:", incomingData.type);
            break;
        }
      };

      // Attach the message handler
      socket.onmessage = handleMessage;
    });

    return () => {
      // Clean up WebSocket listeners when component unmounts
      unsubscribe();
      console.log("WebSocket listener removed in Game.jsx.");
    };
  }, [websocketUrl]);

  const drawCard = () => {
    console.log("Draw card button clicked");
    const socket = websocket.get();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "DRAW_CARD",
          obj: {},
        })
      );
    } else {
      console.error("WebSocket is not open. Cannot send draw card message.");
    }
  };

  const playCard = (card, index, color = null) => {
    console.log("Play card button clicked", card, color);
    const socket = websocket.get();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "PLAY_CARD",
          obj: { card_index: index, new_color: color },
        })
      );
    } else {
      console.error("WebSocket is not open. Cannot send play card message.");
    }
  };

  const getCardImage = (card) => {
    if (card?.Rank === "wild" || card?.Rank === "draw_4") {
      return `/assets/cards/${card.Rank}.svg`;
    }
    return `/assets/cards/${card.Color}-${card.Rank}.svg`;
  };

  const selectColor = (card, index, color) => {
    console.log("Color selected:", color);
    playCard(card, index, color);
  };

  return (
    <>
    <Title />
    <div className="container">  
    <TopSection connectionDTO={connectionDTO} infoDTO={infoDTO} />
    <BottomSection
          gameState={gameState}
          drawCard={drawCard}
          playCard={playCard}
          selectColor={selectColor}
          getCardImage={getCardImage}
        />
    </div>
    
    </>
  );
};

export default Game;
