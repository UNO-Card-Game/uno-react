import React from "react";
import "../styles/TopSection.css"
const TopSection = ({ connectionDTO, infoDTO }) => {
  return (
    <div className="top">
      <div className="left">
       
      <div className="nes-container with-title is-centered">
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
        
      </div>
      <div className="right">
        <section className="box">
        <div className="nes-container with-title is-centered">
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
  );
};

export default TopSection;
