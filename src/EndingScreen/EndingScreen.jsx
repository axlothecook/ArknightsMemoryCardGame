import { forwardRef, useContext } from "react";
import Theresa from './iconsFolder/icons/theresa_img.png';
import Kroos from './iconsFolder/icons/kroos.png';
import MissionResults from './iconsFolder/icons/mission_results_img.png';
import HomeIcon from './iconsFolder/components/Home';
import { RestartGameContext, StartAndEndGameContext, ChangeDifficultyContext, CornerFigureContext } from "../ContextCreator";
import StarAssesment from "./StarAssesment";
import './endingScreenStyleSheet.css';
import RetryIconEndScreen from "./iconsFolder/components/RetryEndScreen";

const EndScreen = forwardRef(({ keyword, toggleDialog, currentScore, highScore, highScoreChanged, imgArrLength }, refModal) => {
    const { confirmDifficulty } = useContext(ChangeDifficultyContext);
    const { setHasGameStarted, setStatus } = useContext(StartAndEndGameContext);
    const { setGameRestart } = useContext(RestartGameContext);
    const { setClosureClicked } = useContext(CornerFigureContext);
    const starArray = StarAssesment({ confirmDifficulty, currentScore });

    function resetStatus() {
        setStatus({
            hasFailed: false,
            hasWon: false
        }); 
    };

    let percentageScore = Math.round((currentScore / imgArrLength) * 100);

    return (
        <dialog ref={refModal} className="m-auto flex-1 overflow-hidden">
            <div 
                className={keyword === 'loss' ? 'loss' : 'win'}
            >
                <div className= "fade-in-shade w-[50%] flex grow"> 
                    <div className="background-image mr-auto size-full">
                        <div className="flex flex-1 flex-col lg:gap-6 sm:gap-4 max-[640px]:gap-3.5 max-[566px]:gap-2.5 max-[495px]:gap-2 w-[85%] ml-auto sm:mt-10 max-sm:mt-4">
                            <img src={MissionResults} />
                            <div className="flex justify-start gap-3"> 
                                {starArray.current.map((item) => (
                                    <img key={item.id} src={item.src} className="lg:h-15 md:h-10 sm:h-7 max-[640px]:h-6 max-[495px]:h-4" />
                                ))}
                            </div>
                            <div className="lg:w-[90%] w-[80%] lg:h-5 md:h-4 sm:h-3 max-[640px]:h-2.5 max-[495px]:h-1.5 bg-gray-700 rounded-full">
                                <div className="lg:h-5 md:h-4 sm:h-3 max-[640px]:h-2.5 max-[495px]:h-1.5 bg-blue-600 rounded-full" style={{width: `${percentageScore}%`}}></div>
                            </div>
                            <div>
                                <h1 className="lg:text-3xl md:text-2xl sm:text-xl max-[640px]:text-base max-[495px]:text-xs font-semibold">
                                    <span className="text-blue-600" >{(highScoreChanged === true) ? 'New' : ''}</span> Best Score: {highScore}
                                </h1>
                                <h1 className="lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-base max-[495px]:text-xs font-semibold">
                                    Current Score: {currentScore}
                                </h1>
                            </div>
                            <div className="flex flex-1 items-baseline sm:gap-7 max-[640px]:gap-5 max-[495px]:gap-3 ml-auto mr-auto">
                                <button className="cursor-pointer" onClick={() => {
                                    setHasGameStarted(false);
                                    resetStatus();
                                    toggleDialog();
                                    setClosureClicked(false);
                                }}>
                                    <HomeIcon />
                                </button>
                                <button className="cursor-pointer" onClick={() => {
                                    resetStatus();
                                    setGameRestart(true);
                                    toggleDialog();
                                    setClosureClicked(false);
                                }}>
                                    <RetryIconEndScreen />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-112 flex shrink justify-end">
                    <img src={keyword === 'loss' ? Kroos : Theresa} />
                </div>
            </div>
        </dialog>
    )
});

export default EndScreen;