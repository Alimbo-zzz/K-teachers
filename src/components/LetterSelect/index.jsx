'use client'
import React, {useState, useEffect} from 'react';
import cls from './style.module.scss'
import clx from 'classnames'
import Link from 'next/link';


const IconDropdown = <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0.5H0L10 10.5L20 0.5Z" fill="currentColor"/>
</svg>


// data=[{label:'', link: ''}]
export default ({className='', letter='A', data=[]}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (<>
		<div open={isOpen} className={clx(cls.wrap, className)}>
			<div open={isOpen} onClick={() => setIsOpen(prev => !prev)} className={cls.preview}>
				<span data-line='1'/>
				<span name='letter'>{letter}</span>
				<span data-line='2'/>
				{IconDropdown}
			</div>
			<ul open={isOpen} className={cls.list}>
				{data.map((el, i) => 
					<Link href={el.link} className={cls.item} key={i}>
						{el.label}
					</Link>
				)}				
			</ul>
		</div>
	</>);
}
