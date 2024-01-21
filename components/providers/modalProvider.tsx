'use client';

import useMounted from '@/hooks/useMounted';
import StoreModal from '@/components/modals/storeModal';

export const ModalProvider = () => {
	// fix hydration error
	const isMounted = useMounted();

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<StoreModal />
		</>
	);
};
