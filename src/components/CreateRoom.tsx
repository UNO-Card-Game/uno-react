import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../contexts/WebSocketContext';


const CreateGame: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [numPlayers, setNumPlayers] = useState('2');
  const navigate = useNavigate();
  const { connectWebSocket } = useWebSocket();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const queryParams = `max_players=${numPlayers}&player_name=${playerName}`;
      const websocketUrl = `ws://localhost:8000/create?${queryParams}`;

      connectWebSocket(websocketUrl);

      navigate('/game');
    } catch (error) {
      console.error('Error creating game:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form className="nes-container is-rounded is-dark with-title" onSubmit={handleSubmit}>
      <fieldset>
        <legend style={{ textAlign: 'center' }}>Create Game</legend>
        <div className="nes-field">
          <label htmlFor="playerName">Player Name:</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="nes-input"
            required
          />
        </div>
        <div className="nes-field">
          <label htmlFor="numPlayers">Number of Players:</label>
          <input
            type="number"
            id="numPlayers"
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
            className="nes-input"
            required
          />
        </div>
        <button type="submit" className="nes-btn is-success">
          Create Game
        </button>
      </fieldset>
    </form>
  );
};

export default CreateGame;