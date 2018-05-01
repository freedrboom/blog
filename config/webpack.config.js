const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const autoprefixer = require("autoprefixer")
const path = require("path")

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",

  entry: ["react-dev-utils/webpackHotDevClient", path.resolve("src/index.js")],

  resolve: {
    modules: [path.resolve("src"), path.resolve("node_modules")],
    extensions: [".js", ".jsx"]
  },

  output: {
    path: path.resolve(".tmp"),
    filename: "[name].js",
    publicPath: "/"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve("public/index.html")
    })
  ],

  devServer: {
    contentBase: ".tmp",
    hot: true,
    port: 8000,
    proxy: {
      "/resetful/*": {
        target: "127.0.0.1:3000/",
        secure: false
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: ["react-hot-loader/babel"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: () => [
                // autoprefixer({
                //   browsers: [
                //     ">1%",
                //     "last 4 versions",
                //     "Firefox ESR",
                //     "not ie < 10",
                //   ],
                // }),
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  }
}