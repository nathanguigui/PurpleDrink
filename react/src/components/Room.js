import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {
  useParams
} from "react-router-dom";
import Loading from "./Loading";

const Room = () => {
    const context = useContext(AppContext);

    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState(null);

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
            console.log(data);
        });

        // if local storage hash try reconnect
        if (window.localStorage.getItem("playerHash"))
            context.socket.emit("reconnectPlayer", window.localStorage.getItem("playerHash"));
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
        <div>
            {window.localStorage.getItem("playerHash") ?
            <>
                <p>here is room</p>
                <p>{roomID}</p>
                <p>{context.currentPlayer}</p>
            </> :
            <>
                <input value={context.currentPlayer} onChange={(e) => {context.setCurrentPlayer(e.target.value)}}/>
                {errors && errors.map((err) => <h4>{err}</h4>)}
                <button onClick={() => {handleJoinRoom()}}>Join room</button>
            </>
            }
        </div>
    )
};

export default Room;
