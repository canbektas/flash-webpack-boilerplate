//** Webpack Config **/
/* Requirements*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Webpack configuration */

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      /* Handle Static Assets (Images) */
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=/app/assets/[name].[ext]"
      },
      /* Handle Sass Files */
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      /* Handle JS files with babel - es6 */
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      }

    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'app', '*.html'),
      output: path.join(process.cwd(), 'build', '[name].html'),
      data: require('./app/data.json'),
      partials: [
        path.join(process.cwd(), 'app', 'partials', '*.html'),
        path.join(process.cwd(), 'app', 'components', '*.html'),
      ],
    }),
    new CopyWebpackPlugin([
      {from:'app/assets/images',to:'assets/images'}
    ]),
    new ExtractTextPlugin('assets/styles/main.css'),
    /* Clean Build Folder before every build */
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'build')],
      cleanAfterEveryBuildPatterns: ['!*'],
      verbose: true,
      dry: false
    })
  ]
};

