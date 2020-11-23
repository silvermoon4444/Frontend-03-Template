const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin({
      template: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/*.html", to: "[name].[ext]" }],
    }),
  ],
};
