import './App.css';
import { useState } from 'react'
import LandingPage from './LandingPageFolder/LandingPageJsx';
import TopBar from './TopBarFolder/TopBarJsx';
import CornerPopup from './LandingPageFolder/iconsFolder/components/CornerPopup';
import { FetchContext, RestartGameContext, ChangeDifficultyContext, StartAndEndGameContext } from './ContextCreator';
import StartBtn from './LandingPageFolder/iconsFolder/components/StartBtn';
import CardsHolder from './LandingPageFolder/iconsFolder/components/CardsHolder';
import useImage from './FetchFolder/ImageFetcher';
import backgroundVideo from './LandingPageFolder/iconsFolder/icons/background.mp4';
import './App.css';

const fetchDifficulty = () => JSON.parse(localStorage.getItem('difficulty'));

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [gameRestart, setGameRestart] = useState(false);
  const [confirmDifficulty, setConfirmDifficulty] = useState(fetchDifficulty());
  const [status, setStatus] = useState({
    hasWon: false,
    hasFailed: false,
  });

  let {imagesArray, loading, error} = useImage(confirmDifficulty);

  return (
    <div className=" h-screen flex flex-col relative"> 
      <video className='video-tag' autoPlay loop muted>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
      <RestartGameContext value={{ gameRestart, setGameRestart }}>
          <ChangeDifficultyContext value={{ confirmDifficulty, setConfirmDifficulty }}>
            <StartAndEndGameContext value={{ hasGameStarted, setHasGameStarted, status, setStatus }} >
              <TopBar />
              <FetchContext value={{ imagesArray, loading, error }} >
                <LandingPage> 
                  {!hasGameStarted && <StartBtn />}
                  {hasGameStarted && <CardsHolder />}
                  <CornerPopup />
                </LandingPage>
              </FetchContext>
            </StartAndEndGameContext>
          </ChangeDifficultyContext>
        </RestartGameContext>
    </div>
  )
};

export default App;
