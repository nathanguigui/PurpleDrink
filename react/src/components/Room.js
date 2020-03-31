import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {Link, useParams} from "react-router-dom";
import Loading from "./Loading";
import "../styles/Room.css"
import NetworkStatus from "./NetworkStatus";
import Messaging from "./Messaging";
import RoomID from "./RoomID";
import PlayerList from "./PlayerList";
import Toolbox from "./Toolbox";
import GameControl from "./GameControl";
import QueueList from "./QueueList";

const Room = () => {
    const context = useContext(AppContext);

    const [loading, setLoading] = useState(true);

    const [lobbyNotFound, setLobbyNotFound] = useState(false);

    const [errors, setErrors] = useState(null);

    const [players, setPlayers] = useState([]);

    const [messagesVisible, setMessagesVisible] = useState(true);

    const [playersVisible, setPlayerVisible] = useState(true);

    const [roomIdVisible, setRoomIdVisible] = useState(true);

    const [queueList, setQueueList] = useState([]);

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

    if (loading) return <Loading/>;

    return (
        <div style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/felt.png)"}} className={"room"}>
            <NetworkStatus status={context.networkStatus} />
            {window.localStorage.getItem("playerHash") ?
            <>
                <RoomID roomIdVisible={roomIdVisible}/>
                <PlayerList players={players} playersVisible={playersVisible}/>
                <Messaging messagesVisible={messagesVisible}/>
                <GameControl queueList={queueList} setQueueList={setQueueList}/>
                <QueueList queueList={queueList} setQueueList={setQueueList}/>
                <Toolbox messagesVisible={messagesVisible} setMessagesVisible={setMessagesVisible}
                         playersVisible={playersVisible} setPlayerVisible={setPlayerVisible}
                         roomIdVisible={roomIdVisible} setRoomIdVisible={setRoomIdVisible}
                />
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
