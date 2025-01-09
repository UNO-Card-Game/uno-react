import React from "react";
import { Link } from "react-router-dom";
import "../styles/StartPage.css"; // Custom styles


function StartPage() {
  return (
    <div className="container">
      <h1 className="title">Uno Multiplayer Game</h1>
      
        <Link className="nes-btn is-primary button" to="/create-room">
          Create Room
        </Link>
        <Link className="nes-btn is-success button" to="/join-room">
          Join Room
        </Link>
        
     
    </div>
  );
}

export default StartPage;

