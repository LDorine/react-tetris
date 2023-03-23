import {randomBlock} from "./Blocks";

const buildPlayer = (previous) => {
    let blocks;

    if (previous) {
        blocks = [...previous.blocks];
        blocks.unshift(randomBlock());
    } else {
        blocks = Array(2).fill(1).map(() => randomBlock())
    }

    return {
        use: false,
        position: {row: 0, col: 4},
        blocks,
        block: blocks.pop()
    };
}

export default buildPlayer;