class ServiceContainer extends HTMLElement {
	constructor() {
		super();
		const services = [
			{img: './images/heros/hero-image1.jpg', label: 'Chef Terbaik'},
			{img: './images/heros/hero-image2.jpg', label: 'Suasana'},
			{img: './images/heros/hero-image4.jpg', label: 'Bahan Berkualitas'},
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
				<div class="service" tabindex="0"><img src=${service.img} alt=${service.label} /><p>${service.label}</p></div>
			`;
		});
		this.innerHTML = `<div class="our__services">${serviceList}</div>`;
	}
};

customElements.define('service-container', ServiceContainer);
