import React from 'react';
import cls from './style.module.scss'
import clx from 'classnames'
import { PersonCard, LetterSelect } from '@/components';

const personsData = [
	{
		link: '/person/person-1', 
		img: 'person-1.png', 
		title: 'Серков', 
		date: [1920, 1970]
	},
	{
		link: '/person/person-2', 
		img: 'person-2.png', 
		title: 'Столпнев', 
		date: [1920]
	},
]

const selectData = [
	{label: 'Зайцев Николай Иванович', link: '/person/person-1'},
	{label: 'Зайцев Алексей Федорович', link: '/person/person-1'},
	{label: 'Замалеев Нури Залялеевич', link: '/person/person-1'},
	{label: 'Зекцер Петр Маркович', link: '/person/person-1'},
]


export default ({className, type, activeLetterIndex, letters}) => {
	
	return (<>
		<div className={clx(cls.wrap, className)}>
			<div type={type} container='' className={cls.cont}>
				{type == 'list' && personsData.map((el, i) => <PersonCard {...el} key={i} />)}
				{type == 'letters' && letters.map((el, i) => <LetterSelect letter={el} data={selectData} key={i} />)}
			</div>
		</div>
	</>);
}
