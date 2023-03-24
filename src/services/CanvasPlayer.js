import { useState, useEffect } from "react";
import {BuildCanvas, nextCanvas} from "./buildCanvas";

const CanvasPlayer = ({rows, columns, player, resetPlayer
                         }) => {
    const [canvas, setCanvas] = useState(BuildCanvas({ rows, columns }));

    useEffect(() => {
        setCanvas((previous) =>
            nextCanvas({
                canvas: previous,
                player,
                resetPlayer
            })
        );
    }, [player, resetPlayer]);

    return canvas;
};

export {CanvasPlayer}
