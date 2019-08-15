
const dotenv = require('dotenv')

const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)

const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
const path = require('path');
const fs = require('fs');
const chalk = require("chalk");

const config = {
  module: [{
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
  }
  // devServer: {
  // 	'**/ticker': {
  // 		target: 'https://api.coinmarketcap.com/v1/ticker',
  // 		secure: false,
  // 		changeOrigin: true
  // 	}
  // }
};

// if (process.env.NODE_ENV === 'production') {
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: false,
//       compress: {
//         warnings: false,
//         drop_console: true
//       }
//     })
//   ])
// }


// const build = process.env.build || 'dev';
// console.log('build',process.env.build)

const env = process.env.env || 'dev';
console.log('env',process.env.env)
const pathConfig = path.resolve(environmentPath(env));

useDefaultConfig['dev'].resolve.alias = {
  "@app/env": pathConfig
};

useDefaultConfig['prod'].resolve.alias = {
  "@app/env": pathConfig
};

function environmentPath(env) {
  const filePath = './src/environments/environment.' +  env + '.ts';
  console.log('filePath',filePath)
  if (!fs.existsSync(filePath)) {
   // console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
	// console.log('filePath',filePath)
	return filePath;
	
  }
}


module.exports = function(){
	return useDefaultConfig
}
