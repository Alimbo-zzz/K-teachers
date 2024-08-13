import React, {useState, useEffect} from 'react';
import cls from './style.module.scss'
import clx from 'classnames'
import { Button, Icon } from '@/UI';



export default ({className, letters, type, toggleType, setActiveLetterIndex, activeLetterIndex}) => {


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
					<Button onClick={toggleType} w='100%' theme='light'>{type == 'letters' ? "Поиск по алфавиту" : "Показать весь список"}</Button>
				</div>
				{
					type == 'list' && <div className={cls.letters}>
						{letters.map((el, i) => 
							<div 
								key={i} 
								className={cls.letters__item} 
								data-active={i == activeLetterIndex}
								onClick={() => setActiveLetterIndex(i)}
							>{el}</div>
						)}
					</div>
				}				
			</div>
		</header>
	</>);
}
