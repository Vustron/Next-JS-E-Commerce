import ModalProvider from '@/components/providers/ModalProvider';
import ToastProvider from '@/components/providers/ToastProvider';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { Urbanist } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Store',
	description: 'Store',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<ModalProvider />
				<Navbar />
				{children}
				<Footer />
				<ToastProvider />
			</body>
		</html>
	);
}
