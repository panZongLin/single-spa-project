const path = require('path');
const webpack = require('webpack');

const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let NODE_ENV = process.env.NODE_ENV;

module.exports = {
	mode: NODE_ENV=='development' ? 'development' : 'production',
	devtool: NODE_ENV=='development' ? 'source-map' : 'none',
	entry: {
		entry: './src/entry.js'
	},
	output: {
		publicPath: NODE_ENV=='development' 
			? 'http://localhost:8000/'
			: 'http://localhost:8000/' //真实部署地址
		,
		filename: '[name].js',
		path: path.resolve(__dirname, 'buildPortal')
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			}
		]
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		alias:{
			'@': './src/'
		},
		modules: [__dirname, 'node_modules']
	},
	plugins: [
		new optimizeCssPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new ParallelUglifyPlugin({
            uglifyJS:{
                output: {
                    beautify: false,
                    comments: false
                },
                compress: {
                    drop_console: true,
                    collapse_vars: true,
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
        }),
        //new CompressionWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.ejs'),
			templateParameters: {
				title: 'example'
			}
		})
	],
	externals: [],
	devServer: {
		contentBase: './buildPortal',
		historyApiFallback: true,
		watchOptions: { aggregateTimeout: 300, poll: 1000 },
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	}
};
