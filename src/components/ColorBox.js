import '../App.css';

const ColorBox = ({blueOrRedMove}) => {

    return (
        <>
            <div className={blueOrRedMove ? "blue-color-box" : "red-color-box"}>
                
            </div>
        </>
    )
}

export default ColorBox;