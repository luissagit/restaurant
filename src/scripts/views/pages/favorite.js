import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';
import {createRestaurantListTemplate} from '../templates/template-creator.js';

const Favorite = {
	async render() {
		return `
			<div class="favorite-header">
				<h2>My Faves</h2>
			</div>
			<div class="loading__container">
				<div class="orangeLoading"></div>
			</div>
			<div id="restaurantsList" class="restaurants__list">
			</div>
		`;
	},

	async afterRender() {
		const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
		const restaurantListContainer = document.querySelector('.restaurants__list');

		const loadElem = document.querySelector('.loading__container');
		loadElem.classList.add('none');

		const heroElem = document.querySelector('.hero');
		heroElem.classList.add('none');

		try {
			if (restaurants.length > 0) {
				restaurantListContainer.innerHTML += createRestaurantListTemplate(restaurants);
				document.querySelector('.favorite-header').scrollIntoView({block: 'center'});
			} else {
				restaurantListContainer.innerHTML += `<div class="empty"><p>Belum ada dafar</p></div>`;
			}
		} catch (error) {
			restaurantListContainer.innerHTML += `<div class="error"><p>Gagal saat memuat data</p></div>`;
		}
	},
};

export default Favorite;
