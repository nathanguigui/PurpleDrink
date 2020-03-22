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

        context.socket.on("playerReconnected", data => {
            context.setCurrentPlayer(data);
            if (data === null) window.localStorage.clear();
            setLoading(false)
        });

        if (window.localStorage.getItem("playerHash"))
            context.socket.emit("reconnectPlayer", window.localStorage.getItem("playerHash"))
    }, []);

    const handleJoinRoom = () => {
        if (!context.currentPlayer.length) {
            setErrors(["You must set username"]);
            return
        }
        context.socket.emit("joinRoom", context.currentPlayer)
    };

    if (loading) return <Loading/>;

    return (
        <div>
            {context.currentPlayer ?
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
