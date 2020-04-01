import React from "react";
import "../styles/material-css.css"
import "../styles/Toolbox.css"

interface ToolboxProps {
    messagesVisible: boolean,
    setMessagesVisible: any,
    playersVisible: boolean,
    setPlayerVisible: any,
    roomIdVisible: boolean,
    setRoomIdVisible:any
}

const Toolbox = (props: ToolboxProps) => {
    return (
        <div className={"toolbox-container"}>
            <div className={"toolbox-background"}>
                <label className="matter-checkbox matter-success">
                    <input onClick={() => props.setPlayerVisible(!props.playersVisible)} type="checkbox" checked={props.playersVisible}/>
                    <span>Show player</span>
                </label>
                <label className="matter-checkbox matter-success">
                    <input onClick={() => props.setRoomIdVisible(!props.roomIdVisible)} type="checkbox" checked={props.roomIdVisible}/>
                    <span>Show room ID</span>
                </label>
                <label className="matter-checkbox matter-success">
                    <input onClick={() => props.setMessagesVisible(!props.messagesVisible)} type="checkbox" checked={props.messagesVisible}/>
                    <span>Show message</span>
                </label>
            </div>
        </div>
    )
};

export default Toolbox;
