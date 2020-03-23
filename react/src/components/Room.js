import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {
    Link,
    useParams
} from "react-router-dom";
import Loading from "./Loading";

const Room = () => {
    const context = useContext(AppContext);

    const [loading, setLoading] = useState(true);

    const [lobbyNotFound, setLobbyNotFound] = useState(false);

    const [errors, setErrors] = useState(null);

    const [players, setPlayers] = useState([]);

    const [currentMessage, setCurrentMessage] = useState(null);

    const [messages, setMessages] = useState([]);

    let {roomID} = useParams();

    useEffect(() => {

        // reconnect event
        context.socket.on("playerReconnected", data => {
            context.setCurrentPlayer(data);
            if (data === null) window.localStorage.clear();
            setLoading(false)
        });

        // successfully joined event
        context.socket.on("joinSuccessful", data => {
            window.localStorage.setItem("playerHash", data.playerHash);
            setLoading(false)
        });

        // updatePlayerList event
        context.socket.on("updatePlayerList", data => {
            setPlayers(data)
        });

        // lobbyNotFound event
        context.socket.on("lobbyNotFound", () => {
            setLobbyNotFound(true);
            setLoading(false)
        });

        // newMessage event
        context.socket.on("newMessage", data => {
            messages.push(data);
            setMessages([...messages])
        });

        // if local storage hash try reconnect
        if (window.localStorage.getItem("playerHash"))
            context.socket.emit("reconnectPlayer", {
                playerHash: window.localStorage.getItem("playerHash"),
                roomID: roomID
            });
        else // show join form
            setLoading(false)
    }, []);

    // send join request to server
    const handleJoinRoom = () => {
        if (!context.currentPlayer.length) {
            setErrors(["You must set username"]);
            return
        }
        context.socket.emit("joinRoom", {playerName: context.currentPlayer, roomId: roomID});
        setLoading(true);
    };

    // send message
    const handleSendMessage = () => {
        context.socket.emit("sendMessage", {sender: context.currentPlayer, message: currentMessage, roomID: roomID});
        setCurrentMessage("")
    };

    if (loading) return <Loading/>;

    return (
        <div>
            {window.localStorage.getItem("playerHash") ?
            <>
                <p>here is room</p>
                <p>{roomID}</p>
                <p>current player: {context.currentPlayer}</p>
                <div>
                    {players.length ?
                        players.map((player) => {
                            if (context.currentPlayer !== player)
                                return <><span key={player}>{player}</span><br/></>;
                        }) :
                        <span>no player in the room</span>
                    }
                </div>
                <div>
                    {messages.length ?
                        messages.map((messageData) => {
                            return (
                                <div>
                                    <span>{messageData.sender}</span>
                                    <span>{messageData.message}</span>
                                </div>
                            )
                        }) :
                        <span>no messages</span>
                    }
                </div>
                <div>
                    <input value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}} placeholder={"enter message here"}/>
                    <button onClick={() => {handleSendMessage()}}>send</button>
                </div>
            </> :
            <>
                {lobbyNotFound ?
                    <>
                        <p>cannot find lobby</p>
                        <Link to={"/"}>Go to /</Link>
                    </> :
                    <>
                        <input value={context.currentPlayer} onChange={(e) => {context.setCurrentPlayer(e.target.value)}}/>
                        {errors && errors.map((err) => <h4>{err}</h4>)}
                        <button onClick={() => {handleJoinRoom()}}>Join room</button>
                    </>
                }
            </>
            }
        </div>
    )
};

export default Room;
