import { useState, useContext, useEffect } from "react";
import popupNormal from '../icons/popup-normal.png';
import popupOnHover from '../icons/popup-hover.png';
import popupClicked from '../icons/popup-clicked.png';
import ArrowPointingDownNoClosure from "./ArrowDownNoClosure";
import ArrowPointingDownWithClosure from "./ArrowDownWithClosure";
import { ChangeDifficultyContext, CornerFigureContext, StartAndEndGameContext } from "../../../ContextCreator";

const CornerPopup = () => {
    const { closureClicked, setClosureClicked } = useContext(CornerFigureContext);
    const { confirmDifficulty } = useContext(ChangeDifficultyContext); 
    const { status, hasGameStarted } = useContext(StartAndEndGameContext);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if(status.hasFailed || status.hasWon) setIsHovered(false);
    }, [status.hasFailed, status.hasWon]);

    return (
        <section className="w-fit absolute right-3 bottom-0 max-[450px]:right-1.5">
            <div className="w-fit flex flex-col items-center relative">
                {(isHovered && !closureClicked) && 
                    <div className="
                        flex
                        max-[591px]:right-10
                        max-[598px]:flex-row
                        max-[598px]:w-78
                        max-[598px]:bottom-3 
                        max-[598px]:right-32

                        max-[640px]:w-30
                        max-[640px]:flex-col
                        max-[640px]:justify-center
                        max-[640px]:bottom-25
                        max-[640px]:right-[0.1px]

                        max-[768px]:bottom-25 
                        max-[768px]:right-[0.1px]
                        max-[768px]:w-30  
                        max-[768px]:flex-col
                        max-[768px]:justify-center
                        max-[1280px]:bottom-8
                        max-[1280px]:right-50
                        max-[1280px]:flex-row
                        max-[1280px]:w-70
                        max-[1340px]:w-40
                        max-[1440px]:bottom-40
                        flex-col
                        bottom-52
                        gap-0.7 
                        items-center 
                        absolute
                    ">
                        <div className="bg-gray-300 rounded-t-md rounded-b-md p-2 text-center max-[591px]:p-1">
                            <h2 className="max-[640px]:text-[12px] max-[591px]:text-[10px]"><b>Click on each character once to win the game!</b></h2>
                        </div>
                        <div>
                            <ArrowPointingDownNoClosure />
                        </div>
                    </div>
                }
                

                {closureClicked && 
                    <div className="
                        flex
                        max-[450px]:right-3
                        max-[598px]:flex-row
                        max-[598px]:w-70
                        max-[598px]:bottom-3 
                        max-[598px]:right-10 
                        max-[640px]:w-30
                        max-[640px]:flex-col
                        max-[640px]:justify-center
                        max-[768px]:flex-col
                        max-[768px]:justify-center
                        max-[768px]:bottom-32 
                        max-[768px]:w-30
                        max-[768px]:right-0
                        max-[1194px]:flex-row
                        max-[1194px]:bottom-11
                        max-[1194px]:w-80
                        max-[1194px]:right-20
                        max-[1500px]:bottom-40
                        max-[1500px]:w-30
                        right-0
                        flex-col
                        w-50
                        bottom-60
                        gap-0.7 
                        items-center 
                        absolute
                    ">
                        <div className="bg-gray-300 rounded-t-md rounded-b-md p-2 text-center">
                            <h1 className="max-sm:text-[11px]">You discovered me! Here's a point :D</h1>
                        </div>
                        <div>
                            <ArrowPointingDownWithClosure />
                        </div>
                    </div>
                }
                

                <div className="flex items-end"
                    onMouseEnter={() => {
                        if(!closureClicked) setIsHovered(true);
                    }} 
                    onMouseLeave={() => {
                        if(!closureClicked) setIsHovered(false);
                    }}
                    onClick={() => {
                        if(confirmDifficulty === 3 && hasGameStarted) setClosureClicked(true);
                    }}
                >
                    {(!isHovered && !closureClicked) && 
                        <img 
                            src={popupNormal} 
                            className="
                                max-[556px]:h-14
                                max-[556px]:w-16
                                max-[640px]:h-25
                                max-[640px]:w-29
                                sm:w-29 
                                sm:h-25 
                                md:w-40
                                md:h-35 
                                xl:w-54
                                xl:h-47
                            "
                        />
                    }
                    {(isHovered && !closureClicked) &&
                        <img 
                            src={popupOnHover} 
                            className="
                                max-[592px]:h-12
                                max-[592px]:w-15
                                max-[640px]:h-25
                                max-[640px]:w-31
                                max-[768px]:w-31 
                                max-[768px]:h-25
                                max-[1252px]:w-45 
                                max-[1252px]:h-35 
                                max-[1440px]:w-50
                                max-[1440px]:h-40
                                min-[1440px]:w-61
                                min-[1440px]:h-50
                            " 
                            style={{cursor: ((confirmDifficulty === 3 && hasGameStarted) ? 'pointer' : 'default')}}
                        />
                    }
                        
                    {closureClicked && 
                        <img 
                            src={popupClicked} 
                            className="
                                max-[450px]:w-9
                                max-[450px]:h-13
                                max-[599px]:w-15
                                max-[599px]:h-20
                                max-[1194px]:w-21 
                                max-[1194px]:h-30 
                                max-[1500px]:w-28 
                                max-[1500px]:h-39 
                                w-45 
                                h-60
                            " 
                        />
                    }
                </div>
            </div>
        </section>
    )
};

export default CornerPopup;