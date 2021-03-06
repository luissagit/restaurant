import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';
import {createRestaurantListTemplate} from '../templates/template-creator.js';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
	async render() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		const heroElem = document.querySelector('.hero');
		heroElem.classList.add('none');
		return view.getTemplate();
	},

	async afterRender() {
		new FavoriteRestaurantShowPresenter({view, favoriteRestaurants: FavoriteRestaurantIdb});
		new FavoriteRestaurantSearchPresenter({view, favoriteRestaurants: FavoriteRestaurantIdb});
	},
};

export default Favorite;
