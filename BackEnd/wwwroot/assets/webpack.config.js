const path = require('path');

module.exports = {
  entry: './src/index.js',
     devServer: {
        contentBase: './dist'
      },
    
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
               test: /\.css$/,
                 use: [
                   'style-loader',
                   'css-loader'
                 ]
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
            {
                loader: 'url-loader'
            }
        ]
    }
    ]
  }
};