import { Billboard } from '@/lib/interfaces';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export const getBillboards = async (id: string): Promise<Billboard> => {
	const res = await fetch(`${URL}/${id}`);

	return res.json();
};
