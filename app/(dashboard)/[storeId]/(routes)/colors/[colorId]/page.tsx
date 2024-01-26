import ColorsForm from '@/components/colors/ColorsForm';
import db from '@/lib/actions/initializeDb';

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
	// fetch sizeId
	const color = await db.color.findUnique({
		where: {
			id: params.colorId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorsForm initialData={color} />
			</div>
		</div>
	);
};

export default ColorPage;
