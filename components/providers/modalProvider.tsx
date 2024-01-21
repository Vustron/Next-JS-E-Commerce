'use client';

import { useState, useEffect } from 'react';
import useMounted from '@/hooks/useMounted';

export const ModalProvider = () => {
	// fix hydration error
	const isMounted = useMounted();

	if (!isMounted) {
		return null;
	}
};
