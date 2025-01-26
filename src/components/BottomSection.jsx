
import React from "react";
import "../styles/BottomSection.css"
const BottomSection = ({ gameState, drawCard, playCard, selectColor, getCardImage }) => {
  if (!gameState) return null; // Render nothing if gameState is not available

  return (
    <div className="bottom">
      
        <div className="nes-container with-title is-centered">
          <p className="title">Game State</p>
          <div className="flex-column flex-wrap">
            <div className="top-card-container">
              <div className="arrow-container">
                <img
                  src="/assets/arrow.svg"
                  alt="arrow"
                  className="arrow"
                  style={{
                    transform: `rotate(${gameState?.game?.reverse ? 180 : 0}deg)`,
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
                        {gameState?.game?.turn === player && <i className="nes-mario"></i>}
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
                disabled={gameState?.game?.turn !== gameState?.player?.Name}
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
                        <button
                          className="nes-btn is-primary"
                          onClick={() => selectColor(card, index, "blue")}
                        >
                          Blue
                        </button>
                        <button
                          className="nes-btn is-success"
                          onClick={() => selectColor(card, index, "green")}
                        >
                          Green
                        </button>
                        <button
                          className="nes-btn is-warning"
                          onClick={() => selectColor(card, index, "yellow")}
                        >
                          Yellow
                        </button>
                        <button
                          className="nes-btn is-error"
                          onClick={() => selectColor(card, index, "red")}
                        >
                          Red
                        </button>
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
     
    </div>
  );
};

export default BottomSection;
