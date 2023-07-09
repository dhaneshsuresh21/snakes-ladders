import { useEffect, useState, useRef } from 'react';
import { Howl, Howler } from 'howler';
import '../App.css';


import JumpSound from './sound-effect/jump-sound.wav'

import Cell from "./Cell";

import SnakeCell77 from './snakes/SnakeCell77';
import SnakeCell93 from './snakes/SnakeCell93';
import SnakeCell59 from './snakes/SnakeCell59';
import SnakeCell99 from './snakes/SnakeCell99';
import SnakeCell38 from './snakes/SnakeCell38';
import SnakeCell48 from './snakes/SnakeCell48';
import SnakeCell86 from './snakes/SnakeCell86';

import LadderCell4 from './ladders/LadderCell4';
import LadderCell46 from './ladders/LadderCell46';
import LadderCell57 from './ladders/LadderCell57';
import LadderCell50 from './ladders/LadderCell50';
import LadderCell13 from './ladders/LadderCell13';

import Blue from './players/Blue';
import Red from './players/Red';
import Dice from './dice/Dice';
import ColorBox from './ColorBox';

import Popup from './Popup';

const Board = () => {


    const [gameOver , setGameOver] = useState(false);

    const [winner , setWinner] = useState("");

    const jumpSound = new Howl({
        src: [JumpSound],
        volume: 1,
    });

    const snakeCells = new Map([
        [99,41],
        [93,34],
        [86,14],
        [77,45],
        [59,5],
        [48,12],
        [38,2]
    ]);

    const ladderCells = new Map([
        [4,36],
        [13,47],
        [50,72],
        [46,87],
        [57,98]
    ]);

    const setIntervalRef = useRef(null);

    const [blueOrRedMove, setBlueOrRedMove] = useState(true);

    const [diceNumber, setDiceNumber] = useState(1);
    const [red, setRed] = useState(1);
    const [blue, setBlue] = useState(1);

    const cells = [];


    const generateBoard = () => {
        let opposite = false;
        const size = 10;

        for (let i = 0; i < size; i++) {

            let subtract = 9;
            let add = 1;
            for (let j = 0; j < size; j++) {

                let curNumber;
                const key = (i * size + j) + 1;
                const number = 101 - key;

                if (opposite) {
                    if (subtract > 0) {
                        curNumber = number - subtract;
                        subtract = subtract - 2;
                    }
                    else {
                        curNumber = number + add;
                        add = add + 2;
                    }
                }
                else
                    curNumber = number;
                cells.push(<Cell key={curNumber} number={curNumber} blue={blue} red={red} />);
            }
            opposite = !opposite;
        }
    }

    generateBoard();

    const resetBoard = () => {
        setRed(1);
        setBlue(1);
        setDiceNumber(1);
        setBlueOrRedMove(true);
    }

    const makeJumpSound = () => {

    }

    const gridSize = 10; // Set the size of the grid


    // console.log(cells);


    return (
        <>
            {
                gameOver === false ? <> 
                <div id="game-board" className="">
                {cells}

                <SnakeCell77 />
                <SnakeCell93 />
                <SnakeCell59 />
                <SnakeCell99 />
                <SnakeCell38 />
                <SnakeCell48 />
                <SnakeCell86 />

                <LadderCell4 />
                <LadderCell46 />
                <LadderCell57 />
                <LadderCell50 />
                <LadderCell13 />

            </div>

            <div className='display-bar'>
                <div className='display-bar'>
                <Dice diceNumber={diceNumber} blue={blue} setBlue={setBlue} red={red} setRed={setRed} setDiceNumber={setDiceNumber} blueOrRedMove={blueOrRedMove} setBlueOrRedMove={setBlueOrRedMove} jumpSound={jumpSound} gameOver={gameOver} setGameOver={setGameOver} setWinner={setWinner}/>
                <ColorBox blueOrRedMove={blueOrRedMove}/>
                </div>
                
                <button className='reset' onClick={resetBoard} style={{ justifySelf: 'end' }}>RESET</button>
            </div>

                </> : <Popup winner={winner} gameOver={gameOver} setGameOver={setGameOver} setRed={setRed} setBlue={setBlue} setDiceNumber={setDiceNumber} setBlueOrRedMove={setBlueOrRedMove}/>
            }
            


        </>
    )
}

export default Board;