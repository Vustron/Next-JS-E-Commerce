import { ContainerProps } from '@/lib/interfaces';

const Container: React.FC<ContainerProps> = ({ children }) => {
	return <div className='mx-auto max-w-7xl'>{children}</div>;
};

export default Container;
