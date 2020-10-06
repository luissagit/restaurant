import '../components/ServiceContainer.js';
import RestaurantsSource from '../../data/restaurants-source.js';
import {createRestaurantListTemplate} from '../templates/template-creator.js';

const Restaurants = {
	async render() {
		const heroElem = document.querySelector('.hero');
		heroElem.classList.remove('none');
		return `
			<service-container></service-container>
			<div class="loading__container">
				<div class="orangeLoading"></div>
			</div>
			<div id="restaurantsList" class="restaurants__list">
			</div>
		`;
	},

	async afterRender() {
		const restaurants = await RestaurantsSource.restaurantList();
		const restaurantListContainer = document.querySelector('.restaurants__list');

		const loadElem = document.querySelector('.loading__container');
		loadElem.classList.add('none');
		try {
			restaurantListContainer.innerHTML += createRestaurantListTemplate(restaurants);
		} catch (error) {
			restaurantListContainer.innerHTML += `<div class="error"><p>Gagal saat memuat data</p></div>`;
		}
	},
};

export default Restaurants;
