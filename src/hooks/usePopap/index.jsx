import React, {useState} from 'react';
import cls from './style.module.scss'


const CrossIcon_1 = <svg  version="1.1" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"/></g></svg>
const CrossIcon = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm3.71,13.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-2.29,2.3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.59l2.29-2.3a1,1,0,0,1,1.42,1.42L13.41,12Z"/></g></svg>


const Popap = ({children, isOpen, setter, title=''}) => {
	
	return (<>
		<div onClick={() => setter(false)} className={cls.overlay} data-open={isOpen}>
			<div data-open={isOpen} onClick={e => e.stopPropagation()} className={cls.wrap}>
				<div className={cls.head}>
					<h4 className={cls.title}>{title}</h4>
					<button className={cls.close} onClick={() => setter(false)}>{CrossIcon}</button>
				</div>
				<div className={cls.content}>{children}</div>
			</div>
		</div>	
	</>)
}

export default (props) => {
	const [isOpen, setIsOpen] = useState(false);



	return {
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
		toggle: () => setIsOpen(prev => !prev),
		render: <Popap isOpen={isOpen} setter={setIsOpen}/>,
	};
}
