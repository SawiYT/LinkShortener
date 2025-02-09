import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { IconLink, IconLayoutDashboard } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
export function ShortenerMain() {
	const [shortenedLink, setShortenedLink] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const linkInput = (e.currentTarget.elements as any).longLink.value.trim();

		if (!linkInput) {
			setError('Please enter a valid link');
			return;
		}

		try {
			setError('');
			const response = await axios.post(
				'http://localhost:3000/url',
				{
					url: linkInput,
				},
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			setShortenedLink(response.data.uuid);
		} catch (err) {
			console.error('Błąd podczas wysyłania zapytania:', err);
			setError('Failed to shorten the link. Please try again.');
		}
	};

	return (
		<div className='flex-col h-[100vh] flex justify-center items-center mb-10'>
			<div className='max-w-xl w-full px-5 pb-10'>
				<div className='flex flex-col justify-center items-center'>
					<img className='h-24' src='/image.png' alt='Logo' />
					<h1 className='text-center'>Link Shortener</h1>
				</div>

				<form className='linkForm mt-5 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
					<div className='flex-row'>
						<input
							name='longLink'
							placeholder='Enter long link here'
							type='text'
							className='mb-3 p-2 border rounded w-full text-white'
						/>
						<button className='linkButton p-2 bg-blue-500 text-white rounded' type='submit'>
							Shorten link
						</button>
					</div>
					<div className='flex-col pt-3 '>
						<Link to='/dashboard'>
							<Button className='mx-1 rounded-xl shadow-md' variant='outline'>
								<IconLink stroke={2} /> Check past links
							</Button>
						</Link>

						<Link to='/'>
							<Button className='mx-1 rounded-xl shadow-md' variant='outline'>
								<IconLayoutDashboard stroke={2} />
								Try other technologies
							</Button>
						</Link>
					</div>
				</form>

				{error && <p className='error text-red-500 text-center mt-3'>{error}</p>}

				{shortenedLink && (
					<div className='flex justify-center items-center flex-col pt-5'>
						<h2 className='text-center'>Shortened Link:</h2>
						<a href={shortenedLink} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
							{shortenedLink}
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
