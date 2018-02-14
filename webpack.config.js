const { join } = require('path');
const webpackMerge = require('webpack-merge');
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config');

const config = {
	resolve: {
		alias: {
			'@app': join(__dirname, './src'),
		}
	},
	devServer: {
		'**/ticker': {
			target: 'https://api.coinmarketcap.com/v1/ticker',
			secure: false,
			changeOrigin: true
		}
	}
};

module.exports = {
	dev: webpackMerge(dev, config),
	prod: webpackMerge(prod, config),
}
