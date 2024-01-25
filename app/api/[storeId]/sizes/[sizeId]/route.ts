import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function GET(
	req: Request,
	{ params }: { params: { sizeId: string } }
) {
	try {
		// if there's no sizeId throw an error
		if (!params.sizeId) {
			return new NextResponse('Size ID is required', { status: 400 });
		}

		const size = await db.size.findUnique({
			where: {
				id: params.sizeId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_GET]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { sizeId: string; storeId: string } }
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
			return new NextResponse('Unauthorized', { status: 403 });
		}

		// if there's no name throw an error
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		// if there's no value throw an error
		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
		}

		// if there's no sizeId throw an error
		if (!params.sizeId) {
			return new NextResponse('Size ID is required', { status: 400 });
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
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const size = await db.size.update({
			where: {
				id: params.sizeId,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_PATCH]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { sizeId: string; storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// if there's no sizeId throw an error
		if (!params.sizeId) {
			return new NextResponse('Size ID is required', { status: 400 });
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
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const size = await db.size.delete({
			where: {
				id: params.sizeId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
