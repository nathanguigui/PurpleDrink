import React, {useContext, useEffect, useState} from "react";
import "../styles/NetworkStatus.css"
import {AppContext} from "../App";

const NetworkStatus = () => {

    const context = useContext(AppContext);

    const [networkStatus, setNetworkStatus] = useState("connected");

    useEffect(() => {

        context.socket.on("connect_failed", () => {
            setNetworkStatus("could not connect to server")
        });

        context.socket.on("connect", () => {
            setNetworkStatus("connected")
        });

        context.socket.on("connect_error", () => {
            setNetworkStatus("could not connect to server")
        });

        context.socket.on("disconnect", () => {
            setNetworkStatus("disconnected from server")
        });

    }, []);

    return (
        <div className={"net-status tooltip"}>
            <span className={"tooltiptext"}>{networkStatus}</span>
            <div className={"led " + (networkStatus === "pending" ? "led-yellow" : (networkStatus === "connected") ? "led-green" : "led-red")}/>
        </div>
    )
};

export default NetworkStatus;
