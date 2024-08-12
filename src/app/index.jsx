'use client'
import React, {useState, useEffect} from 'react';
import cls from './style.module.scss'
import { Main, Preview, Header, Footer } from '@/templates';


export default (props) => {
	const [isPreview, setIsPreview] = useState(true)
	
	return (<>
		{isPreview ? <Preview clickBtn={() => setIsPreview(false)}/> : (
			<div className={cls.main}>
				<Header className={cls.main__header} />
				<Main className={cls.main__content}/>
				<Footer className={cls.main__footer} />
			</div>	
		)}
	</>);
}
