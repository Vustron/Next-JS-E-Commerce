'use client';

import useMounted from '@/hooks/useMounted';
import { Modal } from '@/components/ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	isLoading,
}) => {
	// fix hydration error
	const isMounted = useMounted();

	if (!isMounted) {
		return null;
	}
	return (
		<Modal
			title='Are you sure?'
			description='This action cannot be undone.'
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className='pt-6 space-x-2 flex items-center justify-end w-full'>
				<Button disabled={isLoading} variant='destructive' onClick={onConfirm}>
					Continue
				</Button>
				<Button disabled={isLoading} variant='outline' onClick={onClose}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default AlertModal;
