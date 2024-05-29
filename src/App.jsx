import { useState } from 'react';
import { GrPowerReset } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const makeMove = (index) => {
    if (board[index] || gameOver) return;
    let newArray = board.slice();
    newArray[index] = xTurn ? 'X' : 'O';
    setBoard(newArray);
 
    const winner = calculateWinner(newArray);
    const isDraw = checkDraw(newArray);

    if (winner) {
      setGameOver(true);
      if (winner === 'X') setScoreX(scoreX + 1);
      else if (winner === 'O') setScoreO(scoreO + 1);
    } else if (isDraw) {
      setGameOver(true);
    } else {
      setXTurn(!xTurn);
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkDraw = (board) => {
    return board.every(cell => cell !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setGameOver(false);
    setScoreO(0);
    setScoreX(0);
  };

  const playAgain = (board) => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setGameOver(false);
  }
  const winner = calculateWinner(board);
  const isDraw = !winner && checkDraw(board);

  return (
    <div className="bg-blue-800 h-screen w-full flex justify-center items-center">
      <div className="grid gap-4">
        <div className="text-center mb-2 text-white font-sans font-semibold text-4xl">⚔️|Tic-Tac-Toe|⚔️</div>
        <div className='text-center text-xl text-orange-500'>
          {winner ? (
            <div>Congratulations, The winner is {winner}!</div>
          ) : isDraw ? (
            <div>OOps, It's a Draw!</div>
          ) : (
            xTurn ? <div>Player X Turn...</div> : <div>Player O Turn...</div>
          )}
        </div>
        <div className="h-72 w-72 border-black border-2 rounded-lg p-2 bg-orange-300">
          <div className="grid-container w-full h-full text-4xl font-bold cursor-pointer font-mono">
            {board.map((value, index) => (
              <div
                key={index}
                className="grid-item flex items-center justify-center border-2 border-black"
                onClick={() => makeMove(index)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#FFDA78] rounded-lg border-2 border-black">
          <div className="text-center text-lg font-bold border-b-2 border-black">Scorecard</div>
          <div className="flex justify-around text-xl py-2 font-bold">
            <div>Player X: {scoreX}</div>
            <div>Player O: {scoreO}</div>
          </div>
        </div>
        <div className="flex justify-around">
          <button className=' bg-green-500 flex items-center shadow-black shadow-lg rounded-lg px-2 py-1 gap-1' onClick={playAgain}>Play Again <FaHeart /></button>
          <button
            className='bg-[#FF7F3E] flex items-center shadow-black shadow-lg rounded-lg px-2 py-1 gap-1'
            onClick={resetGame}>
            Reset Game <GrPowerReset />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
