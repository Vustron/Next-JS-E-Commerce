import MobileFilters from '@/components/filter/MobileFilters';
import { getCategory } from '@/lib/actions/getCategory';
import { getProducts } from '@/lib/actions/getProducts';
import ProductCard from '@/components/ui/ProductCard';
import Billboard from '@/components/shared/Billboard';
import { CategoryPageProps } from '@/lib/interfaces';
import { getColors } from '@/lib/actions/getColors';
import Container from '@/components/ui/Container';
import { getSizes } from '@/lib/actions/getSizes';
import Filter from '@/components/filter/Filter';
import NoResult from '@/components/ui/NoResult';

export const revalidate = 0;

const CategoryPage: React.FC<CategoryPageProps> = async ({
	params,
	searchParams,
}) => {
	// fetch products
	const products = await getProducts({
		categoryId: params.categoryId,
		colorId: searchParams.colorId,
		sizeId: searchParams.sizeId,
	});

	// fetch sizes
	const sizes = await getSizes();

	// fetch colors
	const colors = await getColors();

	// fetch individual category
	const category = await getCategory(params.categoryId);

	return (
		<div className='bg-white'>
			<Container>
				<Billboard data={category.billboard} />

				<div className='px-4 sm:px-4 lg:px-8 pb-24'>
					<div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
						<MobileFilters sizes={sizes} colors={colors} />

						<div className='hidden lg:block'>
							<Filter valueKey='sizeId' name='Sizes' data={sizes} />

							<Filter valueKey='colorId' name='Colors' data={colors} />
						</div>

						<div className='mt-6 lg:col-span-4 lg:mt-0'>
							{products.length === 0 && <NoResult />}

							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{products.map((item) => (
									<ProductCard key={item.id} data={item} />
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default CategoryPage;
