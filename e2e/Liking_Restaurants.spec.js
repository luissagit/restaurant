const assert = require('assert');

Feature('Liking Restaurants');

Before((I) => {
	I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', (I) => {
	I.seeElement('#query');
	I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async (I) => {
	I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

	I.amOnPage('/');

	I.seeElement('.restaurant__name');

	const firstResto = locate('.restaurant__name').first();
	const firstRestoName = await I.grabTextFrom(firstResto);

	I.click(firstResto);

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('.restaurant-item');
	const likedRestoName = await I.grabTextFrom('.restaurant__name');

	assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('unliking one restaurant', async (I) => {
	I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

	I.amOnPage('/');

	I.seeElement('.restaurant__name');

	const firstResto = locate('.restaurant__name').first();
	const firstRestoName = await I.grabTextFrom(firstResto);

	I.click(firstResto);

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('.restaurant-item');
	const likedRestoName = await I.grabTextFrom('.restaurant__name');

	assert.strictEqual(firstRestoName, likedRestoName);

	I.seeElement('.restaurant__name');
	I.click(locate('.restaurant__name').first());

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('searching favorite restaurant', async (I) => {
	I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

	I.amOnPage('/');

	I.seeElement('.restaurant__name');

	const names = [];

	for (let i = 1; i <= 3; i++) {
		I.click(locate('.restaurant__name').at(i));
		I.seeElement('#likeButton');
		I.click('#likeButton');
		names.push(await I.grabTextFrom('.restaurant__name'));
		I.amOnPage('/');
	}

	I.amOnPage('/#/favorite');
	I.seeElement('#query');

	const searchQuery = names[1].substring(1, 3);
	const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

	I.fillField('#query', searchQuery);
	I.pressKey('Enter');

	const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
	assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

	matchingRestaurants.forEach(async (name, index) => {
		const visibleName = await I.grabTextFrom(locate('.restaurant__name').at(index + 1));
		assert.strictEqual(name, visibleName);
	});
});

Scenario('adding review', async (I) => {
	const restaurantIndex = 10;

	I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

	I.amOnPage('/');

	I.seeElement('.restaurant__name');

	I.click(locate('.restaurant__name').at(restaurantIndex));

	const restaurantName = await I.grabTextFrom('.restaurant__name');
	const name = 'Lisa blackpink';
	const review = `${restaurantName} ga enak semua`;

	I.seeElement('#reviewName');
	I.seeElement('#reviewContent');

	I.fillField('#reviewName', name);
	I.fillField('#reviewContent', review);

	I.seeElement('.submit-review');
	I.click('.submit-review');

	I.seeElement('.dummy__name');
	I.seeElement('.dummy__review');

	const dummyName = await I.grabTextFrom(locate('.dummy__name').last());
	const dummyReview = await I.grabTextFrom(locate('.dummy__review').last());

	assert.strictEqual(name.substring(0, 10), dummyName.substring(0, 10));
	assert.strictEqual(review.substring(0, 10), dummyReview.substring(0, 10));

	I.amOnPage('/');

	I.seeElement('.restaurant__name');

	I.click(locate('.restaurant__name').at(restaurantIndex));

	I.seeElement('.real__name');
	I.seeElement('.real__review');

	const realName = await I.grabTextFrom(locate('.real__name').last());
	const realReview = await I.grabTextFrom(locate('.real__review').last());

	assert.strictEqual(name.substring(0, 10), realName.substring(0, 10));
	assert.strictEqual(review.substring(0, 10), realReview.substring(0, 10));
});
