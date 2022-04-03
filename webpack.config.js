
const path = require('path')
const fs = require('fs')

function getAllEntryPaths() {
  const res = {}
  fs.readdirSync('./src/adapters').forEach((file) => { res[`adapters/${file.replace(/(\.ts)$/, '.js')}`] = `./src/adapters/${file}` })
  res['index.js'] = './src/index.ts'
  return res
}

module.exports = {
  entry: getAllEntryPaths(),
  output: {
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: '[name]',
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
