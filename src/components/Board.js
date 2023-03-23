import React, {useState} from "react";
import Canvas from "./Canvas";
import Preview from "./Preview";
import buildPlayer from "../services/buildPlayer";
import {CanvasPlayer} from "../services/CanvasPlayer";

const Board = ({ cols, rows, setStartGame }) => {
    const [player, setPlayer] = useState(buildPlayer());
    const resetPlayer = () => {
        setPlayer((prev) => buildPlayer(prev));
    }

    const [canvas, setCanvas] = useState(CanvasPlayer({rows, cols, player, resetPlayer}));

    return (
        <div className="game-place">
            <Canvas table={canvas}/>
            <Preview blocks={player.blocks}/>
        </div>
    );
}

export default Board;