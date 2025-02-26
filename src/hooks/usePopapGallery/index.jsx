import React, {useState, useEffect, useRef} from 'react';
import cls from './style.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './swiper.scss';
import CloseIcon from '@mui/icons-material/Close';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Popap = ({isOpen, setIsOpen, swiper, setSwiper, swiperRef, slides}) => {


	const swiperOps = {
		onSwiper: (e) => {swiperRef.current = e; setSwiper({...e});},
		onSlideChange: e => setSwiper({...e}),
		spaceBetween: '5%',
		modules: [Pagination],
		pagination: { clickable: true, type: 'progressbar', totalClass: cls.pag }
	}

	const closeGallery = () => setIsOpen(false);
	const nextSlide = () => swiperRef.current.slideNext();
	const prevSlide = () => swiperRef.current.slidePrev();
	
	
	return (<>
		<div data-active={isOpen}  className={cls.wrap} >
			<div className={cls.cont}>				
				<button disabled={swiper?.isBeginning} type='button' data-btn='prev' onClick={prevSlide} >{<ArrowLeftIcon/>}</button>
				<button disabled={swiper?.isEnd} type='button' data-btn='next' onClick={nextSlide} >{<ArrowRightIcon/>}</button>
				<button type='button' data-btn='close' onClick={closeGallery}>{<CloseIcon/>}</button>
				<Swiper {...swiperOps} className={cls.slider}>
					{slides.map((el, i) => 
						<SwiperSlide key={i} >
							<div className={cls.slide}>
								<div className={cls.slide__preview}><img className={cls.slide__img} src={el.src} alt="preview" /></div>
								<h5 className={cls.slide__title} dangerouslySetInnerHTML={{ __html: el.desc }} />
							</div>
						</SwiperSlide>
					)}
				</Swiper>
			</div>
		</div>	
	</>)
}

export default (dataSlides=[]) => {
	// {image, title}
	const [isOpen, setIsOpen] = useState(false);
	const [swiper, setSwiper] = useState({});
	const swiperRef = useRef(null);

	useEffect(()=>{
		if(isOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	}, [isOpen])



	const openFunc = (index=0) => {
		setIsOpen(true);
		swiperRef.current?.slideTo(index, 0)
	}

	const renderOps = {
		isOpen, setIsOpen,
		slides: dataSlides,
		swiper,	setSwiper,
		swiperRef,
	}


	return {
		open: openFunc,
		close: () => setIsOpen(false),
		toggle: () => setIsOpen(prev => !prev),
		render: <Popap {...renderOps}/>,
	};
}
