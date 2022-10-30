// 开发环境的webpack配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve('.', 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    devServer: {
        // don't open browser
        open: false,
        compress: true,
        port: 8000,
        hot: true,
        historyApiFallback: {
            index: '/',
            disableDotRule: true,
            rewrites: [],
        },
        proxy: {},
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }
            devServer.app.get('/tagList', function (req, res) {
                res.json([
                    {
                        id: '1',
                        title: '分类A',
                        category: 'A',
                        priority: 1,
                    },
                    {
                        id: '3',
                        title: '分类C',
                        category: 'C',
                        priority: 3,
                    },
                    {
                        id: '2',
                        title: '分类B',
                        category: 'B',
                        priority: 2,
                    },
                ]);
            });
            devServer.app.get('/imgList', function (req, res) {
                res.json([
                    {
                        category: 'A',
                        img: 'https://image-edog.officeplus.cn/cms-public/7f445a86-609d-9930-be00-3a0671b90c25.png',
                    },
                    {
                        category: 'B',
                        img: 'https://image-edog.officeplus.cn/cms-public/624f68e1-8749-296f-4e8c-3a065742229c.png',
                    },
                    {
                        category: 'B',
                        img: 'https://image-edog.officeplus.cn/cms-public/ead25a93-2e06-bc60-1e44-3a06574222a0.png',
                    },
                    {
                        category: 'C',
                        img: 'https://image-edog.officeplus.cn/cms-public/81c5dbbc-0f68-cf18-3d52-3a06574223e1.png',
                    },
                    {
                        category: 'C',
                        img: 'https://image-edog.officeplus.cn/cms-public/81c5dbbc-0f68-cf18-3d52-3a06574223e1.png',
                    },
                    {
                        category: 'C',
                        img: 'https://image-edog.officeplus.cn/cms-public/81c5dbbc-0f68-cf18-3d52-3a06574223e1.png',
                    },
                    {
                        category: 'C',
                        img: 'https://image-edog.officeplus.cn/cms-public/81c5dbbc-0f68-cf18-3d52-3a06574223e1.png',
                    },
                ]);
            });
            return middlewares;
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[hash:7].[ext]',
                        },
                    },
                ],
            },
            { test: /\.(css|scss)$/, use: ["style-loader", "css-loader", "sass-loader"] },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            preserveLinebreaks: true,
            removeAttributeQuotes: true,
        }),
    ],
};
