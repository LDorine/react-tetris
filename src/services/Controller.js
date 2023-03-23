import {rotate} from "./Blocks";
import {hasCollision, isWithinCanvas} from "./buildCanvas";
import {Action} from "./Input";


const attemptRotation = ({ canvas, player, setPlayer }) => {
    const shape = rotate({
        piece: player.tetromino.shape,
        direction: 1
    });

    const position = player.position;
    const isValidRotation =
        isWithinCanvas({ canvas, position, shape }) &&
        !hasCollision({ canvas, position, shape });

    if (isValidRotation) {
        setPlayer({
            ...player,
            tetromino: {
                ...player.tetromino,
                shape
            }
        });
    } else {
        return false;
    }
};

export const movePlayer = ({ delta, position, shape, canvas }) => {
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    };

    const collided = hasCollision({
        canvas,
        position: desiredNextPosition,
        shape
    });

    const isOnCanvas = isWithinCanvas({
        canvas,
        position: desiredNextPosition,
        shape
    });

    const preventMove = !isOnCanvas || (isOnCanvas && collided);
    const nextPosition = preventMove ? position : desiredNextPosition;

    const isMovingDown = delta.row > 0;
    const isHit = isMovingDown && (collided || !isOnCanvas);

    return { collided: isHit, nextPosition };
};

const attemptMovement = ({ canvas, action, player, setPlayer, setGameOver }) => {
    const delta = { row: 0, column: 0 };
    let isFastDropping = false;

    if (action === Action.FastDrop) {
        isFastDropping = true;
    } else if (action === Action.SlowDrop) {
        delta.row += 1;
    } else if (action === Action.Left) {
        delta.column -= 1;
    } else if (action === Action.Right) {
        delta.column += 1;
    }

    const { collided, nextPosition } = movePlayer({
        delta,
        position: player.position,
        shape: player.tetromino.shape,
        canvas
    });

    // Did we collide immediately? If so, game over, man!
    const isGameOver = collided && player.position.row === 0;
    if (isGameOver) {
        setGameOver(isGameOver);
    }

    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPosition
    });
};

export const Controller = ({ action, canvas, player, setPlayer, setGameOver }) => {
    if (!action) return;

    if (action === Action.Rotate) {
        attemptRotation({ canvas, player, setPlayer });
    } else {
        attemptMovement({ canvas, player, setPlayer, action, setGameOver });
    }
};
