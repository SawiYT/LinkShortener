import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';

const registerFormSchema = z
	.object({
		username: z.string().min(2, {
			message: 'Username must be at least 2 characters.',
		}),
		password: z.string().min(6, {
			message: 'Password must be at least 6 characters.',
		}),
		confirmPassword: z.string().min(6, {
			message: 'Confirm Password must be at least 6 characters.',
		}),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export function Register() {
	const navigate = useNavigate();
	const [capVal, setCapVal] = useState<string | null>(null);
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
		try {
			await axios.post('http://localhost:3000/register', data, {
				withCredentials: true,
			});
			navigate('/login');
		} catch (err: any) {
			if (err.response && err.response.status === 400) {
				form.setError('username', {
					type: 'manual',
					message: 'Username already exists.',
				});
			} else {
				console.error('Registration error:', err);
			}
		}
	};

	return (
		<div className='flex justify-center items-center h-[100vh] flex-col'>
			<h2 className='text-2xl font-bold pb-6'>Register Page</h2>
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

					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type='password' placeholder='Confirm Password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className=' scale-[0.95]'>
						<ReCAPTCHA sitekey={import.meta.env.VITE_REACT_APP_SITEKEY} onChange={val => setCapVal(val)} />
					</div>
					<div className='flex justify-center items-center gap-x-4'>
						<Link
							to='/login'
							className='text-md inline-flex items-center justify-center gap-2 hover:bg-card border-secondary border-[1px] h-9 px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
							Login
						</Link>
						<Button disabled={!capVal} className='bg-primary text-white font-bold py-2 px-4 rounded' type='submit'>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
