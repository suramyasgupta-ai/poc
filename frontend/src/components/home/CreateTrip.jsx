import { useState, useEffect } from 'react';
import { faXmark, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateTrip = ({ route, setCreateTripOpenFalse }) => {
    const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
    const [validDepartureDate, setValidDepartureDate] = useState(true);

    const [availableSeats, setAvailableSeats] = useState(1);
    const [validAvailableSeats, setValidAvailableSeats] = useState(true);

    const [errMsg, setErrMsg] = useState('');
    const [err, setErr] = useState(true);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErr(false);
        validateDepartureDate() ? setValidDepartureDate(true) : setValidDepartureDate(false);
    }, [departureDate]);

    useEffect(() => {
        setErr(false);
        availableSeats >= 1 ? setValidAvailableSeats(true) : setValidAvailableSeats(false);
    }, [availableSeats]);

    const validateDepartureDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const departure = new Date(departureDate);
        departure.setHours(0, 0, 0, 0);

        return departure >= today
    };

    const handleCreateTrip = (e) => {
        e.preventDefault();

        if (!validateDepartureDate()) {
            setErrMsg('Invalid Departure Date');
            setErr(true);
            return;
        }
        if (availableSeats < 1) {
            setErrMsg('Invalid Available Seats');
            setErr(true);
            return;
        }

        console.log({
            ...route,
            departureDate,
            availableSeats
        });

        setSuccess(true);
    };

    return (
        <div
            className='absolute flex justify-center items-center w-full h-screen top-0 z-20 backdrop-blur-sm'
            onClick={() => { setCreateTripOpenFalse(); setSuccess(false) }}
        >
            <form
                className='flex flex-col w-full max-w-sm p-5 rounded-md bg-base text-white'
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreateTrip}
            >
                <button
                    type='button'
                    className='ml-auto'
                    onClick={() => { setCreateTripOpenFalse(); setSuccess(false) }}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        size='xl'
                        color='white'
                    />
                </button>

                {success ? (
                    <div className='text-lg'>Trip Created</div>
                )
                    :
                    (
                        <>
                            {err && (
                                <p className='bg-red-500 rounded-md p-3 mb-2 mt-1'>
                                    {errMsg}
                                </p>
                            )}

                            <label htmlFor='origin' className='hover:cursor-not-allowed'>Origin:</label>
                            <input
                                className='p-2 mb-2 rounded-md text-black hover:cursor-not-allowed'
                                type='text'
                                id='origin'
                                name='origin'
                                value={route.origin}
                                required
                                disabled
                            />

                            <label htmlFor='destination' className='hover:cursor-not-allowed'>Destination:</label>
                            <input
                                className='p-2 mb-2 rounded-md text-black hover:cursor-not-allowed'
                                type='text'
                                id='destination'
                                name='destination'
                                value={route.destination}
                                required
                                disabled
                            />

                            <label htmlFor='departureDate'>Departure Date:</label>
                            <input
                                className='p-2 mb-2 rounded-md text-black'
                                type='date'
                                id='departureDate'
                                name='departureDate'
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                                required
                            />
                            {!validDepartureDate && (
                                <p className="bg-black p-2 rounded-md mt-1 mb-2">
                                    <FontAwesomeIcon icon={faInfoCircle} className='mr-2' />
                                    Date has already passed
                                </p>
                            )}

                            <label htmlFor='seatsAvailable'>Seats Available:</label>
                            <input
                                className='p-2 mb-2 rounded-md text-black'
                                type='number'
                                min={1}
                                id='seatsAvailable'
                                name='seatsAvailable'
                                value={availableSeats}
                                onChange={(e) => setAvailableSeats(e.target.value)}
                                required
                            />
                            {!validAvailableSeats && (
                                <p className="bg-black p-2 rounded-md mt-1 mb-2">
                                    <FontAwesomeIcon icon={faInfoCircle} className='mr-2' />
                                    Number must be greater than 1
                                </p>
                            )}

                            <button
                                className={`py-1 px-4 mt-3 w-1/3 rounded-3xl bg-green-500 ${validDepartureDate && validAvailableSeats ? 'hover:scale-95' : 'opacity-50 cursor-not-allowed'}`}
                                disabled={!validDepartureDate || !validAvailableSeats}
                            >
                                Create Trip
                            </button>
                        </>
                    )}
            </form>
        </div>
    )
};

export default CreateTrip;