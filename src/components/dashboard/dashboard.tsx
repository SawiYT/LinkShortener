import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import DashTable from './table';

export function Dashboard() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState<{
		user: { id: string; username: string };
		links: { id: number; url: string; uuid: string }[];
	} | null>(null);

	useEffect(() => {
		const checkUserSession = async () => {
			try {
				const response = await axios.get('http://localhost:3000/userData', {
					withCredentials: true,
				});

				setUserData(response.data);
			} catch (error) {
				navigate('/register');
			} finally {
				setLoading(false);
			}
		};

		checkUserSession();
	}, [navigate]);

	return (
		<div className='flex justify-center items-center h-[100vh] flex-col'>
			{loading ? (
				<PulseLoader color='#2563eb' />
			) : (
				<div className=''>
					<h2 className='text-2xl font-bold pb-6 text-center'>Welcome to the Dashboard, {userData?.user.username}!</h2>

					<div className='w-full max-w-3xl overflow-x-hidden'>
						{userData?.links.length ? <DashTable users={userData.links} /> : <p>No links available.</p>}
					</div>
				</div>
			)}
		</div>
	);
}
