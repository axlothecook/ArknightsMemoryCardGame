import { useState } from 'react';
import { CornerFigureContext } from '../ContextCreator';

const LandingPage = ({ children }) => {
    const [closureClicked, setClosureClicked] = useState(false);

    return (
        <div className="h-full flex flex-column justify-center items-center relative pr-4 pl-4">
            <CornerFigureContext value={{ closureClicked, setClosureClicked }}>
                {children}
            </CornerFigureContext>
        </div>
    )
}

export default LandingPage;