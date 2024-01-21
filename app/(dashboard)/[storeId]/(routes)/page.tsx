import db from '@/lib/actions/initializeDb';

interface DashboardProps {
	params: { storeId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
		},
	});
	return (
		<div>
			DashboardPage
			<br />
			Active Store:{store?.name}
		</div>
	);
};

export default DashboardPage;
