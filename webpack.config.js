const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;
const DotenvPlugin = require('webpack-dotenv-plugin');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const libraryName = 'athletics';

let envPath = './.env';
if (env === 'test') {
  envPath = './.test';
}
const plugins = [
  new DotenvPlugin({
    sample: './.env.example',
    path: envPath,
  }),
];
let outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  entry: path.join(__dirname, '/src/athletics.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        enforce: 'pre',
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins,
};

module.exports = config;
