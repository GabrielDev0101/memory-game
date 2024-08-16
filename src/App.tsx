import { useState } from "react"
import './App.css'

type TCell = {
  row: number,
  col: number
}

const REVEAL_DELAY = 1000; // Constante para o delay de revelação

function App() {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousClick, setPreviousClick] = useState<TCell | undefined>();

  const handleCardClicked = (rowIndex: number, colIndex: number) => {
    if (revealedGrid[rowIndex][colIndex]) return;

    const clickedNumber = grid[rowIndex][colIndex];
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    if (previousClick) {
      handleSecondClick(rowIndex, colIndex, clickedNumber, newRevealedGrid);
    } else {
      setPreviousClick({ row: rowIndex, col: colIndex });
    }
  };

  const handleSecondClick = (
    rowIndex: number,
    colIndex: number,
    clickedNumber: number,
    newRevealedGrid: boolean[][]
  ) => {
    const previousClickNumber = grid[previousClick!.row][previousClick!.col];

    if (previousClickNumber !== clickedNumber) {
      setTimeout(() => {
        hideCards(rowIndex, colIndex, newRevealedGrid);
      }, REVEAL_DELAY);
    } else {
      checkForWin(newRevealedGrid);
    }

    setPreviousClick(undefined);
  };

  const hideCards = (
    rowIndex: number,
    colIndex: number,
    newRevealedGrid: boolean[][]
  ) => {
    newRevealedGrid[rowIndex][colIndex] = false;
    newRevealedGrid[previousClick!.row][previousClick!.col] = false;
    setRevealedGrid([...newRevealedGrid]);
  };

  const checkForWin = (newRevealedGrid: boolean[][]) => {
    const hasWon = newRevealedGrid.flat().every(isRevealed => isRevealed);
    if (hasWon) {
      setTimeout(() => {
        alert('YOU WON');
      });
    }
  };

  return (
    <div className='App'>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, colIndex) => (
              <div
                onClick={() => handleCardClicked(rowIndex, colIndex)}
                key={colIndex}
                className={
                  "card" + (revealedGrid[rowIndex][colIndex] ? ' revealed' : "")
                }
              >
                {revealedGrid[rowIndex][colIndex] ? number : " "}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
