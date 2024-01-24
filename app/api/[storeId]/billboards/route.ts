import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// extract body
		const body = await req.json();

		// extract name
		const { label, imageUrl } = body;

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		// if there's no label throw an error
		if (!label) {
			return new NextResponse('Label is required', { status: 400 });
		}

		// if there's no imageUrl throw an error
		if (!imageUrl) {
			return new NextResponse('imageUrl is required', { status: 400 });
		}

		// if there's no storeId throw an error
		if (!params.storeId) {
			return new NextResponse('Store ID is required', { status: 400 });
		}

		// check if the store exist on the user
		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		// check if the current user is authorized to create
		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		const billboard = await db.billboard.create({
			data: {
				label,
				imageUrl,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARDS_POST]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// if there's no storeId throw an error
		if (!params.storeId) {
			return new NextResponse('Store ID is required', { status: 400 });
		}

		const fetchBillboards = await db.billboard.findMany({
			where: {
				storeId: params.storeId,
			},
		});

		return NextResponse.json(fetchBillboards);
	} catch (error) {
		console.log('[BILLBOARDS_POST]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
