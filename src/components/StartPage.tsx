import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 3rem;
  color: #343a40;
  text-align: center;
`;

const Button = styled(Link)`
  margin: 1rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
`;

const StartPage: React.FC = () => {
  return (
    <Container>
      <Title className="title">Uno Multiplayer Game</Title>
      <Button className="nes-btn is-primary" to="/create-room">
        Create Room
      </Button>
      <Button className="nes-btn is-success" to="/join-room">
        Join Room
      </Button>
    </Container>
  );
};

export default StartPage;
