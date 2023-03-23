import React from "react";

import {TransfertToCanvas} from "../services/Blocks";
import "./Preview.css"
import {BuildCanvas} from "../services/buildCanvas";

const Preview = ({ blocks }) => {

    return (
       <div className="previw-container">
           {blocks
               .slice(1 - blocks.length)
               .reverse()
               .map((block, index) => (
               <PreviewCanvas block={block} index={index} />
           ))}
       </div>
    )
}

const PreviewCanvas = ({index, block}) => {
    const { shape, className } = block;
    const style = { top: `${index * 15}vw` };

    const canvas = BuildCanvas({rows: 4, cols: 4});
    canvas.rows = TransfertToCanvas({
        className,
        isUse: false,
        position: {row: 0, col: 0},
        rows: canvas.rows,
        shape
    });

    return (
        <div className="preview" style={style} key={index}>
            <div className="preview-canvas">
                {canvas.rows.map((row, y) => (
                    row.map((cell, x) => (
                        <div key={ x * y + x } className={`cell ${cell.className}`}>
                            <div className="full"></div>
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default Preview;