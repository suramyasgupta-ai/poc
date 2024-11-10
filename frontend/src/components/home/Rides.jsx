import { useState, useEffect } from 'react';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateTrip from './CreateTrip'

const Rides = ({ route, isVisible, toggleVisibility }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(true);
    const [smallScreen, setSmallScreen] = useState(false);
    const [createTripOpen, setCreateTripOpen] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsDropdownVisible(true);
        }
        else {
            setTimeout(() => {
                setIsDropdownVisible(false);
            }, 700);
        }
    }, [isVisible]);

    useEffect(() => {
        const handleResize = () => {
            setSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        toggleVisibility();
    }, [createTripOpen]);


    return (
        <>
            {smallScreen ? (
                <div
                    className={`absolute bottom-0 w-full bg-base p-1 z-10 ${isVisible ? 'slide-in' : 'slide-out'}`}
                >
                    <div
                        className='w-full flex justify-center cursor-pointer'
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <FontAwesomeIcon
                                icon={faAnglesDown}
                                size='xl'
                                color='white'
                            />

                        )
                            :
                            <FontAwesomeIcon
                                icon={faAnglesUp}
                                size='xl'
                                color='white'
                            />
                        }
                    </div>
                    {isDropdownVisible && (
                        <div className='max-h-[calc(100%-24px)] overflow-y-auto px-2 mt-1'>
                            <div className='flex items-center'>
                                <img src='/default_profile_picture.png' className='w-16 h-16 ml-4 object-cover' />
                                <div className='ml-4 w-1/2 text-white'>
                                    <h2 className='text-sm truncate'><span className='font-bold'>Jeremy</span> (driver)</h2>
                                    <p className='text-xs truncate'>Origin: Boulder, CO</p>
                                    <p className='text-xs truncate'>Destination: Boulder, CO</p>
                                </div>
                                <button
                                    className='text-sm mx-auto py-1 px-4 rounded-3xl bg-green-500 hover:scale-95'
                                    onClick={() => console.log("Join trip")}
                                >
                                    Join
                                </button>
                            </div>
                            <div className='flex w-full justify-center mt-8'>
                                <button
                                    className='text-sm py-1 px-4 rounded-3xl bg-white hover:scale-95'
                                    onClick={() => setCreateTripOpen(true)}
                                >
                                    Create Trip
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                    <div className={`absolute bottom-0 ml-3 w-80 h-2/3 overflow-y-auto ${isVisible ? 'slide-in2' : 'slide-out2'}`}>
                        <div className='flex items-center bg-base p-2 rounded-full'>
                            <img src='/default_profile_picture.png' className='w-16 h-16 object-cover' />
                            <div className='ml-4 w-1/2 text-white'>
                                <h2 className='text-sm truncate'><span className='font-bold'>Jeremy</span> (driver)</h2>
                                <p className='text-xs truncate'>Origin: Boulder, CO</p>
                                <p className='text-xs truncate'>Destination: Boulder, CO</p>
                            </div>
                            <button
                                className='text-sm mx-auto py-1 px-4 rounded-3xl bg-green-500 hover:scale-95'
                                onClick={() => console.log("Join trip")}
                            >
                                Join
                            </button>
                        </div>
                        <div className='flex w-full justify-center mt-8'>
                            <button
                                className='text-sm py-1 px-4 rounded-3xl bg-white hover:scale-95'
                                onClick={() => setCreateTripOpen(true)}
                            >
                                Create Trip
                            </button>
                        </div>
                    </div>
                )}

            {createTripOpen && (
                <CreateTrip 
                    route={route} 
                    setCreateTripOpenFalse={() => setCreateTripOpen(false)}
                />
            )}
        </>
    );
};

export default Rides;