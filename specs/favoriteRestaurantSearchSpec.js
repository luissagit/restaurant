import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching Restaurants', () => {
	let presenter;
	let favoriteRestaurants;

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
		favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
		presenter = new FavoriteRestaurantSearchPresenter({
			favoriteRestaurants,
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

		it('should show the restaurants found by Favorite Restaurants', (done) => {
			document.getElementById('restaurant-search-container')
				.addEventListener('restaurants:searched:updated', () => {
					expect(document.querySelectorAll('.restaurant').length).toEqual(3);
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
			document.getElementById('restaurant-search-container')
				.addEventListener('restaurants:searched:updated', () => {
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
			document.getElementById('restaurant-search-container')
				.addEventListener('restaurants:searched:updated', () => {
					expect(document.querySelectorAll('.restaurants__not__found').length).toEqual(1);
					done();
				});
			favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
			searchRestaurants('restaurant a');
		});
	});

	it('should not show any restaurant', (done) => {
		document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
			expect(document.querySelectorAll('.restaurant').length).toEqual(0);
			done();
		});
		favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
		searchRestaurants('restaurant a');
	});
});
