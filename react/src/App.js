import React, {useEffect, useRef, useState} from 'react';
import Card from 'react-playing-card';
import socketIOClient from "socket.io-client";
import './App.css';

function App() {

  const [playerList, setPlayerList] = useState([]);

  const [newPlayer, setNewPlayer] = useState("");

  const [started, setStarted] = useState(false);

  const [socket, setSocket] = useState(socketIOClient("http://127.0.0.1:4001"));

  useEffect(() => {
    socket.on("newPlayer", data => {
      playerList.push(data);
      setPlayerList([...playerList]);
    });

    socket.on("gameStarted", () => {
      setStarted(true);
    })

  }, []);

  const handleAddPlayer = () => {
    socket.emit("sendAddPlayer", newPlayer);
    setNewPlayer("");
  }

  return (
    <div className="App">
      <div>
        <h4>Player list</h4>
        {playerList.map((user) => {
          return (<><span key={user}>{user}</span><br/></>)
        })}
      </div>
      {!started &&
        <>
          <div>
            <input value={newPlayer} onChange={(e) => {setNewPlayer(e.target.value)}}/>
            <button onClick={() => {handleAddPlayer()}}>Add player</button>
          </div>
          <div>
            <button onClick={() => {socket.emit("startGame")}}>Start game</button>
          </div>
        </>
      }
    </div>
  );
}

export default App;
