import React from 'react';
import cls from './style.module.scss'
import { Button, Icon } from '@/UI';


export default ({clickBtn}) => {
	
	return (<>
		<div className={cls.wrap}>
			<img src="/images/book.png" alt="book" />
			<img src="/images/pencils.png" alt="pencils" />
			<div className={cls.grid} container=''>
				<h1 className={cls.title}>
					<span>учителя </span> 
					фронтовики
					<br />
					казани
				</h1>
				<div className={cls.desc}>
					<p>В годы Великой Отечественной войны многим казанцам пришлось оставить привычную жизнь и уйти на фронт.</p>
					<p>{`На этом портале мы расскажем\nо тех фронтовиках, чья жизнь была связана с одной из самых мирных\nпрофессий — учитель.`}</p>
				</div>
				<Button onClick={clickBtn} className={cls.btn}>Перейти к поиску <Icon name='next'/></Button>
			</div>
		</div>
	</>);
}
