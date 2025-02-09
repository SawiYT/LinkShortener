import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { ShortenerMain } from '@/components/link-shortener/shortener-main';
import { Navbar } from './components/navbar';
import './App.css';
import { Login } from './components/login/login';
import { Register } from './components/login/register';
import { Dashboard } from './components/dashboard/dashboard';
import { UserProvider } from './components/user-context';

function App() {
	return (
		<Router>
			<UserProvider>
				<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
					<Navbar />
					<Routes>
						<Route path='/' element={<ShortenerMain />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/dashboard' element={<Dashboard />} />
					</Routes>
				</ThemeProvider>
			</UserProvider>
		</Router>
	);
}

export default App;
