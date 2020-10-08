import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import API_ENDPOINT from '../../globals/api-endpoint.js';

const createRestaurantItemTemplate = (restaurant) => {
	const rating = Math.round(restaurant.rating);
	let ratings = ``;
	const desc = restaurant.description;

	for (let r = 0; r < rating; r++) {
		ratings += `<img src="./icons/star.png" alt="rate" class="rate__icon"/>`;
	}

	const restaurantImage = `
		<div class="restaurant__image">
			<img class="lazyload" data-src=${API_ENDPOINT.THUMBNAIL}${restaurant.pictureId} alt="restauran ${restaurant.name || '-'}" crossorigin="anonymous"/>
		</div>
	`;

	const restaurantLabel = `
		<div class="restaurant__label">
			<h2 class="restaurant__name">${restaurant.name || '-'}</h2>
			<p>${ratings}</p>
			<p><img src="./icons/map.png" alt="Location : " class="location__icon"/> ${restaurant.city}</p>
		</div>
	`;

	const restaurantItem = `
		<div class="restaurant-item">
			<a href="${`/#/detail/${restaurant.id}`}">
				<div class="restaurant" tabindex="0" aria-label="restauran ${restaurant.name || '-'}.">
					${restaurantImage}
					${restaurantLabel}
				</div>
			</a>
		</div>
	`;

	return restaurantItem;
};

const createRestaurantListTemplate = (restaurants) => {
	let restaurantsList = ``;

	for (let i = 0; i < restaurants.length; i++) {
		const rating = Math.round(restaurants[i].rating);
		let ratings = ``;
		const desc = restaurants[i].description;

		for (let r = 0; r < rating; r++) {
			ratings += `<img src="./icons/star.png" alt="rate" class="rate__icon"/>`;
		}

		const restaurantLabel = `
			<div class="restaurant__label">
				<h2 class="restaurant__name">${restaurants[i].name}</h2>
				<p>${ratings}</p>
				<p><img src="./icons/map.png" alt="Location : " class="location__icon"/> ${restaurants[i].city}</p>
				<p class="restaurant__desc">${desc.substring(0, 50)}...</p>
			</div>
		`;

		const restaurantImage = `
			<div class="restaurant__image">
				<img class="lazyload" data-src=${API_ENDPOINT.THUMBNAIL}${restaurants[i].pictureId} alt="restauran ${restaurants[i].name}" crossorigin="anonymous"/>
			</div>
		`;

		if (i % 2 === 0) {
			restaurantsList += `
				<a href="${`/#/detail/${restaurants[i].id}`}">
					<div class="restaurant" tabindex="0" aria-label="restauran ${restaurants[i].name} merupakan restoran bintang ${rating} yang terletak di ${restaurants[i].city}. ${restaurants[i].description}.">
						${restaurantLabel}
						${restaurantImage}
					</div>
				</a>
			`;
		} else {
			restaurantsList += `
			<a href="${`/#/detail/${restaurants[i].id}`}">
				<div class="restaurant" tabindex="0" aria-label="restauran ${restaurants[i].name} merupakan restoran bintang ${rating} yang terletak di ${restaurants[i].city}. ${restaurants[i].description}.">
					${restaurantImage}
					${restaurantLabel}
				</div>
			</a>
			`;
		}
	}
	return restaurantsList;
};

const createAboutSection = (restaurant) => {
	// about section --------------------------------------------------

	let categories = ``;
	restaurant.categories.forEach((category) => {
		categories += `<div class="category"># ${category.name}</div>`;
	});

	const rating = `<p><img src="./icons/star.png" alt="rate"/> ${restaurant.rating}</p>`;
	const city = `<p><img src="./icons/map.png" alt="Location"/> ${restaurant.address}, ${restaurant.city}</p>`;

	const aboutSection = `
		<div class="about-section">
			<img class="lazyload" data-src=${API_ENDPOINT.LARGE}${restaurant.pictureId}
				srcset="${API_ENDPOINT.MEDIUM}${restaurant.pictureId} 480w, ${API_ENDPOINT.LARGE}${restaurant.pictureId} 800w"
				sizes="(max-width: 600px) 480px, 800px"
				alt='${restaurant.name}'
				crossorigin="anonymous"/>
			<h2 class="restaurant__name">${restaurant.name}</h2>
			<div class="categories">
				${categories}
			</div>
			<div class="rating-city">
				${rating}
				${city}
			</div>
		</div>
	`;

	return aboutSection;
};

const createMenuSection = (restaurant) =>{
	// menus ----------------------------------------------------------

	let foods = ``;
	restaurant.menus.foods.forEach((food) => {
		foods += `<li>${food.name}</li>`;
	});

	let drinks = ``;
	restaurant.menus.drinks.forEach((drink) => {
		drinks += `<li>${drink.name}</li>`;
	});

	const menus = `
		<div class="menus">
			<div class="menus-title">
				<h3><img src="./icons/food-menu.png" alt="menus"/> Daftar Menu</h3>
			</div>
			<div class="menu-list">
				<div class="menu-foods">
					<h4><img src="./icons/food.png" alt="foods"/> Makanan</h4>
					<ul>
						${foods}
					</ul>
				</div>
				<div class="menu-drinks">
					<h4><img src="./icons/drink.png" alt="drinks"/> Minuman</h4>
					<ul>
						${drinks}
					</ul>
				</div>
			</div>
		</div>
	`;

	return menus;
};

const createDescriptionSection = (description) => {
	// description ---------------------------------------------------------

	const descriptionSection = `
		<div class="description">
			<h3><img src="./icons/description.png" alt="description" /> Deskripsi</h3>
			<p>${description}</p>
		</div>
	`;

	return descriptionSection;
};

const createReviewsSection = (reviews) => {
	// reviews ---------------------------------------------------------

	let reviewsSection = ``;
	reviews.forEach((review) => {
		let reviewContent = ``;
		if (review.review.length > 30) {
			reviewContent = `${review.review.substring(0, 30)}...`;
		} else {
			reviewContent = `${review.review}`;
		}

		reviewsSection += `
			<div class="review">
				<h4 class="real__name">${review.name}</h4><div class="date"> pada ${review.date}</div>
				<p class="real__review">${reviewContent}</p>
			</div>
		`;
	});

	const reviewList = `
		<div class="reviews">
			<h3><img src="./icons/review.png" alt="review list" /> Ulasan</h3>
			<div class="review__list">
				${reviewsSection}
			</div>
			<div class="review__create">
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
			</div>
		</div>
	`;

	return reviewList;
};

const createLikeRestaurantButtonTemplate = () => `
	<button aria-label="like this restaurant" id="likeButton" class="like">
		<p><img src="./icons/like.png" alt="like" aria-hidden="true"/></p>
	</button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
	<button aria-label="unlike this restaurant" id="likeButton" class="like">
		<p><img src="./icons/liked.png" alt="like" aria-hidden="true"/></p>
	</button>
`;

const createRestaurantDetailTemplate = (restaurant) => {
	let restaurantDetail = ``;

	restaurantDetail += createAboutSection(restaurant);
	restaurantDetail += createMenuSection(restaurant);
	restaurantDetail += createDescriptionSection(restaurant.description);
	restaurantDetail += createReviewsSection(restaurant.consumerReviews);

	// return all ----------------------------------------------------

	return restaurantDetail;
};

export {
	createRestaurantListTemplate,
	createRestaurantDetailTemplate,
	createLikeRestaurantButtonTemplate,
	createUnlikeRestaurantButtonTemplate,
	createRestaurantItemTemplate,
};
