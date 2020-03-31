import React, {useContext} from "react";
import {AppContext} from "../App";

const PlayerList = ({players}) => {

    const context = useContext(AppContext);

    return (
         <div className={"player-list-ctn"}>
             <div className={"player-list"}>
                 <div className={"player-you"}><div>{context.currentPlayer}</div> <div className={"current-player-label"}>you</div></div>
                 <div>
                     {players.length !== 1 ?
                         players.map((player) => {
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
