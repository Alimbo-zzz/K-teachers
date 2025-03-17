'use client'
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss'
import { Button, Icon } from '@/UI';
import { useRouter } from 'next/navigation'
import * as THREE from 'three';
// import grayImg from './fone.png';
// import colorImg from './active.png';
import gsap from 'gsap';
import { vertexShader, fragmentShader } from './shaders';



export default (props) => {
	const [animate, setAnimate] = useState(false)
	const timeOutAnimRef = useRef();
	const router = useRouter();
	
  const canvasRef = useRef(null);
  const mouse =  new THREE.Vector2(0, 0);
  const intervalRef = useRef(null);
  const winTimeout = useRef(null);
  const [win_w, setWin_w] = useState(null);


	useEffect(()=>{
		setAnimate(true);
	}, [])


  useEffect(() => {
    window.addEventListener('resize', () => {
      clearTimeout(winTimeout.current);

      winTimeout.current = setTimeout(() => {
        setWin_w(window.innerWidth)
      }, 700);
    })
  }, [])


  useEffect(() => {
    if(!THREE) return 
    let colorImg  = '/images/main-fone.png';
    let grayImg = '/images/main-fone-active.png';
    let coords = [0, 0]
    let intervalIsBlock = false;
    let viewportAspect = window.innerWidth / window.innerHeight;
    clearInterval(intervalRef.current)
    gsap.defaults({ overwrite: 'auto' })
    const pixelRatio = 1.0;
    const imageAspect = 16 / 9;
    const canvas = canvasRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;


    // Создаем сцену, камеру и рендерер
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-.5, .5, .5, -.5, -1000, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas, alpha: true,
      antialias: true,
      clearAlpha: 1
    });
    const xMouseTo = gsap.quickTo(mouse, 'x', { duration: 2, ease: 'power4.out' });
    const yMouseTo = gsap.quickTo(mouse, 'y', { duration: 2, ease: 'power4.out' });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio * pixelRatio)

    // Загружаем изображения
    const textureLoader = new THREE.TextureLoader();

    const grayImage = textureLoader.load(grayImg, () => {
      console.log('Gray image loaded');
    }, undefined, (err) => {
      console.error('Error loading gray image:', err);
    });

    const colorImage = textureLoader.load(colorImg, () => {
      console.log('Color image loaded');
    }, undefined, (err) => {
      console.error('Error loading color image:', err);
    });

    // Проверка на ошибки загрузки
    if (!grayImage || !colorImage) {
      console.error("One of the images failed to load.");
    }

    // Создаем плоскость для изображения
    const uniforms = {
      Uimage: { type: 't', value: grayImage },
      Uimagehover: { type: 't', value: colorImage },
      Umouse: { value: mouse },
      Utime: { value: 0 },
      Uradius: { value: 50 },
      Ublurriness: { value: 0.2 },
      Ures: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
    const geometry = new THREE.PlaneGeometry(1, 1);  // Подгоните под размеры вашего изображения
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      defines: {
        PR: (window.devicePixelRatio * pixelRatio).toFixed(1)
      }
    });
    const mesh = new THREE.Mesh(geometry, material);

    let scaleX, scaleY;
    if (imageAspect > viewportAspect) {
      scaleX = 1
      scaleY = viewportAspect / imageAspect
    } else {
      scaleY = 1
      scaleX = imageAspect / viewportAspect
    }
    mesh.scale.set(scaleX, scaleY, 1)


    scene.add(mesh);


    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1,
        y = -((e.clientY / window.innerHeight) * 2 - 1) / (window.innerWidth / window.innerHeight)
      xMouseTo(x)
      yMouseTo(y)
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (uniforms.Uradius.value < 500 && !intervalIsBlock) {
          uniforms.Uradius.value = uniforms.Uradius.value + 1;
        }
      }, 10);

      if (Math.abs(Math.abs(coords[0]) - Math.abs(x)) > 0.1 || Math.abs(Math.abs(coords[1]) - Math.abs(y) > 0.1)) {
        coords = [x, y];
        intervalIsBlock = true;
        setInterval(() => {
          if (intervalIsBlock) {
            uniforms.Uradius.value = uniforms.Uradius.value - 1;
            if (uniforms.Uradius.value < 100) intervalIsBlock = false;
          }

        }, 100);
      }
    };




    window.addEventListener('mousemove', onMouseMove);

    // Анимация
    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.Utime.value += 0.01;
      renderer.render(scene, camera);
    };

    animate();


    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };

  }, [win_w]);


	
	const nextPage = () => {
		setAnimate(false)
		timeOutAnimRef.current = setTimeout(() => {
			router.push('/list')
		}, 600);
	}


	useEffect(()=>{

	}, [])

	return (<>
		<div animate={String(animate)} className={cls.wrap}>
			<div className={cls.bg}>
				<canvas ref={canvasRef} />
				{/* <div className={cls.color} ></div> */}
				{/* <img src="/images/main-fone.png" alt="gray" />
				<img className={cls.color} ref={colorRef} src="/images/main-fone-active.png" alt="red" /> */}
				<img src="/images/main-fone-mobile.png" alt="mobile" />
			</div>
			{/* <img src="/images/pencils.png" alt="pencils" /> */}
			<div className={cls.grid} container=''>
				{/* <div className={cls.book}>
					<img src="/images/book.gif" alt="book" />
				</div> */}
				<h1 className={cls.title}>
					<span>учителя </span> 
					фронтовики
					<br />
					казани
				</h1>
				<div className={cls.desc}>
					<p>В годы Великой Отечественной войны многим казанцам пришлось оставить привычную жизнь и уйти на фронт.</p>
					<p>{`На этом портале мы расскажем\nо тех фронтовиках, чья жизнь была связана с одной из самых мирных\nпрофессий — учитель.`}</p>
				</div>
				<Button theme='red' onClick={nextPage} className={cls.btn}>Перейти к поиску <Icon name='next'/></Button>
			</div>
		</div>
	</>);
}
