import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const errorMessage =
		'Введенное значение должно содержать минимум 3 символа, вы ввели: ';

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue === null) {
			setValue('');
			setError('');
			return;
		} else if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		} else {
			setError(errorMessage + promptValue);
		}
	};
	const errorBlock = <div className={styles.error}>{error}</div>;
	const elemBlock = <p className={styles.noMarginText}>Нет добавленных элементов</p>;
	const isValueVaild = value.length >= 3;

	const onAddButtonClick = () => {
		if (isValueVaild) {
			const id = Date.now();
			const updatedList = [...list, { id, value }];
			setList(updatedList);
			setValue('');
			setError('');
			return;
		}
	};

	const deletElemId = (id) => {
		const newList = list.filter((item) => item.id !== id);
		setList(newList);
	};

	const renderList = () => {
		return list.map((item) => (
			<>
				<li className={styles.listItem} key={item.id}>
					{item.value}
					<button
						className={styles.buttonDel}
						onClick={() => deletElemId(item.id)}
					>
						Удалить
					</button>
				</li>
			</>
		));
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			{error && errorBlock}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length === 0 && elemBlock}
				<ul className={styles.list}>{renderList()}</ul>
			</div>
		</div>
	);
};
