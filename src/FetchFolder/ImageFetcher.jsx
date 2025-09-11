import { useEffect, useRef } from "react";

// localStorage.clear();

const fetchImagesFromStorage = () => JSON.parse(localStorage.getItem('imgArr')) || [];

const useImage = (currentDifficulty) => {
    const easyDifficultyCharacterArray = ['char_250_phatom_1', 'char_293_thorns_1', 'char_103_angel_1', 'char_291_aglina_1', 'char_1035_wisdel_1', 'char_1016_agoat2_1'];
    const mediumDifficultyCharacterArray = ['char_113_cqbw_1', 'char_1041_angel2_1', 'char_1042_phatm2_1', 'char_2012_typhon_1', 'char_140_whitew_1', 'char_180_amgoat_1'];
    const hardDifficultyCharacterArray = ['char_1038_whitw2_1', 'char_1039_thorn2_1', 'char_437_mizuki_1', 'char_003_kalts_1', 'char_377_gdglow_1', 'char_4179_monstr_1'];
    let imagesArray = useRef([]);
    let loading = useRef(true);
    let error = useRef(null);
    let arrayToRender = useRef([]);
    let shouldRefetch = useRef(true);
    let counter = 0;
    let storageArray = fetchImagesFromStorage();
    let desiredLength = (currentDifficulty === 3) ? 19 : (6 * currentDifficulty) + 6;

    // console.log('storage array:');
    // console.log(storageArray);

    if(!storageArray.length) {
        arrayToRender.current = [ ...easyDifficultyCharacterArray];

    } else if((desiredLength === storageArray.length) || (desiredLength === (storageArray.length + 1))) {

        // console.log('desiredLength are & SA length are equal');

        shouldRefetch.current = false;
        loading.current = false;
        imagesArray.current = [...storageArray];
        imagesArray.current.map((item) => {
            if(item.hasBeenClicked) item.hasBeenClicked = false;
        });

    } else if(desiredLength > storageArray.length) {
        let tempResults;

        console.log('we need more than what we have');

        if(desiredLength === 19) {
            tempResults = 19 - storageArray.length;
            (tempResults !== 1) ? (shouldRefetch.current = true) : (shouldRefetch.current = false);
        } else {
            shouldRefetch.current = true;
            tempResults = desiredLength - storageArray.length;
        };

        if(tempResults === 12 || tempResults === 13) {
            arrayToRender.current = [
                ...mediumDifficultyCharacterArray,
                ...hardDifficultyCharacterArray
            ];
        } else if(tempResults === 6 || tempResults === 7){
            if(storageArray.length === 12) arrayToRender.current = [...hardDifficultyCharacterArray];
            if(storageArray.length === 6) arrayToRender.current = [...mediumDifficultyCharacterArray];
        };

    } else if(desiredLength < storageArray.length) {

        console.log('we have more than what we need');

        shouldRefetch.current = false;
        loading.current = false;
        let tempResults = storageArray.length - desiredLength;
        let tempArray;
        if(tempResults === 12 || storageArray.length === 12) {
            tempArray = storageArray.slice(0, 6);
        } else {
            tempArray = storageArray.slice(0, 12);
        };
        imagesArray.current = [...tempArray];
    };


    useEffect(() => {
        const fetchData = async() => {
            shouldRefetch.current = false;
            try {
                const promisedImages = arrayToRender.current.map((url) => 
                    fetch(`https://penguacestergonenemypresslabdbdareprts.sanitygone.help/cn/arts/charportraits/${url}.webp`)
                    .then((response) => {
                        if(response >= 400) throw new Error(`HTTP error: ${response.error}`);
                        let obj = {
                            url: response.url,
                            hasBeenClicked: false,
                        };
                    
                        return obj;
                    })
                );

                Promise.all(promisedImages).then((results) => {
                    counter++;
                    if(counter !== 2) {
                        imagesArray.current = [
                            ...imagesArray.current,
                            ...results
                        ]; 
                    };
                });
            } catch (err) {
                imagesArray.current = null;
                error.current = err;
            } finally {
                loading.current = false;
            }
        }

        if(shouldRefetch.current) fetchData();

    }, [arrayToRender, counter, currentDifficulty]);
    
    localStorage.setItem('imgArr', JSON.stringify(imagesArray.current));

    // console.log('returning array:');
    // console.log(imagesArray.current);
    // console.log('------------------------------------')

    return { imagesArray, loading, error }
};

export default useImage;