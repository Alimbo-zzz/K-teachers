'use client'
import React, { useEffect, useState } from 'react';
import cls from './style.module.scss'
import clx from 'classnames'
import { PersonCard, LetterSelect } from '@/components';
import { useActions, useMedia } from '@/hooks';
import { useSelector } from 'react-redux';
import { arrayRows } from '@/scripts';
import { useRouter } from 'next/navigation';




export default ({className}) => {
	const {windowWidth} = useMedia();
	const {personList, searchList, contentType, activeLetterIndex, letters} = useSelector(state => state.base);
	const letterRows =  arrayRows(letters, 3);
	const {setContentVisible} = useActions();
	const {contentVisible} = useSelector(state => state.base);
	const router = useRouter();

	useEffect(()=>{
		if(activeLetterIndex === null) router.push('/list');
	}, [activeLetterIndex])

	useEffect(()=>{
		if(contentType == 'list' && !searchList.length) document.body.dataset.bg = 'lines';
		else document.body.dataset.bg = 'list';;
	}, [contentType, searchList])


	
	useEffect(()=>{setContentVisible(true)}, [])

	const getItemsByLetter = (letter) => personList.filter(el => el.lastname.split('').shift().toLowerCase() == letter.toLowerCase());
	const setSelectData = (letter) => getItemsByLetter(letter).map(el => ({label: `${el.lastname} ${el.firstname} ${el.patronymic}`, link: `/person/${el._id}`}));


	return (<>
		<div animate={String(contentVisible)} className={clx(cls.wrap, className)}>
			<div type= {contentType} data-grid={searchList.length ? 'true' : 'false'} container='' className={cls.cont}>
				{(contentType == 'list' || windowWidth < 765) && searchList.map((el, i) => <PersonCard index={i} {...el} key={el._id} />)}
				{(contentType == 'list' && !searchList.length) && 
					<div className={cls.empty}>
						<h4>Мы еще собираем информацию об этих героях.</h4>
						<p>Возможно, вы можете нам помочь?</p>
						<p>Пишите на почту: <a href="mailto:licey.182@tatar.ru">licey.182@tatar.ru</a></p>
					</div>
				}
				{contentType == 'letters' && (
					windowWidth > 765 &&
					letterRows.map((letters, i) => 
						<div className={cls.row} key={i}>
							{letters.map((el, i) => setSelectData(el).length > 0 && <LetterSelect className={cls.select} letter={el} index={i} data={setSelectData(el)} key={i} />)}
						</div>	
					)
				)}
			</div>
		</div>
	</>);
}
