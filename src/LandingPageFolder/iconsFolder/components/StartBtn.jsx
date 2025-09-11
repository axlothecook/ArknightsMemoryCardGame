import { useContext } from 'react';
import StartGameIcon from "./StartGame";
import { StartAndEndGameContext } from '../../../ContextCreator';

const StartBtn = () => {
    const { setHasGameStarted } = useContext(StartAndEndGameContext);
    // console.log(setHasGameStarted)

    return (
        <button 
            className="cursor-pointer" 
            onClick={() => {
                setHasGameStarted(true);
            }}
            >
            <span><StartGameIcon /></span>
        </button>
    )
};

export default StartBtn;