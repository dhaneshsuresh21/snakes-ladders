import { useRef } from "react";
const Dice = ({ diceNumber, blue, setBlue, red, setRed, setDiceNumber, blueOrRedMove, setBlueOrRedMove, jumpSound ,gameOver , setGameOver ,setWinner}) => {

    
    // const [gameOver , setGameOver] = useState(false);

    // const [winner , setWinner] = useState("");

    const dice = new Map([
        [1, ["middle-dot"]],
        [2, ["bottom-left-dot", "top-right-dot"]],
        [3, ["bottom-left-dot", "middle-dot", "top-right-dot"]],
        [4, ["bottom-left-dot", "bottom-right-dot", "top-right-dot", "top-left-dot"]],
        [5, ["bottom-left-dot", "bottom-right-dot", "middle-dot", "top-right-dot", "top-left-dot"]],
        [6, ["bottom-left-dot", "bottom-middle-dot", "bottom-right-dot", "top-right-dot", "top-middle-dot", "top-left-dot"]]
    ]);

    const snakeCells = new Map([
        [99, 41],
        [93, 34],
        [86, 14],
        [77, 45],
        [59, 5],
        [48, 12],
        [38, 2],
        
    ]);

    const ladderCells = new Map([
        [4,36],
        [13,47],
        [50,72],
        [46,87],
        [57,98]
    ]);

    const setIntervalRef = useRef(null);

    const rollDice = async () => {


        if (setIntervalRef.current)
            return;

        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(randomNumber);
        let count = 0;

        if(blueOrRedMove && (blue+randomNumber > 100))
        {
            setBlueOrRedMove(!blueOrRedMove);
            return;
        }
        else if(!blueOrRedMove && (red+randomNumber > 100)){
            setBlueOrRedMove(!blueOrRedMove);
            return;
        }


        setIntervalRef.current = setInterval(async () => {
            if (count >= randomNumber) {
                clearInterval(setIntervalRef.current);
                setIntervalRef.current = null;

                const currentPlayer = blueOrRedMove ? 'blue' : 'red';
                const currentPosition = currentPlayer === 'blue' ? blue + randomNumber  : red + randomNumber ;

                if(currentPosition === 100){
                    setWinner(currentPlayer);
                    setGameOver(!gameOver);
                    return;
                }

                console.log("position "+currentPosition);
                if (snakeCells.has(currentPosition)) {
                    const destination = snakeCells.get(currentPosition);
                    if (currentPlayer === 'blue') {
                        setBlue(destination);
                    } else {
                        setRed(destination);
                    }
                }

                if (ladderCells.has(currentPosition)) {
                    const destination = ladderCells.get(currentPosition);
                    if (currentPlayer === 'blue') {
                        setBlue(destination);
                    } else {
                        setRed(destination);
                    }
                }


                setBlueOrRedMove(!blueOrRedMove);
            } else {

                if (blueOrRedMove)
                    await setBlue((blue) => blue + 1);
                else
                    await setRed((red) => red + 1);
                jumpSound.play();
                count++;
                console.log(blue + " " + red);


            }
        }, 500); // Adjust the interval time as needed

        

        


        // console.log("randomNumber: " + randomNumber);
    }

    return (
        <>
            <button className="dice" onClick={rollDice}>
                {/* <div className="middle-dot"></div> */}
                {/* <div className="top-right-dot"></div>
                <div className="bottom-left-dot"></div> */}
                {
                    dice.get(diceNumber).map((value) => {
                        return <div key={value} className={value}></div>
                    })

                }

            </button>
        </>
    )
}

export default Dice