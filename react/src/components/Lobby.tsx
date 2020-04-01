import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {
    Redirect
} from "react-router-dom";
import "../styles/Lobby.css"
import "../styles/material-css.css"
import NetworkStatus from "./NetworkStatus";

const Lobby = () => {

    const context = useContext(AppContext);

    const [errors, setErrors] = useState<Array<string>>([]);

    const handleCreateRoom = () => {
        if (!context.currentPlayer) {
            setErrors(["You must set Username"]);
            return
        }
        context.socket.emit("createRoom", context.currentPlayer)
    };

    return (
        <>
        <NetworkStatus />
        <div style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/felt.png)"}} className={"lobby"}>
            <div className={"lobby-ctn"}>
                {context.roomId && (<Redirect to={{pathname: "/game/" + context.roomId}} />)}
                <label className="matter-textfield-outlined matter-success">
                    <input required placeholder=" " value={context.currentPlayer} onChange={(e) => {context.setCurrentPlayer(e.target.value)}}/>
                    <span>Username:</span>
                </label>
                <button style={{marginTop: "10px"}} className={"matter-button-outlined matter-success"} onClick={() => {handleCreateRoom()}}>Create a room</button>
            </div>
            {errors && errors.map((err) => <span style={{"position":"absolute","top":"35%"}}>{err}</span>)}
        </div>
        </>
    )
};

export default Lobby;
