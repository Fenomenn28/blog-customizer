import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			if (
				target instanceof HTMLElement &&
				!rootRef.current?.contains(target) &&
				!target.closest('li')
			) {
				//Здравствуйте! Объясните, пожалуйста, как в этом проекте должна была выглядеть эта логика. Я выполнил задание, но полагаю, что можно сделать лучше.
				isOpen && onClose?.(); //Честно говоря, я уже 3 день пытаюсь что-то сделать, но это единственно что пришло на ум -_-
				onChange?.(false);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
