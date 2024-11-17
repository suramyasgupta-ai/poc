import { useEffect, useState } from 'react';
import Map from './components/home/Map';
import Sidebar from './components/home/Sidebar';
import Rides from './components/home/Rides';

const Home = () => {
    const [route, setRoute] = useState({});
    const [routeSearched, setRouteSearched] = useState(false);
    const [isRidesVisible, setIsRidesVisible] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const closeAll = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
                setIsRidesVisible(false);
            }
        };

        window.addEventListener('resize', closeAll);

        return () => {
            window.removeEventListener('resize', closeAll);
        };
    }, []);

    const displayRides = (newRoute) => {
        setRoute(newRoute);
        setRouteSearched(true);
        setIsRidesVisible(true);
        setSidebarOpen(false);
    };

    const hideRides = () => {
        setIsRidesVisible(false);
        setTimeout(() => {
            setRouteSearched(false);
        }, 700);
    };

    const toggleRides = () => {
        if (window.innerWidth < 768 && sidebarOpen) {
            toggleSidebar();
        }
        setIsRidesVisible(prev => !prev);
    };

    const toggleSidebar = () => {
        if (window.innerWidth < 768 && isRidesVisible) {
            toggleRides();
        }
        setSidebarOpen(prev => !prev);
    };

    return (
        <section className='relative h-[calc(100vh-48px)]'>
            <Map 
                displayRides={displayRides} 
                hideRides={hideRides}
            />
            <Sidebar 
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            {routeSearched && (
                <Rides 
                    route={route}
                    isRidesVisible={isRidesVisible}
                    toggleRides={toggleRides}
                />
            )}
        </section>
    )
};

export default Home;