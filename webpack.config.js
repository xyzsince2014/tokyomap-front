const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';
  const outputPath = isProduction
    ? path.resolve(__dirname, 'aws/public')
    : path.resolve(__dirname, 'web/public');

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: outputPath,
      publicPath: isProduction ? undefined : '/',
      filename: 'assets/js/[name].[hash:8].js',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: outputPath,
      compress: false,
      port: 3000,
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:8].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Tokyomap.live - Tokyo Live Map',
        filename: 'index.html',
        template: 'src/index.html',
      }),
      new CleanWebpackPlugin({}),
      new Dotenv({path: isProduction ? './env/.env' : './env/.dev.env'}),
      new FaviconsWebpackPlugin({
        logo: './src/assets/favicon/logo192.ico',
        outputPath: '/assets/favicon',
      }),
    ],
    optimization: {
      minimizer: isProduction
        ? [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
        : [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', 'jsx'],
      modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                // limit: 10,
                name: 'assets/images/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.xml$/,
          use: ['xml-loader'],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)/,
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[hash:8].[ext]',
          },
        },
      ],
    },
  };
};
