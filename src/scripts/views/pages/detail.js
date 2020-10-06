import UrlParser from '../../routes/url-parser';
import RestaurantsSource from '../../data/restaurants-source.js';
import {createRestaurantDetailTemplate} from '../templates/template-creator.js';
import LikeButtonPresenter from '../../utils/like-button-presenter';

const Detail = {
	async render() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

		const heroElem = document.querySelector('.hero');
		heroElem.classList.add('none');
		return `
			<div class="loading__container">
				<br /><br />
				<div class="orangeLoading"></div>
			</div>
			<div class="restaurant__detail">
				
			</div>
			<div id="likeButtonContainer"></div>
		`;
	},

	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
		const restaurant = await RestaurantsSource.restaurantDetail(url.id);

		const loading = document.querySelector('.loading__container');
		loading.classList.add('none');

		const restaurantDetailContainer = document.querySelector('.restaurant__detail');

		try {
			restaurantDetailContainer.innerHTML += createRestaurantDetailTemplate(restaurant);
			LikeButtonPresenter.init({
				likeButtonContainer: document.querySelector('#likeButtonContainer'),
				restaurant,
			});
		} catch (error) {
			restaurantDetailContainer.innerHTML += `<div class="error"><p>Gagal saat memuat data</p></div>`;
		}

		const consumerName = document.querySelector('#reviewName');
		const consumerReview = document.querySelector('#reviewContent');
		const submitReview = document.querySelector('.submit-review');

		submitReview.addEventListener('click', (e) => {
			e.preventDefault();
			const name = consumerName.value;
			const review = consumerReview.value;

			if (name.length > 0 && review.length > 0) {
				console.log(name, review);
				const consumerReviewForSubmit = {
					id: url.id,
					name,
					review,
				};
				RestaurantsSource.submitConsumerReview(consumerReviewForSubmit);
				consumerName.value = '';
				consumerReview.value = '';
			} else if (name.length <= 0) {
				alert('Silahkan isi namamu!');
			} else if (review.length <= 0) {
				alert('Silahkan isi reviewmu');
			}
		});
	},
};

export default Detail;
