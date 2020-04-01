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
import {joinSuccessfulResponse} from "../types/RoomTypes";

const Room = () => {
    const context = useContext(AppContext);

    const [loading, setLoading] = useState<boolean>(true);

    const [lobbyNotFound, setLobbyNotFound] = useState<boolean>(false);

    const [errors, setErrors] = useState<Array<string>>();

    const [players, setPlayers] = useState<Array<string>>([]);

    const [messagesVisible, setMessagesVisible] = useState<boolean>(true);

    const [playersVisible, setPlayerVisible] = useState<boolean>(true);

    const [roomIdVisible, setRoomIdVisible] = useState<boolean>(true);

    const [queueList, setQueueList] = useState<Array<string>>([]);

    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const [yourTurn, setYourTurn] = useState<boolean>(false);

    let {roomID} = useParams();

    useEffect(() => {

        // reconnect event
        context.socket.on("playerReconnected", (data:any) => {
            context.setCurrentPlayer(data);
            if (data === null) window.localStorage.clear();
            setLoading(false)
        });

        // successfully joined event
        context.socket.on("joinSuccessful", (data:joinSuccessfulResponse) => {
            window.localStorage.setItem("playerHash", data.playerHash);
            setLoading(false)
        });

        // updatePlayerList event
        context.socket.on("updatePlayerList", (data:Array<string>) => {
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
            <NetworkStatus/>
            {window.localStorage.getItem("playerHash") ?
            <>
                <RoomID roomIdVisible={roomIdVisible}/>
                <PlayerList players={players} playersVisible={playersVisible}/>
                <Messaging messagesVisible={messagesVisible}/>
                <GameControl queueList={queueList} setQueueList={setQueueList} gameStarted={gameStarted} yourTurn={yourTurn}/>
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
