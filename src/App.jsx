import { useState } from 'react';
import styles from './App.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState(data); //массив c данными для кнопок
	const [activeIndex, setActiveIndex] = useState(0); //индекс определяющий активный шаг

	// const [firstFlag, setFirstFlag] = useState(true); //находимся ли мы на первом шаге
	// const [lastFlag, setlastFlag] = useState(true); //находимся ли на последнем

	// переменные со стилями для шагов кнопок
	const passiveStyleClassName = styles['steps-item'];
	const activeStyleClassName = `${passiveStyleClassName + ' ' + styles.done + ' ' + styles.active}`;
	const doneStyleClassName = `${passiveStyleClassName + ' ' + styles.done}`;
	// получаем активный пассивный класс
	const getClassName = (index, activeIndex) => {
		if (index === activeIndex) {
			return activeStyleClassName;
		} else if (index <= activeIndex) {
			return doneStyleClassName;
		} else return passiveStyleClassName;
	};

	// Получаем активный индекс из переборного массива
	const updateIndexClickButtonStep = (index) => {
		setActiveIndex(index);
	};

	// Добавление кнопок шагов
	const stepButton = steps.map((step, index) => {
		// сравниваем активный индекс и добавляем активный стиль
		const opredClassName = getClassName(index, activeIndex);
		return (
			<li key={step.id} className={opredClassName}>
				<button
					className={styles['steps-item-button']}
					onClick={() => updateIndexClickButtonStep(index)}
				>
					{index + 1}
				</button>
				{step.title}
			</li>
		);
	});

	const aktivContent = steps[activeIndex]
		? steps[activeIndex].content
		: console.log('Такого шага не существует');

	//назад
	const onBackButtonClick = () => {
		setActiveIndex(activeIndex - 1);
	};

	//далеe
	const onForwardButtonClick = () => {
		setActiveIndex(activeIndex + 1);
	};

	// сначала
	const onStartOverButtonClick = () => {
		return setActiveIndex(0);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{aktivContent}</div>
					<ul className={styles['steps-list']}>{stepButton}</ul>
					<div className={styles['buttons-container']}>
						<button
							disabled={activeIndex === 0}
							className={styles.button}
							onClick={onBackButtonClick}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={
								activeIndex === steps.length - 1
									? onStartOverButtonClick
									: onForwardButtonClick
							}
						>
							{activeIndex === steps.length - 1
								? 'Начать сначала'
								: 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
