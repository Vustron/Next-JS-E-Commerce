import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTotalRevenue } from '@/lib/actions/getTotalRevenue';
import { getSalesCount } from '@/lib/actions/getSalesCount';
import { getStockCount } from '@/lib/actions/getStockCount';
import Overview from '@/components/dashboard/Overview';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Package } from 'lucide-react';
import Heading from '@/components/shared/Heading';
import { formatter } from '@/lib/utils';

interface DashboardProps {
	params: { storeId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
	// fetch total revenue
	const totalRevenue = await getTotalRevenue(params.storeId);

	// fetch total sales
	const salesCount = await getSalesCount(params.storeId);

	// fetch product stock
	const stockCount = await getStockCount(params.storeId);

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<Heading title='Dashboard' description='Overview of your store' />

				<Separator />

				<div className='grid gap-4 grid-cols-3'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Total Revenue
							</CardTitle>
							<span className='h-4 w-4 text-muted-foreground align-end'>₱</span>
						</CardHeader>

						<CardContent>
							<div className='text-2xl font-bold'>
								{formatter.format(totalRevenue)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Sales</CardTitle>
							<span className='h-4 w-4 text-muted-foreground align-end'>
								<CreditCard />
							</span>
						</CardHeader>

						<CardContent>
							<div className='text-2xl font-bold'>+{salesCount}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Products in Stock
							</CardTitle>
							<span className='h-4 w-4 text-muted-foreground align-end'>
								<Package />
							</span>
						</CardHeader>

						<CardContent>
							<div className='text-2xl font-bold'>{stockCount}</div>
						</CardContent>
					</Card>
				</div>

				<Card className='col-span-4'>
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>

					<CardContent className='pl-2'>
						<Overview data={[]} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default DashboardPage;
