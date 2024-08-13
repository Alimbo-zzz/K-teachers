'use client'
import React from 'react';
import cls from './style.module.scss';
import Link from 'next/link';
import clx from 'classnames';


export default ({link, img='', title='', date=[null, null], className}) => {
	
	return (<>
		<Link href={link} className={clx(cls.card, className)}>
			<div className={cls.card__person}>
				{img && <img src={`/images/persons/${img}`} alt="person" />}
			</div>
			<h4 className={cls.card__name}>{title}</h4>
			<div className={cls.card__date}>
				<span data-line />
				<span data-name='date'>{date[0] || '?'}</span>
				<span data-line='mid' />
				<span data-name='date'>{date[1] || '?'}</span>
				<span data-line />
			</div>
		</Link>
	</>);
}
