import { useRef } from 'react';
import EmptyStar from './iconsFolder/icons/empty_star.png';
import BlueStar from './iconsFolder/icons/blue_star.png';
import WhiteStar from './iconsFolder/icons/white_star.png';

const StarAssesment = ({confirmDifficulty, currentScore }) => {

    const starArray = useRef([]);
    switch(confirmDifficulty) {
        case 0:
            starArray.current = [
                {id: 0, src: BlueStar}, 
                {id: 1, src: EmptyStar}, 
                {id: 2, src: EmptyStar}, 
                {id: 3, src: EmptyStar}
            ];
            break;
        case 1:
            starArray.current = [
                {id: 0, src: BlueStar}, 
                {id: 1, src: BlueStar}, 
                {id: 2, src: EmptyStar}, 
                {id: 3, src: EmptyStar}
            ];
            break;
        case 2:
            starArray.current = [
                {id: 0, src: BlueStar}, 
                {id: 1, src: BlueStar}, 
                {id: 2, src: BlueStar}, 
                {id: 3, src: EmptyStar}
            ];
            break;
        case 3:
            starArray.current = [
                {id: 0, src: BlueStar}, 
                {id: 1, src: BlueStar}, 
                {id: 2, src: BlueStar}, 
                {id: 3, src: WhiteStar}
            ];
            break;
        default:
            starArray.current = [
                {id: 0, src: EmptyStar}, 
                {id: 1, src: EmptyStar}, 
                {id: 2, src: EmptyStar}, 
                {id: 3, src: EmptyStar}
            ];
            break;
    };

    if(currentScore === 1) starArray.current = [
        {id: 0, src: EmptyStar}, 
        {id: 1, src: EmptyStar}, 
        {id: 2, src: EmptyStar}, 
        {id: 3, src: EmptyStar}
    ];

    return starArray;

};

export default StarAssesment;