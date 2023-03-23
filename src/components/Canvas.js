import React from "react";
import './Canvas.css';
const Canvas = ({ table }) => {
console.log(table)
    const tableStyle = {
        gridTemplateRows: `repeat(${table.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${table.size.columns}, 1fr)`
    };

    return (
        <div className="canvas" style={tableStyle}>
            {table.rows.map((row , y) => (
                row.map((cell, x) =>
                    <div key={ x * table.size.cols + x } className={`cell ${cell.className}`}>
                        <div className="full"></div>
                    </div>
                )
                ))
            }
        </div>
    )
}

export default Canvas;