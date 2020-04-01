import React, {useContext} from "react";
import {AppContext} from "../App";
import "../styles/Player.css"

interface PlayerListProps {
    players: Array<string>,
    playersVisible: boolean
}

const PlayerList = (props: PlayerListProps) => {

    const context = useContext(AppContext);

    return (
         <div className={props.playersVisible ? "player-list-ctn" : "player-list-ctn player-hidden"}>
             <div className={"player-list"}>
                 <div className={"player-you"}><div>{context.currentPlayer}</div> <div className={"current-player-label"}>you</div></div>
                 <div>
                     {props.players.length !== 1 ?
                         props.players.map((player) => {
                             if (context.currentPlayer !== player)
                                 return <><div key={player}>{player}</div><br/></>;
                         }) :
                         <div className={"player-other"}>you need more player to play</div>
                     }
                 </div>
             </div>
         </div>
    )
};

export default PlayerList;
