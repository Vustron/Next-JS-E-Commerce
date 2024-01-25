import SizesForm from '@/components/sizes/SizesForm';
import db from '@/lib/actions/initializeDb';

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
	// fetch sizeId
	const size = await db.size.findUnique({
		where: {
			id: params.sizeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizesForm initialData={size} />
			</div>
		</div>
	);
};

export default SizePage;
