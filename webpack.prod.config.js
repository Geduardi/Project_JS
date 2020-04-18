const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", "./src/public/index.js"]
    },
    output: {
        path: path.join(__dirname, './dist/public'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    devServer: {
        historyApiFallback: true,
    },
    target: 'web',
    devtool: "#source-map",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: 'src/public/checkout.html',
            filename: 'checkout.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: 'src/public/catalog.html',
            filename: 'catalog.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: 'src/public/cart.html',
            filename: 'cart.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: 'src/public/single.html',
            filename: 'single.html',
            excludeChunks: ['server']
        }),
        new CopyPlugin([
            { from: 'src/public/img', to: 'img' },
        ]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        })
    ]
};