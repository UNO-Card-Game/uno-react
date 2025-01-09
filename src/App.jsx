import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Game from './components/Game';
//import { WebSocketProvider } from "./context/WebSocketContext";
import StartPage from './components/StartPage';

function App() {
  return ( 
 
    <Router>
      <Routes>
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<StartPage />} />
      </Routes>
    </Router> 
   
  );
}

export default App;
