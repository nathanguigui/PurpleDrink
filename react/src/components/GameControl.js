import React from "react";
import "../styles/GameControl.css"
import "../styles/material-css.css"
import Clap from "../assets/clap.svg"
import Purple from "../assets/purple.svg"
import Sandwich from "../assets/sandwich.svg"
import Red from "../assets/red.svg"
import Black from "../assets/black.svg"
import Dice from "../assets/dice.svg"

const GameControl = ({queueList, setQueueList}) => {

    const addToQueue = (action) => {
        setQueueList([...queueList, action])
    };

    return (
        <div className={"game-control-ctr"}>
            <div className={"game-control-ctn"}>
                <button style={{marginTop: "5px"}} className={"matter-button-outlined matter-success game-control-btn"}>Start Game <img className={"game-control-logo"} alt={""} src={Clap}/></button>
                <button onClick={() => addToQueue("purple")} style={{marginTop: "5px"}} className={"matter-button-outlined matter-success game-control-btn"}>Purple <img className={"game-control-logo"} alt={""} src={Purple}/></button>
                <button onClick={() => addToQueue("sandwich")} style={{marginTop: "5px"}} className={"matter-button-outlined matter-success game-control-btn"}>Sandwich <img className={"game-control-logo"} alt={""} src={Sandwich}/></button>
                <button onClick={() => addToQueue("red")} style={{marginTop: "5px"}} className={"matter-button-outlined matter-success game-control-btn"}>Red <img className={"game-control-logo"} alt={""} src={Red}/></button>
                <button onClick={() => addToQueue("black")} style={{marginTop: "5px"}} className={"matter-button-outlined matter-success game-control-btn"}>Black <img className={"game-control-logo"} alt={""} src={Black}/></button>
                <button disabled={!queueList.length} style={{marginTop: "5px"}} className={"matter-button-outlined matter-success game-control-btn"}>Play <img className={"game-control-logo"} alt={""} src={Dice}/></button>
            </div>
        </div>
    )
};

export default GameControl;
