import '../App.css'

const Popup = ({winner , gameOver , setGameOver ,setRed, setBlue, setDiceNumber , setBlueOrRedMove}) => {            


    
        
    

    const resetGame = () => {
        setRed(1);
        setBlue(1);
        setDiceNumber(1);
        setBlueOrRedMove(true);
        setGameOver(!gameOver);
    }

    return (
        <>
        <div className='popup'>
            {winner} Won!✌️
            <button className='reset' onClick={resetGame}>RESET</button>
        </div>
        </>
    )
}

export default Popup;