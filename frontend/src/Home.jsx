import { useState } from 'react';
import Map from './components/home/Map';
import Rides from './components/home/Rides';

const Home = () => {
    const [route, setRoute] = useState({});
    const [routeSearched, setRouteSearched] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const displayRides = (newRoute) => {
        setRoute(newRoute);
        setRouteSearched(true);
        setIsVisible(true);
    };

    const hideRides = () => {
        setIsVisible(false);
        setTimeout(() => {
            setRouteSearched(false);
        }, 700);
    };

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <section className='relative h-[calc(100vh-48px)]'>
            <Map 
                displayRides={displayRides} 
                hideRides={hideRides}
            />
            {routeSearched && (
                <Rides 
                    route={route}
                    isVisible={isVisible}
                    toggleVisibility={toggleVisibility}
                />
            )}
        </section>
    )
};

export default Home;