import { useContext, useRef } from 'react';
import { ChangeDifficultyContext } from '../ContextCreator';
import useImage from './ImageFetcher';

const ImageHookManager = ({ imagesArray }) => {
    const easyDifficultyCharacterArray = ['char_250_phatom_1', 'char_293_thorns_1', 'char_103_angel_1', 'char_291_aglina_1', 'char_1035_wisdel_1', 'char_1016_agoat2_1'];
    const mediumDifficultyCharacterArray = ['char_113_cqbw_1', 'char_1041_angel2_1', 'char_1042_phatm2_1', 'char_2012_typhon_1', 'char_140_whitew_1', 'char_180_amgoat_1'];
    const hardDifficultyCharacterArray = ['char_1038_whitw2_1', 'char_1039_thorn2_1', 'char_437_mizuki_1', 'char_003_kalts_1', 'char_377_gdglow_1', 'char_4179_monstr_1'];
    const arrayToRender = useRef([]);
    const { confirmDifficulty } = useContext(ChangeDifficultyContext);
    let isTheSame = useRef(false);
    console.log('imagesArray in hook manager');
    console.log(imagesArray.current);
    

    function imagesToFetch(difficulty){
        switch(difficulty) {
            case 0:
                arrayToRender.current = [...easyDifficultyCharacterArray];
                break;
            case 1:
                arrayToRender.current = [...mediumDifficultyCharacterArray];
                break;
            case 2: 
            case 3:
                arrayToRender.current = [...hardDifficultyCharacterArray];
                break;
        };
    };

    function checkArrayContent() {
        if(imagesArray.current.length > 0) {
            for(let i = 0; i < imagesArray.length; i++) {
                if(imagesArray.current[i].url.includes(arrayToRender.current[i])) {
                    console.log('the same ' + i);
                    isTheSame.current = true;
                } else {
                    console.log('not the same ' + i);
                    isTheSame.current = false;
                }
            };
        };
    };

    imagesToFetch(confirmDifficulty);
    // checkArrayContent();
    // let {loading, error} = [{}, {}]; 
    // if(!imagesArray.current.length || !isTheSame.current) {
    //     ({imagesArray, loading, error} = CallFetchHook({ imagesArray, arrayToRender }));
    // };
    let {tempArray, loading, error} = useImage({ arrayToRender });

    console.log('returning array:');
    console.log(tempArray);

    imagesArray.current = [
        ...imagesArray.current,
        ...tempArray
    ];

    console.log('imagesArray FINAL IN hook manager');
    console.log(imagesArray.current);

    return {imagesArray, loading, error};
};

export default ImageHookManager;