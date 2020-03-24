import React from "react";
import "../styles/NetworkStatus.css"

const NetworkStatus = ({status}) => {
    return (
        <div className={"net-status tooltip"}>
            <span className={"tooltiptext"}>{status}</span>
            <div className={"led " + (status === "pending" ? "led-yellow" : (status === "connected") ? "led-green" : "led-red")}/>
        </div>
    )
};

export default NetworkStatus;
