const path = require('path');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
module.exports={
  entry:"./src/main.js",
  output:{
    filename:"[id]-[name]-[hash].js",
    chunkFilename: '[id]-[name]-[hash].js',
    path:path.resolve(__dirname,'./dist')
  },
  mode:'production',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:[
          {loader: MiniCssExtractPlugin.loader,
             options:{
               hmr: process.env.NODE_ENV === 'production'
             }
          },

          {loader:'css-loader',options:{modules:false}}
        ]
      },
      {
        test:/\.scss$/,
        use:[
          {loader:'style-loader'},
          // {
          //   loader:MiniCssExtractPlugin.loader,
          //   options:{publicPath:'./'}
          // },
          {loader:'css-loader',options:{modules:false}},
          {loader:'sass-loader'}
        ]
      },
      {
        test: /\.vue$/,
        use:[
          {loader: 'vue-loader'}
        ],
        exclude:/node_modules/
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
          'file-loader'
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
    ]
  },
  plugins:[
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    //   ignoreOrder: false // Enable to remove warnings about conflicting order
    // }),
    new HtmlWebpackPlugin({
      template:'./index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
      ignoreOrder: false
    })
  ],
  resolve: {
  extensions: [".js", ".jsx", ".css",".vue"],
  alias: {
        'vue$': 'vue/dist/vue.esm.js'
    }
}

}
