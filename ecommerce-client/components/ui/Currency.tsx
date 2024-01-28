'use client';

import { CurrencyProps } from '@/lib/interfaces';
import useMounted from '@/hooks/useMounted';
import { formatter } from '@/lib/utils';

const Currency: React.FC<CurrencyProps> = ({ value }) => {
	// fix hydration error
	const isMounted = useMounted();

	if (!isMounted) {
		return null;
	}
	return <div className='font-semibold'>{formatter.format(Number(value))}</div>;
};

export default Currency;
