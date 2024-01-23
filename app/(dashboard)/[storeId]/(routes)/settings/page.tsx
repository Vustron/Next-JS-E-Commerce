import SettingsForm from '@/components/settings/SettingsForm';
import db from '@/lib/actions/initializeDb';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

interface SettingsPageProps {
	params: {
		storeId: string;
	};
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
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

	if (!store) {
		redirect('/');
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default SettingsPage;
