import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import db from '@/lib/actions/initializeDb';

const DashboardLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) => {
	// fetch auth
	const { userId } = auth();

	// redirect if there's no user
	if (!userId) {
		redirect('/sign-in');
	}

	// fetch store info
	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	// redirect if there's no store
	if (!store) {
		redirect('/');
	}

	return (
		<>
			<div>
				{/* Navbar TODO */}
				{children}
			</div>
		</>
	);
};

export default DashboardLayout;
