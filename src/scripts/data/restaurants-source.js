import API_ENDPOINT from '../globals/api-endpoint.js';
import CONFIG from '../globals/config.js';

class RestaurantsSource {
	static async restaurantList() {
		try {
			const response = await fetch(API_ENDPOINT.RESTAURANTS);
			const responseJSON = await response.json();
			return responseJSON.restaurants;
		} catch (error) {
			console.log(error);
		}
	}

	static async restaurantDetail(id) {
		try {
			const response = await fetch(API_ENDPOINT.DETAIL(id));
			const responseJSON = await response.json();
			return responseJSON.restaurant;
		} catch (error) {
			console.log(error);
		}
	}

	static async submitConsumerReview(review) {
		try {
			const response = await fetch(API_ENDPOINT.SUBMIT_REVIEW, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth-Token': CONFIG.KEY,
				},
				body: JSON.stringify(review),
			});
			_dummySubmit(review);
			return response;
		} catch (error) {
			console.log(error);
			document.querySelector('.review__create').innerHTML = `<div class="error"><p>Gagal saat mengirim ulasan</p></div>`;
		}
	}
}

const _dummySubmit = (dummyreview) => {
	try {
		const settings = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		};
		const date = new Date().toLocaleDateString('id-ID', settings);
		const submittedReview = `
			<div class="review">
				<h4>${dummyreview.name}</h4><div class="date"> pada ${date}</div>
				<p>${dummyreview.review}</p>
			</div>
		`;
		const response = document.querySelector('.review__list').innerHTML+= submittedReview;
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default RestaurantsSource;
