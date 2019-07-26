const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
const bundleOutputDir = './dist/';
 
module.exports = {    
    entry: {
        basic: './src/basic.js',
        //dino: './src/dino.js',
        //markdown: './src/markdown.js'        
    },
    output: {
        path: path.join(__dirname, bundleOutputDir),
        filename: '[name].[hash].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, 
                use: 'url-loader?limit=100000' 
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [        
        new webpack.ProgressPlugin(),
        //new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "basic",
            filename: 'basic.html',
            template: "./src/index.html",
            chunks: ['basic', 'vendor']
        }),
        // new HtmlWebpackPlugin({
        //     title: "dino",
        //     filename: 'dino.html',
        //     template: "./src/index.html",
        //     chunks: ['dino', 'vendor']
        // }),
        // new HtmlWebpackPlugin({
        //     title: "markdown",
        //     filename: 'markdown.html',
        //     template: "./src/markdown.html",
        //     chunks: ['markdown', 'vendor']
        // })   
        // new ManifestPlugin({
        //     fileName: 'asset.json',
        //     basePath: '/dist/'
        // })
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](prosemirror-(state|view|model|schema-basic))|(font-awesome)[\\/]/,
              name: 'vendor',
              chunks: 'all',
            }
          }
        }
      }
}