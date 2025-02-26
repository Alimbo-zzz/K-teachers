'use client'
import React, {useState, useEffect, useRef} from 'react';

export default (ops={}) => {
	const {delay=300} = ops;
	const [width, setWidth] = useState(0);
	const [result_w, setResult_w] = useState(0);
	const timerRef = useRef();

	useEffect(()=>{
		setWidth(window.innerWidth)
	}, [])

	useEffect(()=>{
    timerRef.current = setTimeout(() => setResult_w(width), delay);

		return () => {
      clearTimeout(timerRef.current);
		}
	}, [width, delay])

	const ckeckWidth = (e) => {
		setWidth(window.innerWidth)
	} 

	
	useEffect(()=>{
		window.addEventListener('resize', ckeckWidth)

		return () => window.removeEventListener('resize', ckeckWidth)
	}, [])
	
	return {
		windowWidth: result_w
	};
}
