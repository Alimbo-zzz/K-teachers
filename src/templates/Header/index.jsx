import React, {useState, useEffect} from 'react';
import cls from './style.module.scss'
import clx from 'classnames'
import { Button, Icon } from '@/UI';


const alfabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю','Я']

export default ({className}) => {
	const [fullList, setFullList] = useState(false)
	const [activeLetter, setActiveLetter] = useState(0);

	
	return (<>
		<header className={clx(cls.wrap, className)}>
			<img src="/images/pencil.png" alt="pencil" />
			<img src="/images/bullet.png" alt="bullet" />
			<div container='' className={cls.cont}>
				<nav className={cls.nav}>
					<a href="/">Главная</a>
				</nav>
				<hr />
				<div className={cls.search}>
					<label className={cls.search__inp}>						
						<input placeholder='Введите фамилию, имя или отчество учителя' type="text" />
						<Icon name='search' />
					</label>
					<Button onClick={() => setFullList(prev => !prev)} w='100%' theme='light'>{fullList ? "Поиск по алфавиту" : "Показать весь список"}</Button>
				</div>
				<div className={cls.letters}>
					{alfabet.map((el, i) => 
						<div 
							key={i} 
							className={cls.letters__item} 
							data-active={i == activeLetter}
							onClick={() => setActiveLetter(i)}
						>{el}</div>
					)}
				</div>
			</div>
		</header>
	</>);
}
