import "./GameController.css";
import {Action, actionForKey} from "../services/Input";
import {Controller} from "../services/Controller";

const GameController = ({canvas, player, setGameOver, setPlayer}) => {

    const onKeyUp = ({ code }) => {
        actionForKey(code);
    };

    const onKeyDown = ({ code }) => {
        const action = actionForKey(code);

        if (action === Action.Quit) {
            setGameOver(true);
        } else {
            handleInput({ action });
        }
    };

    const handleInput = ({ action }) => {
        Controller({
            action,
            canvas,
            player,
            setPlayer,
            setGameOver
        });
    };

    return (
        <input
            className="GameController"
            type="text"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            autoFocus
        />
    );
};

export default GameController;
