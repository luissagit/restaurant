import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import './views/components/HeaderContainer.js';
import './views/components/NavbarContainer.js';
import './views/components/HeroContainer.js';
// import WebSocketInitiator from './utils/websocket-initiator.js';
// import CONFIG from './globals/config.js';
import './views/components/FooterContainer.js';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
	button: document.querySelector('#menu'),
	drawer: document.querySelector('#drawer'),
	content: document.querySelector('#maincontent'),
	hero: document.querySelector('.hero'),
	footer: document.querySelector('footer'),
});

window.addEventListener('hashchange', () => {
	app.renderPage();
});

window.addEventListener('load', () => {
	app.renderPage();
	swRegister();
	// WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});

document.querySelector('.skip-link').addEventListener('click', () => {
	window.location = '#maincontent';
});
