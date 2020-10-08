import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

class ServiceContainer extends HTMLElement {
	constructor() {
		super();
		const services = [
			{img: './images/heros/hero-image1', label: 'Chef Terbaik'},
			{img: './images/heros/hero-image2', label: 'Suasana'},
			{img: './images/heros/hero-image4', label: 'Bahan Berkualitas'},
		];
		this._services = services;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		let serviceList = ``;
		this._services.forEach((service) => {
			serviceList += `
				<div class="service" tabindex="0">
					<img 
						class="lazyload"
						data-src="${service.img}-large.jpg"
						srcset="${service.img}-small.jpg 480w, ${service.img}-large.jpg 800w"
						sizes="(max-width: 600px) 480px, 800px"
						alt=${service.label} />
					<p>${service.label}</p>
				</div>
			`;
		});
		this.innerHTML = `<div class="our__services">${serviceList}</div>`;
	}
};

customElements.define('service-container', ServiceContainer);
