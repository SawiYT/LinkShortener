import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { useUserContext } from './user-context';

export function Navbar() {
	const { userInfo, setUserInfo } = useUserContext();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const logoutHandler = async () => {
		await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
		setUserInfo(null);
		navigate('/');
	};

	const fetchUserInfo = async () => {
		try {
			const response = await axios.get('http://localhost:3000/userData', { withCredentials: true });

			if (response) {
				const userInfo = { username: response.data.username };
				setUserInfo(userInfo);
			} else {
				setUserInfo(null);
			}
		} catch (error) {
			setUserInfo(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserInfo();
	}, []);

	return (
		<div>
			<nav className='fixed top-0 left-1/2 transform -translate-x-1/2 z-50 max-w-7xl w-full px-10 flex justify-between items-center'>
				<div className='flex justify-center items-center'>
					<p className=' font-bold  m-4 p-1 rounded-md'>Link Shortener</p>
					<Link
						to='/'
						className='focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 m-4 p-1 rounded-md'>
						Home
					</Link>
					<Link
						to='/dashboard'
						className='focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 m-4 p-1 rounded-md'>
						Dashboard
					</Link>
				</div>
				<div className='flex justify-center items-center'>
					<div className=''>
						{loading ? (
							<PulseLoader className=' px-2' color='#2563eb' />
						) : userInfo ? (
							<button onClick={logoutHandler} className='bg-red-500 text-white px-1 py-1 rounded m-4'>
								Logout
							</button>
						) : (
							<Link
								to='/login'
								className='focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 m-4 p-1 rounded-md'>
								Login
							</Link>
						)}

						<ModeToggle />
					</div>
				</div>
			</nav>
			<div className='w-full absolute left-0  h-[0.5px] bg-foreground dark:bg-secondary mt-16'></div>
		</div>
	);
}
