
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
}
