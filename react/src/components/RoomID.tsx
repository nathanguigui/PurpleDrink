import React, {useState} from "react";
import {useParams} from "react-router-dom";
import "../styles/RoomID.css"
import CopyToClipboard from "react-copy-to-clipboard";

interface RoomIDProps {
    roomIdVisible: boolean
}

const RoomID = (props: RoomIDProps) => {

    const [copied, setCopied] = useState(false);

    const handleOnCopy = () => {
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 2500)
    };

    let {roomID} = useParams();

    return (
        <div className={props.roomIdVisible ? "room-id-container" : "room-id-container room-id-hidden"}>
            <div className={"room-id-panel"}>
                <div>Room ID:</div>
                <p>{roomID}</p>
                <CopyToClipboard text={window.location.origin + "/game/" + roomID} onCopy={() => handleOnCopy()}>
                    <button className={"matter-button-outlined matter-success"}>Copy link</button>
                </CopyToClipboard>
            </div>
            <p className={(copied ? "room-id-tooltip" : "hidden room-id-tooltip")}>Sharing link copied to clipboard</p>
        </div>
    )
};

export default RoomID;
