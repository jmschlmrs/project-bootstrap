import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import merge from 'lodash.merge';

const isProd = (process.env.NODE_ENV === 'production');

// Common configuration chunk to be used for both
// client-side and server-side bundles
// -----------------------------------------------------------------------------
const config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.scss|\.css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: isProd ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
                modules: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'main.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

const clientConfig = merge({}, config, {
  devtool: isProd ? 'cheap-source-map' : 'cheap-module-eval-source-map',
  entry: [
    './src/client/index.js',
  ],
  output: {
    filename: 'main.js',
    path: path.join(__dirname, '/public'),
  },
});

const serverConfig = merge({}, config, {
  entry: ['./src/server/index.js'],
  externals: [nodeExternals()], // ignore node_modules
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  output: {
    filename: 'server.js',
    path: path.join(__dirname, '/build'),
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  target: 'node',
});


export default [clientConfig, serverConfig];
