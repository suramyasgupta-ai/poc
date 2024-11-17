

const joinedRides = [
    {
        driver: "Jeremy Schur",
        origin: "Boulder, Colorado, United States",
        destination: "Boulder, Colorado, United States",
        passengers: ["Brittany Schur", "Larry Schur"],
        requests: ["Hailey Smith", "Dawn Deere"]
    },
    {
        driver: "Jeremy Schur",
        origin: "San Antonio, Texas, United States",
        destination: "Boulder, Colorado, United States",
        passengers: ["John Doe", "Jane Doe", "Brittany Schur", "Larry Schur", "John Doe", "Jane Doe", "Brittany Schur", "Larry Schur"],
        requests: ["Joseph Smith", "John Deere"]
    },
]

const JoinedRides = ({ searchBar, handleOpenDisplay }) => {
    const filteredRides = searchBar === '' ? joinedRides 
        : joinedRides.filter((ride) => {
        const query = searchBar.toLowerCase();
        return (
            ride.driver.toLowerCase().includes(query) ||
            ride.origin.toLowerCase().includes(query) ||
            ride.destination.toLowerCase().includes(query)
        );
    });

    const joinedRidesElements = filteredRides.map((ride, index) => (
        <div key={index} className='flex items-center w-full mb-2'>
            <img src='/default_profile_picture.png' className='w-14 h-14 md:w-16 md:h-16 object-cover' />
            <div className='ml-2 w-1/2 text-white'>
                <h2 className='text-sm truncate'><span className='font-bold'>{ride.driver}</span> (driver)</h2>
                <p className='text-xs truncate'>{ride.origin}</p>
                <p className='text-xs truncate'>{ride.destination}</p>
            </div>
            <button
                className='text-sm ml-auto py-1 px-4 rounded-3xl bg-green-500 hover:scale-95'
                onClick={() => handleOpenDisplay(ride)}
            >
                View
            </button>
        </div>
    ));

    return (
        <div className='w-full h-full mt-3 pr-1 flex flex-col items-center overflow-x-hidden overflow-y-auto passenger-scroll-container'>
            {joinedRidesElements}
        </div>
    )
};

export default JoinedRides;