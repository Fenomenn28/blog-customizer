import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const rootRef = useRef<HTMLElement | null>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
		onClose: () => setIsOpen(false),
	});

	const formSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		setArticleState({ ...formState });
		setIsOpen(!isOpen);
	};

	const formReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton setIsOpen={setIsOpen} isOpen={isOpen} />
			<aside
				ref={rootRef}
				className={`${styles.container} ${isOpen && styles.container_open}`}>
				<form className={styles.form} onSubmit={formSubmit} onReset={formReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: selectedOption,
							}))
						}
					/>
					<RadioGroup
						name='Размер шрифта'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: selectedOption,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectedOption,
							}))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectedOption,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
