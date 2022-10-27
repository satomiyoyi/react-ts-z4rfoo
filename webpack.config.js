// 开发环境的webpack配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: global.PROJECT_ROOT('index.tsx'),
  output: {
    filename: '[name].js',
    path: global.PROJECT_ROOT('dist'),
    publicPath: '/',
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
      devServer.app.get('tagList', function (req, res) {
        res.json([
          {
            id: '62587825-39E9-4E08-8670-0A84232980E9',
            title: '总结汇报',
            description: '总结汇报',
            priority: 1,
          },
        ]);
      });
      return middlewares;
    },
  },
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
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: global.PROJECT_ROOT('index.html'),
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      preserveLinebreaks: true,
      removeAttributeQuotes: true,
    }),
  ],
};
