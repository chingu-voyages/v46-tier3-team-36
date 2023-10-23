import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PropertyPulse',
	description: 'Streamlines rental property management and fosters a harmonious relationship between landlord and tenants',
	icons: {
		icon: '/icon.png'
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ToastContainer />
				{children}
			</body>
		</html>
	)
}