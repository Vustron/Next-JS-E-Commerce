'use client';

import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogContent,
	DialogDescription,
} from '@/components/ui/dialog';

import useMounted from '@/hooks/useMounted';

interface ModalProps {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
	title,
	description,
	isOpen,
	onClose,
	children,
}) => {
	// fix hydration error
	const isMounted = useMounted();

	const onChange = (open: boolean) => {
		if (!open) {
			onClose();
		}
	};

	if (!isMounted) {
		return null;
	}

	return (
		<Dialog open={isOpen} onOpenChange={onChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
};
