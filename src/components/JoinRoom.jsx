import React, { useState, useMemo } from "react";
import RoomForm from "./RoomForm";


const JoinRoom = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState("");

  const queryParams = useMemo(
    () => `room_id=${roomId}&player_name=${playerName}`,
    [roomId, playerName]
  );

  return (
    <div>
      {queryParams && (
        <RoomForm
          title="Join Room"
          endpoint="join"
          playerName={playerName}
          setPlayerName={setPlayerName}
          roomId={roomId}
          setRoomId={setRoomId}
          queryParams={queryParams}
        />
      )}
    </div>
  );
};

export default JoinRoom;
