
import 'regenerator-runtime';
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst, NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {setCacheNameDetails, skipWaiting, clientsClaim} from 'workbox-core';

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:
skipWaiting();
clientsClaim();

setCacheNameDetails({
	prefix: 'fxperience',
	suffix: 'v1',
	runtime: 'runtime',
});

precacheAndRoute(self.__WB_MANIFEST, {ignoreURLParametersMatching: [/.*/]});

registerRoute(
	({request}) => request.destination === 'script',
	new NetworkFirst(),
);

registerRoute(
	({request}) => request.destination === 'style',
	new StaleWhileRevalidate({
		cacheName: 'css-cache',
	}),
);

registerRoute(
	({request}) => request.destination === 'image',
	new CacheFirst({
		cacheName: 'image-cache',
		plugins: [
			new ExpirationPlugin({
				maxAgeSeconds: 7 * 24 * 60 * 60,
			}),
		],
	}),
);

registerRoute(
	RegExp('https://dicoding-restaurant-api.el.r.appspot.com/'),
	new NetworkFirst({
		cacheName: 'dicoding-restaurant-api',
	}),
);

registerRoute(
	RegExp('\\.png$'),
	new CacheFirst({
		cacheName: 'icons',
	}),
);
