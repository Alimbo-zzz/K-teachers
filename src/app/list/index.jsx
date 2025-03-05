'use client'
import React, {useState, useEffect} from 'react';
import cls from './style.module.scss'
import { Main } from '@/templates';
import { useActions, useDebounce } from '@/hooks';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';


export default ({data}) => {
	const {setPersonList, setContentVisible, setListLastScroll} = useActions();
	const [scrollValue, setScrollValue] = useState(0);
	const debouncedScrollValue = useDebounce(scrollValue);
	const {listLastScroll} = useSelector(state => state.base);
	const router = useRouter();
	const pathname = usePathname();


	useEffect(()=>{
		document.body.dataset.bg = 'list';
		return () => {
			document.body.dataset.bg = '';
		}
	}, [])


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
		<img src="/images/full-fone.jpg" alt="" className={cls.fone} />
		<div className={cls.main}>
			<Main className={cls.main__content} />
		</div>	
	</>);
}
