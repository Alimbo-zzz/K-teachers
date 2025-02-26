'use client'
import React, {useState, useEffect} from 'react';
import cls from './style.module.scss'
import { Main } from '@/templates';
import { useActions, useDebounce } from '@/hooks';
import { useSelector } from 'react-redux';


export default ({data}) => {
	const {setPersonList, setContentVisible, setListLastScroll} = useActions();
	const [scrollValue, setScrollValue] = useState(0);
	const debouncedScrollValue = useDebounce(scrollValue);
	const {listLastScroll} = useSelector(state => state.base);


	useEffect(()=>{
		setListLastScroll(debouncedScrollValue)
	}, [debouncedScrollValue])


	const scrollTopSetter = () => {
		setScrollValue(document.body.scrollTop);
	}

	useEffect(()=>{
		document.body.addEventListener('scroll', scrollTopSetter)

		document.body.scrollTop = listLastScroll;
		return () => {
			document.body.removeEventListener('scroll', scrollTopSetter)
		}
	}, [])


	useEffect(()=>{setContentVisible(true)}, [])
	useEffect(()=>{setPersonList(data.details.data)}, [data])

	if(!data.status) return (<><h1>Ошибка {`(${data.details})`}</h1></>)
	
	return (<>
		<div className={cls.main}>
			<Main className={cls.main__content} />
		</div>	
	</>);
}
