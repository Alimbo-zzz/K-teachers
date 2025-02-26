'use client'
import React, { useRef } from 'react';
import clx from 'classnames'
import cls from './style.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { useActions } from '@/hooks';



export default ({className}) => {
	const pathname = usePathname();
	const timeoutRef = useRef();
	const {setContentVisible} = useActions();
	const router = useRouter();

	const data = pathname == '/list' ? ([{value: 'Главная', link: '/'}]) : ([{value: 'Главная', link: '/'}, {value: 'Список учителей', link: '/list'}])


	function clickLink(e) {
		let path = e.target.dataset.href;
		setContentVisible(false);
		clearTimeout(timeoutRef.current)

		timeoutRef.current = setTimeout(() => {
			router.push(path);
		}, 600);
	}
	
	return (<>
		<nav className={clx(cls.wrap, className)}>
			{data.map((el, i) => <button type='button' onClick={clickLink} key={i} className={cls.item} data-href={el.link}>{el.value || ''}</button>)}
		</nav>
	</>);
}
