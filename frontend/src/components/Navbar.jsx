import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
    return (
        <nav className="flex items-center bg-black text-white py-2 px-4 border-b-4 border-b-base">
            <Link to='/'>
                <h1 className='text-xl font-bold'>RideShare</h1>
            </Link>
            <Link to='/' className='ml-3'>
                <h2>Home</h2>
            </Link>
            <Link to='/' className='ml-auto'>
                <FontAwesomeIcon 
                    icon={faUser}
                    color="white"
                    size='xl'
                />
            </Link>
        </nav>
    )
};

export default Navbar;