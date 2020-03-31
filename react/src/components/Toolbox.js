import React from "react";
import "../styles/material-css.css"
import "../styles/Toolbox.css"

const Toolbox = ({messagesVisible, setMessagesVisible, playersVisible, setPlayerVisible, roomIdVisible, setRoomIdVisible}) => {
    return (
        <div className={"toolbox-container"}>
            <div className={"toolbox-background"}>
                <label className="matter-checkbox matter-success">
                    <input onClick={() => setPlayerVisible(!playersVisible)} type="checkbox" checked={playersVisible}/>
                    <span>Show player</span>
                </label>
                <label className="matter-checkbox matter-success">
                    <input onClick={() => setRoomIdVisible(!roomIdVisible)} type="checkbox" checked={roomIdVisible}/>
                    <span>Show room ID</span>
                </label>
                <label className="matter-checkbox matter-success">
                    <input onClick={() => setMessagesVisible(!messagesVisible)} type="checkbox" checked={messagesVisible}/>
                    <span>Show message</span>
                </label>
            </div>
        </div>
    )
};

export default Toolbox;
