'use client'
import React, { useEffect } from 'react';
import cls from './style.module.scss'
import clx from 'classnames'
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks';


export default ({className}) => {
	const {contentVisible} = useSelector(state => state.base);
	const pathname = usePathname();
	if(pathname == '/') return (<></>);


	
	return (<>
		<footer animate={String(contentVisible)} className={clx(cls.wrap, className)}>
			<div container='' className={cls.grid}>
        <p name='info'>Муниципальное бюджетное общеобразовательное учреждение «Политехнический лицей № 182» Кировского района г. Казани</p>
				<div name='supervisor' className={cls.grid__box}>
					<h4>Руководитель</h4>
					<p>Дуженков Руслан Викторович</p>
				</div>
				<div name='contacts' className={cls.grid__box}>
					<h4>контакты</h4>
					<a href='https://yandex.ru/maps/-/CDgsQC14' target='_blank'>420076, Республика Татарстан, г. Казань, ул. Айрата Арсланова, д. 10</a>
					<a href='mailto:lyceum182@mail.ru'>lyceum182@mail.ru</a>
					<a href='mailto:licey.182@tatar.ru'>licey.182@tatar.ru</a>
				</div>
				<div name='logo' className={cls.grid__box}>
					<p>Дизайн и создание сайта</p>
          <a href="https://kochubeymedia.ru?utm_source=kazan_teachers" target='_blank'><img src="/images/k-logo.svg" alt="logo" /></a>
				</div>
			</div>
		</footer>
	</>);
}
