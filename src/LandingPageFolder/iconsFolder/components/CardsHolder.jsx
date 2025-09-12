import { useState, useContext, useRef, useEffect } from 'react';
import { FetchContext, RestartGameContext, StartAndEndGameContext, ChangeDifficultyContext, CornerFigureContext } from '../../../ContextCreator';
import Card from "./Card";
import EndScreen from '../../../EndingScreen/EndingScreen';
import ErrorImg from '../icons/errorImg.png';

const fetchHighScore = () => JSON.parse(localStorage.getItem('highScore'));

const CardsHolder = () => {
    let { imagesArray, loading, error } = useContext(FetchContext);
    const { gameRestart, setGameRestart } = useContext(RestartGameContext);
    const { status, setStatus } = useContext(StartAndEndGameContext);
    const { closureClicked } = useContext(CornerFigureContext);
    const { confirmDifficulty } = useContext(ChangeDifficultyContext);
    const [cardsArray, setCardsArray] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const highScore = useRef(fetchHighScore());
    const highScoreChanged = useRef(false);
    const [flip, setFlip] = useState(false);
    const [disableClick, setDisableClick] = useState(false);
    let shouldRerun = useRef(true);
    const refModal = useRef(null);


    useEffect(() => {
        function displayCards() {
            let tempArray = [];
            let checker = false;
            const min = 0;
            for(let i = 0; i < 4; i++) {
                let index;
                do { 
                    index = Math.floor(Math.random() * ((imagesArray.current.length - 1) - min + 1)) + min;
                } while(tempArray.includes(imagesArray.current[index]));
                let card = imagesArray.current[index];
                if(!card.hasBeenClicked) checker = true;

                if(!checker && i === 3) {
                    if(currentScore === 18 && !closureClicked) {
                        tempArray = tempArray.concat(imagesArray.current[index]);
                    } else {
                        const notClickedCard = imagesArray.current.find((card) => !card.hasBeenClicked);
                        tempArray = tempArray.concat(notClickedCard);
                    }
                } else tempArray = tempArray.concat(imagesArray.current[index]);
            };

            shouldRerun.current = false;
            setCardsArray([
                ...tempArray
            ]);
        };

        if(!status.hasFailed && !status.hasWon) {
            if(gameRestart) {
                setCurrentScore(0);
                setGameRestart(false);
                imagesArray.current.map((item) => {
                    if(item.hasBeenClicked) item.hasBeenClicked = false;
                });
                shouldRerun.current = true;
                setCardsArray([]);
            };
            if(shouldRerun.current) {
                if(!flip) {
                    displayCards();
                } else {
                    setTimeout(() => {
                        displayCards();
                    }, 400);
                };
            }
        };

    }, [status.hasFailed, status.hasWon, cardsArray, shouldRerun.current, imagesArray, gameRestart, setGameRestart]);


    useEffect(() => {
        if(closureClicked) {
            setCurrentScore(() => currentScore + 1);
            checkForWin();
        };
    }, [closureClicked]);



    function clickOnCard(card) {
        if(card.hasBeenClicked) {
            setStatus({
                ...status,
                hasFailed: true,
            });
            calculateSuccess();
            toggleDialog();
        } else {
            card.hasBeenClicked = true;
            setCurrentScore(() => currentScore + 1);
            let temp = checkForWin();
            if(!temp) {
                setFlip(true);
                setDisableClick(true);
                shouldRerun.current = true;
                
                setTimeout(() => {
                    setFlip(false);
                }, 1000);

                setTimeout(() => {
                    setDisableClick(false);
                }, 1500);

            } else {
                calculateSuccess();
                toggleDialog();
            };
        };
    };

    function checkForWin() {
        let checkForWin = true;
        imagesArray.current.map((card) => {
            if(!card.hasBeenClicked) checkForWin = false;
        });
        if(confirmDifficulty === 3) {
            if(!closureClicked) checkForWin = false;
        };
        if(checkForWin) {
            setStatus({
                ...status,
                hasWon: true,
            });
            return true;
        };
        return false;
    };

    function toggleDialog() {
        if(!refModal.current) return;
        refModal.current.hasAttribute('open') 
            ? refModal.current.close()
            : refModal.current.showModal();
    };

    function calculateSuccess() {
        if(highScore.current >= currentScore) {
            highScoreChanged.current = false;
        } else if(highScore.current < currentScore) {
            highScore.current = currentScore;
            localStorage.setItem('highScore', JSON.stringify(highScore.current));
            highScoreChanged.current = true;
        };
    };

    return (
        <div className='flex flex-col items-center justify-center gap-3 md:gap-8'>
            {loading.current && 
            <>
                <h1><b>Cards are loading...</b></h1>
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </>} 
            {error.current && 
            <div className='flex flex-col items-center gap-7'>
                <div className='md:w-auto sm:w-65 max-[640px]:w-65 max-[460px]:w-50'>
                    <h1 className='lg:text-2xl text-xl max-[460px]:text-base text-center'>
                        <b>Network Error Happened. Try refreshing the page!</b>
                    </h1>
                </div>
                <div className='lg:w-70 sm:w-50 max-[640px]:w-50 max-[460px]:w-40'>
                    <img src={ErrorImg} />
                </div>
            </div>}
            {(!status.hasFailed && !status.hasWon) && 
                <>
                    <div>
                        <h1 className='text-xl sm:text-3xl font-bold text-white'>
                            Guessed operators {currentScore} / {(confirmDifficulty === 3) 
                                                                    ? (imagesArray.current.length + 1) 
                                                                    : imagesArray.current.length}
                        </h1>
                    </div>
                    <div className='max-w-[450px]  md:max-w-[850px] xl:max-w-[1513px] flex flex-row justify-center flex-wrap gap-5 sm:gap-6 lg:gap-10'>
                        {cardsArray.map((item) => (
                            <Card 
                                key={item.url} 
                                link={item.url} 
                                flip={flip} 
                                disableClick={disableClick}
                                onClick={() => {
                                    clickOnCard(item);
                                }}
                            />
                        ))}
                    </div>
                </>
            }
            <EndScreen 
                ref={refModal} 
                toggleDialog={toggleDialog} 
                keyword={status.hasFailed ? 'loss' : 'win'} 
                currentScore={currentScore}
                highScore={highScore.current} 
                highScoreChanged={highScoreChanged.current}
                imgArrLength={imagesArray.current.length}
            />
        </div>
    )
};

export default CardsHolder;