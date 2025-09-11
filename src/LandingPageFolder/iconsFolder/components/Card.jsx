import Originium from '../icons/originium.png';
import '../../landingPageStyle.css';
import Tilt from 'react-parallax-tilt';

const Card = ({ link, flip, onClick }) => {

    // glareEnable={true} glareMaxOpacity={0.5} glarePosition='top' glareColor="#fff" glareBorderRadius="0.4rem"

    return (
        <Tilt>
            <div className={`card ${flip ? 'flip' : ''}`} onClick={() => {
                    onClick();
                }}>
                <div className="front">
                    <img src={link}  />
                </div>

                <div className="back">
                    <img src={Originium} className="rounded-b-3xl mt-auto mb-auto" />
                </div>
            </div>
        </Tilt>
    )
};

export default Card;