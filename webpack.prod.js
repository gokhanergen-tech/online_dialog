const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const crypto =require("crypto")
const path=require("path")

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    performance: {
      hints: false,
      maxEntrypointSize: 856000,
      maxAssetSize: 856000
    },
    devtool: false
     ,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.'+crypto.randomBytes(64).toString("hex")+'.js',
      publicPath:"/"
    },
   
    plugins: [
      new HtmlWebpackPlugin({
        title:"Production"
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),
      new webpack.ProvidePlugin({
      "React": "react",
      })
    ],
    module: {
        rules: [
          {
            test: /\.(jsx|js)/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', "@babel/preset-react"]
              }, 
             
            }
          },
          {
            test: /\.(css|scss)$/,
            use:[
              'style-loader',
              'css-loader',
              "sass-loader"
            ]
          },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         }
        ]
      },

      resolve: 
      {
           extensions: [".js", ".jsx","*"],
           alias: {
            "react-dom": "react-dom",
          }
      }
      
};

