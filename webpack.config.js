const path = require('path');
const DotenvPlugin = require('dotenv-webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
   const isDev = env['development'];

   const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

   const setupProxy = () => {
      const [apiUrl, proxyUrl] = (env['proxy'] && env['proxy'].split('=>')) || [];

      if (apiUrl && proxyUrl) {
         return {
            [apiUrl]: {
               target: proxyUrl,
               changeOrigin: true,
            },
         };
      }
   };

   return {
      entry: './index.jsx',
      target: 'web',
      mode: 'development',
      context: path.resolve(__dirname, 'src'),
      output: {
         filename: filename('js'),
         path: path.resolve(__dirname, 'dist'),
      },
      devtool: isDev ? 'source-map' : false,
      devServer: {
         host: 'localhost',
         port: env['port'] || 3000,
         open: env['open'] || false,
         historyApiFallback: true,
         proxy: setupProxy(),
      },
      resolve: {
         extensions: ['.js', '.jsx', '.scss', '.css'],
         alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@components/*': path.resolve(__dirname, 'src/components/*'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@store/*': path.resolve(__dirname, 'src/store/*'),
            '@reducers': path.resolve(__dirname, 'src/store/reducers'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@stylesheets': path.resolve(__dirname, 'src/stylesheets'),
         },
      },
      plugins: [
         new DotenvPlugin({
            path: `./.env.${isDev ? 'development' : 'production'}`,
         }),
         new CleanWebpackPlugin(),
         new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            inject: true,
            minify: {
               removeComments: !isDev,
               collapseWhitespace: !isDev,
            },
         }),
      ],
      module: {
         rules: [
            {
               test: /\.jsx?$/,
               use: 'babel-loader',
               exclude: /node_modules/,
            },
            {
               test: /\.s[ac]ss$/i,
               use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
               ],
            },
         ],
      },
   };
};
