import React, { useState } from "react";
import RoomForm from "./RoomForm";


const CreateRoom = () => {
  const [playerName, setPlayerName] = useState("");
  const [numPlayers, setNumPlayers] = useState(2); // Default to 2 players

  return (
    <div className="container">
      <RoomForm
        title="Create Room"
        endpoint="create"
        playerName={playerName}
        setPlayerName={setPlayerName}
        numPlayers={numPlayers}
        setNumPlayers={setNumPlayers}
      />
    </div>
  );
};

export default CreateRoom;
