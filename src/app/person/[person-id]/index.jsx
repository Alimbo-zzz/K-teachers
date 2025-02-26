'use client'
import React, { useEffect } from 'react';
import { v4 as setId } from 'uuid';
import cls from './style.module.scss'
import { useActions, useMedia, usePopapGallery } from '@/hooks';
import { useState } from 'react';
import { arrayRows, defaultPersonSrc, getImage } from '@/scripts';
import { useSelector } from 'react-redux';





export default ({person}) => {
	if(!person.status) return (<><h1 container='' className={cls.err}>Такой персоны не существует</h1></>)
	const {windowWidth} = useMedia();
	const data = person.details.data[0];
	const [photos, setPhotos] = useState([])
	const popapGallery = usePopapGallery(photos);
	const rowsPhotos = arrayRows(photos, 3)
	const {contentVisible} = useSelector(state => state.base);
	const {setContentVisible} = useActions();
	const defaultPersonImg = defaultPersonSrc + `${data?.female ? 'female' : 'male'}.png` 

	useEffect(()=>{
		if(!data?.photos) return;
		setPhotos(data?.photos.map(el => ({src: getImage(data?._id, el?.src), desc: el?.desc, id: setId()})))
	}, [data])

	useEffect(()=>{
		document.body.scrollTo({top: 0, behavior: 'instant'})
		setContentVisible(true);
	}, [])

	
	return (<>
		{popapGallery.render}
		<div animate={String(contentVisible)} className={cls.wrap}>
			<div container='' className={cls.cont}>
				<div className={cls.cont__info}>
					<div className={cls.preview}>
						<div className={cls.preview__person}>
							<img src="/images/star.png" alt="decor" />
							<img onError={e => e.target.src = defaultPersonImg} src={data?.portrait ? getImage(data?._id, data?.portrait) : defaultPersonImg} alt="person" />
						</div>
						<div className={cls.preview__info}>
							<p name='text'>школа</p>
							<span name='line' />
              <p name='text'>{data?.school ? `№${data?.school}` : '?'}</p>
						</div>
					</div>
					<div className={cls.name}>
						<h1> {data?.lastname} {data?.firstname} {data?.patronymic}</h1>
						<h3>
							<span name='date'>{data?.born || '?'}</span>
							<span line='1'/>
							<span name='date'>{data?.die || '?'}</span>
							<span line='2'/>
						</h3>
					</div>
					<div className={cls.content} dangerouslySetInnerHTML={{__html: data?.about}}/>
				</div>
				<div className={cls.rows}>
					{
						windowWidth < 765 
						?
						photos.map(el =>	
							<div className={cls.col} key={el.id}>
								<div className={cls.col__img} onClick={() => popapGallery.open(photos.findIndex(({id}) => id == el.id))} >
									<img src={el?.src || getImage(data?._id, el?.src)} alt="preview" />
								</div>
								<p>{el?.desc}</p>
							</div>
						)
						:
						rowsPhotos.map((arr, i) =>  
							(
								[
									(i > 0) && <span  key={i} className={cls.rows__line}/>,
									<div key={i+1} className={cls.rows__item} >
										{arr.map((el, i) => 
											<div className={cls.col} key={el.id}>
												<div className={cls.col__img} onClick={() => popapGallery.open(photos.findIndex(({id}) => id == el.id))} >
													<img src={el?.src || getImage(data?._id, el?.src)} alt="preview" />
												</div>
												<p dangerouslySetInnerHTML={{ __html: el?.desc }} />
											</div>
										)}
									</div>	
								]
							)
						)
					} 
				</div>
			</div>
		</div>
	</>);
}
