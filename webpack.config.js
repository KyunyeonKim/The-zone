const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageMeta = require('./package.json')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.jsx',

  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader' // will use .babelrc
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // 'asset/resource' 사용
      },
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/', // 'publicPath' 추가
    assetModuleFilename: 'images/[hash][ext][query]' // 자산 파일 이름 형식
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: packageMeta.title
    })
  ]
}
