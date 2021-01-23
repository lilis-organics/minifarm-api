const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
// const webpack = require('webpack');
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // whether to minimize the code
    minimize: true,
  },
  performance: {
    // turn off size warnings for entry points
    hints: false,
  },
  devtool: 'nosources-source-map',
  externals: [
    nodeExternals({
      // must include this, otherwise webpack cannot include node_modules in package
      // modulesDir: path.resolve(__dirname, './node_modules'),
    }),
  ],
  plugins: [
    // must install pg-native into package.json, otherwise webpack cannot include node_modules in package
    // this plug-in is not needed
    // new webpack.IgnorePlugin(/^pg-native$/),
    // new webpack.IgnorePlugin(/^massive$/),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'node_modules/massive/lib/scripts', to: 'scripts' }
    //   ]
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /test/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { node: '12' }, useBuiltIns: 'usage', corejs: 3 },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
};
