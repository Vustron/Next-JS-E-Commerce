'use client';

import { useModal } from '@/hooks/useModal';
import { UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';

const SetUpPage = () => {
	// init modal
	const onOpen = useModal((state) => state.onOpen);
	const isOpen = useModal((state) => state.isOpen);

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return <div className='p-4'></div>;
};

export default SetUpPage;
