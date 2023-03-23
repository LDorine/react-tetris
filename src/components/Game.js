import React, {useState} from "react";
import Menu from "./Menu";
import Board from "./Board";

const Game = () => {
    const board = {cols: 15, rows: 10}

    const [startGame, setStartGame] = useState(false);

    // const resetStartGame = () => {
    //   setStartGame(true);
    // }

    const start = () => {
      setStartGame(true);
    }

    return (
        <div className="tetris">
            {startGame ? (
                <Board rows={board.rows} cols={board.cols} setStartGame={setStartGame}/>
                ) : (
                <Menu start={start}/>
            )}
        </div>
    );
}

export default Game;