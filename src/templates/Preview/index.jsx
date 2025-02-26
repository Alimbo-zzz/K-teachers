'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss'
import { Button, Icon } from '@/UI';
import { useRouter } from 'next/navigation'


export default (props) => {
	const [animate, setAnimate] = useState(false)
	const timeOutAnimRef = useRef();
	const router = useRouter();
	const colorRef = useRef();
	const bgRef = useRef();


	useEffect(()=>{
		setAnimate(true);
	}, [])

	
	const nextPage = () => {
		setAnimate(false)
		timeOutAnimRef.current = setTimeout(() => {
			router.push('/list')
		}, 600);
	}


	useEffect(()=>{
		const colorImage = colorRef.current;
		let growing = false;
		let size = 0;
		let interval;

		const moveAnim = (e) => {
			clearInterval(interval);
			size = 10; // Начальный размер круга
			growing = false;
			const rect = colorImage.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			colorImage.style.transition = 'clip-path 0.3s ease-out';
			colorImage.style.clipPath = `circle(${size}% at ${x}px ${y}px)`;
			
			setTimeout(() => {
				growing = true;
				interval = setInterval(() => {
					if (growing && size < 150) {
						colorImage.style.transition = 'clip-path 10s ease-out';
						size += 2;
						colorImage.style.clipPath = `circle(${size}% at ${x}px ${y}px)`;
					} else {
						clearInterval(interval);
					}
				}, 50);
			}, 200);
		};
		
		bgRef.current.addEventListener('mousemove', moveAnim);


		return () => {
			bgRef.current.removeEventListener('mousemove', moveAnim);
		}

	}, [])

	return (<>
		<div animate={String(animate)} className={cls.wrap}>
			<div ref={bgRef} className={cls.bg}>
				{/* <div className={cls.color} ></div> */}
				<img src="/images/main-fone.png" alt="gray" />
				<img className={cls.color} ref={colorRef} src="/images/main-fone-active.png" alt="red" />
				<img src="/images/main-fone-mobile.png" alt="mobile" />
			</div>
			{/* <img src="/images/pencils.png" alt="pencils" /> */}
			<div className={cls.grid} container=''>
				{/* <div className={cls.book}>
					<img src="/images/book.gif" alt="book" />
				</div> */}
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
				<Button theme='red' onClick={nextPage} className={cls.btn}>Перейти к поиску <Icon name='next'/></Button>
			</div>
		</div>
	</>);
}
