import React from 'react';
import cls from './style.module.scss'
import clx from 'classnames'


export default ({className}) => {
	
	return (<>
		<footer className={clx(cls.wrap, className)}>
			<div container='' className={cls.grid}>
				<p name='info'>Муниципальное бюджетное общеобразовательное учреждение "Политехнический лицей №182" Кировского района г.Казани</p>
				<div name='supervisor' className={cls.grid__box}>
					<h4>Руководитель</h4>
					<p>Дуженков Руслан Викторович</p>
				</div>
				<div name='contacts' className={cls.grid__box}>
					<h4>контакты</h4>
					<p>420076, Республика Татарстан, г. Казань, ул. Айрата Арсланова, д. 10</p>
					<p>lyceum182@mail.ru</p>
					<p>Licey.182@tatar.ru</p>
				</div>
				<div name='logo' className={cls.grid__box}>
					<p>Дизайн и создание сайта</p>
					<img src="/images/k-logo.svg" alt="logo" />
				</div>
			</div>
		</footer>
	</>);
}
