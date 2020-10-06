// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
	if ('serviceWorker' in navigator) {
		const {Workbox} = await import('workbox-window');
		const wb = new Workbox('../sw.js');
		wb.register();
	} else {
		console.log('Browser tidak memiliki dukungan service worker');
	}
};

export default swRegister;
