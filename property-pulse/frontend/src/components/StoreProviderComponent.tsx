'use client'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import store from '@/store/store';

const inter = Inter({ subsets: ['latin'] });

const StoreProviderComponent = ({children}:{children: React.ReactNode}) => {
	return (
		<Provider store={store}>
			<html lang="en">
				<body className={inter.className}>
					<ToastContainer />
					{children}
				</body>
			</html>
		</Provider>);
};

export default StoreProviderComponent;