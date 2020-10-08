const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const workboxPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, '../src/scripts/index.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ttf)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/templates/index.html'),
			filename: 'index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../src/public/'),
					to: path.resolve(__dirname, '../dist/'),
				},
			],
		}),
		new FaviconsWebpackPlugin({
			logo: path.resolve(__dirname, '../src/public/icons/favicon.png'),
		}),
		/* new ServiceWorkerWebpackPlugin({
			entry: path.resolve(__dirname, '../src/scripts/sw.js'),
		}), */
		new WebpackPwaManifest({
			name: 'Food Experience',
			short_name: 'FXperience',
			description: 'Our best restaurants catalogue',
			start_url: '/index.html',
			display: 'standalone',
			background_color: '#000000',
			theme_color: '#FF9A00',
			icons: {
				src: path.resolve(__dirname, '../src/public/icons/favicon.png'),
				sizes: [48, 64, 72, 96, 128, 192, 256, 384, 512],
				destination: path.join('icons', 'ios'),
				ios: true,
			},
		}),
		new workboxPlugin.InjectManifest({
			swSrc: path.resolve(__dirname, '../src/scripts/sw.js'),
		}),
		new ImageminWebpackPlugin({
			plugins: [
				ImageminMozjpeg({
					quality: 50,
					progressive: true,
				}),
			],
		}),
	],
};
