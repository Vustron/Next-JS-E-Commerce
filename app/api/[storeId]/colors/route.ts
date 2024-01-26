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
		const { name, value } = body;

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		// if there's no name throw an error
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		// if there's no value throw an error
		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
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

		const color = await db.color.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLORS_POST]', error);
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

		const fetchColors = await db.color.findMany({
			where: {
				storeId: params.storeId,
			},
		});

		return NextResponse.json(fetchColors);
	} catch (error) {
		console.log('[COLORS_GET]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
