import Originium from '../icons/originium.png';
import '../../landingPageStyle.css';
import Tilt from 'react-parallax-tilt';

const Card = ({ link, flip, disableClick, onClick, onImageError }) => {
    return (
        <Tilt>
            <div
                className={`card ${flip ? 'flip' : ''}`}
                disabled={disableClick}
                onClick={() => {
                    if(!disableClick) onClick();
                }}>
                <div className="front">
                    <img src={link} onError={onImageError} />
                </div>

                <div className="back">
                    <img src={Originium} className="rounded-b-3xl mt-auto mb-auto" />
                </div>
            </div>
        </Tilt>
    )
};

export default Card;