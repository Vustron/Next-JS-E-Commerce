import { ToasterProvider } from '@/components/providers/toastProvider';
import { ThemeProvider } from '@/components/providers/themeProvider';
import { ModalProvider } from '@/components/providers/modalProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dashboard',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
						<ModalProvider />
						<ToasterProvider />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
