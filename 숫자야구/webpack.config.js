const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');  // 절대경로 찾을때 편한 방법, node.js에서 제공해주는 기능

module.exports = {
  mode: 'development', // 개발할때 development , 배포할때는 production
  devtool: 'eval',   // 개발할때 eval , 배포할때는 hidden-source-map
  resolve: {
    extensions: ['.js', '.vue'],
  },
  entry: {
    app: path.join(__dirname, 'main.js'),
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',  // loader 대신 use 도 가능
    }],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
};