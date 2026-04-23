const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';
  const outputPath = path.resolve(__dirname, 'public');

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: outputPath,
      publicPath: isProduction ? undefined : '/',
      filename: 'assets/js/[name].[contenthash:8].js',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      static: outputPath,
      compress: false,
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          pathRewrite: { '^/api': '' },
          changeOrigin: true
        },
        '/socket.io': {
          target: 'ws://localhost:8080',
          ws: true, // enablle WebSocket proxy
          logLevel: 'silent',
        }
      }
    },
    plugins: [
      ...(isProduction ? [new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      })] : []),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash:8].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Tokyomap.live - Tokyo Live Map',
        filename: 'index.html',
        template: 'src/index.html',
      }),
      new CleanWebpackPlugin({}),
      new Dotenv({path: isProduction ? './env/.env' : './env/.dev.env'}),
      new FaviconsWebpackPlugin({
        logo: './src/assets/favicon/favicon.svg', // Use SVG as source
        outputPath: 'assets/favicon',
        prefix: 'assets/favicon/',
        // Plugin will automatically generate all sizes and formats
        favicons: {
          appName: 'TokyoMap',
          appDescription: 'Real-time location sharing in Tokyo',
          developerName: 'Tokyo Map Team',
          background: '#FFF9E6',
          theme_color: '#FF6B6B',
          icons: {
            android: true, // Android icons
            appleIcon: true, // Apple touch icons
            appleStartup: false,
            favicons: true, // Regular favicons
            windows: true, // Windows tiles
            yandex: false
          }
        }
      })
    ],
    optimization: {
      minimizer: isProduction
        ? [new TerserPlugin({}), new CssMinimizerPlugin()]
        : [new TerserPlugin({}), new CssMinimizerPlugin()],
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
                name: 'assets/images/[name].[contenthash:8].[ext]',
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
            name: 'assets/fonts/[name].[contenthash:8].[ext]',
          },
        },
      ],
    },
  };
};
