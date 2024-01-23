import useMounted from '@/hooks/useMounted';

const useOrigin = () => {
	// fix hydration error
	const isMounted = useMounted();

	// init origin
	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: '';

	if (!isMounted) {
		return null;
	}
	return origin;
};

export default useOrigin;
