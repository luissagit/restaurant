import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Searching Restaurants', () => {
	let presenter;
	let favoriteRestaurants;
	let view;

	const searchRestaurants = (query) => {
		const queryElement = document.getElementById('query');
		queryElement.value = query;
		queryElement.dispatchEvent(new Event('change'));
	};

	const setRestaurantSearchContainer = () => {
		view = new FavoriteRestaurantSearchView();
		document.body.innerHTML = view.getTemplate();
	};

	const constructPresenter = () => {
		favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
		presenter = new FavoriteRestaurantSearchPresenter({
			favoriteRestaurants,
			view,
		});
	};

	beforeEach(() => {
		setRestaurantSearchContainer();
		constructPresenter();
	});

	describe('When query is not empty', () => {
		it('should be able to capture the query typed by the user', async () => {
			searchRestaurants('restaurant a');

			expect(presenter.latestQuery).toEqual('restaurant a');
		});

		it('should ask the model to search for liked restaurant', async () => {
			searchRestaurants('restaurant a');

			expect(favoriteRestaurants.searchRestaurants)
				.toHaveBeenCalledWith('restaurant a');
		});

		it('should show the restaurants found by Favorite Restaurants', (done) => {
			document.getElementById('restaurants')
				.addEventListener('restaurants:updated', () => {
					expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
					done();
				});
			favoriteRestaurants.searchRestaurants.withArgs('angkringan').and.returnValues([
				{id: 1, name: 'angkringan'},
				{id: 2, name: 'angkringan jogja jaya'},
				{id: 3, name: 'kios dan angkringan'},
			]);
			searchRestaurants('angkringan');
		});

		it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
			document.getElementById('restaurants')
				.addEventListener('restaurants:updated', () => {
					const restaurantNames = document.querySelectorAll('.restaurant__name');
					expect(restaurantNames.item(0).textContent).toEqual('angkringan');
					expect(restaurantNames.item(1).textContent).toEqual('angkringan jogja jaya');
					expect(restaurantNames.item(2).textContent).toEqual('kios dan angkringan');

					done();
				});
			favoriteRestaurants.searchRestaurants.withArgs('angkringan').and.returnValues([
				{id: 1, name: 'angkringan'},
				{id: 2, name: 'angkringan jogja jaya'},
				{id: 3, name: 'kios dan angkringan'},
			]);
			searchRestaurants('angkringan');
		});

		it('should show - when the restaurant returned does not contain a title', (done) => {
			document.getElementById('restaurants')
				.addEventListener('restaurants:updated', () => {
					const restaurantNames = document.querySelectorAll('.restaurant__name');
					expect(restaurantNames.item(0).textContent).toEqual('-');
					done();
				});
			favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
				{id: 4444},
			]);
			searchRestaurants('restaurant a');
		});
	});

	describe('When query is empty', () => {
		it('should capture the query as empty', async () => {
			searchRestaurants(' ');
			expect(presenter.latestQuery.length).toEqual(0);

			searchRestaurants('    ');
			expect(presenter.latestQuery.length).toEqual(0);

			searchRestaurants('');
			expect(presenter.latestQuery.length).toEqual(0);

			searchRestaurants('\t');
			expect(presenter.latestQuery.length).toEqual(0);
		});

		it('should show all favorite restaurants', async () => {
			searchRestaurants('   ');
			expect(favoriteRestaurants.getAllRestaurant)
				.toHaveBeenCalled();
		});
	});

	describe('When no favorite restaurants could be found', () => {
		it('should show the empty message', async (done) => {
			document.getElementById('restaurants')
				.addEventListener('restaurants:updated', () => {
					expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
					done();
				});
			favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
			searchRestaurants('restaurant a');
		});
	});

	it('should not show any restaurant', (done) => {
		document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
			expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
			done();
		});
		favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
		searchRestaurants('restaurant a');
	});
});
