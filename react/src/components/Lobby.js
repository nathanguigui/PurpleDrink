import React, {useContext, useState} from "react";
import {AppContext} from "../App";
import {
    Redirect
} from "react-router-dom";

const Lobby = () => {

    const context = useContext(AppContext);

    const [errors, setErrors] = useState(null);

    const handleCreateRoom = () => {
        if (!context.currentPlayer.length) {
            setErrors(["You must set username"]);
            return
        }
        context.socket.emit("createRoom", context.currentPlayer)
    };

    return (
        <div>
            {context.roomId && (<Redirect to={{pathname: "/game/" + context.roomId}} />)}
            <input value={context.currentPlayer} onChange={(e) => {context.setCurrentPlayer(e.target.value)}}/>
            {errors && errors.map((err) => <h4>{err}</h4>)}
            <button onClick={() => {handleCreateRoom()}}>Create a room</button>
        </div>
    )
}

export default Lobby;
