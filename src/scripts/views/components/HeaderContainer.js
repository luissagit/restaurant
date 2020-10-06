class HeaderContainer extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<div class="header__inner">
				<h1 class="header__title">
					Food Experience
				</h1>
			</div>
			<button id="menu" class="header__menu" aria-label="Open navigation menu">☰</button>
		`;
	}
}

customElements.define('header-container', HeaderContainer);
