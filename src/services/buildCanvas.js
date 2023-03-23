import {movePlayer} from "./Controller";
import {TransfertToCanvas} from "./Blocks";

const defaultCell = { use: false, className: "" };

const BuildCanvas = ({rows, cols}) => {

    const buildCanvas = Array.from(
        {length: rows}, () => Array.from(
            {length: cols}, () => ({...defaultCell})
        )
    );

    return {
        rows: buildCanvas,
        size: { rows, cols }
    }
}

const findDropPosition = ({ canvas, position, shape }) => {
    let max = canvas.size.rows - position.row + 1;
    let row = 0;

    for (let i = 0; i < max; i++) {
        const delta = { row: i, column: 0 };
        const result = movePlayer({ delta, position, shape, canvas });
        const { collided } = result;

        if (collided) {
            break;
        }

        row = position.row + i;
    }

    return { ...position, row };
};

const nextCanvas = ({ canvas, player, resetPlayer }) => {
    const { tetromino, position } = player;

    // Copy and clear spaces used by pieces that
    // hadn't collided and use spaces permanently
    let rows = canvas.rows.map((row) =>
        row.map((cell) => (cell.use ? cell : { ...defaultCell }))
    );

    // Drop position
    const dropPosition = findDropPosition({
        canvas,
        position,
        shape: tetromino.shape
    });

    // Place ghost
    const className = `${tetromino.className} ${
        player.isFastDropping ? "" : "ghost"
    }`;
    rows = TransfertToCanvas({
        className,
        isuse: player.isFastDropping,
        position: dropPosition,
        rows,
        shape: tetromino.shape
    });

    // Place the piece.
    // If it collided, mark the canvas cells as collided
    if (!player.isFastDropping) {
        rows = TransfertToCanvas({
            className: tetromino.className,
            isuse: player.collided,
            position,
            rows,
            shape: tetromino.shape
        });
    }

    // Check for cleared lines
    const blankRow = rows[0].map((_) => ({ ...defaultCell }));

    rows = rows.reduce((acc, row) => {
        if (row.every((column) => column.use)) {
            acc.unshift([...blankRow]);
        } else {
            acc.push(row);
        }

        return acc;
    }, []);

    // If we collided, reset the player!
    if (player.collided || player.isFastDropping) {
        resetPlayer();
    }

    // Return the next canvas
    return {
        rows,
        size: { ...canvas.size }
    };
};

const hasCollision = ({ canvas, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;

                if (
                    canvas.rows[row] &&
                    canvas.rows[row][column] &&
                    canvas.rows[row][column].use
                ) {
                    return true;
                }
            }
        }
    }

    return false;
};

const isWithinCanvas = ({ canvas, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;
                const isValidPosition = canvas.rows[row] && canvas.rows[row][column];

                if (!isValidPosition) return false;
            }
        }
    }

    return true;
};

export {BuildCanvas, findDropPosition, nextCanvas, hasCollision, isWithinCanvas};