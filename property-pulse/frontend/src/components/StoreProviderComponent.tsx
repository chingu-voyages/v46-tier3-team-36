'use client'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '@/store/store';

const StoreProviderComponent = ({children}:{children:React.ReactNode}) => (
	<Provider store={store}>
		<ToastContainer />
		{children}
	</Provider>
);

export default StoreProviderComponent;