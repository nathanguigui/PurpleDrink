import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "../styles/RoomID.css"

const RoomID = () => {

    const [copied, setCopied] = useState(false);

    const handleOnCopy = () => {
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 2500)
    };

    let {roomID} = useParams();

    return (
        <div className={"room-id-container"}>
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
