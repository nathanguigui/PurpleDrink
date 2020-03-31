import React from "react";
import "../styles/QueueList.css"
import Purple from "../assets/purple.svg"
import Sandwich from "../assets/sandwich.svg"
import Red from "../assets/red.svg"
import Black from "../assets/black.svg"

const QueueList = ({queueList, setQueueList}) => {

    const remFromQueue = (idx) => {
        queueList.splice(idx, 1);
        setQueueList([...queueList])
    };

    const getNameWithIcon = (action) => {
        let ret;
        switch (action) {
            case "red":
                ret = <div className={"queue-item-logo"}>Red <img className={"game-control-logo"} alt={""} src={Red}/></div>;
                break;
            case "black":
                ret = <div className={"queue-item-logo"}>Black <img className={"game-control-logo"} alt={""} src={Black}/></div>;
                break;
            case "purple":
                ret = <div className={"queue-item-logo"}>Purple <img className={"game-control-logo"} alt={""} src={Purple}/></div>;
                break;
            case "sandwich":
                ret = <div className={"queue-item-logo"}>Sandwich <img className={"game-control-logo"} alt={""} src={Sandwich}/></div>;
                break;
            default:
                ret = <div>error</div>;
                break
        }
        return ret;
    };

    return (
        <div className={"queue-ctr"}>
            <div className={"queue-ctn"}>
                <div style={{textAlign: "center", fontWeight: 600}}>Queue list ({queueList.length})</div>
                {queueList.map((item, idx) =>
                    <div className={"queue-item"}>
                        {getNameWithIcon(item)}
                        <div className={"queue-remove"} onClick={() => remFromQueue(idx)}>✘</div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default QueueList;
