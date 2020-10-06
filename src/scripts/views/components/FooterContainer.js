class FooterContainer extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<p>Copyright © 2020 - Food Experience
				<br />
				Made by Luissa Nugraha
			</p>
		`;
	}
};

customElements.define('footer-container', FooterContainer);
