class ReviewContainer extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<h3><img src="./icons/create.png" alt="review list" /> Buat Ulasan</h3>
			<form>
				<div>
					<label for="review-name">Nama : </label>
					<input type="text" id="reviewName" name="review-name" placeholder="tuliskan nama anda" value=""/>
				</div>
				<div>
					<label for="review-cotent">Ulasan : </label>
					<input type="text" id="reviewContent" name="review-content" placeholder="tuliskan review" value=""/>
				</div>
				<div>
					<input type="submit" value="Kirim" class="submit-review"/>
				</div>
			</form>
		`;
	}
};

customElements.define('create-review-container', ReviewContainer);
