const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true
            }
          }
        ]
      }, {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')()
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    namedModules: true
  },
  resolve: {
    alias: {
      'Components': path.resolve('./src/components'),
      'libs': path.resolve('./src/libs')
    },
    extensions: ['.js', '.scss'],
  },
  devServer: {
    progress: true,
    port: 3000,
    open: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MakeMusic Exercise',
      filename: 'index.html',
      inject: true,
      template: path.resolve('./public/index.html')
    })
  ]
};
