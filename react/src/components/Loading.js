import React from "react";
import "../styles/loading.css";


const Loading = () => {
    return (
        <div style={LoadingStyle}>
            <progress className="matter-progress-circular"/>
        </div>
    )
};

const LoadingStyle = {
    display: "flex",
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
};

export default Loading;
