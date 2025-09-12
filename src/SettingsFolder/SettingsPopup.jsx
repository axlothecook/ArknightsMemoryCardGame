import { useState, useContext, forwardRef } from "react";
import Left from './iconsFolder/components/LeftArrow'
import Right from './iconsFolder/components/RightArrow'
import { StartAndEndGameContext } from "../ContextCreator";

const SettingsDialog = forwardRef(({ toggleDialog, difficultyArray, changeDifficulty, index, confirmSettings }, dialogRef) => {
    const { hasGameStarted } = useContext(StartAndEndGameContext);
    const [show, setShow] = useState(difficultyArray[index.current]);

    return (
        <dialog ref={dialogRef} className="m-auto bg-transparent relative flex-1 shrink lg:w-[54rem] md:w-[43rem] sm:w-[35rem] max-[640px]:w-[29rem]">
            <button 
                onClick={toggleDialog}
                className='cursor-pointer p-2 size-fit -skew-x-25 absolute mr-3 ml-3 bg-black hover:bg-red-600 text-red-600 hover:text-black max-[404px]:p-1.3'
                >
                <span className='lg:text-2xl md:text-xl max-[495px]:text-sm font-semibold max-[404px]:text-xs'>
                    Go Back
                </span>
            </button>
            <div className='child p-5 flex-1 lg:w-[80%] lg:h-90 md:w-[78%] md:h-80 sm:w-[78%] sm:h-65 max-[640px]:w-[68%] max-[640px]:h-50 max-[640px]:ml-7 max-[640px]:p-3 max-[495px]:h-40 max-[495px]:ml-10  max-[404px]:w-[62%] max-[404px]:h-34'>
                <div className='text-white bg-black flex p-3.5 max-[495px]:p-2.5 justify-between w-full items-center'>
                    <div>
                        <h1 className='lg:text-3xl sm:text-2xl max-[495px]:text-xs'>Difficulty</h1>
                    </div>
                    <div className='flex md:gap-3 sm:gap-2 max-[640px]:gap-1.5 max-[495px]:gap-0 items-center'>
                        <button className='cursor-pointer' onClick={() => {
                            index.current = index.current - 1;
                            setShow(() => difficultyArray[changeDifficulty(index.current)]);
                        }}>
                            <Left />
                        </button>
                        <div>
                            <h1 className='lg:text-3xl sm:text-2xl sm:w-25 max-[640px]:w-15 max-[495px]:text-xs max-[495px]:w-10 text-center'>
                                { show }
                            </h1>
                        </div>
                        <button className='cursor-pointer' onClick={() => {
                            index.current = index.current + 1;
                            setShow(() => difficultyArray[changeDifficulty(index.current)]);
                        }}>
                            <Right />
                        </button>
                    </div>
                </div>
                {hasGameStarted && 
                <div>
                    <h1 className="max-[640px]:text-xs max-[405px]:text-[9px] text-center">Cannot change difficulty during a game session.</h1>
                </div>}
                <div >
                    <button 
                        disabled={hasGameStarted}
                        style={{cursor: (hasGameStarted ? 'not-allowed' : 'pointer')}}
                        className='p-2 size-fit -skew-x-5 bg-black hover:bg-red-600 text-red-600 hover:text-black'
                        onClick={() => {
                            confirmSettings();
                        }}
                    >
                        <span className='md:text-2xl sm:text-xl max-[495px]:text-sm max-[404px]:text-xs font-semibold'>Confirm</span>
                    </button>
                </div>
            </div>
        </dialog>
    )
});

export default SettingsDialog;