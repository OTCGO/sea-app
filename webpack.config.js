const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config');

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
    extensions: [".d.ts", ".ts", ".js"],
    // TODO: resolve alias didn't work
    /*alias: {
			'@app': root('src'),
			'neon': root('src', 'libs/neon/lib')
		}*/
	},
	devServer: {
		'**/ticker': {
			target: 'https://api.coinmarketcap.com/v1/ticker',
			secure: false,
			changeOrigin: true
		}
	}
};

module.exports = webpackMerge(dev, config)

function root (...args) {
	return resolve.apply(null, [__dirname, ...args])
}
