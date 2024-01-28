import Billboard from '@/components/shared/Billboard';
import Container from '@/components/ui/Container';
import { getBillboards } from '@/lib/actions/getBillboards';

export const revalidate = 0;

const HomePage = async () => {
	// fetch billboards
	const billboard = await getBillboards('4b543a0c-b977-43b7-b1cb-5f03a367fd31');

	return (
		<Container>
			<div className='space-y-10 pb-10'>
				<Billboard data={billboard} />
			</div>
		</Container>
	);
};

export default HomePage;
