import React from 'react';
import cls from './style.module.scss'
import clx from 'classnames'

export default ({className}) => {
	
	return (<>
		<div className={clx(cls.wrap, className)}>
			<div container='' className={cls.cont}>
				<div className={cls.card}>
					<div className={cls.card__person}>
						<img src="/images/person-1.png" alt="person" />
					</div>
					<h4 className={cls.card__name}>Абузаров</h4>
					<div className={cls.card__date}>
						<span data-line />
						<span data-name='date'>1920</span>
						<span data-line='mid'   />
						<span data-name='date'>1970</span>
						<span data-line />
					</div>
				</div>
				<div className={cls.card}>
					<div className={cls.card__person}>
						<img src="/images/person-2.png" alt="person" />
					</div>
					<h4 className={cls.card__name}>Ахметшин</h4>
					<div className={cls.card__date}>
						<span data-line />
						<span data-name='date'>?</span>
						<span data-line='mid'   />
						<span data-name='date'>1970</span>
						<span data-line />
					</div>
				</div>
			</div>
		</div>
	</>);
}
