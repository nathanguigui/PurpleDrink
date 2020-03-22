import React, {useEffect, useRef, useState} from 'react';
import Card from 'react-playing-card';
import socketIOClient from "socket.io-client";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Lobby from "./components/Lobby";
import Room from "./components/Room";
import NotFound from "./components/NotFound";

export const AppContext = React.createContext();

const permanentSocket = socketIOClient("http://127.0.0.1:4001");

function App() {

    const [currentPlayer, setCurrentPlayer] = useState(null);

    const [roomId, setRoomId] = useState(null);

    const [socket, setSocket] = useState(permanentSocket);

    useEffect(() => {
        /*socket.on("newPlayer", data => {
            playerList.push(data);
            setPlayerList([...playerList]);
        });*/
        socket.on("roomCreated", data => {
            setRoomId(data.roomId);
            window.localStorage.setItem("playerHash", data.playerHash)
        })
    }, []);

    return (
        <Router>
            <AppContext.Provider value={{
                currentPlayer: currentPlayer,
                setCurrentPlayer: setCurrentPlayer,
                socket: socket,
                roomId: roomId
            }}>
                <Switch>
                    <Route exact path="/">
                        <Lobby/>
                    </Route>
                    <Route path="/game/:roomID">
                        <Room/>
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
