import CONFIG from './config.js';

const API_ENDPOINT = {
	RESTAURANTS: `${CONFIG.BASE_URL}list`,
	THUMBNAIL: `${CONFIG.BASE_IMAGE_SMALL}`,
	LARGE: `${CONFIG.BASE_IMAGE_LARGE}`,
	DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
	SUBMIT_REVIEW: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
