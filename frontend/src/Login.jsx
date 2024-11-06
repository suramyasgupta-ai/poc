import { useState, useEffect } from 'react';
import useAuth from './hooks/useAuth';
import axios from './api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/auth/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [err, setErr] = useState(false);

    useEffect(() => {
        setErrMsg('');
        setErr(false);
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            setAuth({ username, accessToken });
            navigate(from, { replace: true });
        }
        catch (error) {
            if (!error?.response) {
                setErrMsg('Server is down. Please try again later.');
            }
            else if (error.response?.status === 400) {
                setErrMsg('Missing username or password.');
            }
            else if (error.response?.status === 401) {
                setErrMsg('Invalid username or password.');
            }
            else {
                setErrMsg('Login failed.')
            }
            setErr(true);
        }
    };

    return (
        <section className='flex flex-col items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-sm p-5 rounded-md bg-black bg-opacity-40'>
                {err && (
                    <p className='text-lg bg-accent rounded-md p-3 mb-5'>
                        {errMsg}
                    </p>
                )}

                <h1 className="text-3xl font-bold mb-5">Sign In</h1>

                <label htmlFor='username' className='text-lg mb-1'>
                    Username:
                </label>
                <input
                    className='p-2 mb-1 rounded-md text-black'
                    type='text'
                    id='username'
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />


                <label htmlFor='password' className='text-lg mb-1'>
                    Password:
                </label>
                <input
                    className='p-2 mb-1 rounded-md text-black'
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                <button className='submit-button-valid p-2 mt-3 rounded-md text-lg'>Log In</button>
                <p className='text-lg mt-3'>
                    Need an Account? <br />
                    <Link to='/register' className='underline'>Register</Link>
                </p>
            </form>
        </section>
    )
};

export default Login;