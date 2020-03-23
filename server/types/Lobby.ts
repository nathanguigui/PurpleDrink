import Player from "./Player";

interface Lobby {
    roomId: string
    players: Array<Player>
    gameState: any
    open: boolean
}

export default Lobby;
