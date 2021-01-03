const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/client/app.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'), 
    filename: "main.js"
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename:'[name].css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/client/index.html')
    })
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',
      options: { presets: ["@babel/env"] },
      exclude: [/node_modules/]
    }, {
      test: /.(scss|css)$/,

      use: [{
        loader: MiniCssExtractPlugin.loader
        }, 
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }, 
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },

  devtool: "eval-source-map",

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    liveReload: true,
    open: true,
  }
}