import React, { useState } from "react";

export type Coordinate = [number, number];

const BOARD_SIZE = 8;

const ChessBoard = () => {
    const [knightPos, setKnightPos] = useState<Coordinate>([4, 3]);

    const canMoveTo = (pos: Coordinate): boolean => {
        const [x, y] = pos;
        const [knightX, knightY] = knightPos;
        const dx = Math.abs(x - knightX);
        const dy = Math.abs(y - knightY);
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    };

    const getPossibleMoves = (): Coordinate[] => {
        const possibleMoves: Coordinate[] = [];
        for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
                if (Math.abs(dx) + Math.abs(dy) === 3) {
                    const [x, y] = [knightPos[0] + dx, knightPos[1] + dy];
                    if (
                        x >= 0 &&
                        x < BOARD_SIZE &&
                        y >= 0 &&
                        y < BOARD_SIZE &&
                        canMoveTo([x, y])
                    ) {
                        possibleMoves.push([x, y]);
                    }
                }
            }
        }
        console.log(possibleMoves)
        return possibleMoves;
    };

    const renderSquare = (row: number, col: number) => {
        const isKnightHere = row === knightPos[0] && col === knightPos[1];
        const isPossibleMove = getPossibleMoves().some(
            (move) => move[0] === row && move[1] === col
        );
        console.log(isPossibleMove)
        const backgroundColor = isPossibleMove
            ? "#b5ffb5"
            : isKnightHere
                ? "#7ec0ee"
                : (row + col) % 2 === 0
                    ? "#f0d9b5"
                    : "#b58863";

        return (
            <div
                key={`${row}-${col}`}
                style={{
                    backgroundColor,
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                }}
                onClick={() => setKnightPos([row, col])}
            >
                {isKnightHere ? "♘" : ""}
            </div>
        );
    };

    const renderBoard = () => {
        const squares = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                squares.push(renderSquare(row, col));
            }
        }
        return <div style={{ display: "flex", flexWrap: "wrap", width: "640px", margin: 'auto' }}>{squares}</div>;
    };

    return (
        <div>
            <h1>Click on a square to generate possible moves</h1>
            {renderBoard()}
        </div>
    );
};

export default ChessBoard;
