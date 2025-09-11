import './Settings.css';
import { useState, useRef, useContext } from 'react';
import RetryIcon from "./iconsFolder/components/Retry";
import SettingsIcon from "./iconsFolder/components/SettingsIcon";
import SettingsDialog from './SettingsPopup';
import { RestartGameContext, ChangeDifficultyContext, StartAndEndGameContext } from '../ContextCreator';

const Settings = () => {
    const difficultyArray = ['Easy', 'Medium', 'Hard', 'Special'];
    const { setGameRestart } = useContext(RestartGameContext);
    const { confirmDifficulty, setConfirmDifficulty } = useContext(ChangeDifficultyContext);
    const { hasGameStarted } = useContext(StartAndEndGameContext);
    const dialogRef = useRef(null);
    let index = useRef(0);

    function toggleDialog() {
        if(!dialogRef.current) return;
        dialogRef.current.hasAttribute('open') 
            ? dialogRef.current.close()
            : dialogRef.current.showModal();
    };

    function changeDifficulty(value) {
        if(value > (difficultyArray.length - 1)) {
            index.current = 0;
            return 0;
        };

        if(value < 0) {
            index.current = (difficultyArray.length - 1);
            return index.current;
        };

        return value;
    };

    function confirmSettings() {
        setConfirmDifficulty(index.current);
        localStorage.setItem('difficulty', JSON.stringify(index.current));
        console.log('new difficulty: ' + index.current);
    }

    return (
        <div className='flex flex-1'>
            <div className='flex flex-1 sm:gap-2 justify-between max-w-[42px] sm:max-w-[130px]'>
                <button className="cursor-pointer" onClick={toggleDialog}>
                    <SettingsIcon />
                </button>
                {hasGameStarted && 
                    <button className="cursor-pointer" onClick={() => {
                        setGameRestart(true);
                    }}>
                        <RetryIcon />
                    </button>
                }
            </div>
            <SettingsDialog 
                ref={dialogRef} 
                toggleDialog={toggleDialog} 
                difficultyArray={difficultyArray} 
                changeDifficulty={changeDifficulty} 
                index={index} 
                confirmSettings={confirmSettings} 
            />
        </div>
    )
};

export default Settings;