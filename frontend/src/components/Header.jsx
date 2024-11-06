import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Header = ({ sidebarOpen, toggleSidebar }) => {
    return (
        <div className='flex items-center w-full h-16 bg-black bg-opacity-40 border-b-2 border-b-black'>
            <button 
                className='ml-8'
                onClick={toggleSidebar}
            >
                <FontAwesomeIcon icon={ sidebarOpen ? faChevronLeft : faChevronRight} size='2x' />
            </button>
        </div>
    )
};

export default Header;