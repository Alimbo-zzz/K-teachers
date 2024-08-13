'use client'
import React from 'react';
import cls from './style.module.scss'
import { Footer } from '@/templates';

export default (props) => {
	
	return (<>
		<div className={cls.wrap}>
			<div container='' className={cls.cont}>
				<div className={cls.cont__info}>
					<div className={cls.preview}>
						<div className={cls.preview__person}>
							<img src="/images/bullet-pencil.png" alt="decor" />
							<img src="/images/persons/person-1.png" alt="person" />
						</div>
						<div className={cls.preview__info}>
							<p name='text'>школа</p>
							<span name='line' />
							<p name='text'>№135</p>
						</div>
					</div>
					<div className={cls.content}>
						<h1>Сахабутдинов Константин Константинович</h1>
						<h3>
							<span name='date'>1924</span>
							<span line='1'/>
							<span name='date'>2012</span>
							<span line='2'/>
						</h3>
						<div className={cls.content__text}>
							<p>Родился 12 апреля 1911 года в городе Жмеринка на Украине. Жил в Казани.</p>
							<p>В 1932 году окончил педагогические курсы в Ленинграде. Был направлен на работу в Кировск, где работал в школах с 1934 по 1937 год. В 1941 году оконччил Ленинградский Коммунистический политико-просветительный институт.</p>
							<p>В этом же году был мобилизован Кировским военным комиссариатом. Служил инструктором по пропаганде в 205-й стрелковой дивизии, в 31-м стрелковом корпусе, в 186-й стрелковой дивизии. Участвовал в боях Карельского фронта. Демобилизован в 1953 году в звании подполковника.</p>
							<p>Дважды кавалер ордена Красной Звезды, ордена Отечественной войны II степени. Награждён медалями «За боевые заслуги», «За оборону Советского Заполярья», «За победу над Германией в Великой Отечественной войне 1941–1945 гг».</p>
							<p>Современники характеризовали Петра Марковича как требовательного, болеющего за дело руководителя, хорошего специалиста. Он получил звание заслуженного учителя РСФСР.</p>
							<p>В 1953 году он стал директором школы № 81 в Казани. При нем окрепла материально-техническая база школы. Были оборудованы кабинеты, открыт кинокласс.</p>
						</div>
					</div>
				</div>
				<div className={cls.cont__col}>
					<div className={cls.col}>
						<img src="/images/test-3.png" alt="preview" />
						<p>Фото учеников школы</p>
					</div>
					<div className={cls.col}>
						<img src="/images/test-2.png" alt="preview" />
						<p>Фото учеников школы</p>
					</div>
					<div className={cls.col}>
						<img src="/images/test-1.png" alt="preview" />
						<p>Наградной лист</p>
					</div>
				</div>
			</div>
		</div>
		<Footer/>
	</>);
}
