const path = require('path');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports={
  entry:"./src/main.js",
  output:{
    filename:"bundle.js",
    path:path.resolve(__dirname,'./dist')
  },
  mode:'development',
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
          {loader:'style-loader'},
          {loader:'css-loader',options:{modules:false}},
          {loader:"postcss-loader",options:{plugins:[require('autoprefixer')]}}
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
        loader: 'vue-loader',
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
      template:'./index.html'
    }),
    new VueLoaderPlugin(),
    require('autoprefixer')
  ],
  devtool: 'cheap-module-eval-source-map',
  resolve: {
  extensions: [".js", ".jsx", ".css",".vue"],
  alias: {
        'vue$': 'vue/dist/vue.esm.js'
    }
},
  devServer:{
    contentBase: false,
    compress: true,
    port: 9000,
    hot:true,
    host:"127.0.0.1",
    proxy: {
  "/api": "http://103.210.237.23"
}
  }
}
