'use client';

import { Button } from '@/components/ui/button';
import useMounted from '@/hooks/useMounted';
import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	// fix hydration error
	const isMounted = useMounted();

	// handle upload
	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}
	return (
		<div>
			<div className='mb-4 flex items-center gap-4'>
				{value.map((url) => (
					<div
						key={url}
						className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
					>
						<div className='z-10 absolute top-2 right-2'>
							<Button
								variant='destructive'
								size='icon'
								type='button'
								onClick={() => onRemove(url)}
							>
								<Trash className='h-4 w-4' />
							</Button>
						</div>
						<Image fill className='object-cover' alt='Image' src={url} />
					</div>
				))}
			</div>

			<CldUploadWidget onUpload={onUpload} uploadPreset='woduxi8v'>
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							variant='secondary'
							type='button'
							disabled={disabled}
							onClick={onClick}
						>
							<ImagePlus className='h-4 w-4 mr-2' />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
