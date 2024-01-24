import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function POST(req: Request) {
	try {
		// fetch auth
		const { userId } = auth();

		// extract body
		const body = await req.json();

		// extract name
		const { name } = body;

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		// if there's no name throw an error
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		const store = await db.store.create({
			data: {
				name,
				userId,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORES_POST]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
