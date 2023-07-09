import '../App.css';
import { useState } from 'react';

import Blue from './players/Blue';
import Red from './players/Red';


const Cell = ({ number, blue, red }) => {



    const [cellNumber, setCellNumber] = useState(number);
    return (
        <>
            <div id="cell" className="">

                {red === number && blue === number && (
                    <>
                        <Red />
                        <Blue />
                    </>
                )}
                {red === number && blue !== number && <Red />}
                {red !== number && blue === number && <Blue />}
                {red !== number && blue !== number && number}

            </div>
        </>
    )
}

export default Cell;