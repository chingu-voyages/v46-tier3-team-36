import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StoreProviderComponent from '@/components/StoreProviderComponent';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
	return (
		<html lang="en">
			<body className={inter.className}>
				<StoreProviderComponent>{children}</StoreProviderComponent>
			</body>
		</html>
	)
};