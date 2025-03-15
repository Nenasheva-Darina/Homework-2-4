import { useState } from 'react';
import styles from './App.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState(data);

	return <div></div>;
};
