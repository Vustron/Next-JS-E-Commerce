'use client';

import { Modal } from '@/components/ui/modal';
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

	return <div className='p-4'>RootPage</div>;
};

export default SetUpPage;
