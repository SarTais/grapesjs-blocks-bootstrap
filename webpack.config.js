const config = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
let plugins = [];


module.exports = (environment = {}) => {
  if (environment.production) {
    plugins = [
      new webpack.optimize.UglifyJsPlugin({ minimize: true, compressor: { warnings: false }})
    ];
  } else {
    const index = 'index.html';
    const indexDev = '_' + index;
    plugins.push(new HtmlWebpackPlugin({
      template: fs.existsSync(indexDev) ? indexDev : index
    }));
  }

  return {
    entry: './src',
    output: {
        filename: `./dist/${config.name}.min.js`,
        library: config.name,
        libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    externals: {'grapesjs': 'grapesjs'},
    plugins: plugins,
  };
};