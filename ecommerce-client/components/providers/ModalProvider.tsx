'use client';

import PreviewModal from '@/components/modals/PreviewModal';
import useMounted from '@/hooks/useMounted';

const ModalProvider = () => {
	// fix hydration error
	const isMounted = useMounted();

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<PreviewModal />
		</>
	);
};

export default ModalProvider;
