import db from '@/lib/actions/initializeDb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const SetUpLayout = async ({ children }: { children: React.ReactNode }) => {
	// fetch auth
	const { userId } = auth();

	// redirect if there's no user
	if (!userId) {
		redirect('/sign-in');
	}

	// fetch store info
	const store = await db.store.findFirst({
		where: {
			userId,
		},
	});

	if (store) {
		redirect(`/${store.id}`);
	}

	return <>{children}</>;
};

export default SetUpLayout;
