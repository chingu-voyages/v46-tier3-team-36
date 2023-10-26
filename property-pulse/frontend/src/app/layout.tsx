import type { Metadata } from 'next';
import StoreProviderComponent from '@/components/StoreProviderComponent';
import './globals.css';

export const metadata: Metadata = {
	title: 'PropertyPulse',
	description: 'Streamlines rental property management and fosters a harmonious relationship between landlord and tenants',
	icons: {
		icon: '/icon.png'
	}
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (<StoreProviderComponent children={children} />)
};