import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useWebSocket } from '../contexts/WebSocketContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Input = styled.input`
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const Button = styled.button`
  margin: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const JoinGame: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();
  const { connectWebSocket } = useWebSocket();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const queryParams = `roomCode=${roomCode}&playerName=${playerName}`;
      const websocketUrl = `ws://localhost:8000/join?${queryParams}`;

      connectWebSocket(websocketUrl);

      navigate('/game');
    } catch (error) {
      console.error('Error joining game:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form className="nes-container is-rounded is-dark with-title" onSubmit={handleSubmit}>
      <fieldset>
        <legend style={{ textAlign: 'center' }}>Join Game</legend>
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
          <label htmlFor="roomCode">Room Code:</label>
          <input
            type="text"
            id="roomCode"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="nes-input"
            required
          />
        </div>
        <button type="submit" className="nes-btn is-primary">
          Join Game
        </button>
      </fieldset>
    </form>
  );
};

export default JoinGame;