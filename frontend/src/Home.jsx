import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeChat, setActiveChat] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    useEffect(() => {
        console.log(activeChat);
    }, [activeChat]);

    return (
        <section className='flex items-center justify-center h-screen'>
            <div className='flex flex-col w-full h-full bg-black bg-opacity-40'>
                <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
                <div className='flex w-full h-full'>
                    {sidebarOpen ? 
                        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} setActiveChat={setActiveChat}/> 
                        : 
                        <h1>Sidebar Closed</h1>
                    }
                </div>
            </div>
        </section>
    )
};

export default Home;