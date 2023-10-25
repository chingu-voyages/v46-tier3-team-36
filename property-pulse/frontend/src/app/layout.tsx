'use client'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import { Provider } from 'react-redux'
import store from '@/store/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Provider store={store}>
			<html lang="en">
				<head>
					<title>PropertyPulse</title>
					<link rel="icon" href="/icon.png" />
					<meta name="description" content="Streamlines rental property management and fosters a harmonious relationship between landlord and tenants" />
				</head>
				<body className={inter.className}>
					<ToastContainer />
					{children}
				</body>
			</html>
		</Provider>
	)
}