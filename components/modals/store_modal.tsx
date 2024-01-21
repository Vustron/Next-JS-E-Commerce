'use client';

import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';

const StoreModal = () => {
	// init modal
	const storeModal = useModal();

	return (
		<Modal
			title='Create Store'
			description='Add a new store to manage products and categories'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			Future Create Store Form
		</Modal>
	);
};

export default StoreModal;
