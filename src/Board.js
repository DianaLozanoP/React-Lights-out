import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i <= nrows - 1; i++) {
      let miniArr = []
      for (let i = 0; i <= ncols - 1; i++) {
        miniArr.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(miniArr)
    }
    return initialBoard;
  }

  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
    const anyLightOn = board.every(row =>
      row.every(
        each => each === false
      ))
    return anyLightOn;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);
      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => row.slice());

      const flipCell = (x, y, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
          boardCopy[x][y] = !boardCopy[x][y];
        }
      };

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(x, y, boardCopy);
      //flipping left cell
      flipCell(x, y + 1, boardCopy);
      //flipping right cell
      flipCell(x, y - 1, boardCopy);
      //flipping cell below
      flipCell(x + 1, y, boardCopy);
      //flipping cell above
      flipCell(x - 1, y, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  // make table board
  const boardTable = board.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((cell, colIndex) => (
        <Cell
          key={[rowIndex, colIndex]}
          isLit={cell}
          flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
        />
      ))}
    </tr>
  ))
  // TODO
  return (
    <>
      <h1>Lights Out Game</h1>
      <p>Lights Out is a logic/puzzle game, played on a gird of individual lights,
        which can either be lit or unlit. The puzzle is won when when all of the lights are turned off.
      </p>
      <p>You can click on a cell to toggle that light — but it also toggles the light above it,
        to the left of it, to the right of it, and below it.
      </p>

      {hasWon(board) ?
        <h2> Congratulations! You have won!</h2>
        :
        <table className="Board">
          <tbody>{boardTable}</tbody>
        </table>
      }
    </>
  );

}

export default Board;
