import { bg_png } from '@/static/index.js';
import css from './index.module.less';
import { useSize, useUpdateEffect } from 'ahooks';
import * as THREE from 'three';
function setup(ctx) {
	const { setState: set } = ctx;
	ctx.initState({
		SEPARATION: 100,
		AMOUNTX: 50,
		AMOUNTY: 50,
		particles: [],
		count: 0,
		mouseX: -660,
		mouseY: -510,
		windowHalfX: 0,
		windowHalfY: 0,
	});
	const st = {
		changeWindowHalfX: (v) => set({ windowHalfX: v }),
		changeWindowHalfY: (v) => set({ windowHalfY: v }),
		changeMouseX: (v) => set({ mouseX: v }),
		changeMouseY: (v) => set({ mouseY: v }),
		changeCount: (v) => set({ count: v }),
	};
	return st;
}

function WavesBall(props) {
	const wavesBallBoxRef = React.useRef(null);
	const cameraRef = React.useRef(null);
	const sceneRef = React.useRef(null);
	const rendererRef = React.useRef(null);
	const particleRef = React.useRef(null);
	const wavesBallBoxRefSize = useSize(wavesBallBoxRef);
	const { state, settings: st } = useConcent({ setup, props });
	// 鼠标移动事件
	const onDocumentMouseMove = (a) => {
		st.changeMouseX(a.clientX - state.windowHalfX);
		st.changeMouseY(a.clientY - state.windowHalfY);
	};
	// 初始化
	const init = () => {
		const container = document.createElement('div');
		container.id = 'banner-canvas';
		wavesBallBoxRef.current.appendChild(container);
		const camera = new THREE.PerspectiveCamera(75, wavesBallBoxRefSize.width / wavesBallBoxRefSize.height, 1, 10000);
		camera.position.z = 1000;
		const scene = new THREE.Scene();
		const particles = new Array();
		const e = Math.PI * 2;
		const d = new THREE.ParticleCanvasMaterial({
			color: '#087ada',
			program: function (f) {
				f.beginPath();
				f.arc(0, 0, 1, 0, e, true);
				f.fill();
			},
		});
		let a = 0;
		for (let b = 0; b < state.AMOUNTX; b++) {
			for (let c = 0; c < state.AMOUNTY; c++) {
				let particle = (particles[a++] = new THREE.Particle(d));
				particle.position.x = b * state.SEPARATION - (state.AMOUNTX * state.SEPARATION) / 2;
				particle.position.z = c * state.SEPARATION - (state.AMOUNTY * state.SEPARATION) / 2;
				scene.add(particle);
			}
		}
		const renderer = new THREE.CanvasRenderer();
		renderer.setSize(wavesBallBoxRefSize.width, wavesBallBoxRefSize.height);
		container.appendChild(renderer.domElement);
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		cameraRef.current = camera;
		sceneRef.current = scene;
		particleRef.current = particles;
		animate();
	};
	const animate = () => {
		requestAnimationFrame(animate);
		render();
	};
	const render = () => {
		cameraRef.current.position.x += (state.mouseX - cameraRef.current.position.x) * 0.09;
		cameraRef.current.position.y += (-state.mouseY - cameraRef.current.position.y) * 0.08;
		cameraRef.current.lookAt(sceneRef.position);
		let a = 0;
		let particles = [];
		for (let b = 0; b < AMOUNTX; b++) {
			for (let c = 0; c < AMOUNTY; c++) {
				let particle = particles[a++];
				particle.position.y = Math.sin((b + state.count) * 0.3) * 50 + Math.sin((c + state.count) * 0.5) * 50;
				particle.scale.x = particle.scale.y = (Math.sin((b + state.count) * 0.3) + 1) * 2 + (Math.sin((c + state.count) * 0.5) + 1) * 2;
			}
		}
		rendererRef.current.render(sceneRef.current, cameraRef.current);
		st.changeCount(state.count + 0.08);
	};

	React.useEffect(() => {
		if (wavesBallBoxRef.current) {
			init();
		}
	}, [wavesBallBoxRef.current]);

	useUpdateEffect(() => {
		if (wavesBallBoxRefSize.width > 0 || wavesBallBoxRefSize.height > 0) {
			st.changeWindowHalfX(wavesBallBoxRefSize.width / 2);
			st.changeWindowHalfY(wavesBallBoxRefSize.height / 2);
			if (rendererRef.current) {
				rendererRef.current.setSize(wavesBallBoxRefSize.width, wavesBallBoxRefSize.height);
			}
		}
	}, [wavesBallBoxRefSize, wavesBallBoxRefSize.width, wavesBallBoxRefSize.height]);

	return (
		<div className={css.wavesBall}>
			<img src={bg_png} className={css.bgImg} />
			<div className={css.wavesBox} ref={wavesBallBoxRef}></div>
		</div>
	);
}

export default WavesBall;
