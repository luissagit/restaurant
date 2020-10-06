import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching Restaurants', () => {
	let presenter;

	const searchRestaurants = (query) => {
		const queryElement = document.getElementById('query');
		queryElement.value = query;
		queryElement.dispatchEvent(new Event('change'));
	};

	const setRestaurantSearchContainer = () => {
		document.body.innerHTML = `
			<div id="restaurant-search-container">
				<input type="text" id="query" />
				<div class="restaurant-result-container">
					<ul class="restaurants">
					</ul>
				</div>
			</div>
		`;
	};

	const constructPresenter = () => {
		spyOn(FavoriteRestaurantIdb, 'searchRestaurants');
		presenter = new FavoriteRestaurantSearchPresenter({
			favoriteRestaurants: FavoriteRestaurantIdb,
		});
	};

	beforeEach(() => {
		setRestaurantSearchContainer();
		constructPresenter();
	});

	it('should be able to capture the query typed by the user', async () => {
		searchRestaurants('restaurant a');

		expect(presenter.latestQuery).toEqual('restaurant a');
	});

	it('should ask the model to search for liked restaurant', async () => {
		searchRestaurants('restaurant a');

		expect(FavoriteRestaurantIdb.searchRestaurants)
			.toHaveBeenCalledWith('restaurant a');
	});

	it('should show the found restaurant', async () => {
		presenter._showFoundRestaurants([{id: 1}]);
		expect(document.querySelectorAll('.restaurant').length).toEqual(1);

		presenter._showFoundRestaurants([{id: 1, name: 'Satu'}, {id: 2, name: 'Dua'}]);
		expect(document.querySelectorAll('.restaurant').length).toEqual(2);
	});

	it('should show the name of the found restaurants', async () => {
		presenter._showFoundRestaurants([{id: 1, name: 'Satu'}]);
		expect(document.querySelectorAll('.restaurant__name').item(0).textContent)
			.toEqual('Satu');

		presenter._showFoundRestaurants([
			{id: 1, name: 'Satu'},
			{id: 2, name: 'Dua'},
		]);

		const restaurantName = document.querySelectorAll('.restaurant__name');
		expect(restaurantName.item(0).textContent).toEqual('Satu');
		expect(restaurantName.item(1).textContent).toEqual('Dua');
	});

	it('should show - for found restaurant without name', async () => {
		presenter._showFoundRestaurants([{id: 1}]);
		expect(document.querySelectorAll('.restaurant__name').item(0).textContent)
			.toEqual('-');
	});
});
