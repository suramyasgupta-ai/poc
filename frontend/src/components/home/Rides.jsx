import { useState, useEffect } from 'react';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import CreateTrip from './CreateTrip';
import TripInfo from './TripInfo';

const Rides = ({ route, isRidesVisible, toggleRides }) => {
    const [trips, setTrips] = useState([]);

    const [smallScreen, setSmallScreen] = useState(false);

    const [createTripOpen, setCreateTripOpen] = useState(false);
    const [joinTripOpen, setJoinTripOpen] = useState(false);
    const [openTrip, setOpenTrip] = useState({});

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.get('/api/routes', {
                    params: {
                        origin: route.origin,
                        destination: route.destination
                    }
                });
                const routes = response.data;
                setTrips(routes);
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchRoutes();
    }, [route]);

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
        toggleRides();
    }, [createTripOpen, joinTripOpen]);

    const handleDisplayJoin = (trip) => {
        setOpenTrip(trip);
        setJoinTripOpen(true);
    };

    const handleCloseDisplayJoin = () => {
        setOpenTrip({});
        setJoinTripOpen(false);
    };

    const updateTrips = (trip) => {
        setTrips((prev) => [...prev, trip]);
    };

    const filteredTrips = trips.filter((trip) => {
        const origin = route.origin.toLowerCase();
        const destination = route.destination.toLowerCase();
        return (
            trip.origin.toLowerCase().includes(origin) ||
            trip.destination.toLowerCase().includes(destination)
        );
    });

    const tripElements = filteredTrips.map((trip, index) => (
        <div key={index} className={`flex items-center mb-2 ${!smallScreen && 'bg-base p-2 rounded-full'}`}>
            <img src='/default_profile_picture.png' className={`w-16 h-16 object-cover ${smallScreen && 'ml-4'}`} />
            <div className='ml-4 w-1/2 text-white'>
                <h2 className='text-sm truncate'><span className='font-bold'>{trip.driver}</span> (driver)</h2>
                <p className='text-xs truncate'>{trip.origin}</p>
                <p className='text-xs truncate'>{trip.destination}</p>
            </div>
            <button
                className='text-sm mx-auto py-1 px-4 rounded-3xl bg-green-500 hover:scale-95'
                onClick={() => handleDisplayJoin(trip)}
            >
                Join
            </button>
        </div>
    ));

    return (
        <>
            {smallScreen && (
                <div
                    className={`absolute bottom-0 w-full h-1/3 bg-base p-1 pb-4 z-10 overflow-y-hidden ${isRidesVisible ? 'slide-in' : 'slide-out'}`}
                >
                    <button
                        className='flex justify-center w-full p-1 mb-2'
                        onClick={toggleRides}
                    >
                        {isRidesVisible ? (
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
                    </button>
                    <div className='max-h-[calc(100%-24px)] px-2 mt-2 overflow-y-auto passenger-scroll-container'>
                        {tripElements}
                        <div className='flex w-full justify-center my-6'>
                            <button
                                className='text-sm py-1 px-4 rounded-3xl bg-white hover:scale-95'
                                onClick={() => setCreateTripOpen(true)}
                            >
                                Create Trip
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!smallScreen && (
                <div className={`absolute bottom-0 ml-3 w-80 h-2/3 z-10 ${isRidesVisible ? 'slide-in2' : 'slide-out2'}`}>
                    <button
                        className='flex justify-center w-full p-1 mb-3'
                        onClick={toggleRides}
                    >
                        {isRidesVisible ? (
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
                    </button>
                    <div className='max-h-[calc(100%-44px)] pr-2 overflow-y-auto passenger-scroll-container'>
                        {tripElements}
                        <div className='flex w-full justify-center my-6'>
                            <button
                                className='text-sm py-1 px-4 rounded-3xl bg-white hover:scale-95'
                                onClick={() => setCreateTripOpen(true)}
                            >
                                Create Trip
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {createTripOpen && (
                <CreateTrip
                    route={route}
                    setCreateTripOpenFalse={() => setCreateTripOpen(false)}
                    updateTrips={updateTrips}
                />
            )}

            {joinTripOpen && (
                <TripInfo
                    openTrip={openTrip}
                    handleCloseDisplayJoin={handleCloseDisplayJoin}
                >
                    <button
                        className='text-sm py-1 px-4 rounded-3xl bg-green-500 hover:scale-95'
                        onClick={(e) => e.stopPropagation()}
                    >
                        Request to Join
                    </button>
                </TripInfo>
            )}
        </>
    );
};

export default Rides;