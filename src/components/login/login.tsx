import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import { useState } from 'react';
import { useUserContext } from '../user-context';

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters.',
	}),
});

export function Login() {
	const [message, setMessage] = useState('');
	const { setUserInfo } = useUserContext();
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await axios.post('http://localhost:3000/login', data, {
				withCredentials: true,
			});
			setUserInfo({ username: data.username });
			navigate('/dashboard');
		} catch (err) {
			setMessage('Login error. Please check your credentials.');
			console.error('Login error:', err);
		}
	};
	return (
		<div className='flex justify-center  items-center h-[100vh] flex-col'>
			<h2 className='text-2xl font-bold pb-6'>Login Page</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 linkForm'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder='Username' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type='password' placeholder='Password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='text-destructive text-sm'>{message}</div>
					<div className='flex justify-center items-center gap-x-4'>
						<Link
							to='/register'
							className='text-md inline-flex items-center justify-center gap-2 hover:bg-card border-secondary border-[1px] h-9 px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
							Register
						</Link>
						<Button className='bg-primary text-white font-bold py-2 px-4 rounded' type='submit'>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
