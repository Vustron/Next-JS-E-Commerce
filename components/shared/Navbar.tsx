import { redirect } from 'next/navigation';
import db from '@/lib/actions/initializeDb';
import { UserButton, auth } from '@clerk/nextjs';
import { MainNav } from '@/components/shared/MainNav';
import { StoreSwitcher } from '@/components/shared/StoreSwitcher';

const Navbar = async () => {
	// fetch auth
	const { userId } = auth();

	// redirect if there's no user
	if (!userId) {
		redirect('/sign-in');
	}

	// fetch stores
	const stores = await db.store.findMany({
		where: {
			userId,
		},
	});

	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<StoreSwitcher items={stores} />

				<MainNav className='mx-6' />

				<div className='ml-auto flex items-center space-x-4'>
					<UserButton afterSignOutUrl='/' />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
