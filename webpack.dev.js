const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv=require("dotenv")

dotenv.config();


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    performance: {
        hints: false,
        maxEntrypointSize: 856000,
        maxAssetSize: 856000
    },
    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html',
          favicon: 'public/favicon.ico',
        }),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env)
        }),
        new webpack.ProvidePlugin({
        "React": "react",
        })
      ],

      devServer: {
        host: process.env.REACT_APP_REST_BASE_ADDRESS,
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot:true,
      }
      ,
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
            test: /\.(css|sass|scss)$/,
            use:[
              'style-loader',
              'css-loader',
              'sass-loader'
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


}
