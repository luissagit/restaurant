class NavbarContainer extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<ul class="nav__list">
				<li class="nav__item"><a href="#/restaurants">HOME</a></li>
				<li class="nav__item"><a href="#/favorite">FAVORITES</a></li>
				<li class="nav__item"><a href="https://instagram.com/je_shfly">ABOUT US</a></li>
			</ul>
		`;
	}
};

customElements.define('navbar-container', NavbarContainer);
