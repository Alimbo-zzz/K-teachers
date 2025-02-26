'use client'
import React, {useState, useEffect, useRef} from 'react';
import cls from './style.module.scss'
import clx from 'classnames'
import { Button, Icon } from '@/UI';
import { BreadСrumbs } from '@/components';
import { usePathname, useRouter } from 'next/navigation'
import { useActions, useMedia } from '@/hooks';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation'



export default ({className}) => {
	const pathname = usePathname();
	const {setActiveLetterIndex, toggleContentType, setSearchValue, setContentVisible} = useActions();
	const {activeLetterIndex, contentType, letters, contentVisible} = useSelector(state => state.base);
	const [searchInp, setSearchInp] = useState('');
	const router = useRouter();
	const [inpIsReady, setInpIsReady] = useState(false)
  const searchParams = useSearchParams();
	const timeoutRef = useRef();
	const {windowWidth} = useMedia();

	
	useEffect(()=>{
		const letterIndex = searchParams.get('letter-index')
		if(letterIndex === null || letterIndex === undefined) return;
		if(letterIndex === activeLetterIndex) return
		setActiveLetterIndex(Number(letterIndex));
	}, [searchParams])

	useEffect(()=>{
		let search = window.localStorage.getItem('k-teachers-search')?.split('')
		if(!search) return;
		search.pop(); search.shift();
		if(pathname == '/list')	setSearchInp(search.join('') || '');
	}, [pathname])


	useEffect(()=> {
		setContentVisible(true);
		setInpIsReady(true);
	}, [])


	const changePage = (path='/', params=`?letter-index=${activeLetterIndex}`) => {
		clearTimeout(timeoutRef.current);
		setContentVisible(false);
		timeoutRef.current = setTimeout(() => {
			if(path == '/') params = '';
				router.push(path + params)
		}, 800);
	}


	const resetSearch = () => {
		setSearchInp('');
		window.localStorage.removeItem('k-teachers-search')
	};

	useEffect(()=>{	
		setSearchValue(searchInp)
		if(contentType == 'letters' && searchInp) {toggleContentType('')}
		if(!inpIsReady) return;
		if(pathname != '/list') changePage('/list');
	}, [searchInp])

	const searchChange = e => {
		let value = e.target.value;
		setSearchInp(value);
		window.localStorage.setItem('k-teachers-search', JSON.stringify(value))
	}



	const clickLetter = (i) => {		
		if(pathname == '/list' && i === activeLetterIndex) {
			setActiveLetterIndex(null)
			router.push(pathname);
			return 
		}
		if(pathname != '/list') changePage('/list', `?letter-index=${i}`);
		else router.push(pathname + `?letter-index=${i}`)
		setActiveLetterIndex(i)
		if(contentType != 'list') toggleContentType('list');
	}

	const clickBtn = () => {
		resetSearch();
    if(pathname != '/list') changePage('/list');
    if(contentType == 'list') toggleContentType('letters');
    if(contentType == 'letters') toggleContentType('list');
	}

	const clickMobileBtn = () => {
		resetSearch();
		if(!searchInp) changePage('/')
	}
	
	if(pathname == '/') return;
	

	return (<>
		{pathname != '/list' && 
			<div className={cls.breadcrumbs}>
				<div container=''>
					<BreadСrumbs />
					<hr />
				</div>
			</div>
		}
		<header data-page={pathname} animate={String(contentVisible)} className={clx(cls.wrap, className)}>
			{pathname == '/list' && <>
				<img src="/images/pencil.png" alt="pencil" />
				<img src="/images/bullet.png" alt="bullet" />
			</>}
			<form action="" onSubmit={e => e.preventDefault()} container='' className={cls.cont}>
				{pathname == '/list' && 
					<>
						<BreadСrumbs/>
						<hr />
					</>
				}
				<div className={cls.search}>
					<label className={cls.search__inp}>						
						<input value={searchInp} onChange={searchChange}  placeholder='Введите фамилию учителя' type="search" />
						<Icon name='search' />
					</label>
					<button type='button' onClick={clickMobileBtn} className={cls.btnMobile}><Icon name={searchInp != '' ? 'cross' : 'book'}/></button>
					{windowWidth > 765 && <Button className={cls.btn} onClick={clickBtn} w='100%' theme='light'>{(contentType == 'list' || pathname != '/list') ? "Показать весь список" : "Поиск по алфавиту" }</Button>}
				</div>
				{
					(contentType == 'list' || pathname != '/list') && <div className={cls.letters} data-active={pathname == '/list'}>
						{letters.map((el, i) => 
							<div 
								key={i} 
								className={cls.letters__item} 
								data-active={i === activeLetterIndex}
								onClick={() => clickLetter(i)}
							>{el}</div>
						)}
					</div>
				}
			</form>
		</header>
	</>);
}
