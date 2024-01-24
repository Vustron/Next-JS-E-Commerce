'use client';

import useOrigin from '@/hooks/useOrigin';
import { useParams } from 'next/navigation';
import ApiAlert from '@/components/ui/apiAlert';

interface ApiListProps {
	entityName: string;
	entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
	// init params
	const params = useParams();

	// init origin
	const origin = useOrigin();

	// init baseUrl
	const baseUrl = `${origin}/api/${params.storeId}`;

	return (
		<>
			<ApiAlert
				title='GET'
				variant='public'
				description={`${baseUrl}/${entityName}`}
			/>

			<ApiAlert
				title='GET'
				variant='public'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>

			<ApiAlert
				title='POST'
				variant='admin'
				description={`${baseUrl}/${entityName}`}
			/>

			<ApiAlert
				title='PATCH'
				variant='admin'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>

			<ApiAlert
				title='DELETE'
				variant='admin'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>
		</>
	);
};

export default ApiList;
