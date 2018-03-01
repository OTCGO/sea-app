const { join } = require('path');
const webpackMerge = require('webpack-merge');
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config');
console.log('from webpack')

const config = {
	module: [
		{
			test: /\.ts$/,
			loaders: [{
				loader: 'awesome-typescript-loader'
			}, 'angular2-template-loader']
		},
		{
			test: /\.html$/,
			loader: 'html-loader?attrs=false'
		},
		{
			test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
			loader: 'null-loader'
		}
	],
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
console.log('webpack config')