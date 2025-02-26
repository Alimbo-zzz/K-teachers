'use client'
import React, { useRef } from 'react';
import cls from './style.module.scss';
import Link from 'next/link';
import clx from 'classnames';
import { defaultPersonSrc, getImage } from '@/scripts';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks';


export default ({born, die, lastname, portrait, _id, className, female, ...props}) => {
	const router = useRouter();
	const timeoutRef = useRef();
	const {setContentVisible, setActiveLetterIndex} = useActions();
	const {activeLetterIndex, letters} = useSelector(state => state.base);
	const defaultPersonImg =  defaultPersonSrc + `${female ? 'female' : 'male'}.png`; 

	const clickCard = (path) => {
		clearTimeout(timeoutRef.current)
		setContentVisible(false);
		let index = letters.findIndex(el => el == lastname.split('').shift())
		setActiveLetterIndex(index);
		let params = `?letter-index=${index}`;
		if(index === null || index === undefined) params = '';
		timeoutRef.current = setTimeout(() => {
			router.push(path + params, {scroll: false})
		}, 800);
	}





	return (<>
		<div onClick={() => clickCard('/person/' + _id )} className={clx(cls.card, className)}>
			<div className={cls.card__person}>
				<img  onError={e => e.target.src = defaultPersonImg} src={portrait ? getImage(_id, portrait) : defaultPersonImg} alt="person" />
			</div>
			<h4 className={cls.card__name}>{lastname}</h4>
			<div className={cls.card__date}>
				<span data-line />
				<span data-name='date'>{born || '?'}</span>
				<span data-line='mid' />
				<span data-name='date'>{die || '?'}</span>
				<span data-line />
			</div>
		</div>
	</>);
}
