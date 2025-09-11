import { createContext } from 'react';

export const FetchContext = createContext({
    imagesArray: [],
    loading: true,
    error: null
});

export const RestartGameContext = createContext(false);

export const ChangeDifficultyContext = createContext(null);

export const StartAndEndGameContext = createContext(null);

export const CornerFigureContext = createContext(false);