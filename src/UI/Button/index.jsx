import Link from 'next/link';
import React from 'react';
import clx from 'classnames'
import cls from './style.module.scss'


export default ({href=null, theme='light', w='fit-content', css={}, className='', children, type='button', ...props }) => {
	
	
	let ops = {
		type,
		href,
		theme,
		style: {width: w, ...css},
		className: clx(cls.btn, className),
		...props,
	}

	return (<>
		{
			href ? 
			<Link {...ops}>{children}</Link>	
			:
			<button {...ops}>{children}</button>
		}
		
	</>);
}
