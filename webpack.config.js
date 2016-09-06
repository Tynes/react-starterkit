const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const validate = require('webpack-validator');

const PATHS = {
  src: path.join(__dirname, 'client', 'src'),
  build: path.join(__dirname, 'client', 'build'),
};

const common = {
  entry: {
    app: `${PATHS.src}/entry.jsx`,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // regular expression for .jsx or .js
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
        include: PATHS.src,
      },
      {
        test: /\.sass$|\.css$/,
        loader: 'style!css!sass',
        include: PATHS.src,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Starterkit',
      template: `${PATHS.src}/template.ejs`,
    }),
  ],
};

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

let config;

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
      },
      {}
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
      },
      {}
    );
}

module.exports = validate(config);
