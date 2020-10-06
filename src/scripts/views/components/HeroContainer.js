class HeroContainer extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	handleClickLocButton() {
		const restaurantsList = document.querySelector('#restaurantsList');
		restaurantsList.scrollIntoView();
	}

	render() {
		this.innerHTML = `
			<div class="hero__inner fadeIn">
				<h1 class="hero__title"  tabindex="0">Kunjungi beberapa destinasi wisata kuliner Kami</h1>
				<p class="hero__tagline" tabindex="0">Nikmati setiap kenikmatan masakan dengan kualitas terbaik, bahan terbaik dan juru masak terbaik.</p>
				<button class="location__button" aria-label="our location">Lokasi Kami</button>
				<button class="about__button" aria-label="about us">Tentang Kami</button>
			</div>
		`;
		document.querySelector('.location__button').addEventListener('click', this.handleClickLocButton);
	}
};

customElements.define('hero-container', HeroContainer);
