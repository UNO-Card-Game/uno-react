import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom"; // To get the WebSocket URL passed from RoomForm.jsx
import { websocket } from "../context/websocketStore"; // Use the existing WebSocket instance
import "../styles/Game.css";
import "nes.css/css/nes.min.css";

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
    <div className="container">
      <div className="title-container">
        <h1>UNO</h1>
      </div>
      <div className="top">
        <div className="left">
          <section className="box">
            <div className="nes-container with-title">
              <p className="title">Connection Info</p>
              {connectionDTO && (
                <table className="nes-table is-bordered is-centered">
                  <tbody>
                    <tr>
                      <td><strong>Player Name:</strong></td>
                      <td>{connectionDTO.player_name}</td>
                    </tr>
                    <tr>
                      <td><strong>Room ID:</strong></td>
                      <td>{connectionDTO.room_id}</td>
                    </tr>
                    <tr>
                      <td><strong>Max Players:</strong></td>
                      <td>{connectionDTO.max_players}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
        <div className="right">
          <section className="box">
            <div className="nes-container with-title">
              <p className="title">Messages</p>
              {infoDTO?.Message && (
                <div className="nes-balloon from-left">
                  <p>{infoDTO.Message}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <div className="bottom">
        {gameState && (
          <section className="box">
            <div className="nes-container with-title">
              <p className="title">Game State</p>
              <div className="flex-column flex-wrap">
                <div className="top-card-container">
                  <div className="arrow-container">
                    <img
                      src="/assets/arrow.svg"
                      alt="arrow"
                      className="arrow"
                      style={{
                        transform: `rotate(${
                          gameState?.game?.reverse ? 180 : 0
                        }deg)`,
                      }}
                    />
                  </div>
                  <table className="nes-table is-bordered is-centered players-table">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Turn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameState.room.players.map((player) => (
                        <tr
                          key={player}
                          className={
                            gameState?.game?.turn === player &&
                            gameState?.player?.Name === player
                              ? "client-turn"
                              : ""
                          }
                        >
                          <td>{player}</td>
                          <td>
                            {gameState?.game?.turn === player && (
                              <i className="nes-mario"></i>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <img
                    src={getCardImage(gameState?.game?.topcard)}
                    alt={`${gameState?.game?.topcard?.Rank} ${gameState?.game?.topcard?.Color}`}
                    className={`top-card ${gameState?.game?.topcolor}`}
                  />
                  <button
                    className="nes-btn"
                    onClick={drawCard}
                    disabled={
                      gameState?.game?.turn !== gameState?.player?.Name
                    }
                  >
                    Draw
                  </button>
                </div>
                <div className="cards-section">
                  <h3 style={{ textAlign: "center" }}>Your Cards</h3>
                  <div className="cards-container">
                    {gameState?.player?.Cards.map((card, index) => (
                      <div className="card-container" key={index}>
                        <img
                          src={getCardImage(card)}
                          alt={`${card.Rank} ${card.Color}`}
                          className="card"
                          onClick={() => playCard(card, index)}
                        />
                        {(card.Rank === "wild" || card.Rank === "draw_4") && (
                          <div className="color-picker">
                            {["blue", "green", "yellow", "red"].map((color) => (
                              <button
                                key={color}
                                className={`nes-btn is-${color}`}
                                onClick={() => selectColor(card, index, color)}
                              >
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <h5 style={{ textAlign: "center" }}>
                    Count: {gameState?.player?.Counter}
                  </h5>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Game;
