'use client';

import { Modal } from '@/components/ui/modal';
import { UserButton } from '@clerk/nextjs';

const SetUpPage = () => {
	return <Modal title='Test' description='Test' isOpen onClose={() => null} />;
};

export default SetUpPage;
