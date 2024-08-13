'use client'
import React, {useState, useEffect} from 'react';
import cls from './style.module.scss'
import { Main, Preview, Header, Footer } from '@/templates';


export default (props) => {
	const [isPreview, setIsPreview] = useState(true)
	const [contentType, setContentType] = useState('list'); // list || letters
	const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю','Я']
	const [activeLetterIndex, setActiveLetterIndex] = useState(0);


	const toggleType = () => setContentType(prev => prev == 'list' ? 'letters' : 'list');

	const headerOps = {
		toggleType,
		type: contentType,
		className: cls.main__header,
		activeLetterIndex, setActiveLetterIndex,
		letters,
	}

	const mainOps = {
		type: contentType, 
		className: cls.main__content,		
		activeLetterIndex, letters,
	}


	return (<>
		{isPreview ? <Preview clickBtn={() => setIsPreview(false)}/> : (
			<div className={cls.main}>
				<Header {...headerOps} />
				<Main {...mainOps}/>
				<Footer className={cls.main__footer} />
			</div>	
		)}
	</>);
}
