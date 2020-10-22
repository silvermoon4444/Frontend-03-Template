const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './main.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]]
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: "index.html",
          template: "index.html",
          title: "轮播图组件💦",
        }),
      ],
    mode: 'development',
    devServer: {
        open: true,
        port: 10086,
        hot: true
    }
}