import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

interface OnClick {
	setIsOpen: (state: boolean) => void;
	isOpen?: boolean;
}

export const ArrowButton = ({ setIsOpen, isOpen }: OnClick) => {
	const onClickHandler = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen && styles.container_open}`}
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				onClickHandler();
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen && styles.arrow_open}`}
			/>
		</div>
	);
};
