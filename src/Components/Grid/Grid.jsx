import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css"
import isWinner from "../Helpers/CheckWinner";

function Grid({numberofCards}){
    const [board,Setboard]  = useState(Array(numberofCards).fill(""));
    const [turn , setTurn] = useState(true)  // turn => true = O or turn => false = X 
    const [winner ,setWinner] = useState(null);
    const [end , setEnd]  = useState(false);
    
    function play(index){
        if( turn == true){
            board[index] = 'O'
        }
        else if( turn == false){
            board[index] = 'X'
        }
        const win = isWinner(board,turn ? 'O' : 'X');
        if(win){
            setWinner(win);
            setEnd(!end)
        }
        Setboard([...board]);
        setTurn(!turn);
        
    }

    function reset(){
        setTurn(true)
        Setboard(Array(numberofCards).fill(""))
        setWinner(null)
        setEnd(false)
    }
    return (
        <div className="grid-wrapper">
            <h1 className="turn-highlight">{(end) ? 'Game Over' : `Current Turn : ${(turn) ? 'O' : 'X'}`}</h1>

            <div className="grid">
                {board.map(( el , idx) => <Card key={idx} player={el} onPlay={play} index={idx} gameEnd={winner ? true : false }/>)}
            </div>

            {
                winner && (
                    <>
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }
        </div>

        
    );
}
export default Grid;