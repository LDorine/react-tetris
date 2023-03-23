import React from "react";

const  className = 'block';

const BLOCKS = {
    I: {
        className: `${className} ${className}-i`,
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    },
    L: {
        className: `${className} ${className}-l`,
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    },
    L2: {
        className: `${className} ${className}-L`,
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]
    },
    T: {
        className: `${className} ${className}-t`,
        shape: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]
        ]
    },
    O: {
        className: `${className} ${className}-o`,
        shape: [
            [1, 1],
            [1, 1],
        ]
    },
    Z: {
        className: `${className} ${className}-z`,
        shape: [

            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    },
    S: {
        className: `${className} ${className}-s`,
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ]
    }
};

const randomBlock = () => {
    const foundKey = Math.floor(Math.random() * Object.keys(BLOCKS).length);
    const choose = Object.keys(BLOCKS)[foundKey];
    return BLOCKS[choose];
}

const rotate = ({ piece, direction }) => {
    const newPiece = piece.map((_, index) =>
        piece.map((column) => column[index])
    );

    if (direction > 0) return newPiece.map((row) => row.reverse());

    return newPiece.reverse();
};


const TransfertToCanvas = ({className, isUse, position, rows, shape}) => {
    shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                const axisY = y + position.row;
                const axisX = x + position.col;
                rows[axisY][axisX] = {isUse, className};
            }
        });
    });

    return rows;
}

export {TransfertToCanvas, BLOCKS, randomBlock, rotate};