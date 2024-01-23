import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// extract body
		const body = await req.json();

		// extract name
		const { name } = body;

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		// if there's no name throw an error
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		// if there's no storeId throw an error
		if (!params.storeId) {
			return new NextResponse('StoreId is required', { status: 400 });
		}

		const store = await db.store.updateMany({
			where: {
				id: params.storeId,
				userId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORES_PATCH]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		// if there's no storeId throw an error
		if (!params.storeId) {
			return new NextResponse('StoreId is required', { status: 400 });
		}

		const store = await db.store.deleteMany({
			where: {
				id: params.storeId,
				userId,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORES_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
