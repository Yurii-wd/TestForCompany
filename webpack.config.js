const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
      new HTMLWebpackPlugin()
  ],
  module:{
      rules:[
          {
              test: /\.css$/,
              use: ['style-loader','css-loader']
          },
      
      {
        test: /\.s[ac]ss$/,
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
    },
    {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
 
]
  }
};