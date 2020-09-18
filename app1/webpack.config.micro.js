const webpack = require('webpack');
const path = require('path');
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        singleSpaEntry: './src/singleSpaEntry.js',
        store: './src/index.js'
    },

    output: {
        filename: '[name].js',
        publicPath: 'http://localhost:8002/',
        path: path.resolve(__dirname, 'buildApp1'),
        libraryTarget: 'amd',
        library: 'app1'
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.less', '.json']
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
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader?sourceMap=true',
                        options: { //less-loader options last work 5.0.0
                            javascriptEnabled: true
                        }
                    }
                ],
                include: path.resolve(__dirname, '../app1/node_modules/antd')
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }                      
                    }
                ],
                exclude: /node_modules/
            },
            // 解析图片资源
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            // 解析 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
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
            __TEST__: true,
        }),
        //new CompressionWebpackPlugin(),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('../../dll/vendor-manifest.json')
        // }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './buildApp1',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};
