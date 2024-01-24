import BillboardForm from '@/components/billboards/BillboardForm';
import db from '@/lib/actions/initializeDb';

const BillboardPage = async ({
	params,
}: {
	params: { billboardId: string };
}) => {
	// fetch billboardId
	const billboard = await db.billboard.findUnique({
		where: {
			id: params.billboardId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
};

export default BillboardPage;
